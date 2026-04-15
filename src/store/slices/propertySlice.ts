import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type {
  Property,
  PropertyFilters,
  Location,
  PropertyState,
  AreaOfInterest,
} from "@/types/property";
import { LocationHelper } from "@/utils/location-helper";
import { DeviceType } from "@/utils/device-detection";

//INFO: Helper Functions
const normalizeBedrooms = (
  value: number | number[] | undefined
): number | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

//INFO: Initial State
const initialState: PropertyState = {
  properties: [],
  filteredProperties: [],
  loading: false,
  error: null,
  selectedProperty: null,
  mapView: false,
  filters: {
    searchQuery: "",
    propertyType: [],
    bedrooms: undefined,
    priceRange: undefined,
    sort: "newest",
    origin: null,
    destination: null,
    maxDistance: undefined,
    city: "",
    region: "",
    possessionStatus: undefined,
    amenities: [],
  },
  areaOfInterest: [],
  recentlyViewed: [],
  favorites: [],
  currentBounds: null,
  currentZoom: 12,
  deviceInfo: null,
  apiResponse: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    // Action to populate properties from a Server Component or API
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
      state.filteredProperties = action.payload;
    },

    updateFilters: (state, action: PayloadAction<Partial<PropertyFilters>>) => {
      const updatedFilters = {
        ...state.filters,
        ...action.payload,
      };

      if ("bedrooms" in action.payload) {
        updatedFilters.bedrooms = normalizeBedrooms(action.payload.bedrooms);
      }

      if ("city" in action.payload && action.payload.city) {
        updatedFilters.city = LocationHelper.getMainCity(action.payload.city);
      }

      state.filters = updatedFilters;
    },

    updateFiltersAndFetch: (
      state,
      action: PayloadAction<Partial<PropertyFilters>>
    ) => {
      const updatedFilters = {
        ...state.filters,
        ...action.payload,
      };

      if ("bedrooms" in action.payload) {
        updatedFilters.bedrooms = normalizeBedrooms(action.payload.bedrooms);
      }

      if ("city" in action.payload && action.payload.city) {
        updatedFilters.city = LocationHelper.getMainCity(action.payload.city);
      }

      state.filters = updatedFilters;
    },

    selectProperty: (state, action: PayloadAction<Property | null>) => {
      const property = action.payload;
      state.selectedProperty = property;

      if (property) {
        state.recentlyViewed = [
          property.id,
          ...state.recentlyViewed.filter((id) => id !== property.id),
        ].slice(0, 10);
      }
    },

    updateLocation: (
      state,
      action: PayloadAction<{
        type: "origin" | "destination";
        location: Location | null;
      }>
    ) => {
      const { type, location } = action.payload;
      if (location?.address) {
        state.filters[type] = {
          ...location,
          address: LocationHelper.getMainCity(location.address),
        };
      } else {
        state.filters[type] = location;
      }
    },

    toggleMapView: (state, action: PayloadAction<boolean>) => {
      state.mapView = action.payload;
    },

    updateMaxDistance: (state, action: PayloadAction<number>) => {
      state.filters.maxDistance = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;
      state.favorites = state.favorites.includes(propertyId)
        ? state.favorites.filter((id) => id !== propertyId)
        : [...state.favorites, propertyId];
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
    },

    clearFavorites: (state) => {
      state.favorites = [];
    },

    updateAreaOfInterest: (
      state,
      action: PayloadAction<{
        type: "add" | "remove";
        areaOfInterest?: AreaOfInterest[];
      }>
    ) => {
      if (action.payload.type === "add" && action.payload.areaOfInterest) {
        state.areaOfInterest = action.payload.areaOfInterest;
      } else if (action.payload.type === "remove") {
        state.areaOfInterest = [];
      }
    },

    addSingleAreaOfInterest: (state, action: PayloadAction<AreaOfInterest>) => {
      const newArea = action.payload;
      const existingAreas = state.areaOfInterest || [];

      const isDuplicate = existingAreas.some(
        (area) =>
          area.id === newArea.id ||
          (area.location.coordinates.lat === newArea.location.coordinates.lat &&
            area.location.coordinates.lng === newArea.location.coordinates.lng)
      );

      if (!isDuplicate) {
        state.areaOfInterest = [...existingAreas, newArea];
      }
    },

    removeSingleAreaOfInterest: (state, action: PayloadAction<string>) => {
      const areaId = action.payload;
      state.areaOfInterest = (state.areaOfInterest || []).filter(
        (area) => area.id !== areaId
      );
    },

    updateAreaOfInterestName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const { id, name } = action.payload;
      const areas = state.areaOfInterest || [];
      const areaIndex = areas.findIndex((area) => area.id === id);

      if (areaIndex !== -1 && state.areaOfInterest) {
        state.areaOfInterest[areaIndex].name = name;
      }
    },

    updateSingleAreaOfInterest: (
      state,
      action: PayloadAction<AreaOfInterest>
    ) => {
      const updatedArea = action.payload;
      const areas = state.areaOfInterest || [];
      const areaIndex = areas.findIndex((area) => area.id === updatedArea.id);

      if (areaIndex !== -1 && state.areaOfInterest) {
        state.areaOfInterest[areaIndex] = updatedArea;
      }
    },

    setAreaOfInterestFromStorage: (
      state,
      action: PayloadAction<AreaOfInterest[]>
    ) => {
      state.areaOfInterest = action.payload;
    },

    clearAreaOfInterest: (state) => {
      state.areaOfInterest = [];
    },

    updateMapBounds: (state, action: PayloadAction<string>) => {
      state.currentBounds = action.payload;
    },

    updateZoomLevel: (state, action: PayloadAction<number>) => {
      state.currentZoom = action.payload;
    },

    updateDeviceInfo: (state, action: PayloadAction<DeviceType>) => {
      state.deviceInfo = action.payload;
    },

    clearApiResponse: (state) => {
      state.apiResponse = null;
    },
  },
});

export const {
  setProperties, // New action
  updateFilters,
  updateFiltersAndFetch,
  selectProperty,
  updateLocation,
  toggleMapView,
  updateMaxDistance,
  toggleFavorite,
  resetFilters,
  clearRecentlyViewed,
  clearFavorites,
  updateAreaOfInterest,
  addSingleAreaOfInterest,
  removeSingleAreaOfInterest,
  updateAreaOfInterestName,
  updateSingleAreaOfInterest,
  setAreaOfInterestFromStorage,
  clearAreaOfInterest,
  updateMapBounds,
  updateZoomLevel,
  updateDeviceInfo,
  clearApiResponse,
} = propertySlice.actions;

export const selectAllProperties = (state: RootState) =>
  state.properties.properties;
export const selectFilteredProperties = (state: RootState) =>
  state.properties.filteredProperties;
export const selectSelectedProperty = (state: RootState) =>
  state.properties.selectedProperty;
export const selectPropertyFilters = (state: RootState) =>
  state.properties.filters;
export const selectIsLoading = (state: RootState) => state.properties.loading;
export const selectError = (state: RootState) => state.properties.error;
export const selectMapView = (state: RootState) => state.properties.mapView;

// Input selectors for memoized selectors
const selectRecentlyViewedIds = (state: RootState) =>
  state.properties.recentlyViewed;
const selectFavoriteIds = (state: RootState) =>
  state.properties.favorites;

// Memoized selectors
export const selectRecentlyViewed = createSelector(
  [selectRecentlyViewedIds, selectAllProperties],
  (recentIds, allProperties) => {
    return recentIds
      .map((id) => allProperties.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined);
  }
);

export const selectFavorites = createSelector(
  [selectFavoriteIds, selectAllProperties],
  (favoriteIds, allProperties) => {
    return favoriteIds
      .map((id) => allProperties.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined);
  }
);

export const selectPropertyById = createSelector(
  [selectAllProperties, (_state: RootState, propertyId: string) => propertyId],
  (properties, propertyId) => {
    return properties.find((p) => p.id === propertyId);
  }
);

export const selectPropertiesByIds = createSelector(
  [selectAllProperties, (_state: RootState, ids: string[]) => ids],
  (properties, ids) => {
    return ids
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined);
  }
);

export const selectAreaOfInterest = (state: RootState) =>
  state.properties.areaOfInterest || [];

export const selectCurrentBounds = (state: RootState) =>
  state.properties.currentBounds;
export const selectCurrentZoom = (state: RootState) =>
  state.properties.currentZoom;
export const selectDeviceInfo = (state: RootState) =>
  state.properties.deviceInfo;
export const selectApiResponse = (state: RootState) =>
  state.properties.apiResponse;

export default propertySlice.reducer;
