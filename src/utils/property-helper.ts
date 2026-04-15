// utils/property-helper.ts

import { LocationHelper } from "./location-helper";
import type {
  Property,
  PropertyFilters,
  PossessionStatus,
  PropertySegment,
  PropertyType,
  SortOption,
} from "@/types/property";
import {
  PropertySegments,
  PropertyTypes,
  PossessionStatuses,
  SortOptions,
} from "@/types/property/enums";

/**
 * Filter properties based on filter criteria
 */
export const filterProperties = (
  properties: Property[] | undefined,
  filters: PropertyFilters
): Property[] => {
  // Return empty array if properties is undefined
  if (!properties) return [];

  return properties.filter((property) => {
    // Type check
    if (!property) return false;

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        (property.address?.toLowerCase().includes(query) ?? false);
      if (!matchesSearch) return false;
    }

    // Property type filter - Based on your API response, this should match against tagsType
    if (filters.propertyType && filters.propertyType.length > 0) {
      if (
        !property.tagsType
        // !filters.propertyType.includes(property.tagsType)
      )
        return false;
    }

    // Bedrooms filter - Based on unitSpecifications
    if (typeof filters.bedrooms === "number") {
      const hasMatchingBedrooms = property.unitSpecifications?.some(
        (spec) => spec.noOfRooms === filters.bedrooms
      );
      if (!hasMatchingBedrooms) return false;
    }

    // Price range filter - Single price value from API
    if (filters.priceRange && property.price) {
      const [minFilter, maxFilter] = filters.priceRange;
      const propertyPrice = parseFloat(property.price) || 0;
      // Convert filter values (likely in crores/lakhs) to match property price format
      const minFilterInRupees = minFilter * 10000000; // Assuming filter is in crores
      const maxFilterInRupees = maxFilter * 10000000; // Assuming filter is in crores

      if (
        propertyPrice < minFilterInRupees ||
        propertyPrice > maxFilterInRupees
      ) {
        return false;
      }
    }

    // City filter
    if (filters.city && property.city) {
      const propertyCity = LocationHelper.getMainCity(property.city);
      const filterCity = LocationHelper.getMainCity(filters.city);
      if (propertyCity !== filterCity) return false;
    }

    // Possession status filter
    if (filters.possessionStatus) {
      if (property.possessionStatus !== filters.possessionStatus) return false;
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        property?.amenities?.map((a) => a.name).includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    // Distance filter (if origin location is set)
    if (
      filters.origin &&
      filters.maxDistance &&
      property.location?.coordinates
    ) {
      const distance = LocationHelper.calculateDistance(
        filters.origin,
        property.location.coordinates
      );
      if (distance > filters.maxDistance) return false;
    }

    return true;
  });
};

/**
 * Sort properties based on sort option
 */
export const sortProperties = (
  properties: Property[],
  sortBy: PropertyFilters["sort"]
): Property[] => {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case SortOptions.PRICE_ASC:
        return (
          (parseFloat(a.price || "0") || 0) - (parseFloat(b.price || "0") || 0)
        );
      case SortOptions.PRICE_DESC:
        return (
          (parseFloat(b.price || "0") || 0) - (parseFloat(a.price || "0") || 0)
        );
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });
};

/**
 * Format price in Crores or Lakhs
 */
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  if (numPrice >= 10000000) {
    return `₹${(numPrice / 10000000).toFixed(2)}Cr`;
  }
  return `₹${(numPrice / 100000).toFixed(2)}L`;
};

/**
 * Format EMI
 */
export const formatEMI = (emi: number): string => {
  return `₹${Math.round(emi).toLocaleString("en-IN")}/month`;
};

/**
 * Format property area
 */
export const formatArea = (size: number | string): string => {
  const numSize = typeof size === "string" ? parseFloat(size) : size;
  return `${numSize.toLocaleString()} sq.ft.`;
};

/**
 * Get possession status display text
 */
export const getPossessionStatusText = (status: PossessionStatus): string => {
  switch (status) {
    case PossessionStatuses.READY_TO_MOVE:
      return "Ready to Move";
    case PossessionStatuses.UNDER_CONSTRUCTION:
      return "Under Construction";
    // case PossessionStatuses.NEW_LAUNCH:
    //   return "New Launch";
    default:
      return "Unknown";
  }
};

/**
 * Get completion status text and percentage
 */
export const getCompletionStatus = (
  property: Property
): { text: string; percentage: number } => {
  const totalUnits = property.noOfUnits ?? 0;
  const soldUnits = 0; // This would need to come from your API if available

  if (totalUnits === 0) return { text: "No units available", percentage: 0 };

  const percentage = (soldUnits / totalUnits) * 100;
  let text = `${soldUnits} out of ${totalUnits} units sold`;

  if (percentage >= 90) {
    text = "Almost Sold Out";
  } else if (percentage <= 10) {
    text = "Just Launched";
  }

  return { text, percentage };
};

/**
 * Get all nearby properties within radius
 */
export const getNearbyProperties = (
  properties: Property[],
  center: { lat: number; lng: number },
  radiusKm: number
): Property[] => {
  if (!properties?.length || !center) return [];

  // Filter out properties without valid coordinates first
  const validProperties = properties.filter(
    (
      property
    ): property is Property & {
      location: { coordinates: { lat: number; lng: number } };
    } =>
      property.location?.coordinates?.lat !== undefined &&
      property.location?.coordinates?.lng !== undefined
  );

  return LocationHelper.getNearbyLocations(
    validProperties,
    center,
    radiusKm,
    (property) => property.location.coordinates
  );
};

/**
 * Group properties by segment (based on tagsType from API)
 */
export const groupBySegment = (
  properties: Property[]
): Record<string, Property[]> => {
  return properties.reduce((acc, property) => {
    const segment = property.tagsType ?? "other";
    if (!acc[segment]) {
      acc[segment] = [];
    }
    acc[segment].push(property);
    return acc;
  }, {} as Record<string, Property[]>);
};

/**
 * Group properties by type (based on tags from API)
 */
export const groupByType = (
  properties: Property[]
): Record<string, Property[]> => {
  return properties.reduce((acc, property) => {
    // Use the first tag as the type, or 'other' if no tags
    const type = property.tags?.[0] ?? "other";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(property);
    return acc;
  }, {} as Record<string, Property[]>);
};

/**
 * Calculate statistics for properties
 */
export const calculateStats = (properties: Property[]) => {
  if (!properties.length) return null;

  const prices = properties
    .filter((p) => p.price) // Filter out properties without price
    .map((p) => parseFloat(p.price!) || 0); // Use non-null assertion since we filtered

  const totalUnits = properties.reduce((sum, p) => sum + (p.noOfUnits ?? 0), 0);

  return {
    totalProperties: properties.length,
    averagePrice:
      prices.length > 0
        ? prices.reduce((sum, price) => sum + price, 0) / prices.length
        : 0,
    totalUnits,
    availableUnits: totalUnits, // Assuming all units are available if no sold data
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
  };
};

/**
 * Get amenities grouped by category
 */
export const getAmenitiesByCategory = (property: Property) => {
  if (!property.amenities?.length) {
    return {} as Record<string, typeof property.amenities>;
  }

  return property.amenities.reduce((acc, amenity) => {
    // Use a default category since your API doesn't seem to have categories
    const category = "Amenities";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(amenity);
    return acc;
  }, {} as Record<string, typeof property.amenities>);
};

// Export all functions as named exports
export const PropertyHelper = {
  filterProperties,
  sortProperties,
  formatPrice,
  formatEMI,
  formatArea,
  getPossessionStatusText,
  getCompletionStatus,
  getNearbyProperties,
  groupBySegment,
  groupByType,
  calculateStats,
  getAmenitiesByCategory,
};
