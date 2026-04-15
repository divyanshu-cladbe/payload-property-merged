import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { FilterSheet } from "./FilterSheet";
import type { PropertyFilters } from "@/types/property";

interface FilterControlsProps {
  filters: PropertyFilters;
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeFilterCount: number;
  showMap?: boolean;
  onMapToggle?: (show: boolean) => void;
  isMobile: boolean;
  onClearAllFilters: () => void;
}

export const FilterControls = React.memo<FilterControlsProps>(
  ({
    filters,
    onFilterChange,
    isFiltersOpen,
    setIsFiltersOpen,
    activeFilterCount,
    showMap,
    onMapToggle,
    isMobile,
    onClearAllFilters,
  }) => {
    return (
      <div className="flex items-center gap-3">
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-[49px] w-[53px] gap-2 bg-[#F9F6F6] rounded-xl relative"
            >
              <Filter className="w-[19px] h-[19px]" />
              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b from-[#E91614] to-[#E05D31] text-[10px] text-white"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <FilterSheet
            filters={filters}
            onFilterChange={onFilterChange}
            isMobile={isMobile}
            clearAllFilters={onClearAllFilters}
          />
        </Sheet>

        {!isMobile && onMapToggle && (
          <div className="flex items-center gap-3 ml-2 bg-[#F9F6F6] rounded-xl h-[49px] w-full px-2">
            <span
              className={`lg:text-md sm:text-sm ${
                showMap ? "text-[#404040]" : "text-muted-foreground"
              }  whitespace-nowrap `}
            >
              Map view
            </span>
            <Switch checked={showMap} onCheckedChange={onMapToggle} />
          </div>
        )}
      </div>
    );
  }
);

FilterControls.displayName = "FilterControls";
