import React, { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Property } from "@/types/property";

interface PropertyAreaHighlightProps {
  properties: Property[];
}

export const PropertyAreaHighlight: React.FC<PropertyAreaHighlightProps> = ({
  properties,
}) => {
  const map = useMap();
  const circlesRef = useRef<google.maps.Circle[]>([]);

  useEffect(() => {
    if (!map) return;

    // Cleanup existing circles
    circlesRef.current.forEach((circle) => circle.setMap(null));
    circlesRef.current = [];

    properties.forEach((property) => {
      if (
        !property.location?.coordinates ||
        !property.areaInSqmt
      ) {
        return;
      }

      const area = parseFloat(property.areaInSqmt);
      if (isNaN(area)) return;

      const radius = Math.sqrt(area / Math.PI);
      
      const isBoosted = property.isBoosted;
      const fillColor = isBoosted ? "#810FCB" : "#3B82F6"; // Purple for boosted, Blue for standard

      const circle = new google.maps.Circle({
        strokeColor: fillColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: fillColor,
        fillOpacity: 0.4,
        map,
        center: property.location.coordinates,
        radius: radius,
        zIndex: 1, // Ensure it's below markers (markers usually have higher zIndex)
        clickable: false, // Allow clicks to pass through to the map/markers? User didn't specify, but usually highlights shouldn't block interaction unless they are the primary interactive element.
      });

      circlesRef.current.push(circle);
    });

    return () => {
      circlesRef.current.forEach((circle) => circle.setMap(null));
      circlesRef.current = [];
    };
  }, [map, properties]);

  return null;
};
