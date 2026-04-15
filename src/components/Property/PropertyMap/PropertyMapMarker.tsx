import React, { useImperativeHandle, useEffect, MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import { useRouteCalculations } from "@/hooks/useRouteCalculation";
import { useMapInstance } from "@/hooks/useMapInstance";
// import { PropertyMarkerClusterer } from "./PropertyMarkerClusterer"; // Commented out - no longer using clustering
import { CustomCityCluster } from "./CustomCityCluster";
import { useMapBounds, MapBound } from "@/hooks/useMapBounds";
import { usePropertyMapBounds } from "@/hooks/usePropertyMapBounds";
import { useCityClusters } from "@/hooks/useCityClusters";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setLocation, selectLocation } from "@/store/slices/locationSlice";
import { updateZoomLevel } from "@/store/slices/propertySlice";
import { useSmartMapPan } from "@/hooks/useSmartMapPan";

//INFO: Re-export MapBound for backward compatibility
export type { MapBound };
import { AreaOfInterestMarker } from "./markers/AreaOfInterestMarker";
import { SelectedPropertyMarker } from "./markers/SelectedPropertyMarker";
import { PropertyMarker } from "./markers/PropertyMarker";
import { AreaOfInterest, Property } from "@/types/property";
import { PropertyMapMarkerDataRef } from "./types";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { UserLocationMarker } from "./markers/UserLocationMarker";
import { LocationTrackingButton } from "./controls/LocationTrackingButton";

// Hover Property Marker Component
const HoverPropertyMarker: React.FC<{
  property: Property;
  isSelected: boolean;
  isAnySelected?: boolean;
  areasOfInterest: AreaOfInterest[];
  onPropertyClick: ((property: Property | null) => void) | undefined;
  openBottomPropertyList?: () => void;
  variant?: "mobile" | "desktop";
  externalHoveredId?: string | null;
}> = ({
  property,
  isSelected,
  onPropertyClick,
  areasOfInterest,
  isAnySelected,
  openBottomPropertyList,
  variant,
  externalHoveredId,
}) => {
  const [internalHovered, setInternalHovered] = React.useState(false);
  const propertyImage = property.images?.[0]?.url;

  // Merge external hover (from property card) with internal hover (from marker)
  const hovered = internalHovered || externalHoveredId === property.id;

  // Disable hover on selected property
  const handleMouseEnter = () => {
    if (!isSelected) {
      setInternalHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setInternalHovered(false);
  };

  const handleMarkerClick = () => {
    // console.log("HoverPropertyMarker clicked:");

    // Always call the property click handler
    onPropertyClick?.(property);

    // For mobile, also open the bottom sheet when selecting a property
    if (variant === "mobile" && openBottomPropertyList && !isSelected) {
      // console.log("Opening bottom sheet for mobile property selection");
      openBottomPropertyList();
    }
  };

  return (
    <AdvancedMarker
      position={{
        lat: property.location!.coordinates!.lat,
        lng: property.location!.coordinates!.lng,
      }}
      onClick={handleMarkerClick}
      zIndex={isSelected ? 1000 : hovered ? 100 : 1}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-3 ease-in-out duration-300 property-marker"
      >
        {/* Single marker that transforms conditionally */}
        <PropertyMarker
          title={property.title}
          propertyType={property.tagsType || ""}
          selected={isSelected}
          hovered={hovered}
          isAnySelected={!!isAnySelected}
          imageUrl={propertyImage}
          areasOfInterest={areasOfInterest}
        />
      </div>
    </AdvancedMarker>
  );
};

//INFO: Memoized wrapper to prevent unnecessary re-renders of all markers
const MemoizedHoverPropertyMarker = React.memo(
  HoverPropertyMarker,
  (prevProps, nextProps) => {
    return (
      prevProps.property.id === nextProps.property.id &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.externalHoveredId === nextProps.externalHoveredId &&
      prevProps.isAnySelected === nextProps.isAnySelected &&
      prevProps.areasOfInterest === nextProps.areasOfInterest
    );
  }
);
MemoizedHoverPropertyMarker.displayName = "MemoizedHoverPropertyMarker";

type PropertyMapMarkerProps = {
  variant?: "mobile" | "desktop";
  properties: Property[];
  selectedProperty: Property | null;
  onPropertyClick: ((property: Property | null) => void) | undefined;
  areasOfInterest: AreaOfInterest[];
  removeAreaOfInterestRef: MutableRefObject<PropertyMapMarkerDataRef | null> | null;
  openBottomPropertyList?: () => void;
  handlePropertyDeselect: () => void;
  setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
  bottomSheetExpanded?: boolean;
  userLocation?: { lat: number; lng: number } | null;
  calculateFromLocation?: boolean;
  hoveredPropertyId?: string | null;
};

export const PropertyMapMarker = ({
  variant,
  properties,
  selectedProperty,
  onPropertyClick,
  areasOfInterest,
  removeAreaOfInterestRef,
  openBottomPropertyList,
  handlePropertyDeselect,
  setMapBounds,
  bottomSheetExpanded,
  userLocation,
  calculateFromLocation,
  hoveredPropertyId,
}: PropertyMapMarkerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  //INFO: Initialize URL parameter and bounds integration
  const { fetchPropertiesForMapBounds, initializeFromUrl } =
    usePropertyMapBounds();

  //INFO: Initialize map instance and services
  const { mapRef, directionsService } = useMapInstance({
    onBoundsChange: setMapBounds,
  });

  // Find hovered property from hoveredPropertyId
  const hoveredProperty = React.useMemo(() => {
    if (!hoveredPropertyId) return null;
    return properties.find((p) => p.id === hoveredPropertyId) || null;
  }, [hoveredPropertyId, properties]);

  useSmartMapPan({
    map: mapRef.current,
    selectedProperty,
    hoveredProperty,
    bottomSheetExpanded: bottomSheetExpanded || false,
    variant,
  });

  //INFO: Set up route calculations
  const directionsRenderers = React.useRef<google.maps.DirectionsRenderer[]>(
    [],
  );
  const { calculateAndDrawRoutes, clearRoutes, routeDurations } =
    useRouteCalculations(directionsService, directionsRenderers, mapRef);

  //INFO: Memoize selected property ID to prevent unnecessary effect triggers
  const selectedPropertyId = selectedProperty?.id;

  //INFO: Memoize areas IDs to prevent unnecessary effect triggers
  const areaIdsString = React.useMemo(
    () =>
      areasOfInterest
        .map((a) => a.id)
        .sort()
        .join(","),
    [areasOfInterest],
  );

  //INFO: Track current zoom level
  const [currentZoom, setCurrentZoom] = React.useState<number>(12);

  //INFO: State for user location distance calculation
  const [userLocationDistance, setUserLocationDistance] = React.useState<{
    distance: string;
    duration: string;
  } | null>(null);

  //INFO: Handle zoom changes to switch between city clusters and property markers
  React.useEffect(() => {
    if (!mapRef.current) return;

    const handleZoomChanged = () => {
      const zoom = mapRef.current?.getZoom() || 12;
      console.log("📍 PropertyMapMarker - Zoom changed to:", zoom);
      setCurrentZoom(zoom);
      
      // Persist zoom to Redux store
      console.log("💾 PropertyMapMarker - Dispatching updateZoomLevel:", zoom);
      dispatch(updateZoomLevel(zoom));
    };

    const zoomListener = google.maps.event.addListener(
      mapRef.current,
      "zoom_changed",
      handleZoomChanged,
    );

    // Set initial zoom
    handleZoomChanged();

    return () => {
      google.maps.event.removeListener(zoomListener);
    };
  }, [mapRef, dispatch]);

  //INFO: Enhanced drag animation for city switching
  const { currentLocation } = useAppSelector(selectLocation);
  const previousLocationRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!currentLocation || !mapRef.current) return;

    const locationKey = `${currentLocation.lat},${currentLocation.lng}`;
    if (previousLocationRef.current === locationKey) return;

    const map = mapRef.current;
    const targetPosition = {
      lat: currentLocation.lat,
      lng: currentLocation.lng,
    };

    // Enhanced smooth drag animation
    const currentZoom = map.getZoom() || 10;

    // First zoom out slightly for better transition effect
    if (currentZoom > 8) {
      map.setZoom(8);
      setTimeout(() => {
        // Then pan to new location with smooth animation
        map.panTo(targetPosition);
        setTimeout(() => {
          // Finally zoom in to show individual properties
          map.setZoom(11);
        }, 800); // Wait for pan to complete
      }, 300); // Wait for zoom out
    } else {
      // Direct smooth pan and zoom if already zoomed out
      map.panTo(targetPosition);
      setTimeout(() => {
        map.setZoom(11);
      }, 600);
    }

    previousLocationRef.current = locationKey;
  }, [currentLocation]);

  //INFO: Handle city cluster clicks - find coordinates and animate
  const { clusters } = useCityClusters();

  const handleCityClusterClick = React.useCallback(
    (city: string, state: string) => {
      const cluster = clusters.find(
        (c) => c.city.toLowerCase() === city.toLowerCase(),
      );

      if (cluster?.coordinates?.coordinates) {
        const [lng, lat] = cluster.coordinates.coordinates;

        // Update location state to trigger animation
        dispatch(
          setLocation({
            lat,
            lng,
            address: `${city}, ${state}`,
            city: city.toLowerCase(),
            boundaryRadius: 15000,
            boundaryType: "circle",
          }),
        );
      }
    },
    [dispatch, clusters],
  );

  //INFO: Set up bounds management for marker fitting (existing functionality)
  useMapBounds({
    map: mapRef.current,
    properties: properties, // Use all properties for bounds calculation
    onBoundsChanged: setMapBounds,
    autoFit: false, // Disable auto-fit to prevent conflicts
  });

  //INFO: State to track initialization and prevent duplicate fetches
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isUserInteraction, setIsUserInteraction] = React.useState(false);
  const debounceTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const previousBoundsRef = React.useRef<string | null>(null);

  //INFO: Initialize from URL parameters when component mounts
  useEffect(() => {
    if (isInitialized) return;

    const wasLoadedFromUrl = initializeFromUrl();
    if (wasLoadedFromUrl) {
      // console.log("Properties loaded from URL parameters");
      setIsInitialized(true);
    } else {
      // If no URL params, mark as initialized to allow normal map interaction
      setIsInitialized(true);
    }
  }, [initializeFromUrl, isInitialized]);

  //INFO: Track user interaction to distinguish from programmatic map changes
  useEffect(() => {
    if (!mapRef.current) return;

    const handleUserInteraction = () => {
      setIsUserInteraction(true);
    };

    const dragStartListener = google.maps.event.addListener(
      mapRef.current,
      "dragstart",
      handleUserInteraction,
    );
    const zoomStartListener = google.maps.event.addListener(
      mapRef.current,
      "zoom_changed",
      handleUserInteraction,
    );

    return () => {
      google.maps.event.removeListener(dragStartListener);
      google.maps.event.removeListener(zoomStartListener);
    };
  }, [mapRef]);

  //INFO: Optimized bounds change handler with debouncing and race condition prevention
  // 1. Move the logic into a stable function using useCallback
  const handleMapIdle = React.useCallback(() => {
    const map = mapRef.current;
    if (!map || !isInitialized) return;

    const bounds = map.getBounds();
    const zoom = map.getZoom();
    if (!bounds || !zoom) return;

    // Always update UI state
    setMapBounds({
      ne: {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng(),
      },
      sw: {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng(),
      },
    });

    // Access isUserInteraction via a Ref if you want to avoid re-binding the listener
    // Or keep it as is if you prefer the effect to re-sync
    if (isUserInteraction) {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

      debounceTimeoutRef.current = setTimeout(() => {
        const boundsKey = `${bounds.toUrlValue()},${zoom}`; // Helper method for cleaner keys

        if (boundsKey === previousBoundsRef.current) {
          setIsUserInteraction(false);
          return;
        }

        fetchPropertiesForMapBounds(bounds, zoom, true)
          .then(() => {
            previousBoundsRef.current = boundsKey;
          })
          .finally(() => setIsUserInteraction(false));
      }, 800);
    }
  }, [isInitialized, isUserInteraction, fetchPropertiesForMapBounds]);

  // 2. The Effect becomes a simple "wire-up"
  useEffect(() => {
    if (!mapRef.current) return;

    const listener = google.maps.event.addListener(
      mapRef.current,
      "idle",
      handleMapIdle,
    );

    return () => {
      google.maps.event.removeListener(listener);
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    };
  }, [handleMapIdle]); // Only re-binds when the logic actually changes

  //INFO: Navigation helper
  const redirectToPropertyPage = React.useCallback((id: string) => {
    const url = `${window.location.origin}/property/${id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  //INFO: Expose clearRoutes method to parent component
  useImperativeHandle(
    removeAreaOfInterestRef,
    () => ({
      clearRoutes: () => clearRoutes(),
    }),
    [], // clearRoutes is stable, no need to recreate the imperative handle
  );

  //INFO: Calculate routes when selection or areas change (NOT on map pan/zoom)
  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedProperty?.location?.coordinates && areasOfInterest.length > 0) {
      // console.log(`[Effect] Triggering route calculation for property: ${selectedProperty.id}`);
      calculateAndDrawRoutes(selectedProperty, areasOfInterest);
    } else if (areasOfInterest.length === 0) {
      // Only clear routes when there are no areas of interest
      // console.log("\x1b[31m [Effect]\x1b[0m Clearing routes - no areas of interest");
      clearRoutes();
    } else {
      clearRoutes();
      // console.log("\x1b[31m [Effect]\x1b[0m Clearing routes - no property selected");
    }
  }, [selectedPropertyId, areaIdsString]); // Only trigger when property ID or area IDs change

  //INFO: Calculate distance from user location to selected property
  useEffect(() => {
    if (
      !calculateFromLocation ||
      !userLocation ||
      !selectedProperty?.location?.coordinates
    ) {
      setUserLocationDistance(null);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userLocation,
        destination: selectedProperty.location.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (
          status === google.maps.DirectionsStatus.OK &&
          result?.routes[0]?.legs[0]
        ) {
          const leg = result.routes[0].legs[0];
          const totalDistanceValue = leg.distance?.value || 0;
          const totalDurationValue = leg.duration?.value || 0;

          // Format duration
          const minutes = Math.round(totalDurationValue / 60);
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;

          const formattedDuration =
            hours > 0
              ? `${hours} hr${hours > 1 ? "s" : ""}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""}`
              : `${minutes} min`;

          // Format distance in KM
          const distanceInKm = (totalDistanceValue / 1000).toFixed(0);

          setUserLocationDistance({
            duration: formattedDuration,
            distance: `${distanceInKm} KM`,
          });
        }
      },
    );
  }, [calculateFromLocation, userLocation, selectedProperty]);

  //INFO: Center map on user location when tracking button is clicked
  const handleCenterOnUserLocation = React.useCallback(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(14);
    }
  }, [userLocation]);

  //INFO: Cleanup on unmount
  useEffect(() => {
    return () => {
      clearRoutes();
      directionsRenderers.current = [];
    };
  }, []); // Only run on unmount

  return (
    <div>
      {/* Show city clusters at low zoom levels (≤ 9) */}
      {currentZoom <= 9 && (
        <CustomCityCluster
          map={mapRef.current}
          onClusterClick={handleCityClusterClick}
        />
      )}

      {/* COMMENTED OUT: Show property clusters at high zoom levels (> 9) */}
      {/* {currentZoom > 9 && mapRef.current && (
        <PropertyMarkerClusterer
          properties={properties}
          selectedPropertyId={selectedPropertyId}
          onPropertyClick={onPropertyClick}
          map={mapRef.current}
          zoom={currentZoom}
          bounds={mapRef.current.getBounds() || null}
        />
      )} */}

      {/* Show individual property markers at high zoom levels (> 9) without clustering */}
      {currentZoom > 9 &&
        properties.map((property) => {
          if (
            !property.location?.coordinates?.lat ||
            !property.location?.coordinates?.lng
          ) {
            return null;
          }

          const isSelected = selectedPropertyId === property.id;
          const isAnyPropertySelected = !!selectedPropertyId;

          return (
            <MemoizedHoverPropertyMarker
              key={`property-${property.id}`}
              property={property}
              isSelected={isSelected}
              onPropertyClick={onPropertyClick}
              isAnySelected={isAnyPropertySelected}
              areasOfInterest={areasOfInterest}
              openBottomPropertyList={openBottomPropertyList}
              variant={variant}
              externalHoveredId={hoveredPropertyId}
            />
          );
        })}

      <AreaOfInterestMarker
        areasOfInterest={areasOfInterest}
        routeDurations={routeDurations}
      />
      {/* <NearbyLocationMarkers
        nearbyLocations={selectedProperty?.nearbyLocations}
        selectedProperty={selectedProperty}
      /> */}
      {/* //FIXME: Hide property card when areas of interest are present to avoid covering route information */}

      {areasOfInterest.length === 0 && (
        <SelectedPropertyMarker
          variant={variant}
          selectedProperty={selectedProperty}
          mapRef={mapRef}
          redirectToPropertyPage={redirectToPropertyPage}
          handlePropertyDeselect={handlePropertyDeselect}
        />
      )}

      {/* User Location Marker - only show when toggle is enabled */}
      {calculateFromLocation && userLocation && (
        <UserLocationMarker
          position={userLocation}
          routeInfo={
            selectedProperty ? userLocationDistance || undefined : undefined
          }
        />
      )}

      {/* Location Tracking Button - only show when toggle is enabled */}
      {calculateFromLocation && userLocation && (
        <LocationTrackingButton
          onClick={handleCenterOnUserLocation}
          isActive={true}
        />
      )}
    </div>
  );
};
