import React, { useState } from "react";
import { LocationPickerHeader } from "./LocationPickerHeader";
import { CitySearchInput } from "./CitySearchInput";
import { SectionDivider } from "./SectionDivider";
import { CityGrid } from "./CityGrid";
import type { City } from "@/hooks/useLocationPicker";

interface LocationPickerContentProps {
  availableCities: { [key: string]: City };
  onCitySelect: (cityName: string) => void;
  onDetectLocation: () => void;
  showNameInput?: boolean;
  userName?: string;
  onUserNameChange?: (name: string) => void;
  userExists?: boolean;
}

export const LocationPickerContent: React.FC<LocationPickerContentProps> = ({
  availableCities,
  onCitySelect,
  onDetectLocation,
  showNameInput = false,
  userName = "",
  onUserNameChange,
  userExists = true,
}) => {
  const [showAllCities, setShowAllCities] = useState(false);

  const handleViewMore = () => {
    setShowAllCities(true);
  };

  const handleCitySelect = (cityName: string) => {
    // Validate name if required
    if (showNameInput && !userExists && (!userName || !userName.trim())) {
      alert("Please enter your name before selecting a city");
      return;
    }
    onCitySelect(cityName);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 sm:py-7">
      <div className="text-center space-y-6">
        <LocationPickerHeader />

        {/* Name Input Field - Only shown when showNameInput is true and user doesn't exist */}
        {showNameInput && !userExists && (
          <div className="max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => onUserNameChange?.(e.target.value)}
              className="w-full px-6 py-3 text-sm rounded-full border-[0.5px] border-[#D7D7D7] shadow-[0px_0px_10px_5px_#0000000D] outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200"
              required
            />
          </div>
        )}

        <CitySearchInput
          availableCities={availableCities}
          onCitySelect={handleCitySelect}
          onDetectLocation={onDetectLocation}
        />

        <SectionDivider
          showAllCities={showAllCities}
          onViewMore={handleViewMore}
        />

        <CityGrid
          availableCities={availableCities}
          onCitySelect={handleCitySelect}
          showAllCities={showAllCities}
        />
      </div>
    </div>
  );
};
