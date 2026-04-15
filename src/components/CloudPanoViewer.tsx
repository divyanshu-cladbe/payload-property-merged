"use client";

import { useEffect, useRef } from "react";

interface CloudPanoViewerProps {
  tourId: string;
  className?: string;
  title?: string;
  width?: string;
  height?: string;
}

export default function CloudPanoViewer({
  tourId,
  className = "",
  title = "360° Virtual Tour",
  width = "100%",
  height = "600px",
}: CloudPanoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return;

    // Create and inject the CloudPano script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-short", tourId);
    script.setAttribute("width", width);
    script.setAttribute("height", height);
    script.src = "https://app.cloudpano.com/public/shareScript.js";

    containerRef.current.appendChild(script);
    scriptLoadedRef.current = true;

    return () => {
      // Cleanup script on unmount
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      scriptLoadedRef.current = false;
    };
  }, [tourId, width, height]);

  return (
    <div
      ref={containerRef}
      className={`cloudpano-viewer-container ${className}`}
      style={{ minHeight: height }}
      title={title}
    />
  );
}
