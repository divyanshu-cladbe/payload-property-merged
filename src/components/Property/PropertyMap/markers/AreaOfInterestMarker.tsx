import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { AreaOfInterest } from "@/types/property";
import CarIcon from "../../icons/CarIcon";
import { RouteDuration } from "@/hooks/useRouteCalculation";
import { AreaOfInterestIcon } from "../../icons/AreaOfInterestIcon";
import { AreaOfInterestDuration } from "../AreaOfInterestDuration";

export const AreaOfInterestMarker = ({
  areasOfInterest,
  routeDurations,
}: {
  areasOfInterest: AreaOfInterest[];
  routeDurations: RouteDuration[];
}) => {
  return (
    <>
      {areasOfInterest.map((area, index) => {
        if (!area.location?.coordinates) return null;

        const matchingRoute = routeDurations.find(
          (routeDuration) => area.id === routeDuration.areaId
        );
        const letter = String.fromCharCode(65 + index);

        return matchingRoute ? (
          <AdvancedMarker
            position={area.location.coordinates}
            key={area.id || index}
            zIndex={999}
          >
            <AreaOfInterestDuration
              duration={matchingRoute.duration}
              distance={matchingRoute.distance}
              letter={letter}
            />
          </AdvancedMarker>
        ) : (
          <AdvancedMarker
            position={area.location.coordinates}
            key={area.id || index}
            zIndex={999}
          >
            <AreaOfInterestIcon letter={letter} colorIndex={index} />
          </AdvancedMarker>
        );
      })}
    </>
  );
};
