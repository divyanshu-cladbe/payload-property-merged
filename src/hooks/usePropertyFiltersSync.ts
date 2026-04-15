import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useURLFilters } from "./useURLFilters";
import {
  updateFiltersAndFetch,
  selectPropertyFilters,
  setProperties
} from "@/store/slices/propertySlice";
import { PropertyFilters } from "@/types/property";
import { getPropertiesAction } from "@/actions/properties";

export const usePropertyFiltersSync = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectPropertyFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    getURLParams,
    updateURLParams,
    convertURLParamsToFilters,
    convertFiltersToURLParams,
    clearAllFilters: clearURLFilters,
    isInitialized,
  } = useURLFilters();

  const initialLoadRef = useRef(false);
  const isUpdatingFromURL = useRef(false);

  const fetchPropertiesFiltered = useCallback(async (currentFilters: Partial<PropertyFilters>) => {
      try {
          setLoading(true);
          const docs = await getPropertiesAction(currentFilters);
          dispatch(setProperties(docs));
          setError(null);
      } catch (err: any) {
          setError(err.message || 'Failed to fetch filtered properties');
      } finally {
          setLoading(false);
      }
  }, [dispatch]);

  // Initialize filters from URL parameters on mount
  useEffect(() => {
    if (isInitialized && !initialLoadRef.current) {
      initialLoadRef.current = true;
      const urlParams = getURLParams();
      const urlFilters = convertURLParamsToFilters(urlParams);

      if (Object.keys(urlFilters).length > 0) {
        isUpdatingFromURL.current = true;
        dispatch(updateFiltersAndFetch(urlFilters));
        fetchPropertiesFiltered(urlFilters);
        isUpdatingFromURL.current = false;
      } else {
        // Initial load without filters
        fetchPropertiesFiltered({});
      }
    }
  }, [isInitialized, dispatch, getURLParams, convertURLParamsToFilters, fetchPropertiesFiltered]);

  // Update URL when filters change
  useEffect(() => {
    if (isInitialized && initialLoadRef.current && !isUpdatingFromURL.current) {
      const urlParams = convertFiltersToURLParams(filters);
      updateURLParams(urlParams, true); // Replace to avoid history entries
    }
  }, [filters, isInitialized, convertFiltersToURLParams, updateURLParams]);

  const updateFilter = useCallback((
    newFilters: Partial<PropertyFilters>,
    shouldFetch = true
  ) => {
    dispatch(updateFiltersAndFetch(newFilters));
    if (shouldFetch) {
      const mergedFilters = { ...filters, ...newFilters };
      fetchPropertiesFiltered(mergedFilters);
    }
  }, [dispatch, filters, fetchPropertiesFiltered]);

  const clearAllFilters = useCallback(() => {
    clearURLFilters();

    const cleanFilters: Partial<PropertyFilters> = {
      searchQuery: "",
      propertyType: [],
      bedrooms: undefined,
      priceRange: undefined,
      sort: "newest",
      city: "",
      region: "",
      possessionStatus: undefined,
      amenities: [],
      origin: null,
      destination: null,
      maxDistance: undefined,
    };

    dispatch(updateFiltersAndFetch(cleanFilters));
    fetchPropertiesFiltered(cleanFilters);
  }, [dispatch, clearURLFilters, fetchPropertiesFiltered]);

  const refreshProperties = useCallback(() => {
     fetchPropertiesFiltered(filters);
  }, [filters, fetchPropertiesFiltered]);

  return {
    filters,
    loading,
    error,
    updateFilter,
    clearAllFilters,
    refreshProperties,
    isInitialized,
  };
};