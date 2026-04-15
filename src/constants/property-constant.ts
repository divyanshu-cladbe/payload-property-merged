import {
  PropertySegment,
  PropertyType,
  PropertyTypes,
  PropertySegments,
  SortOption,
  SortOptions,
} from "@/types/property";

// Export sort options for UI
export const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: SortOptions.NEWEST, label: "Newest First" },
  { value: SortOptions.PRICE_ASC, label: "Price: Low to High" },
  { value: SortOptions.PRICE_DESC, label: "Price: High to Low" },
  // { value: SortOptions.DISTANCE, label: "Distance" },
  // { value: SortOptions.DISTANCE_ASC, label: "Nearest First" },
  // { value: SortOptions.UNITS_AVAILABLE, label: "Most Units Available" },
];

export const propertySegments: PropertySegment[] = [
  PropertySegments.RESIDENTIAL,
  PropertySegments.COMMERCIAL,
];

export const propertyTypes: PropertyType[] = [
  PropertyTypes.APARTMENT,
  PropertyTypes.VILLA,
  // PropertyTypes.INDEPENDENT_HOUSE,
  PropertyTypes.PLOT,
  // PropertyTypes.PENTHOUSE,
];

export const getPropertyTypesBySegment = (
  segment: PropertySegment
): PropertyType[] => {
  switch (segment) {
    case PropertySegments.RESIDENTIAL:
      return [
        PropertyTypes.APARTMENT,
        PropertyTypes.VILLA,
        // PropertyTypes.INDEPENDENT_HOUSE,
        PropertyTypes.PLOT,
        // PropertyTypes.PENTHOUSE,
      ];
    case PropertySegments.COMMERCIAL:
      return [
        PropertyTypes.APARTMENT,
        PropertyTypes.VILLA,
        PropertyTypes.PLOT,
      ];
    default:
      return [];
  }
};

export const PropertyBudgetRanges = [
  { value: "0-50", label: "Under ₹50L", range: [0, 50] as [number, number] },
  {
    value: "50-100",
    label: "₹50L - ₹1Cr",
    range: [50, 100] as [number, number],
  },
  {
    value: "100-200",
    label: "₹1Cr - ₹2Cr",
    range: [100, 200] as [number, number],
  },
  {
    value: "200-500",
    label: "₹2Cr - ₹5Cr",
    range: [200, 500] as [number, number],
  },
  {
    value: "500+",
    label: "Above ₹5Cr",
    range: [500, Infinity] as [number, number],
  },
] as const;

export const REITBudgetRanges = [
  { value: "0-10", label: "Under ₹10L", range: [0, 10] as [number, number] },
  { value: "10-25", label: "₹10L - ₹25L", range: [10, 25] as [number, number] },
  { value: "25-50", label: "₹25L - ₹50L", range: [25, 50] as [number, number] },
  {
    value: "50+",
    label: "Above ₹50L",
    range: [50, Infinity] as [number, number],
  },
] as const;

export type PropertyBudgetRange =
  (typeof PropertyBudgetRanges)[number]["value"];
export type REITBudgetRange = (typeof REITBudgetRanges)[number]["value"];
export type BudgetRange = PropertyBudgetRange | REITBudgetRange;

export interface BudgetRangeItem {
  value: string;
  label: string;
  range: [number, number];
}
