import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
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
import Icons from "../PropertyFilters/Icons";
import { X } from "lucide-react";
import { MobileViewState } from "./MobilePropertyView";

type MobileViewFiltersProps = {
    filters: PropertyFilters;
    handleFilterChange: (newFilters: Partial<PropertyFilters>) => void;
    setCurrentOptions: React.Dispatch<React.SetStateAction<MobileViewState>>;
    clearAllFilters?: () => void;
}

const homeTypeOptions = [
  "Value for money homes",
  "Budget Homes",
  "Luxury Homes",
];

export const MobileViewFilters: React.FC<MobileViewFiltersProps> = ({
  filters,
  handleFilterChange,
  setCurrentOptions,
  clearAllFilters,
}) => {
  const handlePropertyTypeChange = useCallback(
    (type: PropertyType) => {
      const current = filters.propertyType || [];
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      handleFilterChange({ propertyType: updated });
    },
    [filters.propertyType, handleFilterChange]
  );

  const handlePriceRangeChange = useCallback(
    (value: [number, number]) => {
      const actualPrices = value.map((sliderValue) =>
        getPriceFromSliderValue(sliderValue)
      );
      handleFilterChange({ priceRange: actualPrices as [number, number] });
    },
    [handleFilterChange]
  );

  const handlePossessionStatusChange = useCallback(
    (status: PossessionStatus) => {
      const newStatus =
        filters.possessionStatus === status ? undefined : status;
      handleFilterChange({ possessionStatus: newStatus });
    },
    [filters.possessionStatus, handleFilterChange]
  );

  const handleSegmentChange = useCallback(
    (segment: PropertySegment) => {
      const newSegment = filters.segment === segment ? undefined : segment;
      handleFilterChange({ segment: newSegment, propertyType: [] });
    },
    [filters.segment, handleFilterChange]
  );

  const handleHomeTypeChange = useCallback(
    (homeType: string) => {
      const newHomeType =
        (filters as any).homeType === homeType ? undefined : homeType;
      handleFilterChange({ homeType: newHomeType });
    },
    [(filters as any).homeType, handleFilterChange]
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      handleFilterChange({ sort });
    },
    [handleFilterChange]
  );

  const formatSortLabel = useCallback((key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  }, []);

  const formatPrice = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} L`;
    } else {
      return `₹${(value / 100000).toFixed(1)} L`;
    }
  };

  const getSliderValueFromPrice = (price: number) => {
    return price / 1000000;
  };

  const getPriceFromSliderValue = (sliderValue: number) => {
    return sliderValue * 1000000;
  };

  const memoizedSliderValues = useMemo(
    () => [
      getSliderValueFromPrice(filters.priceRange?.[0] || 1000000),
      getSliderValueFromPrice(filters.priceRange?.[1] || 5000000000),
    ],
    [filters.priceRange]
  );

  const { minPriceFormatted, maxPriceFormatted } = useMemo(
    () => ({
      minPriceFormatted: formatPrice(filters.priceRange?.[0] || 1000000),
      maxPriceFormatted: formatPrice(filters.priceRange?.[1] || 5000000000),
    }),
    [filters.priceRange]
  );

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

  const closeFilterOption = () => {
    setCurrentOptions(MobileViewState.MapView);
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-white pb-safe">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
            <button
              onClick={closeFilterOption}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Property Segment */}
        <div className="mb-8">
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
        </div>

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
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    isSelected
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
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${
                    isSelected
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
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${
                    isSelected
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

        {/* Sort By Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SortOptions).map(([key, value]) => {
              const isSelected = filters.sort === value;

              return (
                <div
                  key={value}
                  className={`rounded-full px-4 py-2 text-sm border-2 cursor-pointer transition-colors ${
                    isSelected
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
        <Button
          onClick={closeFilterOption}
          className="w-full bg-gradient-to-r from-[#E91614] to-[#E05D31] hover:bg-red-600 text-white py-3 rounded-lg"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
