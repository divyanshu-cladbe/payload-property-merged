import type { Property } from "./base";
import type { AreaOfInterest, PropertyFilters } from "./filter";
import type { Location } from "./common";
import type { DeviceType } from "@/utils/device-detection";
import type { PropertyApiResponse } from "@/api/property-api";

export interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  error: string | null;
  selectedProperty: Property | null;
  mapView: boolean;
  filters: PropertyFilters;
  recentlyViewed: string[];
  favorites: string[];
  comparisonList?: string[];
  lastViewedDate?: { [key: string]: string };
  areaOfInterest?: AreaOfInterest[];
  //INFO: New map and API state
  currentBounds: string | null;
  currentZoom: number;
  deviceInfo: DeviceType | null;
  apiResponse: PropertyApiResponse | null;
}

export interface LocationState {
  currentLocation: Location | null;
  isLocating: boolean;
  error: string | null;
  isLocationModalOpen: boolean;
  searchHistory: Location[];
  savedLocations: Location[];
}

export interface UIState {
  isFilterModalOpen: boolean;
  isMobileMapVisible: boolean;
  isLocationPickerOpen: boolean;
  activePropertyCard: string | null;
}

//INFO: State related type guards and utilities
export const isLoadingState = (state: PropertyState): boolean => {
  return state.loading;
};

export const hasError = (state: PropertyState): boolean => {
  return state.error !== null;
};

export const hasSelectedProperty = (state: PropertyState): boolean => {
  return state.selectedProperty !== null;
};
