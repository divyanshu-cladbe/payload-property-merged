import { Blog, BlogsResponse } from "../types/blog";

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "";

export class PayloadAPI {
  private static async fetcher<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    if (!API_URL) {
      console.warn(
        "⚠️ NEXT_PUBLIC_PAYLOAD_API_URL is not configured. Returning empty response."
      );
      return { docs: [], totalDocs: 0 } as T;
    }

    const url = `${API_URL}${endpoint}`;

    // console.log("🌐 Fetching:", url);

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options?.headers,
      };

      // Add Payload authentication secret if available
      const payloadSecret = process.env.NEXT_PUBLIC_PAYLOAD_SECRET;
      if (payloadSecret) {
        (headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${payloadSecret}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        console.error(`API responded with status: ${response.status}`);
        const errorText = await response.text().catch(() => "");
        throw new Error(
          `API Error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();

      // Log what we got
      // console.log("✅ Data received from API");

      return data as T;
    } catch (error) {
      console.error("❌ Payload API Error:", error);
      console.error("Endpoint was:", url);
      throw error;
    }
  }

  // Get all blogs with pagination
  static async getBlogs(params?: {
    page?: number;
    limit?: number;
    tag?: string;
    category?: string | string[];
  }): Promise<BlogsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.tag) {
      searchParams.append("where[tags.tag][equals]", params.tag);
    }
    if (params?.category && !Array.isArray(params.category)) {
      // Only add single category filter to API request
      // Multiple categories will be filtered client-side
      searchParams.append("where[category][equals]", params.category);
    }

    // Sort by published date descending
    searchParams.append("sort", "-publishedDate");

    // Add depth to populate relationships
    searchParams.append("depth", "1");

    const queryString = searchParams.toString();
    const endpoint = `/blogs${queryString ? `?${queryString}` : ""}`;

    // Just fetch and return - don't modify the data
    return this.fetcher<BlogsResponse>(endpoint);
  }

  // Get single blog by slug
  static async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const endpoint = `/blogs?where[slug][equals]=${slug}&limit=1&depth=1`;
      const response = await this.fetcher<BlogsResponse>(endpoint);

      return response.docs[0] || null;

      // const blog = response.docs[0] || null;

      // // Only return blog if it's approved
      // if (blog && blog.approval_status === "approved") {
      //   return blog;
      // }

      // return null;
    } catch (error) {
      console.error("Error fetching blog by slug:", error);
      return null;
    }
  }

  // Get single blog by ID
  static async getBlogById(id: string): Promise<Blog | null> {
    try {
      return this.fetcher<Blog>(`/blogs/${id}?depth=1`);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      return null;
    }
  }

  // Get all unique tags
  static async getAllTags(): Promise<string[]> {
    try {
      const response = await this.fetcher<BlogsResponse>(
        "/blogs?limit=1000&depth=0"
      );
      const tagsSet = new Set<string>();

      response.docs.forEach((blog) => {
        blog.tags?.forEach((tag) => {
          if (tag.tag) tagsSet.add(tag.tag);
        });
      });

      return Array.from(tagsSet).sort();
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  }

  // Get recent blogs
  static async getRecentBlogs(limit: number = 5): Promise<Blog[]> {
    try {
      const response = await this.fetcher<BlogsResponse>(
        `/blogs?limit=${limit}&sort=-publishedDate&depth=1`
      );
      return response.docs;
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      return [];
    }
  }

  // Search blogs
  static async searchBlogs(query: string): Promise<Blog[]> {
    try {
      const response = await this.fetcher<BlogsResponse>(
        `/blogs?where[title][contains]=${encodeURIComponent(query)}&depth=1`
      );
      return response.docs;
    } catch (error) {
      console.error("Error searching blogs:", error);
      return [];
    }
  }

  static async getMediaById(id: number | string) {
    return this.fetcher(`/media/${id}`);
  }
}
