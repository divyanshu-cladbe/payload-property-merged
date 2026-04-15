import React from "react";
import { ToastActionElement } from "@/components/ui/toast";
import { useAreaOfInterest } from "@/hooks/useAreaOfInterest";
import { AreaOfInterestInput } from "./AreaOfInterestInput";
import { SortSelector } from "./SortSelector";
import { FilterControls } from "./FilterControls";
import {
  SortOptions,
  type PropertyFilters,
  type AreaOfInterest,
  type SortOption,
} from "@/types/property";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainControlsProps {
  filters: PropertyFilters;
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  initialAreas?: AreaOfInterest[];
  onAreasChange: (areas: AreaOfInterest[]) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showMap?: boolean;
  onMapToggle?: (show: boolean) => void;
  isMobile: boolean;
  toast: (options: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | "success";
    action?: ToastActionElement;
  }) => void;
  removeAreaOfInterest: () => void;
  clearAllFilters?: () => void;
  isSearchExpanded: boolean;
  onSearchExpandToggle: (expanded: boolean) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onUserLocationUpdate?: (
    enabled: boolean,
    userLocation: { lat: number; lng: number } | null
  ) => void;
}

export const MainControls = React.memo<MainControlsProps>(
  ({
    filters,
    onFilterChange,
    initialAreas = [],
    onAreasChange,
    isFiltersOpen,
    setIsFiltersOpen,
    showMap,
    onMapToggle,
    isMobile,
    toast,
    removeAreaOfInterest,
    clearAllFilters: externalClearAllFilters,
    isSearchExpanded,
    onSearchExpandToggle,
    searchQuery,
    onSearchQueryChange,
    onSearch,
    onUserLocationUpdate,
  }) => {
    const {
      areas,
      newAreaName,
      isGeocoding,
      addArea,
      removeArea,
      clearAreas,
      updateAreaName,
      updateAreaWithGeocode,
      handleNameChange,
      handleKeyPress,
      canAddMore,
      isAtLimit,
    } = useAreaOfInterest(initialAreas, {
      maxAreas: 3,
      onAreaAdded: (area) => {
        // Redux automatically updates the areas via addSingleAreaOfInterest
        // We don't need to call onAreasChange because Redux is the source of truth
        toast({
          title: "Point added",
          variant: "success",
          description: `${area.location.city}, ${area.location.state} has been added to your Point of interest`,
        });
      },
      onAreaRemoved: (areaId) => {
        // Redux automatically updates the areas via removeSingleAreaOfInterest
        // We don't need to call onAreasChange because Redux is the source of truth
        toast({
          title: "Point removed",
          description: "Point of interest has been removed",
          variant: "destructive",
        });
      },
      onAreaUpdated: (areaId, newName) => {
        // Redux automatically updates the areas with full geocoded data via updateSingleAreaOfInterest
        // with stale data from the closure, overwriting the geocoded update
        toast({
          title: "Point updated",
          variant: "success",
          description: "Point of interest has been updated",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });

    const clearAllFilters = () => {
      //HACK: Always clear areas of interest regardless of which clear method is used
      // removeAreaOfInterest();
      // clearAreas();
      // onAreasChange([]);

      if (externalClearAllFilters) {
        // Use the external clear method that handles URL params and server-side filtering
        externalClearAllFilters();
      } else {
        // Fallback to local filter clearing
        onFilterChange({
          searchQuery: undefined,
          propertyType: [],
          bedrooms: undefined,
          priceRange: undefined,
          sort: SortOptions.NEWEST,
          origin: null,
          destination: null,
          maxDistance: undefined,
          city: undefined,
          possessionStatus: undefined,
          amenities: [],
          segment: undefined,
        });
      }
      setIsFiltersOpen(false);
    };

    const getActiveFilterCount = (): number => {
      let count = 0;
      if (filters.propertyType?.length) count += 1;
      if (filters.bedrooms) count += 1;
      if (filters.priceRange) count += 1;
      if (filters.sort && filters.sort !== SortOptions.NEWEST) count += 1;
      // if (areas.length) count += areas.length;
      if (filters.possessionStatus) count += 1;
      if (filters.amenities?.length) count += 1;
      if (filters.searchQuery) count += 1;
      if (filters.maxDistance) count += 1;
      if (filters.segment) count += 1;
      return count;
    };

    return (
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Show full search bar when expanded */}
        {isSearchExpanded ? (
          <div className="flex-1 flex items-center gap-2 w-full">
            <form onSubmit={onSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by project"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  autoFocus
                  className="w-full h-[49px] px-4 pl-12 pr-12 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#BB2828] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="h-5 w-5" />
                </button>
                {/* X Close Button */}
                <button
                  type="button"
                  onClick={() => onSearchExpandToggle(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E91614] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Normal view - Area of Interest + Search Icon + Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Area of Interest - HIDDEN when search expanded */}
              <AreaOfInterestInput
                areas={areas}
                newAreaName={newAreaName}
                isGeocoding={isGeocoding}
                canAddMore={canAddMore}
                isAtLimit={isAtLimit}
                onNameChange={handleNameChange}
                onKeyPress={handleKeyPress}
                onAddArea={(name) => addArea(name)}
                // onClearAll={clearAllFilters}
                onRemoveArea={removeArea}
                onUpdateArea={updateAreaName}
                onUpdateAreaWithGeocode={updateAreaWithGeocode}
                onUserLocationUpdate={onUserLocationUpdate}
              />

              {/* Search Icon Button */}
              <Button
                onClick={() => onSearchExpandToggle(true)}
                variant="outline"
                className="h-[49px] w-[53px] bg-[#F9F6F6] rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Search className="w-[19px] h-[19px]" />
              </Button>
            </div>

            {/* Filter Controls - HIDDEN when search expanded */}
            <FilterControls
              filters={filters}
              onFilterChange={onFilterChange}
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              activeFilterCount={getActiveFilterCount()}
              showMap={showMap}
              onMapToggle={onMapToggle}
              isMobile={isMobile}
              onClearAllFilters={clearAllFilters}
            />
          </>
        )}
      </div>
    );
  }
);

MainControls.displayName = "MainControls";
