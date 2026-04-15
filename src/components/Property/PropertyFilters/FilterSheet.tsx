import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  PropertySegments,
  PossessionStatuses,
  SortOptions,
  type PropertyFilters,
  type PropertySegment,
  type PropertyType,
  type PossessionStatus,
  type SortOption,
} from "@/types/property";
import Icons from "./Icons";

interface FilterSheetProps {
  filters: PropertyFilters;
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  isMobile: boolean;
  clearAllFilters: () => void;
}

const bedroomOptions = [
  { value: "any", label: "Any bedrooms" },
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4", label: "4 BHK" },
  { value: "5", label: "5+ BHK" },
];

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Club House",
  "Tennis Court",
  "24x7 Security",
  "Children's Play Area",
  "Garden",
  "Power Backup",
  "Parking",
];

const homeTypeOptions = [
  "Value for money homes",
  "Budget Homes",
  "Luxury Homes",
];

export const FilterSheet: React.FC<FilterSheetProps> = ({
  filters,
  onFilterChange,
  isMobile,
  clearAllFilters,
}) => {
  const handlePropertyTypeChange = useCallback(
    (type: PropertyType) => {
      const current = filters.propertyType || [];
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      onFilterChange({ propertyType: updated });
    },
    [filters.propertyType, onFilterChange]
  );

  const handleBedroomChange = useCallback(
    (value: string) => {
      onFilterChange({
        bedrooms: value === "any" ? undefined : parseInt(value),
      });
    },
    [onFilterChange]
  );

  const handlePriceRangeChange = useCallback(
    (value: [number, number]) => {
      // Convert slider values to actual prices in rupees
      const actualPrices = value.map((sliderValue) =>
        getPriceFromSliderValue(sliderValue)
      );
      onFilterChange({ priceRange: actualPrices as [number, number] });
    },
    [onFilterChange]
  );

  const handlePossessionStatusChange = useCallback(
    (status: PossessionStatus) => {
      const newStatus =
        filters.possessionStatus === status ? undefined : status;
      onFilterChange({ possessionStatus: newStatus });
    },
    [filters.possessionStatus, onFilterChange]
  );

  const handleSegmentChange = useCallback(
    (segment: PropertySegment) => {
      const newSegment = filters.segment === segment ? undefined : segment;
      onFilterChange({ segment: newSegment, propertyType: [] });
    },
    [filters.segment, onFilterChange]
  );

  const handleHomeTypeChange = useCallback(
    (homeType: string) => {
      const newHomeType =
        (filters as any).homeType === homeType ? undefined : homeType;
      onFilterChange({ homeType: newHomeType });
    },
    [(filters as any).homeType, onFilterChange]
  );

  // NEW: Handle sort change
  const handleSortChange = useCallback(
    (sort: SortOption) => {
      onFilterChange({ sort });
    },
    [onFilterChange]
  );

  // NEW: Format sort label for display
  const formatSortLabel = useCallback((key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  }, []);

  const formatPrice = (value: number) => {
    if (value >= 10000000) {
      // 1 crore or more
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      // 1 lakh or more
      return `₹${(value / 100000).toFixed(1)} L`;
    } else {
      return `₹${(value / 100000).toFixed(1)} L`;
    }
  };

  const getSliderValueFromPrice = (price: number) => {
    return price / 1000000; // Convert rupees to lakhs for slider
  };

  const getPriceFromSliderValue = (sliderValue: number) => {
    return sliderValue * 1000000; // Convert lakhs to rupees
  };

  // Memoize slider values to prevent unnecessary recalculations
  const memoizedSliderValues = useMemo(
    () => [
      getSliderValueFromPrice(filters.priceRange?.[0] || 1000000),
      getSliderValueFromPrice(filters.priceRange?.[1] || 5000000000),
    ],
    [filters.priceRange]
  );

  // Memoize formatted prices
  const { minPriceFormatted, maxPriceFormatted } = useMemo(
    () => ({
      minPriceFormatted: formatPrice(filters.priceRange?.[0] || 1000000),
      maxPriceFormatted: formatPrice(filters.priceRange?.[1] || 5000000000),
    }),
    [filters.priceRange]
  );

  // Memoize getIconForType function
  const getIconForType = useMemo(
    () => (propertyType: PropertyType) => {
      switch (propertyType) {
        case "Apartment":
          return <Icons.apartmentIcon />;
        case "Villa":
          return <Icons.villaIcon />;
        case "Plot":
          return <Icons.plotIcon />;
        default:
          return <Icons.apartmentIcon />;
      }
    },
    []
  );

  return (
    <SheetContent
      side={isMobile ? "bottom" : "right"}
      className="w-full sm:max-w-lg overflow-y-auto pb-safe"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <SheetTitle className="text-xl font-semibold">Filters</SheetTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>

        {/* Property Segment - Residential/Commercial tabs */}
        {/* <div className="mb-8">
          <div className="flex gap-2 mb-6">
            {[PropertySegments.RESIDENTIAL, PropertySegments.COMMERCIAL].map(
              (segment) => (
                <div
                  key={segment}
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${
                    filters.segment === segment
                      ? "border-[#BB2828]"
                      : "border-[#E1E1E1] hover:border-[#BB2828]"
                  }`}
                  onClick={() => handleSegmentChange(segment)}
                >
                  {segment}
                </div>
              )
            )}
          </div>
        </div> */}

        {/* Budget Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Budget</h3>
          <div className="mb-4">
            <Slider
              value={memoizedSliderValues}
              min={1}
              max={5000}
              step={1}
              onValueChange={handlePriceRangeChange}
              className="mb-4"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Min
              <br />
              {minPriceFormatted}
            </span>
            <span>
              Max
              <br />
              {maxPriceFormatted}
            </span>
          </div>
        </div>

        {/* Type Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {(["Villa", "Apartment", "Plot"] as PropertyType[]).map((type) => {
              const isSelected = filters.propertyType?.includes(type);

              return (
                <div
                  key={type}
                  onClick={() => handlePropertyTypeChange(type)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${isSelected
                      ? "border-[#BB2828]"
                      : "border-[#E1E1E1] hover:border-[#BB2828]"
                    }`}
                >
                  <div className="w-12 h-12 mb-2 flex items-center justify-center">
                    {getIconForType(type)}
                  </div>
                  <span className="text-sm font-medium">{type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Home Type Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">By Home Type</h3>
          <div className="flex flex-wrap gap-2">
            {homeTypeOptions.map((homeType) => {
              const isSelected = (filters as any).homeType === homeType;
              return (
                <div
                  key={homeType}
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${isSelected
                      ? "border-[#BB2828]"
                      : "border-[#E1E1E1] hover:border-[#BB2828]"
                    }`}
                  onClick={() => handleHomeTypeChange(homeType)}
                >
                  {homeType}
                </div>
              );
            })}
          </div>
        </div>

        {/* By Construction Status Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">By Construction Status</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(PossessionStatuses).map((status) => {
              const displayName = status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              const isSelected = filters.possessionStatus === status;

              return (
                <div
                  key={status}
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${isSelected
                      ? "border-[#BB2828]"
                      : "border-[#E1E1E1] hover:border-[#BB2828]"
                    }`}
                  onClick={() => handlePossessionStatusChange(status)}
                >
                  {displayName}
                </div>
              );
            })}
          </div>
        </div>

        {/* NEW: Sort By Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SortOptions).map(([key, value]) => {
              const isSelected = filters.sort === value;

              return (
                <div
                  key={value}
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${isSelected
                      ? "border-[#BB2828]"
                      : "border-[#E1E1E1] hover:border-[#BB2828]"
                    }`}
                  onClick={() => handleSortChange(value as SortOption)}
                >
                  {formatSortLabel(key)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Apply Button */}
        <SheetClose asChild>
          <Button className="w-full bg-gradient-to-r from-[#E91614] to-[#E05D31] hover:bg-red-600 text-white py-3 rounded-lg">
            Apply
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  );
};
