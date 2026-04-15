import { User } from "@/types/AuthInterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiError {
  message: string;
}

export interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  user?: User | undefined;
}

export const apiRequest = async <T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
      
    });

    const data = (await response.json()) as T | ApiError;

    if (!response.ok) {
      const errorMessage =
        typeof data === "object" && data && "message" in data
          ? data.message
          : "API request failed";
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }
    if (!data) {
      throw new Error("Empty response received from API");
    }
    return data as T;
  } catch (error: any) {
    // Don't log expected 401 Unauthorized errors (e.g., when checking auth status)
    if (error.status !== 401) {
      console.error("API Error:", error.message || error);
    }
    throw new Error(
      error.message || "Network error. Please check your connection."
    );
  }
};
