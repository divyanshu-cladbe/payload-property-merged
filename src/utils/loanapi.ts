/**
 * Utility functions to fetch loan application parameters from Payload CMS
 */

export interface LoanApplicationParams {
  id: number;
  foir: number;
  loanRate: number;
  maxAge: number;
  maxTenure: number;
  customerMarginRate: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch loan application parameters from Payload CMS API
 */
export async function fetchLoanParameters(): Promise<LoanApplicationParams | null> {
  try {
    const serverUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000";
    const response = await fetch(`${serverUrl}/api/loan-application`);

    if (!response.ok) {
      console.error("Failed to fetch loan parameters:", response.statusText);
      return null;
    }

    const data = (await response.json()) as unknown;

    // If response is wrapped in 'docs' array (Payload format)
    if (
      data &&
      typeof data === "object" &&
      "docs" in data &&
      Array.isArray(data.docs) &&
      data.docs.length > 0
    ) {
      return data.docs[0] as LoanApplicationParams;
    }

    // If response is the document directly
    if (data && typeof data === "object" && "id" in data) {
      return data as LoanApplicationParams;
    }

    return null;
  } catch (error) {
    console.error("Error fetching loan parameters:", error);
    return null;
  }
}

/**
 * Fetch loan parameters with caching (optional)
 * Caches for specified duration (default 5 minutes)
 */
let cachedParams: LoanApplicationParams | null = null;
let cacheTime = 0;

export async function fetchLoanParametersWithCache(
  cacheDurationMs: number = 5 * 60 * 1000 // 5 minutes
): Promise<LoanApplicationParams | null> {
  const now = Date.now();

  if (cachedParams && now - cacheTime < cacheDurationMs) {
    return cachedParams;
  }

  const params = await fetchLoanParameters();
  if (params) {
    cachedParams = params;
    cacheTime = now;
  }

  return params;
}

/**
 * Clear cache manually
 */
export function clearLoanParametersCache() {
  cachedParams = null;
  cacheTime = 0;
}
