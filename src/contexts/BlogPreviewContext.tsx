"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Blog } from "@/lib/types/blog";

interface BlogPreviewContextType {
  isPreviewMode: boolean;
  blog: Blog | null;
}

const BlogPreviewContext = createContext<BlogPreviewContextType>({
  isPreviewMode: false,
  blog: null,
});

export const useBlogPreview = () => useContext(BlogPreviewContext);

export const BlogPreviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const cmsPreview = searchParams.get("cmsPreview");
  const blogId = searchParams.get("blogId");

  const isPreviewMode = cmsPreview === "1" && Boolean(blogId);

  const [blog, setBlog] = useState<Blog | null>(null);
  const lastId = useRef<string>("");

  useEffect(() => {
    if (!isPreviewMode || !blogId) {
      setBlog(null);
      return;
    }

    if (blogId === lastId.current) return;
    lastId.current = blogId;

    const cmsUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_API_URL?.replace(/\/api\/?$/, "") ||
      "http://localhost:3000";

    fetch(`${cmsUrl}/api/blogs/${blogId}?depth=1`)
      .then((r) => r.json() as Promise<Blog>)
      .then((data) => {
        setBlog(data);
      })
      .catch(() => {
        setBlog(null);
      });
  }, [isPreviewMode, blogId]);

  return (
    <BlogPreviewContext.Provider value={{ isPreviewMode, blog }}>
      {children}
    </BlogPreviewContext.Provider>
  );
};
