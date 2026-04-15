import React from "react";
import { ROUTE_COLORS } from "@/constants/constants";
import { RouteInfo } from "../types";
import type { AreaOfInterest, Property } from "@/types/property";

interface RouteInfoPanelProps {
  hoveredProperty: Property | null;
  routes: { [key: string]: RouteInfo };
  areasOfInterest: AreaOfInterest[];
}

export const RouteInfoPanel = React.memo<RouteInfoPanelProps>(
  ({ hoveredProperty, routes, areasOfInterest }) => {
    if (!hoveredProperty || Object.keys(routes).length === 0) return null;

    return (
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-10">
        <h3 className="font-semibold mb-2">Drive Times:</h3>
        {areasOfInterest.map((area, index) => {
          const route = routes[area.id];
          if (!route) return null;

          return (
            <div
              key={area.id}
              className="flex items-center gap-2 text-sm mb-1"
              style={{ color: ROUTE_COLORS[index % ROUTE_COLORS.length] }}
            >
              <span className="font-medium">
                Location {String.fromCharCode(65 + index)}:
              </span>
              <span>{route.duration}</span>
              <span className="text-gray-500">({route.distance})</span>
            </div>
          );
        })}
      </div>
    );
  }
);

RouteInfoPanel.displayName = "RouteInfoPanel";
