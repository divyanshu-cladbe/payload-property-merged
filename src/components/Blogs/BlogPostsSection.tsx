import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/blogs/bill-walsh-leadership-lessons.png",
    tags: ["Leadership", "Management"],
  },
  {
    id: 2,
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/blogs/bill-walsh-leadership-lessons.png",
    tags: ["Leadership", "Management"],
  },
  {
    id: 3,
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/images/blogs/what-is-wireframing.png",
    tags: ["Design", "Research"],
  },
  {
    id: 4,
    author: "Natali Craig",
    date: "1 Jan 2023",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    image: "/images/blogs/how-collaboration-makes.png",
    tags: ["Design", "Research"],
  },
  {
    id: 5,
    author: "Drew Cano",
    date: "1 Jan 2023",
    title: "Our top 10 Javascript frameworks to use",
    description:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    image: "/images/blogs/top-10-javascript.png",
    tags: ["Software Development", "Tools", "SaaS"],
  },
  {
    id: 6,
    author: "Orlando Diggs",
    date: "1 Jan 2023",
    title: "Podcast: Creating a better CX Community",
    description:
      "Starting a community doesn't need to be complicated, but how do you get started?",
    image: "/images/blogs/podcast.png",
    tags: ["Podcasts", "Customer Success"],
  },
];

const getTagStyles = (tag: string): string => {
  const tagStyles: { [key: string]: string } = {
    Leadership: "bg-[#F9F5FF] text-[#6941C6]",
    Management: "bg-[#F8F9FC] text-[#363F72]",
    Design: "bg-[#F9F5FF] text-[#6941C6]",
    Research: "bg-[#EEF4FF] text-[#3538CD]",
    "Software Development": "bg-[#ECFDF3] text-[#027A48]",
    Tools: "bg-[#FDF2FA] text-[#C11574]",
    SaaS: "bg-[#FFF1F3] text-[#C01048]",
    Podcasts: "bg-[#F9F5FF] text-[#6941C6]",
    "Customer Success": "bg-[#FFF4ED] text-[#C4320A]",
  };

  return tagStyles[tag] || "bg-gray-100 text-gray-700";
};

const BlogPostsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("New");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

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
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push(2);
        pages.push("...");
      } else {
        pages.push(2);
        pages.push(3);
      }

      // Show current page and neighbors
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(currentPage);
      }

      // Show last pages
      if (currentPage < totalPages - 2) {
        pages.push("...");
        pages.push(totalPages - 1);
      } else {
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={headerVariants}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold text-[#1A1A1A] mb-6 text-center">
          All blog posts
        </h1>

        {/* Tabs */}
        <motion.div
          className="flex gap-6 border-b border-gray-200"
          variants={tabVariants}
        >
          <motion.button
            onClick={() => setActiveTab("New")}
            className={`pb-3 px-1 text-sm xl:text-base font-semibold transition-colors ${
              activeTab === "New"
                ? "text-[#BB2828] border-b-2 border-[#BB2828]"
                : "text-[#454444] font-medium hover:text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            New
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("Popular")}
            className={`pb-3 px-1 text-sm xl:text-base transition-colors ${
              activeTab === "Popular"
                ? "text-[#BB2828] font-semibold border-b-2 border-[#BB2828]"
                : "text-[#454444]  font-medium hover:text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Popular
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("Trending")}
            className={`pb-3 px-1 text-sm xl:text-base transition-colors ${
              activeTab === "Trending"
                ? "text-[#BB2828] font-semibold border-b-2 border-[#BB2828]"
                : "text-[#454444] font-medium hover:text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Trending
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Blog Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <motion.div
                className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-3xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {post.id === 2 ? (
                  // Special styling for the second card with red overlay
                  <div className="absolute inset-0 bg-[#BB2828] p-6 flex items-center justify-center">
                    <div className="relative w-4/5 h-4/5 rounded-3xl overflow-hidden border-4 border-[#FFE8E8]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </motion.div>

              {/* Content */}
              <div className="space-y-3">
                {/* Author and Date */}
                <motion.div
                  className="flex items-center gap-2 text-[#6941C6] font-semibold text-sm xl:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </motion.div>

                {/* Title */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base md:text-lg xl:text-xl font-semibold text-[#1A1A1A] group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>
                  <ArrowUpRight className="w-6 h-6 text-[#1A1A1A] flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Description */}
                <p className="text-[#667085] text-sm md:text-base leading-relaxed">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-3xl text-xs sm:text-sm font-medium ${getTagStyles(
                        tag
                      )}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm xl:text-base font-medium text-[#667085] hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </motion.button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="w-10 h-10 flex items-center justify-center text-sm xl:text-base font-medium text-[#667085]">
                  ...
                </span>
              ) : (
                <motion.button
                  onClick={() => handlePageChange(page as number)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm xl:text-base font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#F9F5FF] text-[#7F56D9]"
                      : "text-[#667085] hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {page}
                </motion.button>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm xl:text-base font-medium text-[#667085] hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BlogPostsSection;
