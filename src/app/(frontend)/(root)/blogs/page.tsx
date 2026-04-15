import GetBlogPostedSection from "@/components/Blogs/GetBlogPosted";
import HeaderSection from "@/components/Blogs/HeaderSection";
import WriteForUsSection from "@/components/Blogs/WriteForUs";
import BlogsPageContent from "@/components/Blogs/BlogsPageContent";
import { PayloadAPI } from "@/lib/api/payload";
import { Suspense } from "react";
import { BlogsResponse } from "@/lib/types/blog";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs | Property.new",
  description:
    "Explore the latest insights, trends, and innovations in real estate technology. Read expert articles about property management, PropTech solutions, and industry updates.",
  keywords:
    "real estate blogs, proptech, property management, real estate technology, property insights, real estate trends",
  openGraph: {
    title: "Blogs | Property.new",
    description:
      "Explore the latest insights, trends, and innovations in real estate technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Property.new",
    description:
      "Explore the latest insights, trends, and innovations in real estate technology.",
  },
};

async function fetchBlogs(): Promise<BlogsResponse> {
  try {
    // Fetch all blogs without category filter
    // We'll filter by category (property.new or both) in the component
    const data = await PayloadAPI.getBlogs({
      limit: 100, // Fetch more to account for filtering
    });

    // Filter blogs by category: only show "property.new" and "both" categories
    const filteredDocs = data.docs.filter(
      (blog) => blog.category === "property.new" || blog.category === "both"
    );

    // TODO: Uncomment when blogs have approval_status set to "approved"
    // const filteredDocs = data.docs.filter((blog) => {
    //   const matchesCategory = blog.category === "property.new" || blog.category === "both";
    //   const isApproved = blog.approval_status === "approved";
    //   return matchesCategory && isApproved;
    // });

    return {
      ...data,
      docs: filteredDocs,
      totalDocs: filteredDocs.length,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    console.info(
      "Note: Ensure the 'blogs' collection is created in Payload CMS at " +
      `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/blogs`
    );
    // Return empty response if API fails
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

export default async function BlogsPage() {
  const blogsData = await fetchBlogs();

  return (
    <main className="min-h-screen w-full">
      <HeaderSection />

      <Suspense
        fallback={<div className="p-8 text-center">Loading content...</div>}
      >
        <BlogsPageContent blogsData={blogsData} />
      </Suspense>

      {/* <GetBlogPostedSection /> */}
      {/* <WriteForUsSection /> */}
    </main>
  );
}
