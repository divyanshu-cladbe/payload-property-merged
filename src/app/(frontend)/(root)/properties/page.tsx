"use client";
import { useMemo } from "react";
// import { usePropertyLocationFilter } from "@/hooks/usePropertyLocationFilter";
import { usePropertiesPageHandlers } from "@/hooks/usePropertiesPageHandlers";
import { useResponsiveLayout } from "@/utils/layoutConfig";
import { MAP_CONFIG } from "@/constants/map-constants";

// Import components
// import MobilePropertyView from "@/components/features/properties/components/mobile-property-sheet";
import { MobilePropertyView } from "@/components/Property/mobileView/MobilePropertyView";
import { useMapBoundFilterProperty } from "@/hooks/use-map-bound-filter-property";
import { DesktopPropertyView } from "@/components/Property/desktopView/DesktopPropertyView";
import { ErrorBadge } from "@/components/error/ErrorBadge";
import { PropertiesPageProvider } from "@/contexts/PropertiesPageContext";

export default function PropertiesPage() {

  // Custom hooks
  const {
    // State
    showMap,
    areasOfInterest,
    searchQuery,

    // Redux state
    properties,
    isLoading,
    error,
    filters,
    selectedProperty,
    currentLocation,

    // Handlers
    handleSearch,
    handleMapToggle,
    handlePropertySelect,
    handleAreasChange,
    handleFilterChange,
    handleSearchQueryChange,
    handleRemoveAreaOfInterest,
    handlePropertyDeselect,

    // New URL-synchronized methods
    clearAllFilters
  } = usePropertiesPageHandlers();

  const { isMobile, isDesktop, shouldDesktopLayout, getResponsiveValue, getMinContentWidth } = useResponsiveLayout();

  // Filter properties is now handled server-side
  // const locationFilteredProperties = usePropertyLocationFilter(
  //   properties,
  //   currentLocation,
  //   filters,
  //   areasOfInterest
  // );

  const { mapBasedFilteredProperty, setMapBounds, isFiltering } = useMapBoundFilterProperty(properties);

  const displayProperties = isFiltering ? mapBasedFilteredProperty : properties;

  // Import centralized map configuration
  const { INDIA_CENTER, INDIA_BOUNDS } = MAP_CONFIG;

  //INFO: Memoize API key to prevent unnecessary re-renders
  const apiKey = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    []
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      filters,
      searchQuery,
      selectedProperty,
      showMap,
      areasOfInterest,
      currentLocation,
      properties,
      isLoading,
      error,

      // Handlers
      handleFilterChange,
      handleSearch,
      handleSearchQueryChange,
      handlePropertySelect,
      handleMapToggle,
      handleAreasChange,
      handleRemoveAreaOfInterest,
      handlePropertyDeselect,
      clearAllFilters,
    }),
    [
      filters,
      searchQuery,
      selectedProperty,
      showMap,
      areasOfInterest,
      currentLocation,
      properties,
      isLoading,
      error,
      handleFilterChange,
      handleSearch,
      handleSearchQueryChange,
      handlePropertySelect,
      handleMapToggle,
      handleAreasChange,
      handleRemoveAreaOfInterest,
      handlePropertyDeselect,
      clearAllFilters,
    ]
  );

  // Error state
  if (error) {
    return (
      <ErrorBadge error={error} />
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <PropertiesPageProvider value={contextValue}>
        <div className="w-full h-screen">
          <MobilePropertyView
            mapApi={apiKey}
            currentBound={{ INDIA_BOUNDS, INDIA_CENTER }}
            mapBasedFilteredProperty={mapBasedFilteredProperty}
            setMapBounds={setMapBounds}
          />
        </div>
      </PropertiesPageProvider>
    );
  }

  // Desktop view
  return (
    <PropertiesPageProvider value={contextValue}>
      <div
        className={`flex flex-col h-[calc(100vh-72px)] bg-gray-50 mt-[72px] ${shouldDesktopLayout ? "tablet-horizontal-scroll" : ""
          }`}
        style={{
          minWidth: shouldDesktopLayout ? getMinContentWidth() : "auto",
        }}
      >
        <DesktopPropertyView
          apiKey={apiKey}
          isDesktop={isDesktop}
          currentBound={{ INDIA_BOUNDS, INDIA_CENTER }}
          getResponsiveValue={getResponsiveValue}
          setMapBounds={setMapBounds}
          filteredProperties={displayProperties}
        />
      </div>
    </PropertiesPageProvider>
  );
}