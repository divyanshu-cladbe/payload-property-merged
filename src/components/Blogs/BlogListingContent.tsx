"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Blog, BlogsResponse } from "@/lib/types/blog";

const FILTER_CATEGORIES = [
  "Real Estate Trend",
  "Home Buying",
  "Home Decor",
  "Lifestyle and Mag",
  "Vastu",
];

interface BlogListingContentProps {
  initialBlogs: BlogsResponse;
}

const getAuthorName = (
  author: string | number | object | undefined
): string => {
  if (typeof author === "string") return author;
  if (typeof author === "object" && author !== null && "name" in author) {
    return (author as any).name || "Unknown Author";
  }
  return "Phoenix Baker";
};

const getImageUrl = (coverImage: Blog["coverImage"]): string => {
  if (typeof coverImage === "object" && coverImage !== null) {
    return (
      coverImage.cloudflareImageUrl ||
      coverImage.url ||
      "/images/blogs/blog-img-2.png"
    );
  }
  return "/images/blogs/blog-img.png";
};

const BlogListingContent: React.FC<BlogListingContentProps> = ({
  initialBlogs,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("Real Estate Trend");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  // Filter functionality (Commented out strict filtering until we have proper tags in the blogs)
  // const filteredDocs = useMemo(() => {
  //   return initialBlogs.docs.filter((blog) => {
  //     if (!blog.tags) return false;
  //     return blog.tags.some((t) => t.tag === activeFilter);
  //   });
  // }, [initialBlogs.docs, activeFilter]);
  
  // Using all docs for now so UI is filled.
  const filteredDocs = initialBlogs.docs;

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / postsPerPage));
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredDocs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push("...");
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-8 sm:pb-12">
      {/* Header */}
      <motion.div
        className="mb-8 lg:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={headerVariants}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#060606] tracking-[-4%] mb-6 sm:mb-8 lg:mb-12">
          Blogs
        </h2>

        {/* Filter Pills */}
        <motion.div
           className="flex flex-wrap gap-3 sm:gap-4"
           variants={tabVariants}
        >
          {FILTER_CATEGORIES.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 text-sm lg:text-base font-medium rounded-full border transition-all ${
                  isActive
                    ? "border-[#E91614] text-[#E91614]"
                    : "border-black text-black hover:border-gray-400"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Blog Grid */}
      <AnimatePresence mode="wait">
        {currentPosts.length > 0 ? (
          <motion.div
            key={currentPage + activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {currentPosts.map((post) => (
              <motion.article
                key={post.id}
                className="group cursor-pointer flex flex-col h-full"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <Link href={`/blogs/${post.slug}`} className="block relative w-full max-w-[502px] aspect-[502/276] mb-5 overflow-hidden rounded-[19px] bg-gray-100 flex-shrink-0">
                  <Image
                    src={getImageUrl(post.coverImage)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <Link href={`/blogs/${post.slug}`} className="group block mb-2">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black group-hover:text-[#E91614] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-[#A7A7A7] font-semibold text-xs sm:text-sm lg:text-base line-clamp-3 mb-6 flex-grow">
                    {post.subtitle || "Exploring the latest trends and insights in the real estate market."}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center gap-3 mt-auto">
                    {/* Dummy Author Avatar */}
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                       <Image 
                         src="/images/blogs/author-avatar.png" 
                         alt="Author avatar" 
                         width={40} 
                         height={40} 
                         className="w-full h-full object-cover"
                       />
                    </div>
                    <div>
                      <p className="text-[#A7A7A7] font-semibold text-[11px] sm:text-[13px] lg:text-[15px]">
                        {getAuthorName(post.author)}
                      </p>
                      <p className="text-[#A7A7A7] font-semibold text-[11px] sm:text-[13px] lg:text-[15px]">
                        {post.publishedDate
                          ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "1 Jan 2023"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-500 text-lg">No blogs found in this category</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 pt-8 mt-12 overflow-x-auto no-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-[#E91614] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group mr-1 sm:mr-4"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="w-6 sm:w-8 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-[#E91614] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-[#E91614] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group ml-1 sm:ml-4"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BlogListingContent;
