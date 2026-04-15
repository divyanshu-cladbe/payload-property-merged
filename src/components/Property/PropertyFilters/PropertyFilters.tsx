import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { MainControls } from "./MainControls";
import { ActiveFilters } from "./ActiveFilter";
import { MobileMapView } from "./MobileMapView";
import { AreaOfInterest } from "@/types/property";
import { PropertyFilterProps } from "./type";

export const AppPropertyFilters: React.FC<PropertyFilterProps> = ({
  filters,
  onFilterChange,
  onAreasChange,
  showMap,
  onMapToggle,
  className,
  removeAreaOfInterest,
  areaOfInterest,
  clearAllFilters,
  isSearchExpanded,
  onSearchExpandToggle,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onUserLocationUpdate,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [areas, setAreas] = useState<AreaOfInterest[]>([]);
  const [newAreaName, setNewAreaName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = !useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();

  useEffect(() => {
    setAreas(areaOfInterest);
  }, [areaOfInterest]);

  return (
    <div className={cn("w-full border-b bg-background", className)}>
      <div className="container mx-auto">
        <div className="py-4 space-y-4">
          <MainControls
            filters={filters}
            onFilterChange={onFilterChange}
            initialAreas={areas}
            onAreasChange={onAreasChange}
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
            showMap={showMap}
            onMapToggle={onMapToggle}
            isMobile={isMobile}
            toast={toast}
            removeAreaOfInterest={removeAreaOfInterest}
            clearAllFilters={clearAllFilters}
            isSearchExpanded={isSearchExpanded}
            onSearchExpandToggle={onSearchExpandToggle}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            onSearch={onSearch}
            onUserLocationUpdate={onUserLocationUpdate}
          />
          {/* <ActiveFilters
            filters={filters}
            areas={areas}
            onFilterChange={onFilterChange}
            onAreasChange={onAreasChange}
            setAreas={setAreas}
            toast={toast}
          /> */}
          <MobileMapView isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};
