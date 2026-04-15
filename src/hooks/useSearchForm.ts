import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectLocation } from "@/store/slices/locationSlice";
import { updateFilters } from "@/store/slices/propertySlice";
import { getPropertyTypesBySegment } from "@/constants/property-constant";
import {
  PropertySegment,
  PropertyType,
  SortOption,
  type PropertyFilters,
} from "@/types/property";

interface UseSearchFormOptions {
  initialSegment?: PropertySegment;
  onSearchStart?: () => void;
  onSearchComplete?: () => void;
  onSearchError?: (error: Error) => void;
}

export const useSearchForm = (options: UseSearchFormOptions = {}) => {
  const {
    initialSegment,
    onSearchStart,
    onSearchComplete,
    onSearchError,
  } = options;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { currentLocation } = useAppSelector(selectLocation);

  const [activeSegment, setActiveSegment] =
    useState<PropertySegment>(initialSegment || "Residential");
  const [activeType, setActiveType] = useState<PropertyType | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const currentPropertyTypes = getPropertyTypesBySegment(activeSegment);

  const handleSearch = useCallback(async (): Promise<void> => {
    if (isSearching || !activeType) return;

    try {
      setIsSearching(true);
      onSearchStart?.();



      const searchFilters: Partial<PropertyFilters> = {
        segment: activeSegment,
        propertyType: [activeType],
        sort: "newest" as SortOption,
        origin: null,
        maxDistance: 10,
        city: "",
        amenities: [],
      };

      await dispatch(updateFilters(searchFilters));
      router.push("/properties");

      onSearchComplete?.();
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Search failed");
      onSearchError?.(errorObj);

      toast({
        title: "Search Error",
        description: "Failed to search properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [
    activeSegment,
    activeType,
    dispatch,
    router,
    toast,
    isSearching,
    onSearchStart,
    onSearchComplete,
    onSearchError,
  ]);

  const handleSegmentChange = useCallback(
    (segment: PropertySegment): void => {
      if (isSearching) return;

      const firstTypeForSegment = getPropertyTypesBySegment(segment)[0];
      setActiveSegment(segment);
      setActiveType(firstTypeForSegment);
    },
    [isSearching]
  );

  const handleTypeChange = useCallback(
    (type: PropertyType): void => {
      if (isSearching) return;
      setActiveType(type);
    },
    [isSearching]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setActiveSegment(initialSegment || "Residential");
    setActiveType(null);
    setIsSearching(false);
  }, [initialSegment]);

  return {
    // State
    activeSegment,
    activeType,
    isSearching,
    currentPropertyTypes,
    currentLocation,

    // Actions
    handleSearch,
    handleSegmentChange,
    handleTypeChange,
    resetForm,

    // Computed
    canSearch: !isSearching && activeType !== null,
  };
};
