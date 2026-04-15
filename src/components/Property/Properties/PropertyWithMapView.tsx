import { MutableRefObject, useState, useEffect, useRef } from "react";
import PropertyGrid from "@/components/Property/PropertyGrid";
import { layoutConfig, useResponsiveLayout } from "@/utils/layoutConfig";
import type { Property, Coordinates } from "@/types/property";
import PropertyMap from "../PropertyMap/PropertyMap";
import { BoundType, PropertyMapMarkerDataRef } from "../PropertyMap/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import {
  selectFilteredProperties,
  selectAllProperties,
} from "@/store/slices/propertySlice";
import { useSelector } from "react-redux";
import EndOfResults from "@/components/EndOfResult";
import RegionFilter from "../desktopView/RegionFilter";
import PropertiesPageHeader from "./PropertiesPageHeader";
import { MoreLikeThis } from "@/components/PropertyPage/MoreLikeThis";
import { usePropertiesPage } from "@/contexts/PropertiesPageContext";
import {selectCurrentZoom} from "@/store/slices/propertySlice";
import { useAppSelector } from "@/hooks/useAppSelector";

export type MapBound = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
} | null;

export interface PropertyWithMapViewProps {
  mapApi?: string;
  currentBound: { INDIA_BOUNDS: BoundType; INDIA_CENTER: Coordinates };
  properties: Property[];
  removeAreaOfInterestRef: MutableRefObject<PropertyMapMarkerDataRef | null>;
  getResponsiveValue: (config: Record<string, string>) => string;
  setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
  isDesktop: boolean;
  userLocation?: { lat: number; lng: number } | null;
  calculateFromLocation?: boolean;
  onUserLocationUpdate?: (
    enabled: boolean,
    userLocation: { lat: number; lng: number } | null,
  ) => void;
}

export default function PropertyWithMapView({
  mapApi,
  currentBound,
  properties,
  removeAreaOfInterestRef,
  getResponsiveValue,
  setMapBounds,
  isDesktop,
  userLocation,
  calculateFromLocation,
  onUserLocationUpdate,
}: PropertyWithMapViewProps) {
  // Get data from context
  const {
    isLoading,
    selectedProperty,
    areasOfInterest,
    currentLocation,
    handlePropertySelect,
    handlePropertyDeselect,
    handleRemoveAreaOfInterest,
  } = usePropertiesPage();
  const allProperties = useSelector(selectAllProperties);
  const filteredProperties = useSelector(selectFilteredProperties);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(
    null,
  );

  const { getListWidth, getMapWidth, getCardDimensions, getGridSpacing } =
    useResponsiveLayout();

  const { displayedItems, hasMore, isLoadingMore, scrollRef } =
    useInfiniteScroll(filteredProperties, {
      initialItemsPerPage: 4,
      threshold: 0.7,
      loadMoreDelay: 200,
    });

  // Refs for header and pixel-based offset
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Measure header height once on mount
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Scroll handler for smooth header animation (pixel-based)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || headerHeight === 0) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      const scrollDelta = currentScrollY - lastScrollY;

      // 1. Threshold: If we haven't scrolled much, don't do anything (prevents jitter)
      if (Math.abs(scrollDelta) < 5) return;

      // 2. Logic for "Near Top"
      if (currentScrollY <= 10) {
        setHeaderOffset(0); // Fully visible
      }
      // 3. Scrolling Down: Hide immediately
      else if (scrollDelta > 0) {
        setHeaderOffset(headerHeight); // Fully hidden
      }
      // 4. Scrolling Up: Show immediately
      else if (scrollDelta < 0) {
        setHeaderOffset(0); // Fully visible
      }

      // Update tracking variable
      setLastScrollY(currentScrollY);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [headerOffset, lastScrollY, scrollRef, headerHeight]);

  // Render loading more indicator
  const renderLoadingMore = () => (
    <div className="flex justify-center py-4">
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <span>Loading more...</span>
      </div>
    </div>
  );

  return (
    <div
      className="h-full flex bg-white "
      style={{
        minWidth: "1280px",
      }}
    >
      {/* Card - Left Side */}

      <div
        className="relative bg-white flex-shrink-0 h-full flex flex-col"
        style={{
          width: getListWidth(),
          minWidth: layoutConfig.cardConstraints.minWidth,
          maxWidth: layoutConfig.cardConstraints.maxWidth,
        }}
      >
        {/* Control Bar - Map Toggle, POI, Search, Filters, Newest */}
        <div
          ref={headerRef}
          className="sticky top-0 z-10 bg-white overflow-hidden shadow-md"
          style={{
            marginBottom: `-${headerOffset}px`,
            transform: `translate3d(0, -${headerOffset}px, 0)`,
            transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform, margin",
            backfaceVisibility: "hidden",
          }}
        >
          <PropertiesPageHeader
            isSearchExpanded={isSearchExpanded}
            onSearchExpandToggle={setIsSearchExpanded}
            onUserLocationUpdate={onUserLocationUpdate}
          />

          {/* Region Filters - inside sticky header */}
          <div className="w-full px-2 flex justify-center">
            <div className="w-full ">
              <RegionFilter />
            </div>
          </div>
        </div>

        {/* Property List - Scrollable */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            scrollbarWidth: "none",
            willChange: "scroll-position",
          }}
        >
          <div
            className="p-3 lg:p-4 xl:p-5 lg:pt-2 xl:pt-2 pt-0.5 min-h-full"
            id="property-list"
            style={{
              transform: `translate3d(0, -${headerOffset}px, 0)`,
              transition:
                "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              backfaceVisibility: "hidden",
            }}
          >
            <PropertyGrid
              properties={displayedItems}
              isLoading={isLoading}
              selectedPropertyId={selectedProperty?.id}
              onPropertySelect={handlePropertySelect}
              onPropertyHover={setHoveredPropertyId}
              showMap={true}
              cardDimensions={getCardDimensions()}
              gridSpacing={getGridSpacing()}
            />

            {/* Loading more indicator */}
            {!isLoading && isLoadingMore && renderLoadingMore()}

            {/* End of results indicator */}
            {!isLoading && !hasMore && displayedItems.length > 0 && (
              <>
                <div className="flex justify-center items-center py-4">
                  <EndOfResults className="col-span-full mt-8" />
                </div>
                <MoreLikeThis variant={"default"} />
              </>
            )}

            {/* Spacer to ensure scroll can reach threshold */}
            {displayedItems.length > 0 && hasMore && (
              <div className="h-8"></div>
            )}
          </div>
        </div>
      </div>
      <div
        className="hidden md:block h-full relative flex-shrink-0 p-3 pl-0 pt-1 lg:p-4 lg:pl-0 xl:p-5 xl:pl-0 lg:pt-1.5 xl:pt-3"
        style={{
          width: getMapWidth(),
          flexGrow: 1,
        }}
      >
        <div
          className="h-full w-full rounded-[1.25rem] overflow-hidden shadow-lg"
          id="property-map"
        >
          <PropertyMap
            mapApi={mapApi}
            currentBound={currentBound}
            properties={allProperties}
            selectedProperty={selectedProperty}
            onPropertyClick={handlePropertySelect}
            areasOfInterest={areasOfInterest}
            referencePoint={currentLocation || undefined}
            className="h-full w-full"
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            centerOnSelect={false}
            removeAreaOfInterestRef={removeAreaOfInterestRef}
            handlePropertyDeselect={handlePropertyDeselect}
            setMapBounds={setMapBounds}
            userLocation={userLocation}
            calculateFromLocation={calculateFromLocation}
            hoveredPropertyId={hoveredPropertyId}
            // mapTypeId={zoom >= 18 ? "hybrid" : "roadmap"}
          />
        </div>
      </div>

      {/* Right Side - Control Bar, Title, Filters, and Property List */}
    </div>
  );
}
