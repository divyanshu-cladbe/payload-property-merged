// Use this function to format the price in Indian currency
export function formatIndianCurrency(
  price: string | number | undefined,
  unit: "cr" | "l" = "cr"
): string {
  // Handle undefined or empty values
  if (price === undefined || price === null || price === "") return "";

  const value = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(value) || value <= 0) return "";

  // Automatically choose unit based on value
  let actualUnit = unit;
  let divisor: number;

  if (value >= 1e7) {
    // 1 crore or more
    actualUnit = "cr";
    divisor = 1e7;
  } else {
    // Less than 1 crore, show in lakhs
    actualUnit = "l";
    divisor = 1e5;
  }

  const formatted = value / divisor;

  return formatted % 1 === 0
    ? `${formatted} ${actualUnit === "cr" ? "Cr" : "L"}`
    : `${formatted.toFixed(2)} ${actualUnit === "cr" ? "Cr" : "L"}`;
}
