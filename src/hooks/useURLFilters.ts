import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyFilters } from "@/types/property";

export interface URLFilterParams {
  // Map bounds and zoom
  bounds?: string;
  zoom?: number;
  device?: string;

  // Location filters
  city?: string;
  region?: string;
  state?: string;
  search?: string;

  // Property filters
  propertyType?: string[];
  bedrooms?: number;
  bathrooms?: number;
  priceRange?: [number, number];
  areaRange?: [number, number];
  possessionStatus?: string;
  amenities?: string[];

  // Sorting
  sort?: string;
  page?: number;
  limit?: number;
}

export const useURLFilters = () => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  const getURLParams = useCallback((): URLFilterParams => {
    if (typeof window === "undefined") return {};

    const searchParams = new URLSearchParams(window.location.search);
    const params: URLFilterParams = {};

    // Map parameters
    if (searchParams.get("bounds")) params.bounds = searchParams.get("bounds")!;
    if (searchParams.get("zoom")) params.zoom = parseInt(searchParams.get("zoom")!);
    if (searchParams.get("device")) params.device = searchParams.get("device")!;

    // Location parameters
    if (searchParams.get("city")) params.city = searchParams.get("city")!;
    if (searchParams.get("region")) params.region = searchParams.get("region")!;
    if (searchParams.get("state")) params.state = searchParams.get("state")!;
    if (searchParams.get("search")) params.search = searchParams.get("search")!;

    // Property filters
    if (searchParams.get("propertyType")) {
      params.propertyType = searchParams.get("propertyType")!.split(",");
    }
    if (searchParams.get("bedrooms")) {
      params.bedrooms = parseInt(searchParams.get("bedrooms")!);
    }
    if (searchParams.get("bathrooms")) {
      params.bathrooms = parseInt(searchParams.get("bathrooms")!);
    }
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      params.priceRange = [
        parseInt(searchParams.get("minPrice") || "0"),
        parseInt(searchParams.get("maxPrice") || "999999999")
      ];
    }
    if (searchParams.get("minArea") || searchParams.get("maxArea")) {
      params.areaRange = [
        parseInt(searchParams.get("minArea") || "0"),
        parseInt(searchParams.get("maxArea") || "999999")
      ];
    }
    if (searchParams.get("status")) {
      params.possessionStatus = searchParams.get("status")!;
    }
    if (searchParams.get("amenities")) {
      params.amenities = searchParams.get("amenities")!.split(",");
    }

    // Sorting and pagination
    if (searchParams.get("sort")) params.sort = searchParams.get("sort")!;
    if (searchParams.get("page")) params.page = parseInt(searchParams.get("page")!);
    if (searchParams.get("limit")) params.limit = parseInt(searchParams.get("limit")!);

    return params;
  }, []);

  const updateURLParams = useCallback((newParams: Partial<URLFilterParams>, replace = false) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // Handle each parameter type
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        searchParams.delete(key);
        // Also handle related parameters
        if (key === "priceRange") {
          searchParams.delete("minPrice");
          searchParams.delete("maxPrice");
        }
        if (key === "areaRange") {
          searchParams.delete("minArea");
          searchParams.delete("maxArea");
        }
        return;
      }

      switch (key) {
        case "propertyType":
        case "amenities":
          if (Array.isArray(value) && value.length > 0) {
            searchParams.set(key, value.join(","));
          } else {
            searchParams.delete(key);
          }
          break;
        case "priceRange":
          if (Array.isArray(value) && value.length === 2) {
            if (Number(value[0]) > 0) searchParams.set("minPrice", value[0].toString());
            else searchParams.delete("minPrice");
            if (Number(value[1]) < 999999999) searchParams.set("maxPrice", value[1].toString());
            else searchParams.delete("maxPrice");
          } else {
            searchParams.delete("minPrice");
            searchParams.delete("maxPrice");
          }
          break;
        case "areaRange":
          if (Array.isArray(value) && value.length === 2) {
            if (Number(value[0]) > 0) searchParams.set("minArea", value[0].toString());
            else searchParams.delete("minArea");
            if (Number(value[1]) < 999999) searchParams.set("maxArea", value[1].toString());
            else searchParams.delete("maxArea");
          } else {
            searchParams.delete("minArea");
            searchParams.delete("maxArea");
          }
          break;
        case "possessionStatus":
          searchParams.set("status", value.toString());
          break;
        default:
          if (value !== "" && value !== 0) {
            searchParams.set(key, value.toString());
          } else {
            searchParams.delete(key);
          }
      }
    });

    const newURL = url.toString();
    if (newURL !== window.location.href) {
      if (replace) {
        window.history.replaceState({}, "", newURL);
      } else {
        window.history.pushState({}, "", newURL);
      }
    }
  }, []);

  const convertURLParamsToFilters = useCallback((urlParams: URLFilterParams): Partial<PropertyFilters> => {
    const filters: Partial<PropertyFilters> = {};

    if (urlParams.search) filters.searchQuery = urlParams.search;
    if (urlParams.propertyType) filters.propertyType = urlParams.propertyType as any; // PropertyType[]
    if (urlParams.bedrooms) filters.bedrooms = urlParams.bedrooms;
    if (urlParams.priceRange) filters.priceRange = urlParams.priceRange;
    if (urlParams.sort) filters.sort = urlParams.sort as PropertyFilters["sort"];
    if (urlParams.city) filters.city = urlParams.city;
    if (urlParams.region) filters.region = urlParams.region;
    if (urlParams.possessionStatus) filters.possessionStatus = urlParams.possessionStatus as any; // PossessionStatus
    if (urlParams.amenities) filters.amenities = urlParams.amenities;

    return filters;
  }, []);

  const convertFiltersToURLParams = useCallback((filters: PropertyFilters): URLFilterParams => {
    const params: URLFilterParams = {};

    // Always include searchQuery and region - let updateURLParams handle empty strings
    params.search = filters.searchQuery || '';
    params.region = filters.region || '';
    if (filters.propertyType?.length) params.propertyType = filters.propertyType;
    if (filters.bedrooms) params.bedrooms = filters.bedrooms;
    if (filters.priceRange) params.priceRange = filters.priceRange;
    if (filters.sort && filters.sort !== "newest") params.sort = filters.sort;
    if (filters.city) params.city = filters.city;
    if (filters.possessionStatus) params.possessionStatus = filters.possessionStatus;
    if (filters.amenities?.length) params.amenities = filters.amenities;

    return params;
  }, []);

  const clearAllFilters = useCallback(() => {
    if (typeof window === "undefined") return;

    // Clear all filter-related URL parameters completely
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    
    // List of all filter parameters to clear
    const filterParams = [
      'search', 'propertyType', 'bedrooms', 'bathrooms', 'status', 
      'minPrice', 'maxPrice', 'minArea', 'maxArea', 'amenities', 
      'sort', 'page', 'city', 'region', 'state', 'zipcode'
    ];
    
    // Remove all filter parameters
    filterParams.forEach(param => {
      searchParams.delete(param);
    });
    
    // Update URL without filter parameters
    const newURL = url.toString();
    if (newURL !== window.location.href) {
      window.history.replaceState({}, "", newURL);
    }
  }, []);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return {
    getURLParams,
    updateURLParams,
    convertURLParamsToFilters,
    convertFiltersToURLParams,
    clearAllFilters,
    isInitialized,
  };
};