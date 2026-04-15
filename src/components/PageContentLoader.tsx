"use client";
import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { contentMap } from "@/lib/contentMap";
import { PreviewContentProvider } from "@/contexts/PreviewContentContext";

interface PageContentLoaderProps {
  cityId: string;
  pageId: string;
  children: React.ReactNode;
}

interface PageContentContextType {
  cityId: string;
  pageId: string;
  loaded: boolean;
}

const PageContentContext = createContext<PageContentContextType | undefined>(
  undefined
);

export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (!context) {
    throw new Error("usePageContent must be used within PageContentLoader");
  }
  return context;
};

export const PageContentLoader: React.FC<PageContentLoaderProps> = ({
  cityId,
  pageId,
  children,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await contentMap.fetchPage(cityId, pageId);
      } finally {
        setLoaded(true);
      }
    })();
  }, [cityId, pageId]);

  return (
    <PageContentContext.Provider value={{ cityId, pageId, loaded }}>
      <Suspense>
        <PreviewContentProvider>
          {children}
        </PreviewContentProvider>
      </Suspense>
    </PageContentContext.Provider>
  );
};
