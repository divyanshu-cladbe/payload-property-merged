import { useCallback, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  updateMapBounds,
  updateZoomLevel,
  selectCurrentBounds,
  selectCurrentZoom,
  setProperties,
} from "@/store/slices/propertySlice";
import { PropertyAPI } from "@/api/property-api";
import { getPropertiesAction } from "@/actions/properties";

export const usePropertyMapBounds = () => {
  const dispatch = useAppDispatch();
  const currentBounds = useAppSelector(selectCurrentBounds);
  const currentZoom = useAppSelector(selectCurrentZoom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPropertiesForMapBounds = useCallback(
    async (
      bounds: google.maps.LatLngBounds,
      zoom: number,
      updateUrl = true
    ) => {
      const boundsString = PropertyAPI.buildBoundsFromGoogleMaps(bounds);

      dispatch(updateMapBounds(boundsString));
      dispatch(updateZoomLevel(zoom));

      if (updateUrl) {
          PropertyAPI.updateUrlParams({ bounds: boundsString, zoom });
      }

      try {
        setLoading(true);
        // FIXME: Payload bounds querying logic should be built into getPropertiesAction later
        const properties = await getPropertiesAction();
        dispatch(setProperties(properties));
        setError(null);
        return { data: properties };
      } catch (err: any) {
        console.error("❌ Error fetching properties for map bounds:", err);
        setError(err.message || "Failed to load properties for map bounds");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const fetchPropertiesForCoordinateBounds = useCallback(
    async (
      bounds: {
        minLat: number;
        minLng: number;
        maxLat: number;
        maxLng: number;
      },
      zoom: number,
      updateUrl = true
    ) => {
      const boundsString = PropertyAPI.buildBoundsString(bounds);

      dispatch(updateMapBounds(boundsString));
      dispatch(updateZoomLevel(zoom));

      if (updateUrl) {
          PropertyAPI.updateUrlParams({ bounds: boundsString, zoom });
      }

      try {
        setLoading(true);
        const properties = await getPropertiesAction();
        dispatch(setProperties(properties));
      } catch (err) {
        console.error("Error fetching properties for coordinate bounds:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const initializeFromUrl = useCallback(() => {
    const urlParams = PropertyAPI.getUrlQueryParams();

    if (urlParams.bounds && urlParams.zoom) {
      dispatch(updateMapBounds(urlParams.bounds));
      dispatch(updateZoomLevel(urlParams.zoom));

      fetchPropertiesForCoordinateBounds(
          PropertyAPI.parseBoundsString(urlParams.bounds),
          urlParams.zoom,
          false
      );

      return true;
    }

    return false; 
  }, [dispatch, fetchPropertiesForCoordinateBounds]);


  const getCurrentBoundsCoordinates = useCallback(() => {
    if (!currentBounds) return null;
    try {
      return PropertyAPI.parseBoundsString(currentBounds);
    } catch (err) {
      console.error("Error parsing bounds string:", err);
      return null;
    }
  }, [currentBounds]);

  const updateUrlOnly = useCallback(
    (params: { bounds?: string; zoom?: number; [key: string]: any }) => {
      PropertyAPI.updateUrlParams(params);
    },
    []
  );

  const hasMapBounds = useCallback(() => {
    return !!(currentBounds && currentZoom);
  }, [currentBounds, currentZoom]);

  return {
    currentBounds,
    currentZoom,
    loading,
    error,
    fetchPropertiesForMapBounds,
    fetchPropertiesForCoordinateBounds,
    initializeFromUrl,
    getCurrentBoundsCoordinates,
    updateUrlOnly,
    hasMapBounds,
    buildBoundsFromGoogleMaps: PropertyAPI.buildBoundsFromGoogleMaps,
    buildBoundsString: PropertyAPI.buildBoundsString,
    parseBoundsString: PropertyAPI.parseBoundsString,
    updateUrlParams: PropertyAPI.updateUrlParams,
    getUrlQueryParams: PropertyAPI.getUrlQueryParams,
  };
};
