import React from "react";
import {
  CityCountBadge,
  RouteInfoPanel,
  LoadingIndicator,
  AreaOfInterestMarkers,
} from "./controls";
import { RouteInfo } from "./types";
import type { AreaOfInterest, Property } from "@/types/property";

interface MapControlsProps {
  // City count badge props
  clusterCount?: number;
  markerCount?: number;
  selectedCity?: string | null;
  onViewAllCities?: () => void;
  currentZoom?: number;
  maxZoomForClusters?: number;

  // Route info panel props
  hoveredProperty?: Property | null;
  routes?: { [key: string]: RouteInfo };

  // Loading indicator props
  isCalculatingRoutes?: boolean;

  // Area markers props
  areasOfInterest: AreaOfInterest[];
  selectedProperty?: Property | null;
  directionsService?: google.maps.DirectionsService | null;

  // Control visibility
  showCityCount?: boolean;
  showRouteInfo?: boolean;
  showLoadingIndicator?: boolean;
  showAreaMarkers?: boolean;
}

export const MapControls = React.memo<MapControlsProps>(
  ({
    // City count badge
    clusterCount = 0,
    markerCount = 0,
    selectedCity = null,
    onViewAllCities,
    currentZoom = 10,
    maxZoomForClusters = 12,

    // Route info panel
    hoveredProperty = null,
    routes = {},

    // Loading indicator
    isCalculatingRoutes = false,

    // Area markers
    areasOfInterest,
    selectedProperty = null,
    directionsService = null,

    // Control visibility
    showCityCount = true,
    showRouteInfo = true,
    showLoadingIndicator = true,
    showAreaMarkers = true,
  }) => {
    return (
      <>
        {showCityCount && onViewAllCities && (
          <CityCountBadge
            clusterCount={clusterCount}
            markerCount={markerCount}
            selectedCity={selectedCity}
            onViewAllCities={onViewAllCities}
            currentZoom={currentZoom}
            maxZoomForClusters={maxZoomForClusters}
          />
        )}

        {showRouteInfo && (
          <RouteInfoPanel
            hoveredProperty={hoveredProperty}
            routes={routes}
            areasOfInterest={areasOfInterest}
          />
        )}

        {showLoadingIndicator && (
          <LoadingIndicator isCalculatingRoutes={isCalculatingRoutes} />
        )}

        {showAreaMarkers && (
          <AreaOfInterestMarkers
            areasOfInterest={areasOfInterest}
            selectedProperty={selectedProperty}
            directionsService={directionsService}
          />
        )}
      </>
    );
  }
);

MapControls.displayName = "MapControls";
