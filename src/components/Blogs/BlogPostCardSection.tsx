import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Blog } from "@/lib/types/blog";

interface BlogPostCardProps {
  blog: Blog;
}

const getAuthorName = (author: string | number | object | undefined): string => {
  if (typeof author === "string") return author;
  if (typeof author === "object" && author !== null && "name" in author) {
    return (author as any).name || "Unknown Author";
  }
  return "Unknown Author";
};

const getTagColor = (
  tag: string
): {
  bg: string;
  text: string;
} => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    cladbe: { bg: "bg-[#F9F5FF]", text: "text-[#6941C6]" },
    proptech: { bg: "bg-[#EEF4FF]", text: "text-[#3538CD]" },
    testing: { bg: "bg-[#FDF2FA]", text: "text-[#C11574]" },
  };
  return colors[tag] || { bg: "bg-gray-100", text: "text-gray-700" };
};

const dummyImages = [
  "/images/blogs/design-user-interface.png",
  "/images/home/blog-img3.png",
];

const BlogPostCardSection: React.FC<BlogPostCardProps> = ({ blog }) => {
  const author = getAuthorName(blog.author);
  const date = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "TBD";
  const imageUrl = dummyImages[0];

  // Use subtitle if available, otherwise use a combination of title and preview
  let description = blog.subtitle || blog.title;

  // If description is still too short (less than 100 chars), try to extract from content
  if (description.length < 100 && blog.content) {
    const contentArray = Array.isArray(blog.content) ? blog.content : [blog.content];
    let textContent = "";

    for (const block of contentArray) {
      if (typeof block === 'object' && block !== null) {
        if ('text' in block) {
          textContent += (block as any).text + " ";
        } else if ('children' in block) {
          const children = (block as any).children;
          if (Array.isArray(children)) {
            for (const child of children) {
              if (typeof child === 'object' && 'text' in child) {
                textContent += (child as any).text + " ";
              }
            }
          }
        }
      }
      if (textContent.length >= 150) break;
    }

    if (textContent.trim().length > 0) {
      description = textContent.substring(0, 200).trim() + (textContent.length > 200 ? "..." : "");
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-[100em] mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image Section */}
      <motion.div className="lg:w-1/2" variants={imageVariants}>
        <motion.div
          className="relative w-full h-[300px] lg:h-[350px] rounded-3xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="lg:w-1/2 flex flex-col justify-center"
        variants={contentVariants}
      >
        {/* Author and Date */}
        <motion.div
          className="flex items-center gap-2 font font-semibold text-sm xl:text-base text-[#6941C6] mb-4"
          variants={itemVariants}
        >
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </motion.div>

        {/* Title with Arrow Link */}
        <Link href={`/blogs/${blog.slug}`} className="group">
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-semibold text-[#1A1A1A] mb-4 flex items-start justify-between gap-4"
            variants={itemVariants}
          >
            <span>{blog.title}</span>
            <span className="text-xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
              <ArrowUpRight color="#1A1A1A" />
            </span>
          </motion.h2>
        </Link>

        {/* Description */}
        <motion.p
          className="text-[#667085] text-sm md:text-base xl:text-lg leading-relaxed mb-8 line-clamp-4"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div className="flex gap-3" variants={itemVariants}>
            {blog.tags.map((tag, index) => {
              const colors = getTagColor(tag.tag);
              return (
                <motion.span
                  key={index}
                  className={`px-3 py-1 rounded-2xl text-xs sm:text-sm font-medium ${colors.bg} ${colors.text}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag.tag}
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BlogPostCardSection;
