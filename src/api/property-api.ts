import { apiRequest } from "@/api/api";
import { Property } from "@/types/property";
import { deviceDetector, DeviceType } from "@/utils/device-detection";

//INFO: Property API response types
export interface PropertyApiResponse {
  status: string;
  data: Property[];
  device: {
    type: DeviceType;
    optimized: boolean;
    limits: {
      pageSize: number;
      maxPageSize: number;
      maxTotalProperties: number;
      isLimited: boolean;
    };
  };
  zoomLevel: {
    level: number;
    category: "city" | "metro" | "neighborhood" | "street";
    baseLimits: number;
    samplingStrategy: "cluster" | "sample" | "all";
    boundArea: number;
    optimized: boolean;
  };
  mapBounds: {
    minLat?: number;
    minLng?: number;
    maxLat?: number;
    maxLng?: number;
    applied: boolean;
    message?: string;
  };
  pagination: {
    total: number;
    totalAvailable: number;
    page: number;
    totalPages: number;
    limit: number;
    page_size: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    deviceLimited: boolean;
    maxProperties: number;
  };
  filters: {
    applied: number;
    mandatory: {
      device: DeviceType;
      bounds: string | null;
      zoom: number;
    };
    location: {
      city: string | null;
      state: string | null;
      region: string | null;
      pincode: string | null;
      zipcode: string | null;
      bounds: string | null;
    };
    price: {
      min: number | null;
      max: number | null;
    };
    bedrooms: number | null;
    bathrooms: number | null;
    property_type: string | null;
    area: {
      minSqft: number | null;
      maxSqft: number | null;
      minSqmt: number | null;
      maxSqmt: number | null;
    };
    search: string | null;
    possessionStatus: string | null;
    status: string | null;
    tagsType: string | null;
    sort: string | null;
  };
}

//INFO: Property API request parameters
export interface PropertyRequestParams {
  //INFO: All parameters are optional with backend defaults
  device?: DeviceType;
  bounds?: string; // "minLat,minLng,maxLat,maxLng"
  zoom?: number;

  //INFO: Optional parameters
  city?: string;
  region?: string;
  state?: string;
  zipcode?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  property_type?: string;
  status?: string;
  sort?: string;
  page?: number;
  page_size?: number;
  search?: string;
  limit?: number;
}

export const PropertyAPI = {
  async getProperties(
    params: Partial<PropertyRequestParams> = {}
  ): Promise<PropertyApiResponse> {
    //INFO: Get URL query parameters if no explicit params provided
    const urlParams = this.getUrlQueryParams();
    const mergedParams = { ...urlParams, ...params };

    //INFO: Auto-detect device if not provided
    if (!mergedParams.device) {
      mergedParams.device = deviceDetector.detectDevice();
    }

    //INFO: Build query parameters
    const searchParams = new URLSearchParams();

    //INFO: Add parameters only if provided (all are optional)
    if (mergedParams.device) searchParams.append("device", mergedParams.device);
    if (mergedParams.bounds) searchParams.append("bounds", mergedParams.bounds);
    if (mergedParams.zoom)
      searchParams.append("zoom", mergedParams.zoom.toString());
    if (mergedParams.city) searchParams.append("city", mergedParams.city);
    if (mergedParams.region) searchParams.append("region", mergedParams.region);
    if (mergedParams.state) searchParams.append("state", mergedParams.state);
    if (mergedParams.zipcode)
      searchParams.append("zipcode", mergedParams.zipcode);
    if (mergedParams.min_price)
      searchParams.append("min_price", mergedParams.min_price.toString());
    if (mergedParams.max_price)
      searchParams.append("max_price", mergedParams.max_price.toString());
    if (mergedParams.bedrooms)
      searchParams.append("bedrooms", mergedParams.bedrooms.toString());
    if (mergedParams.bathrooms)
      searchParams.append("bathrooms", mergedParams.bathrooms.toString());
    if (mergedParams.property_type)
      searchParams.append("property_type", mergedParams.property_type);
    if (mergedParams.status) searchParams.append("status", mergedParams.status);
    if (mergedParams.sort) searchParams.append("sort", mergedParams.sort);
    if (mergedParams.page)
      searchParams.append("page", mergedParams.page.toString());
    if (mergedParams.page_size)
      searchParams.append("page_size", mergedParams.page_size.toString());
    if (mergedParams.limit)
      searchParams.append("limit", mergedParams.limit.toString());
    if (mergedParams.search) searchParams.append("search", mergedParams.search);

    const queryString = searchParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ""}`;

    return apiRequest<PropertyApiResponse>(endpoint, {
      method: "GET",
      requiresAuth: false,
    });
  },

  getUrlQueryParams(): Partial<PropertyRequestParams> {
    if (typeof window === "undefined") return {};

    const urlParams = new URLSearchParams(window.location.search);
    const params: Partial<PropertyRequestParams> = {};

    //INFO: Extract relevant parameters from URL
    if (urlParams.get("bounds")) params.bounds = urlParams.get("bounds")!;
    if (urlParams.get("zoom")) params.zoom = parseInt(urlParams.get("zoom")!);
    if (urlParams.get("city")) params.city = urlParams.get("city")!;
    if (urlParams.get("region")) params.region = urlParams.get("region")!;
    if (urlParams.get("state")) params.state = urlParams.get("state")!;
    if (urlParams.get("search")) params.search = urlParams.get("search")!;
    if (urlParams.get("minPrice"))
      params.min_price = parseFloat(urlParams.get("minPrice")!);
    if (urlParams.get("maxPrice"))
      params.max_price = parseFloat(urlParams.get("maxPrice")!);
    if (urlParams.get("bedrooms"))
      params.bedrooms = parseInt(urlParams.get("bedrooms")!);
    if (urlParams.get("bathrooms"))
      params.bathrooms = parseInt(urlParams.get("bathrooms")!);
    if (urlParams.get("property_type"))
      params.property_type = urlParams.get("property_type")!;
    if (urlParams.get("status")) params.status = urlParams.get("status")!;
    if (urlParams.get("sort")) params.sort = urlParams.get("sort")!;
    if (urlParams.get("page")) params.page = parseInt(urlParams.get("page")!);
    if (urlParams.get("limit"))
      params.limit = parseInt(urlParams.get("limit")!);

    return params;
  },

  //INFO: Update URL with query parameters without page reload
  updateUrlParams(params: Partial<PropertyRequestParams>): void {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    //INFO: Clear existing params and set new ones
    Object.keys(params).forEach((key) => {
      const value = params[key as keyof PropertyRequestParams];
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    //INFO: Only update URL if it's actually different to prevent unnecessary history entries
    const newUrl = url.toString();
    if (newUrl !== window.location.href) {
      window.history.replaceState({}, "", newUrl);
      console.log("🔗 Updated URL:", newUrl);
    }
  },

  //INFO: Build bounds string from Google Maps bounds
  buildBoundsFromGoogleMaps(bounds: google.maps.LatLngBounds): string {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return `${sw.lat()},${sw.lng()},${ne.lat()},${ne.lng()}`;
  },

  //INFO: Build bounds string from coordinates
  buildBoundsString(bounds: {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  }): string {
    return `${bounds.minLat},${bounds.minLng},${bounds.maxLat},${bounds.maxLng}`;
  },

  //INFO: Parse bounds string to coordinates
  parseBoundsString(bounds: string): {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  } {
    const coords = bounds.split(",").map(parseFloat);
    if (coords.length !== 4) {
      throw new Error("Invalid bounds format");
    }
    return {
      minLat: coords[0],
      minLng: coords[1],
      maxLat: coords[2],
      maxLng: coords[3],
    };
  },

  //INFO: Get property by ID (existing functionality)
  async getPropertyById(id: string): Promise<Property> {
    return apiRequest<Property>(`/properties/${id}`, {
      method: "GET",
      requiresAuth: false,
    });
  },
};
