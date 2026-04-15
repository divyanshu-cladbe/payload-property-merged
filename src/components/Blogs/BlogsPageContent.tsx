"use client";

import BlogPostCardSection from "@/components/Blogs/BlogPostCardSection";
import BlogsPreviewSection from "@/components/sections/BlogsPreviewSection";
import BlogListingContent from "@/components/Blogs/BlogListingContent";
import { BlogsResponse } from "@/lib/types/blog";

interface BlogsPageContentProps {
  blogsData: BlogsResponse;
}

export default function BlogsPageContent({ blogsData }: BlogsPageContentProps) {
  return (
    <>
      <BlogsPreviewSection
        blogsData={blogsData}
        showSearch={false}
      />

      {/* {blogsData.docs.length > 0 && (
        <BlogPostCardSection blog={blogsData.docs[0]} />
      )} */}

      <BlogListingContent initialBlogs={blogsData} />
    </>
  );
}
