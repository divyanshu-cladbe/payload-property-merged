import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setProperties,
  selectFilteredProperties,
  selectIsLoading,
  selectError,
} from "@/store/slices/propertySlice";
import { getPropertiesAction } from "@/actions/properties";
import PropertyCard from "@/components/Property/PropertyCard/PropertyCard";
import type { Property as GlobalProperty } from "@/types/property";

interface PropertyListingGridSectionProps {
  title?: string;
  description?: string;
  showHeader?: boolean;
}

// Skeleton Card Component
const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_12.36px_0px_#00000026] overflow-hidden h-full flex flex-col">
      {/* Skeleton CSS */}
      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      {/* Image Skeleton */}
      <div className="relative h-44 sm:h-48 md:h-52 lg:h-60 xl:h-64 skeleton">
        {/* Top badges skeleton */}
        {/* <div className="absolute top-3 left-3 skeleton rounded-lg w-20 h-6"></div> */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="skeleton rounded-full w-8 h-8"></div>
          <div className="skeleton rounded-full w-8 h-8"></div>
        </div>
        {/* Dots skeleton */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="skeleton rounded-full w-2 h-2"></div>
          <div className="skeleton rounded-full w-2 h-2"></div>
          <div className="skeleton rounded-full w-2 h-2"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and RERA skeleton */}
        <div className="flex items-center justify-between mb-1">
          <div className="skeleton h-6 w-40 rounded"></div>
          <div className="skeleton h-6 w-12 rounded-lg"></div>
        </div>

        {/* Location skeleton */}
        <div className="skeleton h-4 w-32 rounded mb-3"></div>

        {/* Property types skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="skeleton h-6 w-24 rounded"></div>
          <div className="skeleton h-6 w-24 rounded"></div>
        </div>

        {/* Amenities skeleton */}
        <div className="flex gap-3 mb-1">
          <div className="skeleton w-4 h-4 rounded"></div>
          <div className="skeleton w-4 h-4 rounded"></div>
          <div className="skeleton w-4 h-4 rounded"></div>
          <div className="skeleton w-4 h-4 rounded"></div>
        </div>

        {/* Possession and Price skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="skeleton h-4 w-28 rounded"></div>
          <div className="text-right">
            <div className="skeleton h-6 w-24 rounded mb-1"></div>
            <div className="skeleton h-4 w-20 rounded"></div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        <div className="border-[0.1px] border-[#CACACA] mb-4"></div>

        {/* Listed by skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="skeleton w-8 h-8 rounded-full"></div>
            <div>
              <div className="skeleton h-4 w-24 rounded mb-1"></div>
              <div className="skeleton h-3 w-16 rounded"></div>
            </div>
          </div>
          <div className="skeleton w-12 h-8 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const PropertyListingGridSection: React.FC<PropertyListingGridSectionProps> = ({
  title = "The Future of Newest Property Discovery is Here",
  description = "This is your own marketplace to book something truly special before it's gone.",
  showHeader = true,
}) => {
  const dispatch = useAppDispatch();
  const apiProperties = useAppSelector(selectFilteredProperties);
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // State for scroll and pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);



  // State for initial loading
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch properties from API
  useEffect(() => {
    const fetchData = async () => {
      setIsInitialLoad(true);
      const docs = await getPropertiesAction();
      dispatch(setProperties(docs));
      setIsInitialLoad(false);
    };
    fetchData();
  }, [dispatch]);

  // Use API data
  const properties: GlobalProperty[] = React.useMemo(() => {
    // Show empty array during initial load or loading
    if (isInitialLoad || loading) return [];

    // Return API properties or empty array
    return apiProperties || [];
  }, [apiProperties, loading, isInitialLoad]);

  // Calculate items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 640) return 2; // sm
      return 1; // mobile
    }
    return 4;
  };

  const [itemsPerPage, setItemsPerPage] = useState(4); // Server-safe default

  // Update items per page on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    // Set initial value on client
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Update scroll buttons state
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  // Scroll functions - renamed to avoid conflict with DOM property
  const handleScrollLeft = () => {
    if (scrollContainerRef.current && !loading && !isInitialLoad) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.clientWidth + 24; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth * itemsPerPage,
        behavior: "smooth",
      });

      if (currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current && !loading && !isInitialLoad) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.clientWidth + 24; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth * itemsPerPage,
        behavior: "smooth",
      });

      if (currentPage < totalPages - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  // Go to specific page
  const goToPage = (pageIndex: number) => {
    if (scrollContainerRef.current && !loading && !isInitialLoad) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.clientWidth + 24;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * itemsPerPage * pageIndex,
        behavior: "smooth",
      });
      setCurrentPage(pageIndex);
    }
  };



  // Listen for scroll events and update current page - only when not loading
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && !loading && !isInitialLoad) {
      const handleScroll = () => {
        updateScrollButtons();

        // Update current page based on scroll position
        const cardWidth = container.children[0]?.clientWidth + 24;
        if (cardWidth > 0) {
          const scrollPosition = container.scrollLeft;
          const newPage = Math.round(scrollPosition / (cardWidth * itemsPerPage));
          if (newPage !== currentPage && newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
          }
        }
      };

      container.addEventListener("scroll", handleScroll);
      updateScrollButtons();

      return () => container.removeEventListener("scroll", handleScroll);
    } else {
      // Reset scroll button states during loading
      setCanScrollLeft(false);
      setCanScrollRight(true);
    }
  }, [loading, isInitialLoad, currentPage, itemsPerPage, totalPages]);

  // Properties to display
  const displayedProperties = showAll ? properties : properties;

  return (
    <div className="py-6 px-2 mx-2 sm:px-6 bg-white scrollbar-hide">
      {/* Dynamic Header Section */}
      {showHeader && (
        <div className="text-center space-y-4 max-w-5xl mx-auto my-6 sm:mb-10">
          <h1 className="text-black    font-bold text-xl sm:text-2xl md:text-3xl xl:text-[40px]">
            {title.includes("Newest") ? (
              <>
                The Future of <span className="text-[#BB2828]">Newest</span>{" "}
                Property Discovery is{" "}
                <span className="text-[#BB2828]">Here</span>
              </>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: title.replace(
                    /\*\*(.*?)\*\*/g,
                    '<span class="text-[#BB2828]">$1</span>'
                  ),
                }}
              />
            )}
          </h1>
          <p className="text-[#6D6D6D] font-medium text-xs sm:text-sm md:text-base xl:text-lg max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      )}

      {/* Carousel Container with External Navigation */}
      <div className="relative flex items-center gap-4">
        {/* Left Navigation Arrow - Outside cards */}
        <button
          onClick={handleScrollLeft}
          disabled={!canScrollLeft || loading || isInitialLoad}
          className={`hidden sm:block flex-shrink-0 bg-[#FFF0F0] border-[0.8px] border-[#FFB5B5] rounded-full p-4 shadow-lg hover:shadow-xl transition-all ${!canScrollLeft || loading || isInitialLoad
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#FFE5E5]"
            }`}
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4 text-[#BB2828]"
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

        {/* Property Grid Container */}
        <div className="flex-1 overflow-hidden">

          {/* Property Grid - With Loading Skeletons */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-6 px-1 py-3 transition-all duration-300 ${showAll
              ? "flex-wrap justify-center"
              : "overflow-x-auto scrollbar-hide"
              }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {isInitialLoad || loading ? (
              // Show skeleton cards while loading
              Array.from({ length: itemsPerPage }, (_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                >
                  <SkeletonCard />
                </div>
              ))
            ) : error ? (
              // Show simple error state if API fails
              <div className="w-full text-center py-20">
                <div className="text-lg text-gray-600 mb-2">
                  Something went wrong
                </div>
                <div className="text-sm text-gray-500">
                  Please try again later
                </div>
              </div>
            ) : displayedProperties.length === 0 ? (
              // Show simple no properties message
              <div className="w-full text-center py-20">
                <div className="text-lg text-gray-600 mb-2">
                  No properties available
                </div>
                <div className="text-sm text-gray-500">
                  Check back soon for new listings
                </div>
              </div>
            ) : (
              // Show actual property cards
              displayedProperties.map((property: GlobalProperty) => (
                <div
                  key={property.id}
                  className={
                    showAll
                      ? "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                      : "flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
                  }
                >
                  <div onClick={() => setSelectedPropertyId(property.id)}>
                    <PropertyCard
                      {...property}
                      variant="mobileList"
                      showViewFullDetailsButton={selectedPropertyId === property.id}
                      redirectToPropertyPage={(id) => {
                        window.location.href = `/property/${id}`;
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Navigation Arrow - Outside cards */}
        <button
          onClick={handleScrollRight}
          disabled={!canScrollRight || loading || isInitialLoad}
          className={`hidden sm:block flex-shrink-0 bg-[#FFF0F0] border-[0.8px] border-[#FFB5B5] rounded-full p-4 shadow-lg hover:shadow-xl transition-all ${!canScrollRight || loading || isInitialLoad
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#FFE5E5]"
            }`}
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4 text-[#BB2828]"
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
      </div>

      {/* Functional Pagination Dots - Hide during loading and error */}
      {!loading && !isInitialLoad && !error && !showAll && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`rounded-full transition-all duration-200 hover:scale-110 ${index === currentPage
                ? "w-2 h-2 bg-[#BB2828]"
                : "w-1 h-1 bg-[#D9D9D9] hover:bg-[#BB2828]/50"
                }`}
            />
          ))}
        </div>
      )}

      {/* Functional View All Button - Hide during loading */}
      {!loading &&
        !isInitialLoad &&
        !error &&
        displayedProperties.length > 0 && (
          <div className="text-center mt-6">
            <Link href="/properties">
              <button className="border border-[#B9B9B9] text-[#8B8888] px-5 sm:px-8 py-3 rounded-lg hover:border-[#BB2828] hover:text-[#BB2828] hover:bg-[#FFF0F0] transition-all duration-200 font-medium text-xs sm:text-sm xl:text-base">
                View All
              </button>
            </Link>
          </div>
        )}
    </div>
  );
};

export default PropertyListingGridSection;
