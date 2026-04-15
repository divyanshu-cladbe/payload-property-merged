// components/features/properties/components/PropertiesPageHeader.tsx
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { layoutConfig } from "@/utils/layoutConfig";
import type {
  PropertyFilters,
  AreaOfInterest,
  Location,
} from "@/types/property";
import { AppPropertyFilters } from "../PropertyFilters/PropertyFilters";
import { useSelector } from "react-redux";
import {
  selectFilteredProperties,
  selectAllProperties,
} from "@/store/slices/propertySlice";
import RegionFilter from "../desktopView/RegionFilter";
import { useState } from "react";
import { usePropertiesPage } from "@/contexts/PropertiesPageContext";

interface PropertiesPageHeaderProps {
  isSearchExpanded: boolean;
  onSearchExpandToggle: (expanded: boolean) => void;
  onUserLocationUpdate?: (enabled: boolean, userLocation: { lat: number; lng: number } | null) => void;
}

export default function PropertiesPageHeader({
  isSearchExpanded,
  onSearchExpandToggle,
  onUserLocationUpdate,
}: PropertiesPageHeaderProps) {
  // Get all data from context
  const {
    searchQuery,
    filters,
    showMap,
    currentLocation,
    isLoading,
    areasOfInterest,
    handleSearch,
    handleSearchQueryChange,
    handleFilterChange,
    handleAreasChange,
    handleMapToggle,
    handleRemoveAreaOfInterest,
    clearAllFilters,
  } = usePropertiesPage();

  const allProperties = useSelector(selectAllProperties);

  return (
    <div className="flex-none bg-white pb-1 px-3 pt-0">
      {isSearchExpanded ? (
        // When search is expanded, show only the search bar
        <div className="w-full">
          <AppPropertyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onAreasChange={handleAreasChange}
            showMap={showMap}
            onMapToggle={handleMapToggle}
            className="border-none p-0"
            removeAreaOfInterest={handleRemoveAreaOfInterest}
            areaOfInterest={areasOfInterest}
            clearAllFilters={clearAllFilters}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandToggle={onSearchExpandToggle}
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
            onSearch={handleSearch}
            onUserLocationUpdate={onUserLocationUpdate}
          />
        </div>
      ) : (
        // Normal view with title and filters
        <div className="flex items-center gap-3">
          {/* Title and Results Count */}
          <div className="flex-1 px-3 pt-3 pb-2">
            <h1 className="text-xl font-semibold text-gray-900">
              {currentLocation?.address && currentLocation.address.length > 0
                ? `Residential in ${currentLocation.address}`
                : "Residential in Delhi"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {isLoading
                ? "Loading properties..."
                : `Showing ${allProperties.length} Results`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-end">
            <AppPropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onAreasChange={handleAreasChange}
              showMap={showMap}
              onMapToggle={handleMapToggle}
              className="border-none p-0"
              removeAreaOfInterest={handleRemoveAreaOfInterest}
              areaOfInterest={areasOfInterest}
              clearAllFilters={clearAllFilters}
              isSearchExpanded={isSearchExpanded}
              onSearchExpandToggle={onSearchExpandToggle}
              searchQuery={searchQuery}
              onSearchQueryChange={handleSearchQueryChange}
              onSearch={handleSearch}
              onUserLocationUpdate={onUserLocationUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
