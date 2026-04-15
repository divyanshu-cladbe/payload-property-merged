import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  Building,
  Home,
  Bed,
  IndianRupee,
  Calendar,
  LayoutGrid,
  X,
} from "lucide-react";
import {
  SortOptions,
  type PropertyFilters,
  type AreaOfInterest,
} from "@/types/property";
import { ToastActionElement } from "@/components/ui/toast";

interface ActiveFiltersProps {
  filters: PropertyFilters;
  areas: AreaOfInterest[];
  onFilterChange: (filters: Partial<PropertyFilters>) => void;
  onAreasChange: (areas: AreaOfInterest[]) => void;
  setAreas: React.Dispatch<React.SetStateAction<AreaOfInterest[]>>;
  toast: (options: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
    action?: ToastActionElement;
  }) => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  areas,
  onFilterChange,
  onAreasChange,
  setAreas,
  toast,
}) => {
  const handleRemoveArea = (id: string, name: string) => {
    const updatedAreas = areas.filter((area) => area.id !== id);
    setAreas(updatedAreas);
    onAreasChange(updatedAreas);
    toast({
      title: "Area removed",
      description: `${name} has been removed from your areas of interest`,
    });
  };

  return getActiveFilterCount(filters, areas) > 0 ? (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {areas.map((area, index) => (
        <Badge
          key={area.id}
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <span className="font-medium text-primary">
            {String.fromCharCode(65 + index)}
          </span>
          {area.name}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => handleRemoveArea(area.id, area.name)}
          />
        </Badge>
      ))}
      {filters.segment && (
        <Badge
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <Building className="w-3 h-3" />
          {filters.segment}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => onFilterChange({ segment: undefined })}
          />
        </Badge>
      )}
      {filters.propertyType?.map((type) => (
        <Badge
          key={type}
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <Home className="w-3 h-3" />
          {type}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => {
              const newTypes =
                filters.propertyType?.filter((t) => t !== type) || [];
              onFilterChange({ propertyType: newTypes });
            }}
          />
        </Badge>
      ))}
      {filters.bedrooms && (
        <Badge
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <Bed className="w-3 h-3" />
          {filters.bedrooms} BHK
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => onFilterChange({ bedrooms: undefined })}
          />
        </Badge>
      )}
      {filters.priceRange && (
        <Badge
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <IndianRupee className="w-3 h-3" />₹{filters.priceRange[0]}Cr - ₹
          {filters.priceRange[1]}Cr
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => onFilterChange({ priceRange: undefined })}
          />
        </Badge>
      )}
      {filters.possessionStatus && (
        <Badge
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <Calendar className="w-3 h-3" />
          {filters.possessionStatus
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => onFilterChange({ possessionStatus: undefined })}
          />
        </Badge>
      )}
      {filters.amenities?.map((amenity) => (
        <Badge
          key={amenity}
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <LayoutGrid className="w-3 h-3" />
          {amenity}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => {
              const newAmenities =
                filters.amenities?.filter((a) => a !== amenity) || [];
              onFilterChange({ amenities: newAmenities });
            }}
          />
        </Badge>
      ))}
      {filters.sort && filters.sort !== SortOptions.NEWEST && (
        <Badge
          variant="secondary"
          className="h-7 gap-2 px-2 hover:bg-secondary/80 group"
        >
          <ArrowUpDown className="w-3 h-3" />
          {Object.entries(SortOptions)
            .find(([_, value]) => value === filters.sort)?.[0]
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ")}
          <X
            className="w-3 h-3 cursor-pointer group-hover:text-destructive"
            onClick={() => onFilterChange({ sort: SortOptions.NEWEST })}
          />
        </Badge>
      )}
    </div>
  ) : null;
};

const getActiveFilterCount = (
  filters: PropertyFilters,
  areas: AreaOfInterest[]
): number => {
  let count = 0;
  if (filters.propertyType?.length) count += 1;
  if (filters.bedrooms) count += 1;
  if (filters.priceRange) count += 1;
  if (filters.sort && filters.sort !== SortOptions.NEWEST) count += 1;
  if (areas.length) count += areas.length;
  if (filters.possessionStatus) count += 1;
  if (filters.amenities?.length) count += 1;
  if (filters.searchQuery) count += 1;
  if (filters.maxDistance) count += 1;
  if (filters.segment) count += 1;
  return count;
};
