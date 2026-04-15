import { useState, useCallback, MutableRefObject, useRef } from "react";
import { ROUTE_COLORS } from "@/constants/constants";
import type { Property, AreaOfInterest } from "@/types/property";
import type { RouteInfo } from "../PropertyMap/types";
import { RouteAnimator } from "./route-animator";

// Configuration constants
const CACHE_LIFETIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const DEFAULT_ANIMATION_DURATION = 2000; // 2 seconds
const ROUTE_STYLE = {
  default: { strokeOpacity: 0.8, strokeWeight: 6, zIndex: 100 },
  hovered: { strokeOpacity: 0.4, strokeWeight: 4, zIndex: 50 },
};

// Types for better type safety
interface CachedRoute {
  data: google.maps.DirectionsResult;
  timestamp: number;
}

interface RouteCalculationParams {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  routeKey: string;
  color?: string;
  isHovered?: boolean;
}

interface RouteCalculationResult {
  routeInfo: RouteInfo;
  directionsResult: google.maps.DirectionsResult;
}

export const useRouteCalculations = (
  directionsService: MutableRefObject<google.maps.DirectionsService | null>,
  directionsRenderers: MutableRefObject<google.maps.DirectionsRenderer[]>,
  mapRef: MutableRefObject<google.maps.Map | null>
) => {
  const [isCalculatingRoutes, setIsCalculatingRoutes] = useState(false);
  const [routes, setRoutes] = useState<Record<string, RouteInfo>>({});
  const routeCache = useRef<Record<string, CachedRoute>>({});

  // Helper function to generate a unique route key
  const generateRouteKey = (
    propertyId: string,
    origin: google.maps.LatLngLiteral
  ) => `route-${propertyId}-${origin.lat},${origin.lng}`;

  // Helper function to check if cached route is valid
  const getCachedRoute = useCallback(
    (key: string): google.maps.DirectionsResult | null => {
      const cached = routeCache.current[key];
      if (cached && Date.now() - cached.timestamp < CACHE_LIFETIME) {
        return cached.data;
      }
      return null;
    },
    []
  );

  // Helper function to cache route results
  const cacheRoute = useCallback(
    (key: string, data: google.maps.DirectionsResult) => {
      routeCache.current[key] = { data, timestamp: Date.now() };
    },
    []
  );

  // Clear all existing routes from the map
  const clearRoutes = useCallback(() => {
    directionsRenderers.current.forEach((renderer) => renderer.setMap(null));
    directionsRenderers.current = [];
    setRoutes({});
  }, []);

  // Calculate a single route and render it on the map
  const calculateSingleRoute = useCallback(
    async ({
      origin,
      destination,
      routeKey,
      color = "blue",
      isHovered = false,
    }: RouteCalculationParams): Promise<RouteCalculationResult | null> => {
      if (!directionsService.current || !mapRef.current) {
        console.error("Missing directions service or map reference");
        return null;
      }

      try {
        // Check cache first
        const cachedResult = getCachedRoute(routeKey);
        if (cachedResult) {
          return {
            routeInfo: routes[routeKey] || {
              distance: "0 km",
              duration: "0 mins",
            },
            directionsResult: cachedResult,
          };
        }

        // Calculate new route
        const request: google.maps.DirectionsRequest = {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        const result = await directionsService.current.route(request);
        if (!result.routes?.[0]) {
          console.warn("No routes found for request");
          return null;
        }

        const route = result.routes[0];
        const animator = new RouteAnimator(
          mapRef.current,
          route.overview_path,
          {
            strokeColor: color,
            ...ROUTE_STYLE[isHovered ? "hovered" : "default"],
          }
        );

        // Store renderer for cleanup
        directionsRenderers.current.push({
          setMap: (map: google.maps.Map | null) => {
            if (!map) animator.remove();
          },
        } as unknown as google.maps.DirectionsRenderer);

        await animator.animate(DEFAULT_ANIMATION_DURATION);

        // Calculate route metrics
        const totalDistance = route.legs.reduce(
          (sum, leg) => sum + (leg.distance?.value || 0),
          0
        );
        const totalDuration = route.legs.reduce(
          (sum, leg) => sum + (leg.duration?.value || 0),
          0
        );

        const routeInfo: RouteInfo = {
          distance: `${(totalDistance / 1000).toFixed(1)} km`,
          duration: `${Math.round(totalDuration / 60)} mins`,
        };

        setRoutes((prev) => ({ ...prev, [routeKey]: routeInfo }));
        cacheRoute(routeKey, result);

        return { routeInfo, directionsResult: result };
      } catch (error) {
        console.error("Error calculating route:", error);
        return null;
      }
    },
    [directionsService, mapRef, getCachedRoute, cacheRoute]
  );

  // Calculate and draw routes from areas of interest to a hovered property
  const calculateAndDrawRoutes = useCallback(
    async (hoveredProp: Property, areas: AreaOfInterest[]) => {
      if (!hoveredProp.location?.coordinates || areas.length === 0) {
        console.warn("Missing property coordinates or areas of interest");
        return;
      }

      setIsCalculatingRoutes(true);
      clearRoutes();

      const destination: google.maps.LatLngLiteral = {
        lat: hoveredProp.location.coordinates.lat,
        lng: hoveredProp.location.coordinates.lng,
      };
      const originAOI = areas[0].location?.coordinates;

      if (originAOI) {
        const routeKey = `hovered-${hoveredProp.id}-${originAOI.lat},${originAOI.lng}`;
        await calculateSingleRoute({
          origin: { lat: originAOI.lat, lng: originAOI.lng },
          destination,
          routeKey,
          color: "magenta",
          isHovered: true,
        });
      } else {
        console.warn("Primary area of interest has no coordinates");
      }

      setIsCalculatingRoutes(false);
    },
    [calculateSingleRoute, clearRoutes]
  );

  // Calculate routes from multiple origins to a destination property
  const calculateRoutesToProperty = useCallback(
    async (
      origins: google.maps.LatLngLiteral[],
      destinationProperty: Property
    ) => {
      if (!destinationProperty.location?.coordinates) {
        console.error("Destination property has no coordinates");
        setIsCalculatingRoutes(false);
        return;
      }

      setIsCalculatingRoutes(true);
      clearRoutes();

      const destination: google.maps.LatLngLiteral =
        destinationProperty.location.coordinates;
      const routePromises = origins.map((origin, index) =>
        calculateSingleRoute({
          origin,
          destination,
          routeKey: generateRouteKey(destinationProperty.id, origin),
          color: ROUTE_COLORS[index % ROUTE_COLORS.length],
        })
      );

      await Promise.all(routePromises);
      setIsCalculatingRoutes(false);
    },
    [calculateSingleRoute, clearRoutes]
  );

  // Calculate durations for multiple destinations from a single origin
  const calculateDurations = useCallback(
    async (
      origin: google.maps.LatLngLiteral,
      destinations: google.maps.LatLngLiteral[],
      service: google.maps.DirectionsService
    ) => {
      try {
        const results = await Promise.all(
          destinations.map(async (destination) => {
            try {
              const result = await service.route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
              });

              if (result.routes[0]?.legs[0]) {
                return {
                  duration: result.routes[0].legs[0].duration!,
                  distance: result.routes[0].legs[0].distance!,
                };
              }
              return null;
            } catch (error) {
              console.error("Error calculating route duration:", error);
              return null;
            }
          })
        );

        return { durations: results };
      } catch (error) {
        console.error("Error calculating durations:", error);
        return { durations: Array(destinations.length).fill(null) };
      }
    },
    []
  );

  return {
    isCalculatingRoutes,
    routes,
    clearRoutes,
    calculateAndDrawRoutes,
    calculateRoutesToProperty,
    calculateDurations,
  };
};
