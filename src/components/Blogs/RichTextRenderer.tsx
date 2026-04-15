"use client";

import React from "react";
import { serializeSlate } from "./serializeSlate";

interface Props {
  content: Record<string, unknown> | Record<string, unknown>[];
}

export default function RichTextRenderer({ content }: Props) {
  if (!content) return null;

  // If content is HTML string (shouldn't happen with Slate, but just in case)
  if (typeof content === "string") {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Render Slate JSON
  return (
    <div className="blog-content">
      {serializeSlate(Array.isArray(content) ? content : [content])}
    </div>
  );
}
