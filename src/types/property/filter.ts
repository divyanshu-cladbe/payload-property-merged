import type { Location } from "./common";
import type {
  PropertyType,
  PossessionStatus,
  SortOption,
  PropertySegment,
} from "./enums";

export interface PropertyFilters {
  searchQuery?: string;
  propertyType?: PropertyType[];
  bedrooms?: number;
  priceRange?: [number, number];
  sort?: SortOption;
  origin?: Location | null;
  destination?: Location | null;
  maxDistance?: number;
  city?: string;
  region?: string;
  homeType?: string;
  possessionStatus?: PossessionStatus;
  amenities?: string[];
  segment?: PropertySegment; // Add segment to PropertyFilters
}
export interface GeocodingResult {
  coordinates: {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
  city: string;
  state: string;
}

export interface AreaOfInterest {
  id: string;
  name: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
    city?: string;
    state?: string;
  };
  type?: "work" | "home" | "other";
  radius?: number;
  duration?: {
    text: string; // "30 mins"
    value: number; // duration in seconds
  };
  distance?: {
    text: string; // "5.2 km"
    value: number; // distance in meters
  }; // in minutes
}

export interface SearchFormState {
  segment: PropertySegment;
  selectedType: PropertyType;
  selectedBHK: string[];
  selectedBudget: string;
  searchQuery: string;
}
