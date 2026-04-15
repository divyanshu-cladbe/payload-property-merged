"use client";
import React, { Suspense } from "react";
import { BlogPreviewProvider, useBlogPreview } from "@/contexts/BlogPreviewContext";

function PreviewBanner() {
  const { isPreviewMode, blog } = useBlogPreview();
  if (!isPreviewMode) return null;

  return (
    <div
      style={{
        background: "#1a1a1a",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          background: "#f59e0b",
          color: "#000",
          padding: "2px 8px",
          borderRadius: "4px",
          fontWeight: "600",
          fontSize: "11px",
        }}
      >
        PREVIEW
      </span>
      {blog ? "Showing live data from Payload CMS" : "Loading preview..."}
    </div>
  );
}

export default function BlogPreviewWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BlogPreviewProvider>
      <Suspense>
        <PreviewBanner />
      </Suspense>
      {children}
    </BlogPreviewProvider>
  );
}
