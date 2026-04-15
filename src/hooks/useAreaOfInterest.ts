import { useState, useCallback, useEffect } from "react";
import { AreaOfInterest } from "@/types/property";
import { useAsyncState } from "./useAsyncState";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import {
  addSingleAreaOfInterest,
  removeSingleAreaOfInterest,
  updateAreaOfInterestName,
  updateSingleAreaOfInterest,
  clearAreaOfInterest,
  setAreaOfInterestFromStorage,
  selectAreaOfInterest,
} from "@/store/slices/propertySlice";

export interface GeocodingResult {
  coordinates: { lat: number; lng: number };
  formattedAddress: string;
  city: string;
  state: string;
}

export interface UseAreaOfInterestOptions {
  maxAreas?: number;
  onAreaAdded?: (area: AreaOfInterest) => void;
  onAreaRemoved?: (areaId: string) => void;
  onAreaUpdated?: (areaId: string, newName: string) => void;
  onError?: (error: Error) => void;
  useReduxState?: boolean; // Option to use Redux state or local state
  persistToStorage?: boolean; // Option to persist to localStorage
}

export const useAreaOfInterest = (
  initialAreas: AreaOfInterest[] = [],
  options: UseAreaOfInterestOptions = {}
) => {
  const {
    maxAreas = 3,
    onAreaAdded,
    onAreaRemoved,
    onAreaUpdated,
    onError,
    useReduxState = true, // Default to using Redux state for centralized management
    persistToStorage = true
  } = options;

  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const reduxAreas = useAppSelector(selectAreaOfInterest);

  // Local state (fallback or when useReduxState is false)
  const [localAreas, setLocalAreas] = useState<AreaOfInterest[]>(initialAreas);
  const [newAreaName, setNewAreaName] = useState("");

  // Use Redux state by default, fallback to local state
  const areas = useReduxState ? reduxAreas : localAreas;

  const { execute: executeGeocode, loading: isGeocoding } =
    useAsyncState<GeocodingResult>();

  // Storage key for persistence
  const STORAGE_KEY = "property-areas-of-interest";

  // Load from storage on mount
  useEffect(() => {
    if (persistToStorage && useReduxState) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const storedAreas: AreaOfInterest[] = JSON.parse(stored);
          dispatch(setAreaOfInterestFromStorage(storedAreas));
        }
      } catch (error) {
        console.warn("Failed to load areas of interest from storage:", error);
      }
    }
  }, [dispatch, persistToStorage, useReduxState]);

  // Persist to storage when areas change
  useEffect(() => {
    if (persistToStorage && useReduxState && areas?.length !== undefined) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
      } catch (error) {
        console.warn("Failed to save areas of interest to storage:", error);
      }
    }
  }, [areas, persistToStorage, useReduxState]);

  // Geocode address using Google Maps API
  const geocodeAddress = useCallback(
    async (address: string): Promise<GeocodingResult> => {
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            address,
            region: "IN",
            componentRestrictions: { country: "IN" },
          },
          (results, status) => {
            if (status === "OK" && results?.[0]) {
              const location = results[0].geometry.location;
              let city = "";
              let state = "";

              results[0].address_components.forEach((component) => {
                if (
                  component.types.includes("locality") ||
                  component.types.includes("administrative_area_level_2")
                ) {
                  city = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  state = component.long_name;
                }
              });

              resolve({
                coordinates: { lat: location.lat(), lng: location.lng() },
                formattedAddress: results[0].formatted_address,
                city: city || "Unknown City",
                state: state || "Unknown State",
              });
            } else {
              reject(new Error("Could not find the specified location"));
            }
          }
        );
      });
    },
    []
  );

  // Add new area of interest
  const addArea = useCallback(
    async (areaName?: string) => {
      const nameToAdd = areaName || newAreaName.trim();

      if (!nameToAdd || areas.length >= maxAreas || isGeocoding) {
        return null;
      }

      try {
        const locationData = await executeGeocode(() =>
          geocodeAddress(nameToAdd)
        );

        if (!locationData) {
          return null;
        }

        const newArea: AreaOfInterest = {
          id: Date.now().toString(),
          name: nameToAdd,
          location: {
            coordinates: locationData.coordinates,
            address: locationData.formattedAddress,
            city: locationData.city,
            state: locationData.state,
          },
          type: "other",
        };

        // Update state based on useReduxState option
        if (useReduxState) {
          dispatch(addSingleAreaOfInterest(newArea));
        } else {
          const updatedAreas = [...areas, newArea];
          setLocalAreas(updatedAreas);
        }

        setNewAreaName("");
        onAreaAdded?.(newArea);

        return newArea;
      } catch (error) {
        const errorObj =
          error instanceof Error ? error : new Error("Geocoding failed");
        onError?.(errorObj);
        return null;
      }
    },
    [
      newAreaName,
      areas,
      maxAreas,
      isGeocoding,
      executeGeocode,
      geocodeAddress,
      onAreaAdded,
      onError,
    ]
  );

  // Remove area of interest
  const removeArea = useCallback(
    (areaId: string) => {
      if (useReduxState) {
        dispatch(removeSingleAreaOfInterest(areaId));
      } else {
        const updatedAreas = areas.filter((area) => area.id !== areaId);
        setLocalAreas(updatedAreas);
      }

      onAreaRemoved?.(areaId);
      return useReduxState ? reduxAreas.filter(area => area.id !== areaId) : areas.filter(area => area.id !== areaId);
    },
    [areas, onAreaRemoved, useReduxState, dispatch, reduxAreas]
  );

  // Remove all areas
  const clearAreas = useCallback(() => {
    if (useReduxState) {
      dispatch(clearAreaOfInterest());
    } else {
      setLocalAreas([]);
    }
    setNewAreaName("");
  }, [useReduxState, dispatch]);

  // Update areas externally
  const updateAreas = useCallback((newAreas: AreaOfInterest[]) => {
    if (useReduxState) {
      // Clear existing and set new areas
      dispatch(clearAreaOfInterest());
      newAreas.forEach(area => dispatch(addSingleAreaOfInterest(area)));
    } else {
      setLocalAreas(newAreas);
    }
  }, [useReduxState, dispatch]);

  // Update area name
  const updateAreaName = useCallback((id: string, name: string) => {
    if (useReduxState) {
      dispatch(updateAreaOfInterestName({ id, name }));
    } else {
      setLocalAreas(prevAreas =>
        prevAreas.map(area =>
          area.id === id ? { ...area, name } : area
        )
      );
    }
    onAreaUpdated?.(id, name);
  }, [useReduxState, dispatch, onAreaUpdated]);

  // Update area with geocoding (when location changes)
  const updateAreaWithGeocode = useCallback(async (id: string, newName: string) => {
    try {
      // Geocode the new location
      const locationData = await executeGeocode(() => geocodeAddress(newName));

      if (!locationData) {
        onError?.(new Error("Could not geocode the new location"));
        return;
      }

      // Find the area and update it
      const areaToUpdate = areas.find(area => area.id === id);
      if (!areaToUpdate) {
        onError?.(new Error("Area not found"));
        return;
      }

      const updatedArea: AreaOfInterest = {
        ...areaToUpdate,
        name: newName,
        location: {
          coordinates: locationData.coordinates,
          address: locationData.formattedAddress,
          city: locationData.city,
          state: locationData.state,
        },
      };

      // Update based on state management approach
      if (useReduxState) {
        // Use the new updateSingleAreaOfInterest action to update in place
        dispatch(updateSingleAreaOfInterest(updatedArea));
      } else {
        setLocalAreas(prevAreas =>
          prevAreas.map(area =>
            area.id === id ? updatedArea : area
          )
        );
      }

      onAreaUpdated?.(id, newName);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error("Geocoding failed");
      onError?.(errorObj);
    }
  }, [areas, executeGeocode, geocodeAddress, onError, onAreaUpdated, useReduxState, dispatch]);

  // Handle input change
  const handleNameChange = useCallback((name: string) => {
    setNewAreaName(name);
  }, []);

  // Handle enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isGeocoding) {
        addArea();
      }
    },
    [addArea, isGeocoding]
  );

  // Check if can add more areas
  const canAddMore = (areas?.length || 0) < maxAreas && !isGeocoding;

  return {
    // State
    areas,
    newAreaName,
    isGeocoding,
    canAddMore,
    remainingSlots: maxAreas - (areas?.length || 0),

    // Actions
    addArea,
    removeArea,
    clearAreas,
    updateAreas,
    updateAreaName, // Update just the name
    updateAreaWithGeocode, // Update with geocoding the new location
    handleNameChange,
    handleKeyPress,

    // Utilities
    geocodeAddress,
    hasAreas: (areas?.length || 0) > 0,
    isAtLimit: (areas?.length || 0) >= maxAreas,

    // Configuration
    isUsingReduxState: useReduxState,
    persistenceEnabled: persistToStorage,
  };
};
