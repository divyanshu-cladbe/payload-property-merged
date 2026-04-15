import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDebounce } from "use-debounce";
import {
  selectProperty,
  updateLocation,
  updateAreaOfInterest,
  addSingleAreaOfInterest,
  removeSingleAreaOfInterest,
  clearAreaOfInterest,
  selectAreaOfInterest,
  selectAllProperties,
  selectIsLoading,
  selectError,
  selectSelectedProperty,
} from "@/store/slices/propertySlice";
import { selectLocation } from "@/store/slices/locationSlice";
import { usePropertyFiltersSync } from "@/hooks/usePropertyFiltersSync";
import type {
  Property,
  Location,
  AreaOfInterest,
  PropertyFilters,
} from "@/types/property";

export const usePropertiesPageHandlers = () => {
  // State management
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [query] = useDebounce(searchQuery, 500);

  // Redux state
  const dispatch = useAppDispatch();
  const properties = useAppSelector(selectAllProperties);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const selectedProperty = useAppSelector(selectSelectedProperty);
  const { currentLocation } = useAppSelector(selectLocation);
  const areasOfInterest = useAppSelector(selectAreaOfInterest);

  // Debug Redux state changes
  // useEffect(() => {
  //   // console.log("📊 Redux state in usePropertiesPageHandlers");
  // }, [selectedProperty, areasOfInterest, properties]);

  // URL-synchronized filtering
  const {
    filters,
    updateFilter,
    clearAllFilters,
    refreshProperties,
    isInitialized,
  } = usePropertyFiltersSync();

  // Handlers
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // console.log("Searching for:", searchQuery);
      // Add your search logic here
    },
    [searchQuery]
  );

  const handleMapToggle = useCallback((checked: boolean) => {
    setShowMap(checked);
  }, []);

  const handlePropertySelect = useCallback(
    (property: Property | null) => {
      // console.log("🎯 handlePropertySelect called");

      // If property is null, always deselect
      if (!property) {
        // console.log("🔄 Deselecting: property is null");
        dispatch(selectProperty(null));
        return;
      }

      // Check if the clicked property is already selected
      const isAlreadySelected = selectedProperty?.id === property.id;

      // console.log("🔍 Selection analysis");

      if (isAlreadySelected) {
        // Deselect the property
        // console.log("🔄 Deselecting property");
        dispatch(selectProperty(null));
      } else {
        // Select the new property
        // console.log("✅ Selecting property");
        dispatch(selectProperty(property));
      }
    },
    [dispatch, selectedProperty,]
  );

  const handlePropertyDeselect = useCallback(() => {
    // console.log("❌ handlePropertyDeselect called!");
    dispatch(selectProperty(null));
  }, [dispatch,]);

  const handleFilterChange = useCallback(
    (newFilters: Partial<PropertyFilters>) => {
      updateFilter(newFilters, true);
    },
    [updateFilter]
  );

  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Debounced search effect
  useEffect(() => {
    // Always sync the debounced query to filters, including empty strings
    const normalizedQuery = query || "";
    const normalizedFilterQuery = filters.searchQuery || "";

    if (normalizedQuery !== normalizedFilterQuery) {
      updateFilter({ searchQuery: normalizedQuery });
    }
  }, [query, filters.searchQuery, updateFilter]);

  // Legacy handlers (kept for backward compatibility)
  const handleAddAreaOfInterest = useCallback(
    (areaOfInterest: AreaOfInterest[]) => {
      dispatch(updateAreaOfInterest({ type: "add", areaOfInterest }));
    },
    [dispatch]
  );

  const handleRemoveAreaOfInterest = useCallback(() => {
    dispatch(updateAreaOfInterest({ type: "remove" }));
  }, [dispatch]);

  const handleAreasChange = useCallback(
    (areas: AreaOfInterest[]) => {
      handleAddAreaOfInterest(areas);
    },
    [handleAddAreaOfInterest]
  );

  // New enhanced handlers for better area management
  const addAreaOfInterest = useCallback(
    (area: AreaOfInterest) => {
      dispatch(addSingleAreaOfInterest(area));
    },
    [dispatch]
  );

  const removeAreaOfInterest = useCallback(
    (areaId: string) => {
      dispatch(removeSingleAreaOfInterest(areaId));
    },
    [dispatch]
  );

  const clearAllAreasOfInterest = useCallback(() => {
    dispatch(clearAreaOfInterest());
  }, [dispatch]);

  useEffect(() => {
    if (currentLocation) {
      dispatch(
        updateLocation({
          type: "origin",
          location: {
            lat: currentLocation.lat,
            lng: currentLocation.lng,
            address: currentLocation.address,
          } as Location,
        })
      );
    }
  }, [currentLocation, dispatch]);

  // Initialize search query from filters only once on mount
  useEffect(() => {
    if (isInitialized && filters.searchQuery && !searchQuery) {
      setSearchQuery(filters.searchQuery);
    }
  }, [isInitialized]); // Only run when initialized, not on every filter change

  // Enhanced clearAllFilters that also clears local search state
  const handleClearAllFilters = useCallback(() => {
    // Clear local search query state immediately
    setSearchQuery("");
    // Call the original clearAllFilters
    clearAllFilters();
  }, [clearAllFilters]);

  return {
    // State
    showMap,
    areasOfInterest,
    searchQuery,
    query,

    // Redux state
    properties,
    isLoading,
    error,
    filters,
    selectedProperty,
    currentLocation,

    // Handlers
    handleSearch,
    handleMapToggle,
    handlePropertySelect,
    handleAreasChange,
    handleFilterChange,
    handleSearchQueryChange,
    handleAddAreaOfInterest,
    handleRemoveAreaOfInterest,
    handlePropertyDeselect,

    // New enhanced area handlers
    addAreaOfInterest,
    removeAreaOfInterest,
    clearAllAreasOfInterest,

    // Enhanced clear all filters that also clears search input
    clearAllFilters: handleClearAllFilters,
    refreshProperties,
    isInitialized,
  };
};
