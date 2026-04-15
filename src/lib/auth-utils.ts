/**
 * Utility functions for authentication state management
 */

/**
 * Checks if an authentication session cookie exists
 * This prevents unnecessary API calls when user is not logged in
 */
export const hasAuthSession = (): boolean => {
  if (typeof document === "undefined") {
    return false; // SSR context
  }

  // Check for common session cookie patterns
  // Adjust cookie names based on your backend implementation
  const cookies = document.cookie.split(";").map((c) => c.trim());

  // Common cookie names for sessions
  const sessionCookiePatterns = ["token"];

  return cookies.some((cookie) =>
    sessionCookiePatterns.some((pattern) => cookie.startsWith(`${pattern}=`))
  );
};

/**
 * Clears all authentication-related data from browser storage
 */
export const clearAuthData = (): void => {
  // Clear any auth-related localStorage items if needed
  if (typeof window !== "undefined") {
    // Add any localStorage keys you want to clear on logout
    // localStorage.removeItem('auth_token');
  }
};
