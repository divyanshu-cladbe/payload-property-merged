"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlogsResponse, Blog } from "@/lib/types/blog";

interface BlogsPreviewSectionProps {
  blogsData?: BlogsResponse;
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  showSeeAll?: boolean;
  onSeeAllClick?: () => void;
}

const formatDate = (dateInput?: string | Date | null) => {
  if (!dateInput) return "1 Jan 2023";
  const d = new Date(dateInput);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getAuthorName = (author: string | number | object | undefined): string => {
  if (typeof author === "string") return author;
  if (typeof author === "object" && author !== null && "name" in author) {
    return (author as any).name || "Unknown Author";
  }
  return "Phoenix Baker";
};

// Sub-Component for large featured blog
const FeaturedBlogCard = ({ blog }: { blog: Blog }) => {
  const imageUrl = typeof blog.coverImage === 'object' && blog.coverImage !== null
    ? ((blog.coverImage as any).cloudflareImageUrl || (blog.coverImage as any).url || "/images/blogs/blog-img.png")
    : "/images/blogs/blog-img.png";

  return (
    <Link href={`/blogs/${blog.slug}`} className="block h-full group">
      <div className="flex flex-col h-full">
        <div className="relative w-full max-w-[502px] aspect-[502/276] overflow-hidden rounded-[19px] mb-4 bg-gray-50">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black group-hover:text-[#E91614] transition-colors mb-2">
            {blog.title}
          </h3>
          <p className="text-[#A7A7A7] text-xs sm:text-sm lg:text-base font-semibold line-clamp-3">
            {blog.subtitle || "Exploring the latest trends and insights in the real estate market, signaling a strong rebound."}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Sub-Component for list item
const ListBlogItem = ({ blog }: { blog: Blog }) => {
  const author = getAuthorName(blog.author);
  const category = blog.tags && blog.tags.length > 0 ? blog.tags[0].tag : "Category";

  return (
    <Link href={`/blogs/${blog.slug}`} className="block group border-b border-[#D3D3D3] py-4 first:pt-0">
      <div className="flex flex-col gap-2">
        <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-black group-hover:text-[#E91614] transition-colors line-clamp-2">
          {blog.title}
        </h4>
        <div className="flex items-center gap-3 text-sm lg:text-base text-[#A7A7A7] mt-1.5">
          <span>By {author}</span>
          <span>•</span>
          <span>{formatDate(blog.publishedDate)}</span>
          <span className="px-3 py-1 rounded-full border border-[#A7A7A7] bg-white ml-2 group-hover:border-gray-300">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function BlogsPreviewSection({
  blogsData,
  showSeeAll = true,
  onSeeAllClick,
}: BlogsPreviewSectionProps) {
  const docs = blogsData?.docs || [];
  
  if (docs.length === 0) {
    return null;
  }

  const featuredBlog1 = docs[0];
  const featuredBlog2 = docs[1];
  const listBlogs = docs.slice(2, 5);

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12 lg:py-14">
      {/* Section Header */}
      <div className="flex flex-row justify-between items-center mb-6 md:mb-10 gap-4 mx-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#060606] tracking-[-4%]">
          Real estate News
        </h2>
        {showSeeAll && (
          <button 
            onClick={onSeeAllClick} 
            className="group flex items-center gap-2 text-[#E81B16] font-medium text-sm lg:text-base hover:opacity-80 transition-all underline pb-0.5 whitespace-nowrap"
          >
            See all
            <ArrowRight color="#E81B16" className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Left Side: Featured Post 1 */}
        {featuredBlog1 && (
          <div className="w-full">
            <FeaturedBlogCard blog={featuredBlog1} />
          </div>
        )}

        {/* Middle: Featured Post 2 */}
        {featuredBlog2 && (
          <div className="w-full">
            <FeaturedBlogCard blog={featuredBlog2} />
          </div>
        )}

        {/* Right Side: List Posts */}
        <div className="flex flex-col justify-start">
          {listBlogs.map((blog) => (
             <ListBlogItem key={blog.id || blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
