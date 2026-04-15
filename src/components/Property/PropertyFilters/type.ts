import { AreaOfInterest, PropertyFilters, SortOption } from "@/types/property";

export interface GeocodingResult {
  coordinates: {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
  city: string;
  state: string;
}
export interface SortOptions {
  NEWEST: "newest";
  PRICE_ASEC: "price_asec";
  PRICE_DESC: "price_desc";
}

export interface PropertyFilterProps {
  filters: PropertyFilters;
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  onAreasChange: (areas: AreaOfInterest[]) => void;
  showMap?: boolean;
  onMapToggle?: (show: boolean) => void;
  className?: string;
  removeAreaOfInterest: () => void;
  areaOfInterest: AreaOfInterest[];
  clearAllFilters?: () => void;
  sort?: SortOption;
  isSearchExpanded: boolean;
  onSearchExpandToggle: (expanded: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onUserLocationUpdate?: (enabled: boolean, userLocation: { lat: number; lng: number } | null) => void;
}
