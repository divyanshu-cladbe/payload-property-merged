import React from "react";
import { ListFilter } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SortOptions, SortOption, isValidSortOption } from "@/types/property";

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortSelector = React.memo<SortSelectorProps>(
  ({ currentSort, onSortChange }) => {
    const formatSortLabel = (key: string): string => {
      return key
        .split("_")
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
    };

    return (
      <Select
        value={currentSort || SortOptions.NEWEST}
        onValueChange={(value: any) =>
          isValidSortOption(value) && onSortChange(value as SortOption)
        }
      >
        <SelectTrigger className="h-[49px] w-[166px] bg-[#F9F6F6] rounded-xl">
          <ListFilter className="w-[24px] h-[24px]" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SortOptions).map(([key, value]) => (
            <SelectItem key={value} value={value}>
              {formatSortLabel(key)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

SortSelector.displayName = "SortSelector";
