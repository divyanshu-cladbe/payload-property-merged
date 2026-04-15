import { Button } from "@/components/ui/button";
import { Location } from "@/types/property";
import { ChevronLeft, Search, X } from "lucide-react";
import { MobileViewState } from "./MobilePropertyView";
import { useState } from "react";
import { useRouter } from "next/navigation";

type MobileListViewHeaderProps = {
  currentLocation: Location | null;
  propertiesNumber: number;
  setCurrentOptions: React.Dispatch<React.SetStateAction<MobileViewState>>;
  searchQuery?: string;
  handleSearchQueryChange?: (value: string) => void;
  handleSearch?: (e: React.FormEvent) => void;
};

export const MobileListViewHeader = ({
  currentLocation,
  propertiesNumber,
  setCurrentOptions,
  searchQuery: parentSearchQuery,
  handleSearchQueryChange,
  handleSearch,
}: MobileListViewHeaderProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const city = currentLocation?.address;
  const router = useRouter();

  // Use parent search query or fallback to empty string
  const searchQuery = parentSearchQuery || "";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call parent search handler if provided
    if (handleSearch) {
      handleSearch(e);
    }
  };

  const handleSearchChange = (value: string) => {
    // Call parent handler if provided
    if (handleSearchQueryChange) {
      handleSearchQueryChange(value);
    }
  };

  const toggleSearchExpand = (expanded: boolean) => {
    setIsSearchExpanded(expanded);
    if (!expanded && handleSearchQueryChange) {
      handleSearchQueryChange("");
    }
  };

  return (
    <>
      <div className="w-screen bg-white shadow-sm ">
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              type="button"
              aria-label="Go back"
              onClick={router.back}
              className="h-10 w-10 p-0 items-center justify-center flex text-black flex-shrink-0 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Title and Search Area */}
            {!isSearchExpanded ? (
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <p className="font-bold text-lg leading-tight truncate">
                  Properties in {city}
                </p>
                <p className="font-medium text-xs text-[#A7A7A7]">
                  Showing {propertiesNumber} results
                </p>
              </div>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
                <div className="relative">
                  <input
                    className="w-full outline-none text-sm py-2.5 pl-9 pr-9 rounded-full bg-[#F5F5F5] text-gray-700 placeholder:text-gray-400"
                    type="text"
                    placeholder="Search by Project"
                    value={searchQuery}
                    autoFocus
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSearchExpand(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Search Button (shown when not expanded) */}
            {!isSearchExpanded && (
              <Button
                variant="secondary"
                type="button"
                aria-label="Expand search"
                onClick={() => toggleSearchExpand(true)}
                className="h-10 w-10 p-0 rounded-full text-black bg-white border border-gray-300 hover:bg-gray-50 flex-shrink-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
