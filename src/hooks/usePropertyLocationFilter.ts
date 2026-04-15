// hooks/usePropertyLocationFilter.ts
import { useMemo } from "react";
import { LocationHelper } from "@/utils/location-helper";
import type {
  Property,
  Location,
  PropertyFilters,
  AreaOfInterest,
  PropertyType,
} from "@/types/property";

export const usePropertyLocationFilter = (
  properties: Property[],
  currentLocation: Location | null,
  filters: PropertyFilters = {}, // Made optional with default empty object
  areasOfInterest: AreaOfInterest[] = []
) => {
  return useMemo(() => {
    let filteredProperties = [...properties];

    // Location filtering
    if (properties.length) {
      if (currentLocation?.address) {
        const mainCity = LocationHelper.getMainCity(currentLocation.address);

        filteredProperties = filteredProperties.filter((property) => {
          // Updated: city is now directly on property, not nested in location
          const propertyCity = property?.city;
          if (!propertyCity) {
            return false;
          }
          const isMatch = LocationHelper.isLocationMatch(
            mainCity,
            propertyCity
          );

          if (!isMatch) {
            return LocationHelper.isInRegion(propertyCity, mainCity);
          }

          return isMatch;
        });
      } else if (areasOfInterest.length > 0) {
        filteredProperties = filteredProperties.filter((property) =>
          areasOfInterest.some((area) => {
            // Updated: city is now directly on property, not nested in location
            const propertyCity = property?.city;

            // Return false if propertyCity is undefined
            if (!propertyCity) {
              return false;
            }
            const areaCity = LocationHelper.getMainCity(area.location.address);
            return (
              LocationHelper.isLocationMatch(areaCity, propertyCity) ||
              LocationHelper.isInRegion(propertyCity, areaCity)
            );
          })
        );
      }
    }

    // Property Type Filter - Updated to use tagsType instead of propertyType
    if (filters.propertyType?.length) {
      filteredProperties = filteredProperties.filter((property) => {
        if (!property.tagsType) {
          return false;
        }
        return filters.propertyType?.includes(
          property.tagsType as PropertyType
        );
      });
    }

    // Bedrooms Filter - Updated to extract from unitSpecifications
    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter((property) => {
        // Check if any unit specification matches the bedroom count
        return (
          property.unitSpecifications?.some(
            (unit) => unit.noOfRooms === filters.bedrooms
          ) ?? false
        );
      });
    }

    // Price Range Filter - Updated to handle string price
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filteredProperties = filteredProperties.filter((property) => {
        const propertyPrice = property.price ? parseFloat(property.price) : 0;
        return propertyPrice >= minPrice && propertyPrice <= maxPrice;
      });
    }

    // Possession Status Filter
    if (filters.possessionStatus) {
      filteredProperties = filteredProperties.filter(
        (property) => property.possessionStatus === filters.possessionStatus
      );
    }

    // Amenities Filter
    if (filters.amenities?.length) {
      filteredProperties = filteredProperties.filter((property) =>
        filters.amenities?.every(
          (amenity) =>
            property.amenities?.some((a) => a.name === amenity) ?? false
        )
      );
    }

    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case "price_asc":
          filteredProperties.sort((a, b) => {
            const priceA = a.price ? parseFloat(a.price) : 0;
            const priceB = b.price ? parseFloat(b.price) : 0;
            return priceA - priceB;
          });
          break;
        case "price_desc":
          filteredProperties.sort((a, b) => {
            const priceA = a.price ? parseFloat(a.price) : 0;
            const priceB = b.price ? parseFloat(b.price) : 0;
            return priceB - priceA;
          });
          break;
        case "newest":
          filteredProperties.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
          // case "distance":
          //   if (currentLocation) {
          //     filteredProperties.sort((a, b) => {
          //       const distA = a.location?.coordinates
          //         ? LocationHelper.calculateDistance(
          //             currentLocation,
          //             a.location.coordinates
          //           )
          //         : Infinity;
          //       const distB = b.location?.coordinates
          //         ? LocationHelper.calculateDistance(
          //             currentLocation,
          //             b.location.coordinates
          //           )
          //         : Infinity;
          //       return distA - distB;
          //     });
          //   }
          break;
      }
    }

    return filteredProperties;
  }, [properties, currentLocation, filters, areasOfInterest]);
};

export default usePropertyLocationFilter;
