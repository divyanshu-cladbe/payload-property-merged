import React from "react";
import { CityCard } from "./CityCard";
import type { City } from "@/hooks/useLocationPicker";

interface CityGridProps {
  availableCities: { [key: string]: City };
  onCitySelect: (cityName: string) => void;
  showAllCities: boolean;
}

const POPULAR_CITY_NAMES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Noida",
  "Lucknow",
  "Jaipur",
  "Ahmedabad",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Indore",
  "Ranchi",
];

const cityImages: { [key: string]: string[] } = {
  Mumbai: ["/images/city/1.png", "/images/city/1.png"],
  Delhi: ["/images/city/2.png", "/images/city/2.png"],
  Bangalore: ["/images/city/3.png", "/images/city/3.png"],
  Hyderabad: ["/images/city/4.png", "/images/city/4.png"],
  Chennai: ["/images/city/5.png", "/images/city/5.png"],
  Pune: ["/images/city/6.png", "/images/city/6.png"],
  Noida: ["/images/city/2.png", "/images/city/2.png"], // Similar to Delhi
  Lucknow: ["/images/city/1.png", "/images/city/1.png"],
  Jaipur: ["/images/city/2.png", "/images/city/2.png"],
  Ahmedabad: ["/images/city/3.png", "/images/city/3.png"],
  Kanpur: ["/images/city/1.png", "/images/city/1.png"],
  Kochi: ["/images/city/5.png", "/images/city/5.png"],
  Kolkata: ["/images/city/4.png", "/images/city/4.png"],
  Indore: ["/images/city/3.png", "/images/city/3.png"],
  Ranchi: ["/images/city/4.png", "/images/city/4.png"],
};

export const CityGrid: React.FC<CityGridProps> = ({
  availableCities,
  onCitySelect,
  showAllCities,
}) => {
  if (showAllCities) {
    return (
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
        {Object.keys(availableCities).map((cityName) => (
          <button
            key={cityName}
            onClick={() => onCitySelect(cityName)}
            className="px-7 py-2 rounded-xl border border-[#A7A7A7] hover:border-gray-300 transition-colors text-sm"
          >
            <span className="text-sm font-medium text-black">{cityName}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto">
      {POPULAR_CITY_NAMES.slice(0, 9).map((cityName, index) => {
        const city = availableCities[cityName];
        if (!city) return null;

        const imageUrl = cityImages[cityName]?.[0] || "/images/city/1.png";

        return (
          <CityCard
            key={cityName}
            city={city}
            imageUrl={imageUrl}
            onClick={() => onCitySelect(cityName)}
            priority={index < 3}
          />
        );
      })}
    </div>
  );
};
