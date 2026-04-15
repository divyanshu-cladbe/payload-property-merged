import React from "react";

interface CityCountBadgeProps {
  clusterCount: number;
  markerCount: number;
  selectedCity: string | null;
  onViewAllCities: () => void;
  currentZoom: number;
  maxZoomForClusters: number;
}

export const CityCountBadge = React.memo<CityCountBadgeProps>(
  ({
    clusterCount,
    markerCount,
    selectedCity,
    onViewAllCities,
    currentZoom,
    maxZoomForClusters,
  }) => {
    const showCityCount = currentZoom <= maxZoomForClusters && !selectedCity;

    return (
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            {showCityCount ? (
              <>
                {clusterCount} {clusterCount === 1 ? "City" : "Cities"}
              </>
            ) : (
              <>
                {markerCount} Properties
                {selectedCity && (
                  <span className="ml-1 text-gray-500">in {selectedCity}</span>
                )}
              </>
            )}
          </div>
          {selectedCity && (
            <button
              onClick={onViewAllCities}
              className="ml-2 text-xs text-blue-500 hover:text-blue-600 transition-colors"
            >
              View All Cities
            </button>
          )}
        </div>
      </div>
    );
  }
);

CityCountBadge.displayName = "CityCountBadge";
