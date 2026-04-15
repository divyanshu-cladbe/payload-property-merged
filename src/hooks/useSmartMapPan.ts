import { useEffect, useRef, useState } from "react";
import { Property } from "@/types/property";

type UseSmartMapPanProps = {
  map: google.maps.Map | null;
  selectedProperty: Property | null;
  hoveredProperty?: Property | null;
  bottomSheetExpanded: boolean;
  variant?: "mobile" | "desktop";
};

export const useSmartMapPan = ({
  map,
  selectedProperty,
  hoveredProperty,
  bottomSheetExpanded,
  variant,
}: UseSmartMapPanProps) => {
  const [userPannedAfterSelection, setUserPannedAfterSelection] =
    useState(false);
  const originalCenterRef = useRef<google.maps.LatLng | null>(null);
  const panTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastPanTimeRef = useRef<number>(0);

  // Track user manual panning after property selection
  useEffect(() => {
    if (!map || variant !== "mobile") return;

    const dragListener = google.maps.event.addListener(map, "dragstart", () => {
      if (selectedProperty) {
        setUserPannedAfterSelection(true);
      }
    });

    return () => {
      google.maps.event.removeListener(dragListener);
    };
  }, [map, selectedProperty, variant]);

  // Reset user panning flag when property is deselected
  useEffect(() => {
    if (!selectedProperty) {
      setUserPannedAfterSelection(false);
    }
  }, [selectedProperty]);

  // Main pan logic
  useEffect(() => {
    if (!map || variant !== "mobile") return;

    // Use selected property if available, otherwise use hovered property
    const targetProperty = selectedProperty || hoveredProperty;

    if (!targetProperty) return;

    // Clear any pending pan operations
    if (panTimeoutRef.current) {
      clearTimeout(panTimeoutRef.current);
    }

    // Store original center before first pan
    if (!originalCenterRef.current) {
      originalCenterRef.current = map.getCenter() || null;
    }

    // Wait for bottom sheet animation to complete (300ms + 50ms buffer)
    panTimeoutRef.current = setTimeout(() => {
      // Skip if user manually panned after selection
      if (userPannedAfterSelection) {
        return;
      }

      // Only pan when bottom sheet is expanded (more likely to hide marker)
      if (!bottomSheetExpanded) {
        return;
      }

      panToShowMarker(targetProperty);
    }, 100);

    return () => {
      if (panTimeoutRef.current) {
        clearTimeout(panTimeoutRef.current);
      }
    };
  }, [
    map,
    selectedProperty,
    hoveredProperty,
    bottomSheetExpanded,
    userPannedAfterSelection,
    variant,
  ]);

  // Reset map position when property is deselected
  useEffect(() => {
    if (!map || variant !== "mobile") return;

    // If property is deselected and we have an original center, return to it
    if (!selectedProperty && originalCenterRef.current) {
      map.panTo(originalCenterRef.current);
      originalCenterRef.current = null; // Clear after returning
    }
  }, [map, selectedProperty, variant]);

  const panToShowMarker = (property: Property) => {
    if (!map || !property?.location?.coordinates) return;

    // Debounce panning to prevent rapid successive calls
    const now = Date.now();
    if (now - lastPanTimeRef.current < 500) {
      return;
    }
    lastPanTimeRef.current = now;

    const markerLatLng = new google.maps.LatLng(
      property.location.coordinates.lat,
      property.location.coordinates.lng
    );

    // Get map container dimensions
    const mapDiv = map.getDiv();
    const mapHeight = mapDiv.offsetHeight;
    const mapWidth = mapDiv.offsetWidth;

    // Calculate bottom sheet height (60vh when expanded)
    const bottomSheetHeight = window.innerHeight * 0.6;

    // Add safety padding (50px for better spacing)
    const safetyPadding = 10;
    const totalHiddenHeight = bottomSheetHeight + safetyPadding;

    // Calculate visible area height
    const visibleAreaHeight = mapHeight - totalHiddenHeight;

    // Get current map bounds and projection
    const bounds = map.getBounds();
    const projection = map.getProjection();

    if (!bounds || !projection) return;

    // Convert marker lat/lng to container pixel coordinates
    const scale = Math.pow(2, map.getZoom() || 12);
    const worldCoordinate = projection.fromLatLngToPoint(markerLatLng);

    if (!worldCoordinate) return;

    const markerPixelX = worldCoordinate.x * scale;
    const markerPixelY = worldCoordinate.y * scale;

    // Get map center in world coordinates
    const currentCenter = map.getCenter();
    if (!currentCenter) return;

    const centerWorldCoordinate = projection.fromLatLngToPoint(currentCenter);
    if (!centerWorldCoordinate) return;

    const centerPixelX = centerWorldCoordinate.x * scale;
    const centerPixelY = centerWorldCoordinate.y * scale;

    // Calculate marker position relative to map center
    const markerOffsetY = markerPixelY - centerPixelY;

    // Calculate where marker currently appears on screen (from top)
    const markerScreenY = mapHeight / 2 + markerOffsetY;

    // Check if marker is in the hidden zone
    const hiddenZoneTop = mapHeight - totalHiddenHeight;

    // Add some tolerance to prevent unnecessary micro-adjustments
    const tolerance = 10;

    if (markerScreenY > hiddenZoneTop - tolerance) {
      // Marker is hidden or too close to hidden zone, need to pan up
      // Target position: 1/3 from top of visible area for optimal visual balance
      const targetScreenY = visibleAreaHeight / 1.5;

      // Calculate how much to pan (in pixels)
      const panPixels = markerScreenY - targetScreenY;

      // Convert pixel offset to lat/lng offset
      const newCenterPixelY = centerPixelY + panPixels;
      const newCenterWorldY = newCenterPixelY / scale;

      // Create new center point
      const newCenter = projection.fromPointToLatLng(
        new google.maps.Point(centerWorldCoordinate.x, newCenterWorldY)
      );

      if (newCenter) {
        // console.log(`📱 Smart Map Pan: Moving marker from y=${Math.round(markerScreenY)} to y=${Math.round(targetScreenY)}`);
        // Smooth pan to new center with easing
        map.panTo(newCenter);
      }
    }
    // If marker is already visible, do nothing
  };

  const resetMapPosition = () => {
    if (map && originalCenterRef.current) {
      map.panTo(originalCenterRef.current);
      originalCenterRef.current = null;
    }
  };

  return {
    panToShowMarker,
    resetMapPosition,
  };
};
