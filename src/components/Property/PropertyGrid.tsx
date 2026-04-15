import React, { useCallback, useEffect, useMemo } from "react";
import { Property } from "@/types/property";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";
import PropertyCard from "./PropertyCard/PropertyCard";
import { useRouter } from "next/navigation";
import { useResponsiveLayout } from "@/utils/layoutConfig";
import {
  PROPERTY_GRID_CONFIG,
  PROPERTY_CARD_CONSTRAINTS,
  CONTAINER_MAX_WIDTHS,
} from "@/constants/property-ui-constants";
import PromotionalCard, {
  PromotionalCardVariant,
} from "./PromotionalCard/PromotionalCard";
import { usePropertiesPageOptional } from "@/contexts/PropertiesPageContext";

interface PropertyGridProps {
  // Only layout/UI config props - data comes from context
  onPropertyHover?: (propertyId: string | null) => void;
  className?: string;
  showMap?: boolean;
  variant?: "default" | "map" | "detail" | "profile" | "mobileMap";
  skeletonCount?: number;
  isProfilePage?: boolean;
  cardDimensions?: {
    height: string;
    imageRatio: string;
    padding: string;
    gap: string;
  };
  gridSpacing?: string;

  // Optional overrides (for non-context usage like profile page)
  properties?: Property[];
  isLoading?: boolean;
  selectedPropertyId?: string;
  onPropertySelect?: (property: Property | null) => void;
  onPropertyRemove?: (propertyId: string) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  // Props for layout/config
  onPropertyHover,
  className,
  isProfilePage = false,
  showMap = false,
  variant = "default",
  skeletonCount,
  cardDimensions: propCardDimensions,
  gridSpacing: propGridSpacing,

  // Optional overrides
  properties: propProperties,
  isLoading: propIsLoading,
  selectedPropertyId: propSelectedPropertyId,
  onPropertySelect: propOnPropertySelect,
  onPropertyRemove,
}) => {
  const isMobile = !useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  // Extract only what we need from context (if available)
  const context = usePropertiesPageOptional();

  // Use context values if no props provided (selective extraction)
  const properties = propProperties ?? context?.properties ?? [];
  const isLoading = propIsLoading ?? context?.isLoading ?? false;
  const selectedPropertyId = propSelectedPropertyId ?? context?.selectedProperty?.id;
  const onPropertySelect = propOnPropertySelect ?? context?.handlePropertySelect;

  // Get responsive layout helpers (with fallback to props)
  const { getCardDimensions, getGridSpacing } = useResponsiveLayout();

  // Use prop values if provided, otherwise use responsive layout
  const cardDimensions = propCardDimensions || getCardDimensions();
  const gridSpacing = propGridSpacing || getGridSpacing();

  // Validate and filter properties
  const validProperties = useMemo(() => {
    if (!Array.isArray(properties)) {
      return [];
    }

    const filtered = properties.filter((property): property is Property => {
      if (!property || typeof property !== "object") {
        return false;
      }

      if (!property.id || !property.title) {
        return false;
      }

      return true;
    });

    // Move selected property to top of the list
    // if (selectedPropertyId && showMap) {
    //   const selectedIndex = filtered.findIndex(p => p.id === selectedPropertyId);
    //   if (selectedIndex > 0) {
    //     const selectedProperty = filtered[selectedIndex];
    //     const reorderedProperties = [selectedProperty, ...filtered.slice(0, selectedIndex), ...filtered.slice(selectedIndex + 1)];
    //     return reorderedProperties;
    //   }
    // }

    return filtered;
    // }, [properties, selectedPropertyId, showMap]);
  }, [properties]);

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

  // Render skeleton loader
  const renderSkeletons = () => {
    const count = skeletonCount || (showMap ? 4 : 8);

    return Array.from({ length: count }, (_, index) => (
      <div key={`skeleton-${index}`} className="w-full">
        <PropertyCardSkeleton />
      </div>
    ));
  };

  // console.log("Full property:", properties);
  // console.log("Nearby locations:", properties[0]?.nearbyLocations);
  // Render empty state
  const renderEmptyState = () => (
    <div className="flex h-64 w-full items-center justify-center">
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
          Try zooming out or, adjust your filters to see more results.
        </p>
      </div>
    </div>
  );

  // Promotional card variants to cycle through
  const promotionalVariants: PromotionalCardVariant[] = [
    "cashback",
    "prop20-simple",
    "prop20-dark",
    "prop20-image",
  ];

  // Render items with promotional cards injected - memoized for performance
  const renderedItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    let promoIndex = 0;

    validProperties.forEach((property, index) => {
      // Add property card
      items.push(
        <div
          key={property.id}
          className="w-full cursor-pointer transition-all duration-200"
          onClick={(e) => {
            // Only handle click if it's not from the "Go to project" button
            // const target = e.target as HTMLElement;
            // const isButtonClick = target.closest("button");
            // if (!isButtonClick) {
            handlePropertyClick(property);
            // }
          }}
          onMouseEnter={() => onPropertyHover?.(property.id)}
          onMouseLeave={() => onPropertyHover?.(null)}
        >
          <PropertyCard
            {...property}
            variant={variant}
            showViewFullDetailsButton={selectedPropertyId === property.id}
            redirectToPropertyPage={redirectToPropertyPage}
            onPropertyRemove={onPropertyRemove}
            cardDimensions={cardDimensions}
            nearbyProperties={property.nearbyLocations}
          />
        </div>
      );

      // Inject promotional card after every 3rd property (positions 2, 5, 8, etc.)
      if ((index + 1) % 3 === 0 && promoIndex < promotionalVariants.length) {
        items.push(
          <div key={`promo-${index}`} className="w-full">
            <PromotionalCard variant={promotionalVariants[promoIndex]} />
          </div>
        );
        promoIndex++;
      }
    });

    return items;
  }, [
    validProperties,
    selectedPropertyId,
    variant,
    redirectToPropertyPage,
    onPropertyRemove,
    cardDimensions,
    onPropertyHover,
    handlePropertyClick,
  ]);

  // Single column layout (like map view) with responsive spacing
  return (
    <div
      className={cn(
        `w-full bg-white ${gridSpacing.replace("gap-", "space-y-")}`,
        className
      )}
    >
      {isLoading
        ? renderSkeletons()
        : validProperties.length === 0
          ? renderEmptyState()
          : renderedItems}
    </div>
  );
};

PropertyGrid.displayName = "PropertyGrid";

export default React.memo(PropertyGrid);
