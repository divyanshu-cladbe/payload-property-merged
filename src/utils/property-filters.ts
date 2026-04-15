import { Property } from "@/types/property";

// Types for better type safety
export interface LocationFilter {
  coordinates?: { lat: number; lng: number };
  city?: string;
  state?: string;
  radius?: number; // in kilometers
}

export interface PriceFilter {
  min?: number;
  max?: number;
  currency?: string;
}

export interface PropertyFilters {
  search?: string;
  location?: LocationFilter;
  price?: PriceFilter;
  propertyType?: string[];
  amenities?: string[];
  possessionStatus?: string[];
  builder?: string;
  area?: { min?: number; max?: number };
  isBoosted?: boolean;
}

// Search filter - matches title, description, address
export const filterBySearch = (
  properties: Property[],
  searchQuery: string
): Property[] => {
  if (!searchQuery?.trim()) return properties;

  const query = searchQuery.toLowerCase().trim();

  return properties.filter((property) => {
    const searchableFields = [
      property.title,
      property.description,
      property.address,
      property.city,
      property.state,
      property.builder?.legalName,
      property.builder?.bondName,
    ].filter(Boolean);

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(query)
    );
  });
};

// Price range filter
export const filterByPriceRange = (
  properties: Property[],
  priceFilter: PriceFilter
): Property[] => {
  if (!priceFilter.min && !priceFilter.max) return properties;

  return properties.filter((property) => {
    const price = parseFloat(property.price?.replace(/[^\d.]/g, "") || "0");

    if (priceFilter.min && price < priceFilter.min) return false;
    if (priceFilter.max && price > priceFilter.max) return false;

    return true;
  });
};

// Location/proximity filter using Haversine formula
export const filterByLocation = (
  properties: Property[],
  locationFilter: LocationFilter
): Property[] => {
  if (!locationFilter.coordinates || !locationFilter.radius) return properties;

  const { coordinates, radius } = locationFilter;

  return properties.filter((property) => {
    if (!property.location?.coordinates) return false;

    const distance = calculateDistance(
      coordinates,
      property.location.coordinates
    );

    return distance <= radius;
  });
};

// Property type filter
export const filterByPropertyType = (
  properties: Property[],
  types: string[]
): Property[] => {
  if (!types?.length) return properties;

  return properties.filter((property) => {
    const propertyType = property.tagsType;
    return types.includes(propertyType?.toLowerCase() || "");
  });
};

// Amenities filter - property must have all selected amenities
export const filterByAmenities = (
  properties: Property[],
  requiredAmenities: string[]
): Property[] => {
  if (!requiredAmenities?.length) return properties;

  return properties.filter((property) => {
    const propertyAmenities = property.amenities || [];

    return requiredAmenities.every((amenity) =>
      propertyAmenities.some((propAmenity) =>
        propAmenity.name?.toLowerCase().includes(amenity.toLowerCase())
      )
    );
  });
};

// Possession status filter
export const filterByPossessionStatus = (
  properties: Property[],
  statuses: string[]
): Property[] => {
  if (!statuses?.length) return properties;

  return properties.filter((property) => {
    const possession = property.possessionStatus?.toLowerCase();
    return statuses.some((status) =>
      possession?.includes(status.toLowerCase())
    );
  });
};

// Builder filter
export const filterByBuilder = (
  properties: Property[],
  builderName: string
): Property[] => {
  if (!builderName?.trim()) return properties;

  const builder = builderName.toLowerCase().trim();

  return properties.filter((property) => {
    return (
      property.builder?.legalName?.toLowerCase().includes(builder) ||
      property.builder?.bondName?.toLowerCase().includes(builder)
    );
  });
};

// Area/size filter
export const filterByArea = (
  properties: Property[],
  areaFilter: { min?: number; max?: number }
): Property[] => {
  if (!areaFilter.min && !areaFilter.max) return properties;

  return properties.filter((property) => {
    // Use areaInSqft or areaInSqmt from the actual Property interface
    const areaInSqft = parseFloat(
      property.areaInSqft?.replace(/[^\d.]/g, "") || "0"
    );
    const areaInSqmt = parseFloat(
      property.areaInSqmt?.replace(/[^\d.]/g, "") || "0"
    );
    const area = areaInSqft || areaInSqmt || 0;

    if (areaFilter.min && area < areaFilter.min) return false;
    if (areaFilter.max && area > areaFilter.max) return false;

    return true;
  });
};

// Boost status filter
export const filterByBoostStatus = (
  properties: Property[],
  showBoostedOnly: boolean
): Property[] => {
  if (!showBoostedOnly) return properties;

  return properties.filter((property) => property.isBoosted === true);
};

// Main composite filter function that applies all filters
export const applyPropertyFilters = (
  properties: Property[],
  filters: PropertyFilters
): Property[] => {
  let filteredProperties = [...properties];

  // Apply filters in order of performance impact (most selective first)
  if (filters.search) {
    filteredProperties = filterBySearch(filteredProperties, filters.search);
  }

  if (filters.location) {
    filteredProperties = filterByLocation(filteredProperties, filters.location);
  }

  if (filters.price) {
    filteredProperties = filterByPriceRange(filteredProperties, filters.price);
  }

  if (filters.propertyType?.length) {
    filteredProperties = filterByPropertyType(
      filteredProperties,
      filters.propertyType
    );
  }

  if (filters.builder) {
    filteredProperties = filterByBuilder(filteredProperties, filters.builder);
  }

  if (filters.area) {
    filteredProperties = filterByArea(filteredProperties, filters.area);
  }

  if (filters.amenities?.length) {
    filteredProperties = filterByAmenities(
      filteredProperties,
      filters.amenities
    );
  }

  if (filters.possessionStatus?.length) {
    filteredProperties = filterByPossessionStatus(
      filteredProperties,
      filters.possessionStatus
    );
  }

  if (filters.isBoosted) {
    filteredProperties = filterByBoostStatus(
      filteredProperties,
      filters.isBoosted
    );
  }

  return filteredProperties;
};

// Utility function to calculate distance between two coordinates
function calculateDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

// Sorting functions
export const sortProperties = {
  byPrice: (properties: Property[], ascending = true): Property[] => {
    return [...properties].sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^\d.]/g, "") || "0");
      const priceB = parseFloat(b.price?.replace(/[^\d.]/g, "") || "0");
      return ascending ? priceA - priceB : priceB - priceA;
    });
  },

  byArea: (properties: Property[], ascending = true): Property[] => {
    return [...properties].sort((a, b) => {
      const areaA = parseFloat(
        a.areaInSqft?.replace(/[^\d.]/g, "") ||
          a.areaInSqmt?.replace(/[^\d.]/g, "") ||
          "0"
      );
      const areaB = parseFloat(
        b.areaInSqft?.replace(/[^\d.]/g, "") ||
          b.areaInSqmt?.replace(/[^\d.]/g, "") ||
          "0"
      );
      return ascending ? areaA - areaB : areaB - areaA;
    });
  },

  byDate: (properties: Property[], ascending = true): Property[] => {
    return [...properties].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  },

  byRelevance: (properties: Property[], searchQuery?: string): Property[] => {
    if (!searchQuery) return properties;

    const query = searchQuery.toLowerCase();

    return [...properties].sort((a, b) => {
      // Calculate relevance score based on how many fields match
      const scoreA = calculateRelevanceScore(a, query);
      const scoreB = calculateRelevanceScore(b, query);

      return scoreB - scoreA; // Higher scores first
    });
  },
};

function calculateRelevanceScore(property: Property, query: string): number {
  let score = 0;

  // Title match has highest weight
  if (property.title?.toLowerCase().includes(query)) score += 10;

  // Address and city matches
  if (property.address?.toLowerCase().includes(query)) score += 5;
  if (property.city?.toLowerCase().includes(query)) score += 5;

  // Builder match
  if (property.builder?.legalName?.toLowerCase().includes(query)) score += 3;
  if (property.builder?.bondName?.toLowerCase().includes(query)) score += 3;

  // Description match has lower weight
  if (property.description?.toLowerCase().includes(query)) score += 1;

  return score;
}
