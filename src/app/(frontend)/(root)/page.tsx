import { Suspense } from "react";
import { HomePageClient } from "./HomePageClient";
import { PayloadAPI } from "@/lib/api/payload";
import { BlogsResponse } from "@/lib/types/blog";

// export const runtime = 'edge';

async function fetchBlogs(): Promise<BlogsResponse> {
  try {
    const { getPayload } = await import("payload");
    const configPromise = await import("@payload-config");
    const payload = await getPayload({ config: configPromise.default });

    const data = await payload.find({
      collection: "blogs" as any,
      limit: 100,
      sort: "-publishedDate",
      depth: 1,
    });

    const filteredDocs = (data.docs as any[]).filter(
      (blog) => blog.category === "property.new" || blog.category === "both"
    );

    return {
      docs: filteredDocs as any,
      totalDocs: filteredDocs.length,
      limit: 100,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  } catch {
    // Blogs collection doesn't exist yet or has no data - return empty
    return {
      docs: [],
      totalDocs: 0,
      limit: 10,
      totalPages: 0,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
}

export default async function HomePage() {
  const blogsData = await fetchBlogs();

  return (
    <Suspense>
      <HomePageClient blogsData={blogsData} />
    </Suspense>
  );
}
