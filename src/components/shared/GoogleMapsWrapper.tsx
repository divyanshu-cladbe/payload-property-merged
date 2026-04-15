"use client";

import React, { useEffect } from "react";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  RenderingType,
  useMap,
} from "@vis.gl/react-google-maps";
import { MAP_CONFIG, MapStyle } from "@/constants/map-constants";
import { MapError } from "@/components/error/MapError";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectLocation } from "@/store/slices/locationSlice";
import { selectCurrentZoom } from "@/store/slices/propertySlice";

interface GoogleMapsWrapperProps {
  apiKey?: string;
  children: React.ReactNode;
  className?: string;
  mapId?: string;
  defaultZoom?: number;
  defaultCenter?: { lat: number; lng: number };
  restriction?: {
    latLngBounds: typeof MAP_CONFIG.INDIA_BOUNDS;
    strictBounds: boolean;
  };
  onMapLoad?: (map: google.maps.Map) => void;
  gestureHandling?: "cooperative" | "greedy" | "none" | "auto";
  disableDefaultUI?: boolean;
  onMapClick?: (e: MapMouseEvent) => void;
  mapStyles?: MapStyle;
  renderingType?: RenderingType;
  mapTypeId?: google.maps.MapTypeId | string;
}

// Inner component that has access to the map instance via useMap
// const MapTypeController: React.FC<{ zoomThreshold?: number }> = ({ 
//   zoomThreshold = 16,
// }) => {
//   const map = useMap();
//   const currentZoom = useSelector(selectCurrentZoom);

//   console.log("🔍 MapTypeController - currentZoom from Redux:", currentZoom);

//   useEffect(() => {
//     if (!map) {
//       console.log("⚠️ MapTypeController - map not ready yet");
//       return;
//     }

//     const mapType = currentZoom >= zoomThreshold 
//       ? google.maps.MapTypeId.HYBRID 
//       : google.maps.MapTypeId.ROADMAP;
    
//     console.log(`🗺️ MapTypeController - Setting mapType to ${mapType} (zoom: ${currentZoom}, threshold: ${zoomThreshold})`);
//     map.setMapTypeId(mapType);
//   }, [map, currentZoom, zoomThreshold]);

//   return null;
// };

export const GoogleMapsWrapper: React.FC<GoogleMapsWrapperProps> = ({
  apiKey,
  children,
  className,
  mapId,
  defaultZoom = MAP_CONFIG.DEFAULT_ZOOM,
  defaultCenter = MAP_CONFIG.INDIA_CENTER,
  restriction = {
    latLngBounds: MAP_CONFIG.INDIA_BOUNDS,
    strictBounds: MAP_CONFIG.DEFAULT_MAP_OPTIONS.restriction.strictBounds,
  },
  gestureHandling = MAP_CONFIG.DEFAULT_MAP_OPTIONS.gestureHandling,
  disableDefaultUI = MAP_CONFIG.DEFAULT_MAP_OPTIONS.disableDefaultUI,
  onMapClick,
  renderingType = RenderingType.VECTOR,
  mapTypeId: mapTypeIdProp,
}) => {
  const { currentLocation } = useSelector(selectLocation);
  
  // ✅ Use Redux state for zoom level
  const currentZoom = useSelector(selectCurrentZoom);
  
  // ✅ Determine initial mapTypeId based on current zoom level
  const initialMapTypeId = mapTypeIdProp || (currentZoom >= 16 ? "hybrid" : "roadmap");

  const mapCenter = currentLocation
    ? { lat: currentLocation.lat, lng: currentLocation.lng }
    : defaultCenter;

  if (!apiKey) {
    return (
      <div className={cn("relative h-full w-full flex items-center justify-center bg-gray-100 rounded-lg", className)}>
        <div className="text-center text-gray-500 p-6">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="font-medium">Map unavailable</p>
          <p className="text-sm mt-1">Google Maps API key is not configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <APIProvider apiKey={apiKey} libraries={MAP_CONFIG.LIBRARIES}>
        <Map
          {...({
            mapId: mapId || process.env.NEXT_PUBLIC_GOOGLE_MAPS_VECTOR_MAP_ID,
            defaultZoom: defaultZoom,
            defaultCenter: mapCenter,
            restriction: restriction,
            disableDefaultUI: disableDefaultUI,
            gestureHandling: gestureHandling,
            style: MAP_CONFIG.CONTAINER_STYLES,
            // NOTE: styles cannot be set when mapId is present (controlled via Cloud Console)
            ...(!mapId && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_VECTOR_MAP_ID
              ? { options: { styles: MAP_CONFIG.MAP_STYLE }, mapStyles: MAP_CONFIG.MAP_STYLE }
              : {}),
            onClick: onMapClick,
            renderingType: renderingType,
            mapTypeId: "roadmap",
          } as any)}
        >
          {/* Only add MapTypeController if no explicit mapTypeId prop is provided
          {!mapTypeIdProp && <MapTypeController />} */}
          {children}
        </Map>
      </APIProvider>
    </div>
  );
};

export const ResponsiveGoogleMapsWrapper: React.FC<
  GoogleMapsWrapperProps & {
    isMobile?: boolean;
  }
> = ({ isMobile, ...props }) => {
  const mobileOptimizedProps = isMobile
    ? {
        gestureHandling: "greedy" as const,
        defaultZoom: Math.max(10, props.defaultZoom || MAP_CONFIG.DEFAULT_ZOOM),
      }
    : {};

  return <GoogleMapsWrapper {...props} {...mobileOptimizedProps} />;
};

GoogleMapsWrapper.displayName = "GoogleMapsWrapper";
ResponsiveGoogleMapsWrapper.displayName = "ResponsiveGoogleMapsWrapper";