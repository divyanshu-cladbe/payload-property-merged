import PropertyCard from "@/components/Property/PropertyCard/PropertyCard";
import { PropertyCardSkeleton } from "@/components/Property/PropertyCardSkeleton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { Property } from "@/types/property";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useResponsiveLayout } from "@/utils/layoutConfig";
import { selectFilteredProperties } from "@/store/slices/propertySlice";
import EndOfResults from "@/components/EndOfResult";
import PropertiesPageHeader from "./PropertiesPageHeader";
import RegionFilter from "../desktopView/RegionFilter";
import { usePropertiesPage } from "@/contexts/PropertiesPageContext";

interface PropertyListOnlyViewProps {
  onPropertySelect: (property: Property | null) => void;
  getResponsiveValue: (config: Record<string, string>) => string;
  isSearchExpanded: boolean;
  onSearchExpandToggle: (expanded: boolean) => void;
}

export default function PropertyListOnlyView({
  onPropertySelect,
  getResponsiveValue,
  isSearchExpanded,
  onSearchExpandToggle,
}: PropertyListOnlyViewProps) {
  // Get data from context
  const {
    isLoading,
    selectedProperty,
  } = usePropertiesPage();
  const router = useRouter();
  const filteredProperties = useSelector(selectFilteredProperties);

  // Get responsive layout helpers
  const { getCardDimensions, getGridSpacing } = useResponsiveLayout();

  // Use infinite scroll instead of pagination
  const { displayedItems, hasMore, isLoadingMore, scrollRef } =
    useInfiniteScroll(filteredProperties, {
      initialItemsPerPage: 8,
      threshold: 0.8,
      loadMoreDelay: 250,
    });

  // Validate and filter properties
  const validProperties = useMemo(() => {
    if (!Array.isArray(displayedItems)) {
      return [];
    }

    return displayedItems.filter((property): property is Property => {
      if (!property || typeof property !== "object") {
        return false;
      }

      if (!property.id || !property.title) {
        return false;
      }

      return true;
    });
  }, [displayedItems]);

  // Handle property click
  const handlePropertyClick = useCallback(
    (property: Property) => {
      if (!property?.id) {
        return;
      }
      onPropertySelect?.(property);
    },
    [onPropertySelect]
  );

  // Handle navigation to property detail page
  const redirectToPropertyPage = useCallback(
    (id: string) => {
      if (!id) {
        return;
      }
      router.push(`/property/${id}`);
    },
    [router]
  );

  // Render skeleton loader in two-column grid
  const renderSkeletons = () => {
    const count = 8;
    return Array.from({ length: count }, (_, index) => (
      <div key={`skeleton-${index}`} className="w-full">
        <PropertyCardSkeleton />
      </div>
    ));
  };

  // Render loading more indicator
  const renderLoadingMore = () => (
    <div className="flex justify-center py-8">
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span>Loading more properties...</span>
      </div>
    </div>
  );

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex h-64 w-full col-span-2 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg
            className="h-full w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No properties found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your filters to see more results
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      <PropertiesPageHeader
        isSearchExpanded={isSearchExpanded}
        onSearchExpandToggle={onSearchExpandToggle}
      />
      <div className="px-2  flex justify-center">
        <RegionFilter />
      </div>
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto scrollbar-thin bg-white"
        style={{
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
        }}
      >
        {/* Full width container with responsive padding */}
        <div className="w-full px-3 md:px-4 lg:px-5 py-5 min-h-full">
          {/* Responsive grid layout with optimized spacing */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${getGridSpacing()} mb-8`}
          >
            {isLoading
              ? renderSkeletons()
              : validProperties.length === 0
                ? renderEmptyState()
                : validProperties.map((property) => (
                  <div
                    key={property.id}
                    className="w-full cursor-pointer transition-all duration-200 hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Only handle click if it's not from the "Go to project" button
                      const target = e.target as HTMLElement;
                      const isButtonClick = target.closest('button');
                      if (!isButtonClick) {
                        handlePropertyClick(property);
                      }
                    }}
                  >
                    <PropertyCard
                      {...property}
                      variant="default"
                      showViewFullDetailsButton={
                        selectedProperty?.id === property.id
                      }
                      redirectToPropertyPage={redirectToPropertyPage}
                      cardDimensions={getCardDimensions()}
                    />
                  </div>
                ))}
          </div>

          {/* Loading more indicator */}
          {!isLoading && isLoadingMore && renderLoadingMore()}

          {/* End of results indicator */}
          {!isLoading && !hasMore && validProperties.length > 0 && (
            <div className="flex justify-center py-8">
              {/* <div className="text-gray-500 text-sm"> */}
              <EndOfResults className="col-span-full mt-8" />
              {/* </div> */}
            </div>
          )}

          {/* Spacer to ensure scroll can reach threshold */}
          {validProperties.length > 0 && hasMore && (
            <div className="h-16"></div>
          )}
        </div>
      </div>
    </div>
  );
}
