// Updated DistanceDetails.tsx - Pure Drag-to-Scroll (No Wheel Interruption)
import React, { useEffect, useRef } from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import Icons from "@/components/PropertyPage/Icons";
import { NearbyLocation } from "@/types/property/base";
interface NearbyProperty {
  id: string;
  category: string;
  categoryDisplayName: string;
  places: Array<{
    name: string;
    rating: number;
    address: string;
    distance: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  }>;
  searchRadius: string;
  lastUpdated: string;
  dataSource: string;
  isActive: boolean;
  metadata: any;
}

type DistanceDetailsProps = {
  nearbyProperties?: NearbyLocation[];
  isMobileMapView?: boolean;
  isMobileListView?: boolean;
};

const getIconForCategory = (category?: string) => {
  const categoryLower = category?.toLowerCase() || "";
  switch (categoryLower) {
    case "education":
      return <Icons.schoolIcon />;
    case "healthcare":
      return <Icons.hospitalIcon />;
    case "shopping":
      return <Icons.shoppingIcon />;
    case "entertainment":
      return <Icons.entertainmentIcon />;
    case "transportation":
      return <Icons.transportationIcon />;
    default:
      return <Icons.otherIcon />;
  }
};

export const DistanceDetails = React.memo(
  ({
    nearbyProperties,
    isMobileMapView,
    isMobileListView,
  }: DistanceDetailsProps) => {
    const displayData = React.useMemo(() => {
      if (!nearbyProperties || nearbyProperties.length === 0) return [];

      return nearbyProperties
        .filter((category) => category.places && category.places.length > 0)
        .slice(0, 4)
        .map((category) => {
          const closestPlace = category.places[0];
          return {
            icon: getIconForCategory(category.category),
            categoryName: category.categoryDisplayName,
            time: Math.ceil(closestPlace.distance * 2),
            distance: closestPlace.distance.toFixed(1),
            landmark: closestPlace.name,
          };
        });
    }, [nearbyProperties]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
        // e.pageX is the mouse position relative to the whole document
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleMouseLeaveOrUp = () => {
        isDown = false;
        container.style.cursor = "all-scroll";
        container.style.removeProperty("user-select");
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        // preventDefault here stops text selection/image dragging during scroll
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        // Increase the multiplier (2.0) if you want it to scroll faster
        const walk = (x - startX) * 2.0;
        container.scrollLeft = scrollLeft - walk;
      };

      // Drag Event Listeners
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseleave", handleMouseLeaveOrUp);
      container.addEventListener("mouseup", handleMouseLeaveOrUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseleave", handleMouseLeaveOrUp);
        container.removeEventListener("mouseup", handleMouseLeaveOrUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    return (
      <div
        ref={containerRef}
        /* Note: overflow-x-auto is kept for mobile touch support, 
           but hidden scrollbar keeps it clean for desktop drag. 
        */
        className="mt-1 overflow-x-auto horizontal-scroll cursor-all-scroll select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .horizontal-scroll::-webkit-scrollbar { display: none; }
        `,
          }}
        />

        <div className="inline-flex items-center gap-2 mb-1 mt-1">
          {displayData.map((dist, index) => (
            <div
              key={index}
              className={`inline-flex items-center ${
                isMobileMapView
                  ? `py-0 px-1.5 sm:px-2`
                  : isMobileListView
                    ? `p-2`
                    : `p-1.5 sm:p-1.5`
              } gap-1.5 sm:gap-2 bg-white border border-[#E9E9E9] rounded-md shadow-sm flex-shrink-0`}
              style={
                !isMobileListView ? { borderColor: PROPERTY_COLORS.border } : {}
              }
            >
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full shrink-0 flex items-center justify-center bg-white">
                {dist.icon}
              </div>

              <div className="text-[10px] sm:text-xs flex flex-col">
                <span className="whitespace-nowrap text-black ">
                  {dist.time} mins | {dist.distance} KM
                </span>
                <span className="whitespace-nowrap text-[#A7A7A7] max-w-[120px] truncate">
                  {dist.landmark}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

DistanceDetails.displayName = "DistanceDetails";
