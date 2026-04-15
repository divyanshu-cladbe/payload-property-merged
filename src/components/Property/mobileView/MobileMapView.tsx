import { MobilePageHeader } from "./MobilePageHeader";
import { MobileSideMenu } from "./MobileSideMenu";
import { PropertyMapMarker } from "../PropertyMap/PropertyMapMarker";
import { MapBound } from "@/hooks/useMapBounds";
import MobilePropertyViewFooter from "./MobilePropertyViewFooter";
import { BoundType } from "../PropertyMap/types";
import { AreaOfInterest, Coordinates, Property } from "@/types/property";
import { useEffect, useState } from "react";
import { MobileViewState } from "./MobilePropertyView";
import { GoogleMapsWrapper } from "@/components/shared/GoogleMapsWrapper";
import { useBottomSheet } from "@/hooks/useBottomSheet";

type MobileMapViewProps = {
  mapApi?: string;
  currentBound: { INDIA_BOUNDS: BoundType; INDIA_CENTER: Coordinates };
  properties: Property[];
  selectedProperty: Property | null;
  areasOfInterest: AreaOfInterest[];
  mapBasedFilteredProperty: Property[];
  onPropertyClick: (property: Property | null) => void;
  handlePropertyDeselect: () => void;
  setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
  setCurrentOptions: React.Dispatch<React.SetStateAction<MobileViewState>>;
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  onSearch?: (e: React.FormEvent) => void;
  bottomSheetExpanded?: boolean;
  hoveredPropertyId?: string | null;
  onPropertyHover?: (propertyId: string | null) => void;
};

// Legacy types for compatibility - moved to useBottomSheet hook
export type BottomPropertyListState = {
  currentStatus: boolean;
  statusChangedFrom: string;
};

export type BottomPropertyListAction =
  | "open from property"
  | "close from property"
  | "open from elsewhere"
  | "close from elsewhere";

export const MobileMapView = ({
  mapApi,
  currentBound,
  properties,
  selectedProperty,
  areasOfInterest,
  mapBasedFilteredProperty,
  setMapBounds,
  handlePropertyDeselect,
  onPropertyClick,
  setCurrentOptions,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  bottomSheetExpanded,
  hoveredPropertyId,
  onPropertyHover,
}: MobileMapViewProps) => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

  // Use the extracted bottom sheet hook
  const {
    isOpen: showBottomPropertyList,
    triggerSource,
    selectedItemRef: currentSelectedPropertyRef,
    containerRef: propertyListContainerRef,
    openFromProperty: openBottomPropertyList,
    closeFromProperty: closeBottomPropertyList,
    openFromUser: openBottomPropertyListFromUser,
    closeFromUser: closeBottomPropertyListFromUser,
  } = useBottomSheet();

  // Ensure bottom sheet opens when a property is selected
  useEffect(() => {

    if (selectedProperty && !showBottomPropertyList) {
      openBottomPropertyList();
    } else if (
      !selectedProperty &&
      showBottomPropertyList &&
      triggerSource === "property"
    ) {
      closeBottomPropertyList();
    }
  }, [
    selectedProperty,
    showBottomPropertyList,
    openBottomPropertyList,
    closeBottomPropertyList,
    triggerSource,
    areasOfInterest,
  ]);

  return (
    <>
      <div className="relative w-full h-full">
        <MobilePageHeader
          setShowSideMenu={setShowSideMenu}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          onSearch={onSearch}
        />
        {/* spacer to offset the fixed header height */}
        {/* <div className="h-16" aria-hidden="true" /> */}
        <MobileSideMenu
          showSideMenu={showSideMenu}
          setShowSideMenu={setShowSideMenu}
        />
        <GoogleMapsWrapper
          apiKey={mapApi}
          defaultCenter={currentBound.INDIA_CENTER}
          restriction={{
            latLngBounds: currentBound.INDIA_BOUNDS as any,
            strictBounds: false,
          }}
          gestureHandling="greedy"
          onMapClick={handlePropertyDeselect}
        >
          <PropertyMapMarker
            variant={"mobile"}
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertyClick={onPropertyClick}
            areasOfInterest={areasOfInterest}
            removeAreaOfInterestRef={null}
            openBottomPropertyList={openBottomPropertyList}
            handlePropertyDeselect={handlePropertyDeselect}
            setMapBounds={setMapBounds}
            bottomSheetExpanded={showBottomPropertyList}
            hoveredPropertyId={hoveredPropertyId}
          />
        </GoogleMapsWrapper>
        <MobilePropertyViewFooter
          properties={mapBasedFilteredProperty}
          selectedProperty={selectedProperty}
          currentSelectedPropertyRef={currentSelectedPropertyRef}
          propertyListContainerRef={propertyListContainerRef}
          showBottomPropertyList={{
            currentStatus: showBottomPropertyList,
            statusChangedFrom: triggerSource,
          }}
          dispatchBottomPropertyList={(action: string) => {
            switch (action) {
              case "open from property":
                openBottomPropertyList();
                break;
              case "close from property":
                closeBottomPropertyList();
                break;
              case "open from elsewhere":
                openBottomPropertyListFromUser();
                break;
              case "close from elsewhere":
                closeBottomPropertyListFromUser();
                break;
            }
          }}
          handlePropertyClick={onPropertyClick}
          setCurrentOptions={setCurrentOptions}
          onPropertyHover={onPropertyHover}
          handlePropertyDeselect={handlePropertyDeselect}
        />
      </div>
    </>
  );
};
