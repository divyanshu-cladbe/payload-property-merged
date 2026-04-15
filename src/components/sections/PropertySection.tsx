import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectLocation } from "@/store/slices/locationSlice";
import {
  setProperties,
  selectFilteredProperties,
  selectIsLoading,
  selectError,
} from "@/store/slices/propertySlice";
import { usePropertyLocationFilter } from "@/hooks/usePropertyLocationFilter";
import { getPropertiesAction } from "@/actions/properties";
import Link from "next/link";

import { Property, PropertyFilters } from "@/types/property";
import { Location } from "@/types/property";
import PropertyGrid from "../Property/PropertyGrid";
import PropertyCard from "../Property/PropertyCard/PropertyCard";

export interface City {
  id: string;
  name: string;
  count: number;
}

export interface CityTabsProps {
  cities: City[];
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

export interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
}

export interface PropertySectionProps {
  initialProperties?: Property[];
}

export interface NavigationBarProps {
  isScrolled: boolean;
}

export interface HeroSectionProps {
  currentLocation: Location | null;
}

export interface SearchFormData {
  location: string;
  propertyType: string;
  priceRange: string;
}
export const PropertySection = () => {
  const dispatch = useAppDispatch();
  const { currentLocation } = useAppSelector(selectLocation);
  const properties = useAppSelector(selectFilteredProperties); // Get filtered properties from Redux
  const loading = useAppSelector(selectIsLoading); // Loading state from Redux
  const error = useAppSelector(selectError); // Error state from Redux
  // const isMobile = !useMediaQuery("(min-width: 768px)");

  //INFO: Fetch properties for home page when the component mounts
  useEffect(() => {
    const fetchProps = async () => {
      const docs = await getPropertiesAction({ city: currentLocation?.city || undefined });
      dispatch(setProperties(docs));
    };
    fetchProps();
  }, [dispatch, currentLocation?.city]);

  //INFO: Filter properties based on the current location
  const filteredProperties = usePropertyLocationFilter(
    properties,
    currentLocation
  ).slice(0, 8);

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex justify-between items-start">
            <div className="space-y-1 md:space-y-2">
              <div className="relative">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Book from <span className="text-red-600">exclusive</span>{" "}
                  listings .
                </h2>
                <p className="text-gray-600 mt-2 md:mt-4 text-base md:text-lg">
                  Find your perfect space in{" "}
                  {currentLocation?.address || "Popular Cities"}
                </p>
              </div>
            </div>
            <Link href="/properties">
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 group shrink-0 text-sm md:text-base"
              >
                View All
                <ChevronRight className="ml-1 md:ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="text-center py-8">Loading properties...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                variant="mobileMap"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No properties found in {currentLocation?.address || "this area"}.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please check back later for new properties.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertySection;
