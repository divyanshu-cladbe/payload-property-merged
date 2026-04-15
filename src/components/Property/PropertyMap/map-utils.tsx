// map-utils.tsx
import { useCallback } from "react";
import {
  MAX_ZOOM_FOR_CLUSTERS,
  MIN_ZOOM_FOR_PROPERTIES,
  INDIA_CENTER,
} from "@/constants/constants";
import type { Property, Location } from "@/types/property";
import type { CityClusterData } from "./types";

export const useMapUtils = () => {
  // Calculate initial view
  const calculateInitialView = useCallback(
    (
      mapRef: google.maps.Map | null,
      properties: Property[],
      referencePoint?: Location,
      currentLocation?: Location
    ) => {
      if (!mapRef) return;

      if (currentLocation) {
        mapRef.setCenter(currentLocation);
        mapRef.setZoom(12);
        mapRef.set("centerPoint", currentLocation);

        // Find the city for the selected location
        const cityProperty = properties.find(
          (property) =>
            property.city &&
            property.location?.coordinates &&
            Math.abs(property.location.coordinates.lat - currentLocation.lat) <
              0.1 &&
            Math.abs(property.location.coordinates.lng - currentLocation.lng) <
              0.1
        );

        if (cityProperty?.city) {
          return cityProperty.city;
        }
      } else if (referencePoint) {
        mapRef.setCenter(referencePoint);
        mapRef.setZoom(12);
        mapRef.set("centerPoint", referencePoint);
      } else if (properties.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        properties.forEach((property) => {
          if (property.location?.coordinates) {
            bounds.extend(property.location.coordinates);
          }
        });

        const paddingValue = 50;
        mapRef.fitBounds(bounds, {
          bottom: paddingValue,
          left: paddingValue,
          right: paddingValue,
          top: paddingValue,
        });
      } else {
        mapRef.setCenter(INDIA_CENTER);
        mapRef.setZoom(5);
      }

      return null;
    },
    []
  );

  // Calculate city clusters
  const calculateCityClusters = useCallback(
    (
      properties: Property[],
      bounds: google.maps.LatLngBounds | null,
      center: google.maps.LatLng | null
    ): Record<string, CityClusterData> => {
      if (!bounds || !center) return {};

      return properties.reduce(
        (clusters: Record<string, CityClusterData>, property) => {
          if (!property.location?.coordinates || !property.city)
            return clusters;

          const { lat, lng } = property.location.coordinates;
          const city = property.city;

          if (!bounds.contains({ lat, lng })) return clusters;

          if (!clusters[city]) {
            clusters[city] = {
              count: 0,
              position: { lat, lng },
              properties: [],
              totalValue: 0,
              distanceFromCenter:
                Math.abs(lat - center.lat()) + Math.abs(lng - center.lng()),
            };
          }

          clusters[city].count++;
          clusters[city].properties.push(property);

          // Use the new price structure (price is now a string)
          if (property.price) {
            const priceValue =
              typeof property.price === "string"
                ? parseFloat(property.price)
                : property.price;
            clusters[city].totalValue += priceValue;
          }

          return clusters;
        },
        {}
      );
    },
    []
  );

  // Handle view all cities
  const handleViewAllCities = useCallback(
    (mapRef: google.maps.Map | null, currentLocation: Location | null) => {
      if (mapRef) {
        mapRef.setZoom(MAX_ZOOM_FOR_CLUSTERS);
        if (currentLocation) {
          mapRef.panTo({
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          });
        }
        return null; // Reset selected city
      }
      return null;
    },
    []
  );

  // Handle cluster click
  const handleClusterClick = useCallback(
    (
      city: string,
      position: google.maps.LatLngLiteral,
      mapRef: google.maps.Map | null
    ) => {
      if (!mapRef) return city;

      mapRef.setZoom(MIN_ZOOM_FOR_PROPERTIES);
      mapRef.panTo(position);

      return city; // Return the selected city
    },
    []
  );

  return {
    calculateInitialView,
    calculateCityClusters,
    handleViewAllCities,
    handleClusterClick,
  };
};
