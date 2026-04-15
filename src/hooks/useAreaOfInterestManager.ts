import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import {
  addSingleAreaOfInterest,
  removeSingleAreaOfInterest,
  updateAreaOfInterestName,
  clearAreaOfInterest,
  setAreaOfInterestFromStorage,
  selectAreaOfInterest,
  updateAreaOfInterest, // Keep for backward compatibility
} from "@/store/slices/propertySlice";
import type { AreaOfInterest } from "@/types/property";

/**
 * Centralized hook for managing areas of interest across all components
 * This hook provides a consistent interface for area of interest operations
 * while maintaining compatibility with existing implementations
 */
export const useAreaOfInterestManager = () => {
  const dispatch = useAppDispatch();
  const areasOfInterest = useAppSelector(selectAreaOfInterest);

  // Add a single area of interest
  const addArea = useCallback((area: AreaOfInterest) => {
    dispatch(addSingleAreaOfInterest(area));
  }, [dispatch]);

  // Remove a single area by ID
  const removeArea = useCallback((areaId: string) => {
    dispatch(removeSingleAreaOfInterest(areaId));
  }, [dispatch]);

  // Update area name
  const updateAreaName = useCallback((id: string, name: string) => {
    dispatch(updateAreaOfInterestName({ id, name }));
  }, [dispatch]);

  // Clear all areas
  const clearAllAreas = useCallback(() => {
    dispatch(clearAreaOfInterest());
  }, [dispatch]);

  // Load areas from storage
  const loadAreasFromStorage = useCallback((areas: AreaOfInterest[]) => {
    dispatch(setAreaOfInterestFromStorage(areas));
  }, [dispatch]);

  // Legacy methods for backward compatibility
  const addMultipleAreas = useCallback((areas: AreaOfInterest[]) => {
    dispatch(updateAreaOfInterest({ type: 'add', areaOfInterest: areas }));
  }, [dispatch]);

  const removeAllAreas = useCallback(() => {
    dispatch(updateAreaOfInterest({ type: 'remove' }));
  }, [dispatch]);

  // Utility methods
  const hasAreas = (areasOfInterest?.length || 0) > 0;
  const getAreaById = useCallback((id: string) => {
    return areasOfInterest?.find(area => area.id === id) || null;
  }, [areasOfInterest]);

  const getAreasCount = areasOfInterest?.length || 0;

  // Check if area exists (by coordinates or ID)
  const areaExists = useCallback((area: AreaOfInterest) => {
    return areasOfInterest?.some(existing =>
      existing.id === area.id ||
      (existing.location.coordinates.lat === area.location.coordinates.lat &&
       existing.location.coordinates.lng === area.location.coordinates.lng)
    ) || false;
  }, [areasOfInterest]);

  return {
    // State
    areasOfInterest: areasOfInterest || [],
    hasAreas,
    areasCount: getAreasCount,

    // Core actions
    addArea,
    removeArea,
    updateAreaName,
    clearAllAreas,
    loadAreasFromStorage,

    // Legacy compatibility
    addMultipleAreas,
    removeAllAreas,

    // Utilities
    getAreaById,
    areaExists,
  };
};