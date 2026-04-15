import React, { useRef, useState, useEffect } from "react";
import { useRegions } from "@/hooks/useRegions";
import { usePropertyFiltersSync } from "@/hooks/usePropertyFiltersSync";
import { Button } from "@/components/ui/button";

const RegionFilter = () => {
  const { filters, updateFilter } = usePropertyFiltersSync();
  const { regions, isLoading } = useRegions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Detect if content overflows
  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const isOverflowing =
        scrollContainerRef.current.scrollWidth >
        scrollContainerRef.current.clientWidth;
      setShowScrollButtons(isOverflowing);
    }
  };

  // Check overflow on mount and when regions change
  useEffect(() => {
    checkOverflow();
  }, [regions]);

  // Listen for window resize
  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Use ResizeObserver for accurate detection
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(scrollContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleRegionSelect = (regionName: string) => {
    const newRegion = regionName === "All" ? "" : regionName;
    updateFilter({ region: newRegion });
  };

  const isSelected = (regionName: string) => {
    if (regionName === "All") {
      return !filters.region || filters.region === "";
    }
    return filters.region === regionName;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="mb-1">
        <div className="flex justify-start items-start gap-3">
          <div className="px-5 py-2 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
          <div className="px-5 py-2 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
          <div className="px-5 py-2 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 w-14 bg-gray-300 rounded" />
          </div>
          <div className="px-5 py-2 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-4 w-14 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Show slider only if there are regions to display
  const hasRegions = regions && regions.length > 0;

  return (
    <div className="mb-3 relative w-full">
      {/* Scroll Left Button - Only show if overflow */}
      {showScrollButtons && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Buttons Container - Will be centered when no scroll needed */}
      <div
        ref={scrollContainerRef}
        className={`flex items-start gap-3 scroll-smooth ${showScrollButtons ? "overflow-x-auto px-10" : "justify-start px-4"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Button
          onClick={() => handleRegionSelect("All")}
          variant={isSelected("All") ? "filterActive" : "filter"}
          size="filter"
          className="rounded-lg flex-shrink-0 font-normal"
        >
          All
        </Button>

        {regions.map((region) => (
          <Button
            key={region.name}
            onClick={() => handleRegionSelect(region.name)}
            variant={isSelected(region.name) ? "filterActive" : "filter"}
            size="filter"
            className={`rounded-lg flex-shrink-0 ${isSelected(region.name) ? "" : "text-[#575757]"} font-normal`}
          >
            {region.name}
          </Button>
        ))}
      </div>

      {/* Scroll Right Button - Only show if overflow */}
      {showScrollButtons && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RegionFilter;
