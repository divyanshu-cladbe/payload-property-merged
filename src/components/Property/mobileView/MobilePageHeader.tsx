import { Button } from "@/components/ui/button";
import { Search, Menu, X, MapPin, MoveLeftIcon, ArrowBigLeft, ArrowDownLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { AreaOfInterestDialog } from "@/components/Property/PropertyFilters/AreaOfInterestDialog";
import { useAreaOfInterest } from "@/hooks/useAreaOfInterest";
import LocationPicker from "@/components/Property/LocationPicker/LocationPicker";
import { useAuth } from "@/lib/auth";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLocation } from "@/store/slices/locationSlice";
import MapPinIcon from "../icons/MapPinIcon";

type MobilePageHeaderProps = {
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  onSearch?: (e: React.FormEvent) => void;
  isSearchExpanded?: boolean;
  onSearchExpandToggle?: (expanded: boolean) => void;
};

export const MobilePageHeader = ({
  setShowSideMenu,
  searchQuery: controlledSearchQuery,
  onSearchQueryChange,
  onSearch,
  isSearchExpanded,
  onSearchExpandToggle,
}: MobilePageHeaderProps) => {
  // Use local state as fallback when not controlled
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [localExpanded, setLocalExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchQuery = controlledSearchQuery ?? localSearchQuery;
  const expanded = isSearchExpanded ?? localExpanded;

  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { currentLocation, selectedCity } = useAppSelector(selectLocation);
  const citySlug = (
    currentLocation?.city ||
    selectedCity ||
    "delhi"
  ).toLowerCase();
  const cityLabel = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

  // Areas of Interest state via centralized hook (Redux-backed)
  const {
    areas,
    newAreaName,
    isGeocoding,
    canAddMore,
    isAtLimit,
    handleNameChange,
    handleKeyPress,
    addArea,
    removeArea,
    updateAreaName,
    updateAreaWithGeocode,
  } = useAreaOfInterest([], { useReduxState: true });

  const [isAreasOpen, setIsAreasOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const toggleExpand = (value: boolean) => {
    if (onSearchExpandToggle) onSearchExpandToggle(value);
    else setLocalExpanded(value);
  };

  const handleSearchChange = (value: string) => {
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    } else {
      setLocalSearchQuery(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(e);
    }
  };

  const navItems = [
    { name: `Projects in ${cityLabel}`, href: "/properties" },
    { name: "Smart Tools", href: "/tools" },
    { name: "Contact", href: "/contact" },
    { name: "Why us", href: "/why-us" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 mx-2 my-3.5 z-50 px-2 rounded-full pt-safe-top">
      <div className="flex items-center gap-2 ">
        {/* Left: back */}
        <Button
          variant={"secondary"}
          type="button"
          aria-label="Open menu"
          onClick={router.back}
          className="h-11 w-11 p-0 items-center justify-center flex text-black rounded-full bg-white/50 shadow-md border border-[#BCBCBC] backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Center: Search input (expanded only) */}
        {expanded && (
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <div className="relative">
              <input
                className="w-full outline-none text-sm py-2 px-8  rounded-md text-gray-600  "
                type="text"
                placeholder="Search by Project"
                value={searchQuery}
                autoFocus
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 "
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleExpand(false)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-black hover:text-gray-600"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Right: AOI button, Search icon (collapsed), and Profile */}
        <div className="ml-auto flex items-center gap-2 ">
          {/* Areas of Interest compact button with count */}
          <AreaOfInterestDialog
            areas={areas}
            newAreaName={newAreaName}
            isGeocoding={isGeocoding}
            canAddMore={canAddMore}
            isAtLimit={isAtLimit}
            isOpen={isAreasOpen}
            onOpenChange={setIsAreasOpen}
            onNameChange={handleNameChange}
            onKeyPress={handleKeyPress}
            onAddArea={addArea}
            onRemoveArea={removeArea}
            onUpdateArea={updateAreaName}
            onUpdateAreaWithGeocode={updateAreaWithGeocode}
            isMobile
            trigger={
              <Button
                variant={"secondary"}
                type="button"
                aria-label="Points of interest"
                className="h-10 px-4 rounded-full border border-[#BCBCBC] text-gray-700 flex items-center gap-2 justify-center  bg-white/50 shadow-md backdrop-blur-sm"
              >
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-md ">
                  {/* Simple pin with heart-like color using MapPin SVG path via lucide icon could be added; keep minimal circle */}
                  {/* <MapPin className="h-5 w-5" color="#000" /> */}
                  <MapPinIcon />
                  {/* <span className="h-2.5 w-2.5 rounded-full bg-[#BB2828] inline-block" /> */}
                </span>
                <span className="text-base font-medium text-black">{areas.length}</span>
              </Button>
            }
          />

          {!expanded && (
            <Button
              variant={"secondary"}
              type="button"
              aria-label="Expand search"
              onClick={() => toggleExpand(true)}
              className="h-11 w-11 p-0 text-black rounded-full items-center justify-center flex bg-white/50 shadow-md border border-[#BCBCBC] backdrop-blur-sm"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu cloned from Navbar */}
    </div>
  );
};
