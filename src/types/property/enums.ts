// types/property/enums.ts

export const PropertySegments = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  REITS: "REITS",
} as const;

export type PropertySegment =
  (typeof PropertySegments)[keyof typeof PropertySegments];
// Add this to your enums.ts
export const PropertyTags = {
  LUXURY: "luxury",
  BUDGET: "budget",
  PREMIUM: "premium",
  GATED_COMMUNITY: "gated community",
  PREMIUM_LOCATION: "premium location",
} as const;

export type PropertyTag = (typeof PropertyTags)[keyof typeof PropertyTags];

export const PropertyTypes = {
  // Residential
  APARTMENT: "Apartment",
  VILLA: "Villa",
  // INDEPENDENT_HOUSE: "Independent House",
  PLOT: "Plot",
  // PENTHOUSE: "Penthouse",
  // Commercial
  // OFFICE_SPACE: "Office Space",
  // RETAIL: "Retail",
  // WAREHOUSE: "Warehouse",
  // INDUSTRIAL: "Industrial",
  // COWORKING_SPACE: "Co-working Space",
  // REITS
  // COMMERCIAL_REIT: "Commercial REIT",
  // RESIDENTIAL_REIT: "Residential REIT",
} as const;

export type PropertyType = (typeof PropertyTypes)[keyof typeof PropertyTypes];

export const PossessionStatuses = {
  READY_TO_MOVE: "Ready to Move",
  UNDER_CONSTRUCTION: "Under Construction",
  Near_Possession: "Near Possession",
} as const;

export type PossessionStatus =
  (typeof PossessionStatuses)[keyof typeof PossessionStatuses];

export const PropertyStatuses = {
  READY_TO_MOVE: "Ready to Move",
  UNDER_CONSTRUCTION: "Under Construction",
  PRE_LAUNCH: "Pre Launch",
} as const;

export type PropertyStatus =
  (typeof PropertyStatuses)[keyof typeof PropertyStatuses];

export const SortOptions = {
  NEWEST: "newest",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  // DISTANCE: "distance",
  // DISTANCE_ASC: "distance-asc",
  // UNITS_AVAILABLE: "units-available",
} as const;

export type SortOption = (typeof SortOptions)[keyof typeof SortOptions];
