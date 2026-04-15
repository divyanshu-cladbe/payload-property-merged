import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Building,
  Search as SearchIcon,
  MapPin,
  ChevronDown,
  LocateFixed,
} from "lucide-react";
import { propertySegments } from "@/constants/property-constant";
import { PropertyTypeIcons } from "@/constants/search-constants";
import { SegmentButton } from "@/components/Search/SegmentButton";
import { PropertyTypeCard } from "@/components/Search/PropertyTypeCard";
import { SearchButton } from "@/components/Search/SearchButton";
import { useSearchForm } from "@/hooks/useSearchForm";
import { PropertySegment, PropertyType } from "@/types/property";
import { AreaOfInterestDialog } from "@/components/Property/PropertyFilters/AreaOfInterestDialog";
import { useAreaOfInterest } from "@/hooks/useAreaOfInterest";
import CommercialComingSoon from "./sections/CommercialComingSoon";

interface SearchFormProps {
  className?: string;
  showSubtitle?: boolean;
  onSearchStart?: () => void;
  onSearchComplete?: () => void;
  onSearchError?: (error: Error) => void;
}

const useTypewriter = (words: string[]) => {
  const [text, setText] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const typingSpeed = 70;
    const deletingSpeed = 30;
    const pauseAtEnd = 1500;
    const pauseBeforeStart = 300;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));
          if (text === currentWord) {
            clearTimeout(timeout);
            setTimeout(() => setIsDeleting(true), pauseAtEnd);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));
          if (text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => prev + 1);
            clearTimeout(timeout);
            setTimeout(() => {}, pauseBeforeStart);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
};

export const SearchForm = React.memo<SearchFormProps>(
  ({
    className,
    showSubtitle = true,
    onSearchStart,
    onSearchComplete,
    onSearchError,
  }) => {
    const {
      activeSegment,
      activeType,
      isSearching,
      currentPropertyTypes,
      handleSearch,
      handleSegmentChange,
      handleTypeChange,
      canSearch,
    } = useSearchForm({
      onSearchStart,
      onSearchComplete,
      onSearchError,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [budgetRange, setBudgetRange] = useState<[number, number]>([1, 5000]);
    const [isSegmentDropdownOpen, setIsSegmentDropdownOpen] = useState(false);
    const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
    const [isMobileBudgetDropdownOpen, setIsMobileBudgetDropdownOpen] =
      useState(false);
    const [isAreasOpen, setIsAreasOpen] = useState(false);

    const segmentDropdownRef = useRef<HTMLDivElement>(null);
    const budgetDropdownRef = useRef<HTMLDivElement>(null);
    const mobileBudgetDropdownRef = useRef<HTMLDivElement>(null);

    const dynamicPlaceholder = useTypewriter([
      "Search by project...",
      "Search by area...",
      "Search by landmark...",
      "Search 3BHK in New Delhi...",
    ]);

    const {
      areas,
      newAreaName,
      isGeocoding,
      canAddMore,
      isAtLimit,
      handleNameChange,
      handleKeyPress: handleAreaKeyPress,
      addArea,
      removeArea,
      updateAreaName,
      updateAreaWithGeocode,
    } = useAreaOfInterest([], { useReduxState: true });

    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        const target = event.target as Node;
        if (
          isSegmentDropdownOpen &&
          segmentDropdownRef.current?.contains(target) === false
        ) {
          setIsSegmentDropdownOpen(false);
        }
        if (
          isBudgetDropdownOpen &&
          budgetDropdownRef.current?.contains(target) === false
        ) {
          setIsBudgetDropdownOpen(false);
        }
        if (
          isMobileBudgetDropdownOpen &&
          mobileBudgetDropdownRef.current?.contains(target) === false
        ) {
          setIsMobileBudgetDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [
      isSegmentDropdownOpen,
      isBudgetDropdownOpen,
      isMobileBudgetDropdownOpen,
    ]);

    const minPriceFormatted = useMemo(() => {
      const min = budgetRange[0];
      return min >= 100
        ? `₹${(min / 100).toFixed(2).replace(/\.?0+$/, "")} Cr`
        : `₹${min} L`;
    }, [budgetRange]);

    const maxPriceFormatted = useMemo(() => {
      const max = budgetRange[1];
      return max >= 100
        ? `₹${(max / 100).toFixed(2).replace(/\.?0+$/, "")} Cr`
        : `₹${max} L`;
    }, [budgetRange]);

    const handleSearchClick = () => handleSearch();
    const handleExploreResidential = () =>
      handleSegmentChange("Residential" as PropertySegment);

    if (activeSegment === "Commercial") {
      return (
        <CommercialComingSoon onExploreResidential={handleExploreResidential} />
      );
    }

    const budgetOptions = [
      { label: "below 25 L", value: [0, 25] },
      { label: "25 L - 50 L", value: [25, 50] },
      { label: "50 L - 1 Cr", value: [50, 1000] },
      { label: "1 Cr - 5 Cr", value: [1000, 5000] },
      { label: "5 Cr - 10 Cr", value: [5000, 10000] },
      { label: "10 Cr+", value: [10000, 50000] },
    ];

    const activeBudgetLabel = useMemo(() => {
      const match = budgetOptions.find(
        (opt) =>
          opt.value[0] === budgetRange[0] && opt.value[1] === budgetRange[1],
      );
      return match
        ? match.label
        : `${minPriceFormatted} - ${maxPriceFormatted}`;
    }, [budgetRange, minPriceFormatted, maxPriceFormatted]);

    const getPointOfInterestLabel = (index: number) =>
      String.fromCharCode(65 + index);

    return (
      <div
        className={`w-full max-w-xs sm:max-w-lg md:max-w-7xl mx-auto ${className || ""}`}
      >
        {/* MOBILE VERSION */}
        <div className="md:hidden space-y-6 min-w-0">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-3 -inset-y-3 bg-white/10 backdrop-blur-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] rounded-[14px]" />
            <Card className="relative bg-white/95 backdrop-blur-md rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-black/5 overflow-visible">
              <div className="flex items-center gap-1 p-1.5">
                {/* Segment Selector */}
                <div
                  ref={segmentDropdownRef}
                  className="relative flex-shrink-0"
                >
                  <button
                    onClick={() => setIsSegmentDropdownOpen((v) => !v)}
                    disabled={isSearching}
                    className="flex items-center gap-1 pl-2 pr-1 py-2.5 rounded-lg hover:bg-black/[0.03] transition-colors "
                  >
                    <span className="text-[#BB2828] text-[14px] font-bold">
                      {activeSegment}
                    </span>
                    <motion.div
                      animate={{ rotate: isSegmentDropdownOpen ? 180 : 0 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#BB2828]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isSegmentDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 bg-white border border-black/10 rounded-xl shadow-xl z-50 min-w-[120px]"
                      >
                        {propertySegments.map((segment) => (
                          <button
                            key={segment}
                            onClick={() => {
                              handleSegmentChange(segment as PropertySegment);
                              setIsSegmentDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2  hover:bg-black/[0.04] text-sm font-medium"
                          >
                            {segment}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-px self-stretch bg-black/[0.08]" />

                {/* Search Input */}
                <div className="flex-1 flex items-center min-w-0 px-2">
                  <input
                    type="text"
                    placeholder={dynamicPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                    className="w-full bg-transparent border-none outline-none placeholder:text-[#A7A7A7] text-[14px] font-medium text-[#333333] truncate"
                  />
                </div>

                {/* Locate Icon */}
                <button className="p-2 flex-shrink-0 hover:bg-black/[0.03] rounded-full transition-colors">
                  <LocateFixed className="w-5 h-5 text-[#6D6D6D]" />
                </button>
              </div>
            </Card>
          </div>

          {/* Point of Interest and Budget Containers */}
          <div className="flex gap-3 min-w-0 w-full">
            <AreaOfInterestDialog
              areas={areas}
              newAreaName={newAreaName}
              isGeocoding={isGeocoding}
              canAddMore={canAddMore}
              isAtLimit={isAtLimit}
              isOpen={isAreasOpen}
              onOpenChange={setIsAreasOpen}
              onNameChange={handleNameChange}
              onKeyPress={handleAreaKeyPress}
              onAddArea={addArea}
              onRemoveArea={removeArea}
              onUpdateArea={updateAreaName}
              onUpdateAreaWithGeocode={updateAreaWithGeocode}
              isMobile
              trigger={
                <div className="flex-1 bg-white border border-[#D7D7D7] shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 flex flex-col min-w-0">
                  <span className="text-[#818181] text-[11px] font-semibold uppercase tracking-wider mb-2">
                    Point Of Interest
                  </span>
                  <div className="flex items-center gap-1.5 justify-between">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {[0, 1, 2].map((index) => {
                        const type = currentPropertyTypes[index];
                        const isSelected = activeType === type;
                        return (
                          <div
                            key={index}
                            className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[12px] font-bold ${
                              isSelected
                                ? "bg-[#E11D48] text-white"
                                : "bg-[#FFA3A3] text-white"
                            }`}
                          >
                            {getPointOfInterestLabel(index)}
                          </div>
                        );
                      })}
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#404040]" />
                  </div>
                </div>
              }
            />

            <div
              ref={mobileBudgetDropdownRef}
              className="flex-1 bg-white border border-[#D7D7D7] shadow-[0_2px_10px_rgba(0,0,0,0.04)] rounded-xl p-3 flex flex-col min-w-0 relative"
            >
              <span className="text-[#818181] text-[11px] font-semibold uppercase tracking-wider mb-2">
                Budget
              </span>
              <button
                type="button"
                onClick={() => setIsMobileBudgetDropdownOpen((v) => !v)}
                className="flex items-center justify-between w-full"
              >
                <span className="text-[#333333] font-bold text-[14px] truncate">
                  {activeBudgetLabel}
                </span>
                <motion.div
                  animate={{ rotate: isMobileBudgetDropdownOpen ? 180 : 0 }}
                >
                  <ChevronDown className="w-4 h-4 text-[#404040]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isMobileBudgetDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 bg-white border border-black/10 rounded-xl shadow-2xl z-50 p-2 w-full min-w-[160px]"
                  >
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => {
                          setBudgetRange(opt.value as [number, number]);
                          setIsMobileBudgetDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-0.5 ${
                          budgetRange[0] === opt.value[0] &&
                          budgetRange[1] === opt.value[1]
                            ? "bg-red-50 text-[#BB2828] font-bold"
                            : "hover:bg-gray-50 text-gray-700 font-medium"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleSearchClick}
            disabled={!canSearch || isSearching}
            className="w-full bg-gradient-to-l from-[#E91614] to-[#E05D31] text-white py-4 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
          >
            {isSearching ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full"
              />
            ) : (
              <>
                <SearchIcon className="w-4 h-4" />
                <span className="tracking-wide">SEARCH FOR PROPERTIES</span>
              </>
            )}
          </button>
        </div>

        {/* DESKTOP VERSION (Unchanged) */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 bg-white/20 backdrop-blur-[30px] shadow-[0px_0px_30px_0px_#00000040] rounded-[20px]" />
            <Card className="relative bg-white/95 backdrop-blur-md rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/5 overflow-visible">
              <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 p-3 md:p-2 justify-center ">
                <div className="md:flex md:items-center">
                  <div ref={segmentDropdownRef} className="relative">
                    <button
                      onClick={() => setIsSegmentDropdownOpen((v) => !v)}
                      disabled={isSearching}
                      className="flex items-center gap-1 xl:gap-2 pl-4 pr-3 py-3 md:py-2 rounded-xl hover:bg-black/[0.03] transition-colors"
                    >
                      <span className="text-[#BB2828] text-[15px] xl:text-base font-semibold">
                        {activeSegment}
                      </span>
                      <motion.div
                        animate={{ rotate: isSegmentDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-[#BB2828]" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isSegmentDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 bg-white border border-black/10 rounded-xl shadow-xl z-20 min-w-[180px] overflow-hidden"
                        >
                          {propertySegments.map((segment, index) => (
                            <motion.button
                              key={segment}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={() => {
                                handleSegmentChange(segment as PropertySegment);
                                setIsSegmentDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-black/[0.04] text-sm xl:text-[15px] transition-colors"
                            >
                              {segment}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="hidden md:block w-px self-stretch bg-black/[0.08]" />

                <div className="flex-1 flex justify-center relative">
                  <span className="absolute left-2 xl:left-4 top-1/2 -translate-y-1/2">
                    <SearchIcon className="w-4 h-4 xl:w-5 xl:h-5 text-[#6B6B6B]" />
                  </span>
                  <input
                    type="text"
                    placeholder={dynamicPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={isSearching}
                    className="w-full rounded-2xl md:rounded-none py-3 md:py-2 pl-8 xl:pl-11 pr-3 xl:pr-4 focus:outline-none placeholder:text-[#6B6B6B] text-sm xl:text-base"
                  />
                </div>

                <div className="flex items-center px-2 md:px-3">
                  <button
                    disabled={isSearching}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#BB2828]/10 hover:bg-[#BB2828]/15 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#BB2828]" />
                    <span className="text-[#BB2828] font-medium text-sm">
                      Near me
                    </span>
                  </button>
                </div>

                <div className="hidden md:block w-px self-stretch bg-black/[0.08]" />

                <AreaOfInterestDialog
                  areas={areas}
                  newAreaName={newAreaName}
                  isGeocoding={isGeocoding}
                  canAddMore={canAddMore}
                  isAtLimit={isAtLimit}
                  isOpen={isAreasOpen}
                  onOpenChange={setIsAreasOpen}
                  onNameChange={handleNameChange}
                  onKeyPress={handleAreaKeyPress}
                  onAddArea={addArea}
                  onRemoveArea={removeArea}
                  onUpdateArea={updateAreaName}
                  onUpdateAreaWithGeocode={updateAreaWithGeocode}
                  trigger={
                    <div className="flex items-center md:px-3">
                      <div className="flex flex-col md:items-center gap-1">
                        <span className="text-xs md:text-[13px] xl:text-sm text-[#818181] font-medium leading-none">
                          Point Of Interest
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="flex -space-x-2">
                            {currentPropertyTypes
                              .slice(0, 4)
                              .map((type, index) => {
                                const letter = getPointOfInterestLabel(index);
                                const isSelected = activeType === type;
                                return (
                                  <motion.button
                                    key={type}
                                    onClick={() => handleTypeChange(type)}
                                    disabled={isSearching}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-7 h-7 xl:w-8 xl:h-8 rounded-full border border-white flex items-center justify-center text-[13px] font-semibold transition-colors ${
                                      isSelected
                                        ? "bg-[#E11D48] text-white"
                                        : "bg-[#FFA3A3] text-white hover:bg-[#ff8f8f]"
                                    }`}
                                    aria-pressed={isSelected}
                                    aria-label={`Point of interest ${letter}`}
                                  >
                                    {letter}
                                  </motion.button>
                                );
                              })}
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#404040]" />
                        </div>
                      </div>
                    </div>
                  }
                />

                <div className="hidden md:block w-px self-stretch bg-black/[0.08]" />

                <div
                  ref={budgetDropdownRef}
                  className="relative flex items-center md:px-3 flex-col gap-1 md:min-w-[180px] flex-shrink-0"
                >
                  <span className="block text-xs md:text-[13px] xl:text-sm text-[#818181] font-medium leading-none mb-2 whitespace-nowrap">
                    Budget
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBudgetDropdownOpen(!isBudgetDropdownOpen);
                    }}
                    className="flex items-center gap-1 font-semibold text-sm xl:text-base text-[#333] hover:text-[#BB2828] transition-colors"
                  >
                    {budgetRange[0] === 0 && budgetRange[1] === 5000
                      ? "Any Budget"
                      : `${minPriceFormatted} - ${maxPriceFormatted}`}
                    <motion.span
                      animate={{ rotate: isBudgetDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isBudgetDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 bg-white border border-black/10 rounded-xl shadow-2xl z-[100] p-2 min-w-[200px]"
                      >
                        <div className="flex flex-col">
                          {budgetOptions.map((opt) => (
                            <button
                              key={opt.label}
                              type="button"
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                                budgetRange[0] === opt.value[0] &&
                                budgetRange[1] === opt.value[1]
                                  ? "bg-red-50 text-[#BB2828] font-bold"
                                  : "hover:bg-gray-50 text-gray-700"
                              }`}
                              onClick={() => {
                                setBudgetRange(opt.value as [number, number]);
                                setIsBudgetDropdownOpen(false);
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:block w-px self-stretch bg-black/[0.08]" />

                <div className="flex items-center md:px-3">
                  <button
                    onClick={handleSearchClick}
                    disabled={!canSearch || isSearching}
                    className="w-full md:w-auto rounded-2xl md:rounded-lg bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:opacity-95 active:opacity-90 text-white px-3 xl:px-5 py-2 xl:py-3 flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(233,22,20,0.35)] disabled:opacity-60"
                  >
                    {isSearching ? (
                      <motion.div
                        aria-label="loading"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <SearchIcon className="w-4 h-4" />
                        <span className="font-semibold text-sm xl:text-base tracking-wide">
                          SEARCH
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {currentPropertyTypes.length > 4 && (
          <div className="hidden">
            <PropertyTypeGrid
              propertyTypes={currentPropertyTypes.slice(4)}
              activeType={activeType}
              isSearching={isSearching}
              onTypeChange={handleTypeChange}
            />
          </div>
        )}
      </div>
    );
  },
);

const PropertyTypeGrid = React.memo<{
  propertyTypes: readonly PropertyType[];
  activeType: PropertyType | null;
  isSearching: boolean;
  onTypeChange: (type: PropertyType) => void;
}>(({ propertyTypes, activeType, isSearching, onTypeChange }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
    <AnimatePresence>
      {propertyTypes.map((type) => (
        <PropertyTypeCard
          key={type}
          type={type}
          icon={PropertyTypeIcons[type] || Building}
          isSelected={activeType === type}
          isSearching={isSearching}
          onClick={() => onTypeChange(type)}
        />
      ))}
    </AnimatePresence>
  </div>
));

SearchForm.displayName = "SearchForm";
PropertyTypeGrid.displayName = "PropertyTypeGrid";

export default SearchForm;
