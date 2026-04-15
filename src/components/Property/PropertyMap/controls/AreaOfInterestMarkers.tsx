import React, { useEffect, useRef, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { ROUTE_COLORS } from "@/constants/constants";
import { useRouteCalculations } from "../../controllers/RouteCalculations";
import type { AreaOfInterest, Property } from "@/types/property";

interface AreaOfInterestMarkersProps {
  areasOfInterest: AreaOfInterest[];
  selectedProperty?: Property | null;
  directionsService?: google.maps.DirectionsService | null;
}

interface DurationData {
  duration: google.maps.Duration;
  distance: google.maps.Distance;
}

export const AreaOfInterestMarkers = React.memo<AreaOfInterestMarkersProps>(
  ({ areasOfInterest, selectedProperty, directionsService }) => {
    const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
      null
    );
    const directionsRenderersRef = useRef<google.maps.DirectionsRenderer[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null);

    // Pass the refs to useRouteCalculations
    const { calculateDurations } = useRouteCalculations(
      directionsServiceRef,
      directionsRenderersRef,
      mapRef
    );

    const [isCalculating, setIsCalculating] = useState(false);
    const [durations, setDurations] = useState<{
      [key: string]: DurationData | null;
    }>({});

    useEffect(() => {
      const calculateAllDurations = async () => {
        if (
          !selectedProperty?.location?.coordinates ||
          !directionsService ||
          areasOfInterest.length === 0
        ) {
          return;
        }

        setIsCalculating(true);

        try {
          const destinations = areasOfInterest.map(
            (area) => area.location.coordinates
          );

          const result = await calculateDurations(
            selectedProperty.location.coordinates,
            destinations,
            directionsService
          );

          const newDurations: typeof durations = {};
          areasOfInterest.forEach((area, index) => {
            if (result.durations[index]) {
              newDurations[area.id] = result.durations[index];
            }
          });

          setDurations(newDurations);
        } catch (error) {
          console.error("Error calculating durations:", error);
        } finally {
          setIsCalculating(false);
        }
      };

      calculateAllDurations();
    }, [
      selectedProperty,
      areasOfInterest,
      directionsService,
      calculateDurations,
    ]);

    if (areasOfInterest.length === 0) return null;

    return (
      <>
        {areasOfInterest.map((area, index) => (
          <AdvancedMarker
            key={area.id}
            position={area.location.coordinates}
            zIndex={20}
          >
            <AreaMarkerContent
              area={area}
              index={index}
              isCalculating={isCalculating}
              duration={durations[area.id]}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  }
);

// Sub-component for marker content
const AreaMarkerContent = React.memo<{
  area: AreaOfInterest;
  index: number;
  isCalculating: boolean;
  duration: DurationData | null | undefined;
}>(({ area, index, isCalculating, duration }) => {
  return (
    <div
      className="flex flex-col items-center transition-all duration-200 hover:scale-105"
      style={{ cursor: "pointer" }}
    >
      {/* Info bubble */}
      <div
        className={`relative bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-md mb-2 text-sm font-medium transition-all duration-200 ${
          isCalculating ? "animate-pulse" : ""
        }`}
        style={{
          minWidth: "120px",
          whiteSpace: "nowrap",
        }}
      >
        {isCalculating ? (
          <LoadingDots />
        ) : duration ? (
          <DurationDisplay duration={duration} />
        ) : (
          <span className="text-gray-500">Not available</span>
        )}

        {/* Bubble arrow */}
        <div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid white",
          }}
        />
      </div>

      {/* Marker circle */}
      <div
        className="flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-200 hover:scale-110"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: ROUTE_COLORS[index % ROUTE_COLORS.length],
          borderRadius: "50%",
          border: "3px solid white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {String.fromCharCode(65 + index)}
      </div>
    </div>
  );
});

// Loading dots component
const LoadingDots = React.memo(() => (
  <div className="flex items-center justify-center gap-2">
    <div
      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    />
    <div
      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    />
    <div
      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    />
  </div>
));

// Duration display component
const DurationDisplay = React.memo<{ duration: DurationData }>(
  ({ duration }) => (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-gray-900">
        {duration.duration.text}
      </span>
      <span className="text-xs text-gray-500 font-normal">
        {duration.distance.text}
      </span>
    </div>
  )
);

AreaOfInterestMarkers.displayName = "AreaOfInterestMarkers";
AreaMarkerContent.displayName = "AreaMarkerContent";
LoadingDots.displayName = "LoadingDots";
DurationDisplay.displayName = "DurationDisplay";
