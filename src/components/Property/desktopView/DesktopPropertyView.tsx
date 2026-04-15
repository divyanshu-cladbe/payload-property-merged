import {
  Coordinates,
  Property,
} from "@/types/property";

import PropertyListOnlyView from "../Properties/PropertyListOnlyView";
import PropertyWithMapView from "../Properties/PropertyWithMapView";
import { BoundType, PropertyMapMarkerDataRef } from "../PropertyMap/types";
import { MapBound } from "@/hooks/useMapBounds";
import { useRef, useState } from "react";
import { useResponsiveLayout } from "@/utils/layoutConfig";
import { useUserLocation } from "@/hooks/useUserLocation";
import { usePropertiesPage } from "@/contexts/PropertiesPageContext";

type DesktopViewProps = {
  apiKey?: string;
  isDesktop: boolean;
  currentBound: { INDIA_BOUNDS: BoundType; INDIA_CENTER: Coordinates };
  getResponsiveValue: (config: Record<string, string>) => string;
  setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
  filteredProperties: Property[];
};

export const DesktopPropertyView = ({
  apiKey,
  isDesktop,
  currentBound,
  getResponsiveValue,
  setMapBounds,
  filteredProperties,
}: DesktopViewProps) => {
  // Get all data from context
  const {
    showMap,
    handlePropertySelect,
    handleRemoveAreaOfInterest,
  } = usePropertiesPage();

  const removeAreaOfInterestRef = useRef<PropertyMapMarkerDataRef | null>(null);

  // Get responsive layout helpers
  const {
    getCardDimensions,
    getGridSpacing,
    getListWidth,
    getMapWidth,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop: isDesktopScreen,
  } = useResponsiveLayout();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { userLocation, calculateFromLocation, handleUserLocationUpdate } = useUserLocation();


  return (
    <>
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {showMap ? (
          <PropertyWithMapView
            mapApi={apiKey}
            currentBound={currentBound}
            properties={filteredProperties}
            removeAreaOfInterestRef={removeAreaOfInterestRef}
            getResponsiveValue={getResponsiveValue}
            setMapBounds={setMapBounds}
            isDesktop={isDesktop}
            userLocation={userLocation}
            calculateFromLocation={calculateFromLocation}
            onUserLocationUpdate={handleUserLocationUpdate}
          />
        ) : (
          <PropertyListOnlyView
            onPropertySelect={handlePropertySelect}
            getResponsiveValue={getResponsiveValue}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandToggle={setIsSearchExpanded}
          />
        )}
      </div>
    </>
  );
};
