import { PayloadAPI } from "@/lib/api/payload";
import { notFound } from "next/navigation";
import RichTextRenderer from "@/components/Blogs/RichTextRenderer";
import BlogPreviewWrapper from "./BlogPreviewWrapper";


interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getAuthorName = (
  author: string | number | object | undefined
): string => {
  if (typeof author === "string") return author;
  if (typeof author === "object" && author !== null && "name" in author) {
    return (author as any).name || "Unknown Author";
  }
  return "Unknown Author";
};

const getTagColor = (tag: string): { bg: string; text: string } => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    cladbe: { bg: "bg-[#F9F5FF]", text: "text-[#6941C6]" },
    proptech: { bg: "bg-[#EEF4FF]", text: "text-[#3538CD]" },
    testing: { bg: "bg-[#FDF2FA]", text: "text-[#C11574]" },
  };
  return colors[tag] || { bg: "bg-gray-100", text: "text-gray-700" };
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await PayloadAPI.getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  // Get cover image URL
  const coverImageUrl =
    blog.coverImage && typeof blog.coverImage === "object"
      ? blog.coverImage.url || blog.coverImage.cloudflareImageUrl
      : null;

  // Get author name
  const authorName = blog.authorName || getAuthorName(blog.author);

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.subtitle || blog.title,
    keywords: blog.metaKeywords,
    authors: authorName ? [{ name: authorName }] : undefined,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.subtitle || blog.title,
      type: "article",
      publishedTime: blog.publishedDate || undefined,
      authors: authorName ? [authorName] : undefined,
      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              alt: blog.title,
            },
          ]
        : undefined,
      url: blog.canonicalUrl || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.subtitle || blog.title,
      images: coverImageUrl ? [coverImageUrl] : undefined,
    },
    alternates: {
      canonical: blog.canonicalUrl || undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await PayloadAPI.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <BlogPreviewWrapper>
    <main className="min-h-screen bg-white mt-20">
      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Information */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#6941C6] font-semibold text-sm md:text-base mb-4">
            <span>{getAuthorName(blog.author)}</span>
            <span>•</span>
            <span>
              {blog.publishedDate
                ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "TBD"}
            </span>
            {blog.readTime && (
              <>
                <span>•</span>
                <span>{blog.readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Subtitle */}
          {blog.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              {blog.subtitle}
            </p>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => {
                const colors = getTagColor(tag.tag);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${colors.bg} ${colors.text}`}
                  >
                    {tag.tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <RichTextRenderer content={blog.content} />
        </div>
      </article>
    </main>
    </BlogPreviewWrapper>
  );
}