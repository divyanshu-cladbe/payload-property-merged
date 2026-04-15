export interface Author {
  id: number | string;
  name?: string;
  email?: string;
  role?: string;
  updatedAt?: string;
  createdAt?: string;
  sessions?: Record<string, unknown>[];
}

export interface Tag {
  tag: string;
  id?: string;
}

export interface MediaImage {
  id: number | string;
  page_id: string | null;
  city_id: string | null;
  element_id: string;
  content_type: string; // "image"
  status: string; // "active"
  valid_from: string | null;
  valid_to: string | null;
  priority: number;
  created_by: string | null;

  cloudflareImageUrl: string | null;
  r2Path: string | null;

  fileName: string;
  dbEntryId: string;
  url: string | null; // payload-served file URL
  thumbnailURL: string | null;

  filename: string; // duplicate but present in API
  mimeType: string;
  filesize: number;

  width: number | null;
  height: number | null;
  focalX: number | null;
  focalY: number | null;

  updatedAt: string;
  createdAt: string;
}
export interface Blog {
  id: number | string;
  title: string;
  subtitle?: string | null;
  slug: string;
  category?: string | null;
  approval_status?: string | null; // Approval status (approved, pending, in_progress, rejected, modified)
  approval_id?: string | null; // External approval system ID
  author?: Author | string | number; // Can be object, string, or number
  authorName?: string | null;
  publishedDate?: string | null;
  readTime?: string | null;
  tags?: Tag[];
  coverImage?: MediaImage | string | number | null; // Can be object, string, number, or null
  content: Record<string, unknown> | Record<string, unknown>[]; // Slate rich text content
  metaTitle?: string | null; // SEO meta title
  metaDescription?: string | null; // SEO meta description
  metaKeywords?: string | null; // SEO meta keywords
  canonicalUrl?: string | null; // SEO canonical URL
  createdAt: string;
  updatedAt: string;
}

export interface BlogsResponse {
  docs: Blog[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
