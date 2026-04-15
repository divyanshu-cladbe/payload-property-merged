import React from "react";
import { Search, X, MapPin } from "lucide-react";
import usePlacesAutocomplete from "use-places-autocomplete";
import type { City } from "@/hooks/useLocationPicker";

interface CitySearchInputProps {
  availableCities: { [key: string]: City };
  onCitySelect: (cityName: string) => void;
  onDetectLocation: () => void;
}

export const CitySearchInput: React.FC<CitySearchInputProps> = ({
  availableCities,
  onCitySelect,
  onDetectLocation,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "in" },
      types: ["(cities)"],
    },
    debounce: 300,
  });

  const handleCityClick = (cityName: string) => {
    onCitySelect(cityName);
    setValue("");
  };

  return (
    <div className="relative max-w-md mx-auto w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#BB2828] h-4 w-4" />
        <input
          type="text"
          placeholder="Search for your city"
          className="w-full px-6 py-3 text-sm rounded-full border-[0.5px] border-[#D7D7D7] shadow-[0px_0px_10px_5px_#0000000D] outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {status === "OK" && value && (
        <div className="absolute left-0 right-0 bg-white border rounded-lg mt-2 shadow-lg max-h-48 overflow-auto z-50">
          {data.map(({ place_id, description }) => {
            const cityName = description.split(",")[0];
            return (
              <button
                key={place_id}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                onClick={() => handleCityClick(cityName)}
              >
                <span className="text-sm">{cityName}</span>
                <span className="text-xs text-gray-500">
                  {availableCities[cityName]?.propertiesCount || 0} properties
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Detect Location Button */}
      <button
        onClick={onDetectLocation}
        className="flex items-center gap-2 text-[#BB2828] hover:text-red-600 mx-auto mt-4 mr-0"
      >
        <MapPin className="h-5 w-5" />
        <span className="text-xs sm:text-sm font-medium">Detect Location</span>
      </button>
    </div>
  );
};
