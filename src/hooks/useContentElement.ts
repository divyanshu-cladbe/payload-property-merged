import { useEffect, useState } from "react";
import { contentMap } from "@/lib/contentMap";
import { usePageContent } from "@/components/PageContentLoader";
import { usePreviewContent } from "@/contexts/PreviewContentContext";

/**
 * Hook to get a dynamic image URL from the content map for a specific element
 * @param elementId - The element ID to fetch (e.g., "max-pic", "banner-image")
 * @param fallback - Fallback URL if element not found or no URL available
 * @returns The image URL (either from API or fallback)
 *
 * Usage in component:
 * const imageUrl = useContentElement("max-pic", "/images/default.png");
 * <Image src={imageUrl} alt="..." fill priority />
 */
export const useContentElement = (
  elementId: string,
  fallback: string
) => {
  const { cityId, pageId } = usePageContent();
  const { isPreviewMode, elementsMap } = usePreviewContent();
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    // Preview mode: check CMS map first
    if (isPreviewMode) {
      const entry = elementsMap[elementId];
      if (entry?.url) {
        setUrl(entry.url);
        return;
      }
    }

    // Normal mode: use contentMap
    const updateUrl = () => {
      const newUrl = contentMap
        .page(cityId, pageId)
        .element(elementId)
        .urlOr(fallback);
      setUrl(newUrl);
    };

    updateUrl();
    const unsubscribe = contentMap.subscribe(updateUrl);
    return () => {
      unsubscribe();
    };
  }, [cityId, pageId, elementId, fallback, isPreviewMode, elementsMap]);

  return url;
};
