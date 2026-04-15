"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useSearchParams } from "next/navigation";

interface PreviewElement {
  type: "image" | "video" | "text" | "document";
  url?: string;
  text?: string;
  id: string;
}

interface PreviewContentContextType {
  isPreviewMode: boolean;
  elementsMap: Record<string, PreviewElement>;
}

const PreviewContentContext = createContext<PreviewContentContextType>({
  isPreviewMode: false,
  elementsMap: {},
});

export const usePreviewContent = () => useContext(PreviewContentContext);

function buildElementsMap(docs: any[]): Record<string, PreviewElement> {
  const now = Date.now();
  // Group by element_id, pick best per element using plan rules:
  // 1. status === 'active'
  // 2. approval_status !== 'rejected'
  // 3. valid_from <= now, valid_to null or >= now
  // 4. highest priority, then newest createdAt
  const groups: Record<string, any[]> = {};
  for (const doc of docs) {
    if (!doc.element_id) continue;
    if (!groups[doc.element_id]) groups[doc.element_id] = [];
    groups[doc.element_id].push(doc);
  }

  const result: Record<string, PreviewElement> = {};
  for (const [elementId, items] of Object.entries(groups)) {
    const filtered = items
      .filter((d) => d.status === "active")
      .filter((d) => d.approval_status !== "rejected")
      .filter((d) => {
        if (d.valid_from && new Date(d.valid_from).getTime() > now) return false;
        if (d.valid_to && new Date(d.valid_to).getTime() < now) return false;
        return true;
      })
      .sort((a, b) => {
        const pd = (b.priority ?? 0) - (a.priority ?? 0);
        if (pd !== 0) return pd;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    const doc = filtered[0];
    if (!doc) continue;

    const url = doc.cloudflareImageUrl || doc.url || undefined;
    result[elementId] = {
      type: doc.content_type,
      url,
      text: doc.text_content || undefined,
      id: String(doc.id),
    };
  }
  return result;
}

export const PreviewContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const cmsPreview = searchParams.get("cmsPreview");
  const cityId = searchParams.get("cityId");
  const pageId = searchParams.get("pageId");

  const isPreviewMode =
    cmsPreview === "1" && Boolean(cityId) && Boolean(pageId);

  const [elementsMap, setElementsMap] = useState<Record<string, PreviewElement>>({});
  const lastKey = useRef<string>("");

  useEffect(() => {
    if (!isPreviewMode) {
      setElementsMap({});
      return;
    }

    const key = `${cityId}:${pageId}`;
    if (key === lastKey.current) return;
    lastKey.current = key;

    const cmsUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000";
    const params = new URLSearchParams({
      "where[city_id][equals]": cityId!,
      "where[page_id][equals]": pageId!,
      limit: "100",
      depth: "0",
      sort: "-priority,-createdAt",
    });

    fetch(`${cmsUrl}/api/media?${params.toString()}`)
      .then((r) => r.json() as Promise<{ docs?: any[] }>)
      .then((data) => {
        const docs = data?.docs ?? [];
        setElementsMap(buildElementsMap(docs));
      })
      .catch(() => {
        setElementsMap({});
      });
  }, [isPreviewMode, cityId, pageId]);

  return (
    <PreviewContentContext.Provider value={{ isPreviewMode, elementsMap }}>
      {children}
    </PreviewContentContext.Provider>
  );
};