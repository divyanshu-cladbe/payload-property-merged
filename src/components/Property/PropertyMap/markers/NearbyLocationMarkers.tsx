import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import Icons from "@/components/PropertyPage/Icons";

// Icon components
const getIconForCategory = (category?: string) => {
  const categoryLower = category?.toLowerCase() || "";

  switch (categoryLower) {
    case "education":
      return <Icons.schoolIcon />;
    case "healthcare":
      return <Icons.hospitalIcon />;
    case "shopping":
      return <Icons.shoppingIcon />;
    case "entertainment":
      return <Icons.entertainmentIcon />;
    case "transportation":
      return <Icons.transportationIcon />;
    default:
      return <Icons.otherIcon />;
  }
};

interface Place {
  name: string;
  rating: number;
  address: string;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface NearbyLocation {
  id: string;
  category: string;
  categoryDisplayName: string;
  places: Place[];
  searchRadius: string;
  lastUpdated: string;
  dataSource: string;
  isActive: boolean;
  metadata: any;
}

interface NearbyLocationMarkersProps {
  nearbyLocations?: NearbyLocation[];
  propertyId?: string;
}

export const NearbyLocationMarkers: React.FC<NearbyLocationMarkersProps> = ({
  nearbyLocations = [],
  propertyId,
}) => {
  // Only show markers when nearby locations exist
  if (!nearbyLocations || nearbyLocations.length === 0) {
    return null;
  }

  // Get the closest place from each active category (up to 4 categories)
  const displayMarkers = nearbyLocations
    .filter(
      (category) =>
        category.isActive && category.places && category.places.length > 0
    )
    .slice(0, 4) // Limit to 4 categories
    .map((category) => ({
      category: category.category,
      categoryDisplayName: category.categoryDisplayName,
      place: category.places[0], // Get the closest place (first one)
    }));

  return (
    <>
      {displayMarkers.map((marker, index) => {
        const { place, category, categoryDisplayName } = marker;

        if (!place.coordinates?.lat || !place.coordinates?.lng) {
          return null;
        }

        return (
          <AdvancedMarker
            key={`nearby-${propertyId}-${category}-${index}`}
            position={{
              lat: place.coordinates.lat,
              lng: place.coordinates.lng,
            }}
            title={`${categoryDisplayName} - ${place.name}`}
            zIndex={50}
          >
            <div className="flex flex-col items-center">
              {/* Icon with background */}
              <div className="bg-white rounded-full p-2 shadow-lg border-2 border-gray-200  transition-transform duration-200">
                {getIconForCategory(category)}
              </div>

              {/* Label below icon */}
              {/* <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium text-gray-700 mt-1 whitespace-nowrap">
                {categoryDisplayName}
              </div> */}
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
};
