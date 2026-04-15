import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Property } from "@/types/property";
import {
  selectLocation,
  setUserInteracted,
} from "@/store/slices/locationSlice";

export type MapBound = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
} | null;

interface UseMapBoundsProps {
  map: google.maps.Map | null;
  properties: Property[];
  onBoundsChanged?: (bounds: MapBound) => void;
  autoFit?: boolean;
  minZoom?: number;
  maxZoom?: number;
}

export const useMapBounds = ({
  map,
  properties,
  onBoundsChanged,
  autoFit = true,
  minZoom = 10,
  maxZoom = 21,
}: UseMapBoundsProps) => {
  const dispatch = useDispatch();
  const { currentLocation, selectedCity, hasUserInteracted } =
    useSelector(selectLocation);
  //INFO: Update bounds callback with debouncing to prevent excessive updates
  const updateBounds = useCallback(() => {
    if (!map || !onBoundsChanged) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    if (ne && sw) {
      // Debounce bounds updates to prevent excessive state changes
      const newBounds = {
        ne: { lat: ne.lat(), lng: ne.lng() },
        sw: { lat: sw.lat(), lng: sw.lng() },
      };
      
      // Use a slight delay to batch rapid bounds changes
      setTimeout(() => {
        onBoundsChanged(newBounds);
      }, 100);
    }
  }, [map, onBoundsChanged]);

  //INFO: Fit bounds to city or properties
  const fitBoundsToProperties = useCallback(() => {
    if (!map) return;

    //INFO: If user hasn't interacted and we have a city location with bounds, use city bounds
    if (!hasUserInteracted && currentLocation?.bounds) {
      const cityBounds = new google.maps.LatLngBounds(
        { lat: currentLocation.bounds.south, lng: currentLocation.bounds.west },
        { lat: currentLocation.bounds.north, lng: currentLocation.bounds.east }
      );

      map.fitBounds(cityBounds);

      //INFO: Ensure appropriate zoom for city view
      const boundsListener = google.maps.event.addListenerOnce(
        map,
        "bounds_changed",
        () => {
          const currentZoom = map.getZoom();
          const cityZoom = Math.min(12, Math.max(10, currentZoom || 11)); // Good zoom for city overview
          map.setZoom(cityZoom);
        }
      );

      return () => {
        google.maps.event.removeListener(boundsListener);
      };
    }

    //INFO: Original logic for properties when user has interacted or no city bounds
    if (properties.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    let hasValidCoordinates = false;

    properties.forEach((property) => {
      if (property.location?.coordinates) {
        const { lat, lng } = property.location.coordinates;
        bounds.extend({ lat, lng });
        hasValidCoordinates = true;
      }
    });

    if (hasValidCoordinates) {
      map.fitBounds(bounds);

      //INFO: Ensure zoom level is within limits
      const boundsListener = google.maps.event.addListenerOnce(
        map,
        "bounds_changed",
        () => {
          const currentZoom = map.getZoom();
          if (currentZoom && currentZoom < minZoom) {
            map.setZoom(minZoom);
          } else if (currentZoom && currentZoom > maxZoom) {
            map.setZoom(maxZoom);
          }
        }
      );

      return () => {
        google.maps.event.removeListener(boundsListener);
      };
    }
  }, [map, properties, minZoom, maxZoom, hasUserInteracted, currentLocation]);

  //INFO: Pan to specific property
  const panToProperty = useCallback(
    (property: Property, zoom?: number) => {
      if (!map || !property.location?.coordinates) return;

      const { lat, lng } = property.location.coordinates;
      map.panTo({ lat, lng });

      if (zoom) {
        map.setZoom(zoom);
      }
    },
    [map]
  );

  //INFO: Get current map bounds
  const getCurrentBounds = useCallback((): MapBound => {
    if (!map) return null;

    const bounds = map.getBounds();
    if (!bounds) return null;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    return {
      ne: { lat: ne.lat(), lng: ne.lng() },
      sw: { lat: sw.lat(), lng: sw.lng() },
    };
  }, [map]);

  //INFO: Set up map event listeners and user interaction detection
  useEffect(() => {
    if (!map) return;

    const boundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      updateBounds
    );

    const zoomListener = google.maps.event.addListener(
      map,
      "zoom_changed",
      updateBounds
    );

    //INFO: Track user interactions
    const dragStartListener = google.maps.event.addListener(
      map,
      "dragstart",
      () => {
        if (!hasUserInteracted) {
          dispatch(setUserInteracted(true));
        }
      }
    );

    const zoomChangedListener = google.maps.event.addListener(
      map,
      "zoom_changed",
      () => {
        if (!hasUserInteracted) {
          dispatch(setUserInteracted(true));
        }
      }
    );

    //INFO: Get initial bounds
    updateBounds();

    return () => {
      google.maps.event.removeListener(boundsListener);
      google.maps.event.removeListener(zoomListener);
      google.maps.event.removeListener(dragStartListener);
      google.maps.event.removeListener(zoomChangedListener);
    };
  }, [map, updateBounds, hasUserInteracted, dispatch]);

  //INFO: Auto-fit bounds when properties change
  useEffect(() => {
    if (autoFit) {
      const cleanup = fitBoundsToProperties();
      return cleanup;
    }
  }, [autoFit, fitBoundsToProperties]);

  return {
    updateBounds,
    fitBoundsToProperties,
    panToProperty,
    getCurrentBounds,
  };
};
