import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { MapBound } from "./useMapBounds";

interface UseMapInstanceOptions {
  onBoundsChange?: (bounds: MapBound) => void;
}

export const useMapInstance = (options: UseMapInstanceOptions = {}) => {
  const { onBoundsChange } = options;

  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const map = useMap();

  const updateBounds = () => {
    if (!mapRef.current || !onBoundsChange) return;

    const bounds = mapRef.current.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    if (ne && sw) {
      onBoundsChange({
        ne: { lat: ne.lat(), lng: ne.lng() },
        sw: { lat: sw.lat(), lng: sw.lng() },
      });
    }
  };

  // Initialize map and services
  useEffect(() => {
    if (map && !mapRef.current) {
      mapRef.current = map;
      directionsService.current = new google.maps.DirectionsService();
      updateBounds();
    }
  }, [map]);

  return {
    mapRef,
    directionsService,
    updateBounds,
  };
};
