import { ArrowUpWideNarrow, ChevronDown, ChevronUp, Filter, List, Menu } from "lucide-react";
import { Property } from "@/types/property";
import { cn } from "@/lib/utils";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useRouter } from "next/navigation";
import ClickAwayListener from "react-click-away-listener";
import { useEffect, useRef } from "react";
import {
  BottomPropertyListAction,
  BottomPropertyListState,
} from "./MobileMapView";
import { MobileViewState } from "./MobilePropertyView";
import FilterIcon from "../icons/FilterIcon";

type MobilePropertyViewFooterProps = {
  properties: Property[];
  selectedProperty: Property | null;
  currentSelectedPropertyRef: React.MutableRefObject<HTMLElement | null>;
  propertyListContainerRef: React.MutableRefObject<HTMLElement | null>;
  showBottomPropertyList: BottomPropertyListState;
  dispatchBottomPropertyList: React.Dispatch<BottomPropertyListAction>;
  handlePropertyClick: (property: Property | null) => void;
  setCurrentOptions: React.Dispatch<React.SetStateAction<MobileViewState>>;
  onPropertyHover?: (propertyId: string | null) => void;
  handlePropertyDeselect?: () => void;
};

export const MobilePropertyViewFooter = ({
  properties,
  selectedProperty,
  showBottomPropertyList,
  dispatchBottomPropertyList,
  currentSelectedPropertyRef,
  propertyListContainerRef,
  handlePropertyClick,
  setCurrentOptions,
  onPropertyHover,
  handlePropertyDeselect,
}: MobilePropertyViewFooterProps) => {
  const router = useRouter();
  const selectedPropertyId = selectedProperty?.id;

  const redirectToPropertyPage = (id: string) => {
    router.push(`/property/${id}`);
  };

  const toggleExpanded = () => {
    if (showBottomPropertyList.currentStatus === true) {
      dispatchBottomPropertyList("close from elsewhere");
      if (selectedProperty && handlePropertyDeselect) {
        handlePropertyDeselect();
      }
    } else {
      dispatchBottomPropertyList("open from elsewhere");
    } 
  };

  const handleListViewClick = () => {
    setCurrentOptions(MobileViewState.ListView);
  };

  const closeExpanded = () => {
    // open by the property map click then we won't close it by the 'click away' listener component
    if (
      showBottomPropertyList.currentStatus === true &&
      showBottomPropertyList.statusChangedFrom === "property"
    ) {
      return;
    } else if (showBottomPropertyList.currentStatus === true) {
      dispatchBottomPropertyList("close from elsewhere");
    }
  };

  const handleFilterOptions = () => {
    setCurrentOptions(MobileViewState.FiltersView);
  };



  // Close the expanded list when the scroll triggered (vertical only)
  useEffect(() => {
    if (!showBottomPropertyList.currentStatus) return;

    const handleWindowScroll = () => {
      dispatchBottomPropertyList("close from elsewhere");
      if (selectedProperty && handlePropertyDeselect) {
        handlePropertyDeselect();
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [
    showBottomPropertyList.currentStatus,
    dispatchBottomPropertyList,
    selectedProperty,
    handlePropertyDeselect,
  ]);

  // Only active when bottom sheet is open
  useEffect(() => {
    const container = propertyListContainerRef.current;

    // Only enable hover detection when bottom sheet is open
    if (!container || !onPropertyHover || !showBottomPropertyList.currentStatus) {
      // Clear hover when bottom sheet is closed
      if (!showBottomPropertyList.currentStatus) {
        onPropertyHover?.(null);
      }
      return;
    }

    const handleScroll = () => {
      const cards = container.querySelectorAll('[data-property-id]');
      if (cards.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestCard: Element | null = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        const propertyId = (closestCard as Element).getAttribute('data-property-id');
        if (propertyId) {
          onPropertyHover(propertyId);
        }
      } else {
        onPropertyHover(null);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [properties, onPropertyHover, propertyListContainerRef, showBottomPropertyList.currentStatus]);

  return (
    <div className="fixed text-sm left-0 right-0 bottom-0 w-full pointer-events-none z-30 pb-safe-bottom">
      <div
        className={`transition-transform duration-300 ease-in-out ${showBottomPropertyList.currentStatus
          ? "transform translate-y-0"
          : "transform translate-y-[calc(100%-4rem)]"
          }`}
      >
        <ClickAwayListener
          onDragStart={closeExpanded}
          onClickAway={closeExpanded}
        >
          <div className="rounded-t-lg pointer-events-auto max-h-[60vh] w-full ">
            {/* Always visible header section */}
            <div className="px-4 py-3 flex items-center gap-2 rounded-t-lg shadow-none">
              {/* Left: Results button */}
              <div className="flex items-center bg-white/50  px-4 py-2 rounded-full shadow-sm border-[#BCBCBC] border backdrop-blur-sm">
                <button
                  disabled={properties.length === 0}
                  onClick={toggleExpanded}
                  className="disabled:text-gray-400 text-black flex items-center gap-2 transition-colors"
                >
                  <span className="text-sm font-normal">
                    {properties.length} results
                  </span>
                  {showBottomPropertyList.currentStatus ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronUp className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Right: List and Filter buttons */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleListViewClick}
                  className="bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:bg-[#F4511E] text-white flex gap-2 items-center justify-center px-4 py-2 rounded-md transition-colors shadow-md"
                >
                  <List className="h-4 w-4" />
                  <span className="font-normal text-sm">List</span>
                </button>
                <button
                  onClick={handleFilterOptions}
                  className="bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:bg-[#F4511E] text-white flex items-center justify-center px-3 py-2 rounded-md transition-colors shadow-md"
                >
                  {/* <Filter className="h-5 w-5" /> */}
                  <FilterIcon />
                </button>
              </div>
            </div>

            {/* Hidden content that slides up */}
            <div
              ref={propertyListContainerRef as React.LegacyRef<HTMLDivElement>}
              className="h-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollPaddingLeft: "calc(50vw - 144px)",
                scrollPaddingRight: "calc(50vw - 144px)",
              }}
            >
              <div className="flex p-2">
                {properties.map((property, index) => (
                  <div
                    ref={
                      selectedPropertyId === property?.id
                        ? (currentSelectedPropertyRef as React.LegacyRef<HTMLDivElement>)
                        : undefined
                    }
                    key={property.id}
                    data-property-id={property.id}
                    className={cn(
                      "flex-shrink-0 w-72 md:w-96 cursor-pointer mr-4",
                      "transition-colors duration-200",
                      // First card snaps to start, last card snaps to end, others snap to center
                      index === 0 ? "snap-start" : index === properties.length - 1 ? "snap-end" : "snap-center"
                    )}
                    style={{
                      WebkitTapHighlightColor: "transparent",
                      outline: "none",
                    }}
                    onClick={(e) => {
                      // Only handle click if it's not from the "Go to project" button
                      // Check if click target is the button or its children
                      e.stopPropagation();
                      const target = e.target as HTMLElement;
                      const isButtonClick = target.closest("button");
                      if (!isButtonClick) {
                        handlePropertyClick(property);
                      }
                    }}
                  >
                    <PropertyCard
                      {...property}
                      variant="mobileMap"
                      redirectToPropertyPage={redirectToPropertyPage}
                      showViewFullDetailsButton={
                        selectedPropertyId === property.id
                      }
                      nearbyProperties={property.nearbyLocations}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default MobilePropertyViewFooter;
