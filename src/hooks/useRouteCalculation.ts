import { useState, useCallback, MutableRefObject, useRef } from "react";
import type { Property, AreaOfInterest } from "@/types/property";
import { RouteAnimator } from "@/utils/route-animator";
import { polylineCache } from "@/utils/polylineCache";

export type RouteDuration = {
  areaId: string;
  duration: string;
  distance: string;
};

export const useRouteCalculations = (
  directionsService: MutableRefObject<google.maps.DirectionsService | null>,
  directionsRenderers: MutableRefObject<google.maps.DirectionsRenderer[]>,
  mapRef: MutableRefObject<google.maps.Map | null>
) => {
  const [isCalculatingRoutes, setIsCalculatingRoutes] = useState(false);
  const [routeDurations, setRouteDurations] = useState<RouteDuration[]>([]);

  // Keep track of current property to avoid clearing routes on map movements
  const currentPropertyRef = useRef<string | null>(null);
  const currentAreasRef = useRef<string[]>([]);

  //INFO CLEARING THE ROUTES (only when property/areas change, NOT on map pan/zoom)
  const clearRoutes = useCallback(() => {
    // console.log("[Routes] Clearing existing routes...");
    directionsRenderers.current.forEach((renderer) => {
      renderer.setMap(null);
    });
    directionsRenderers.current = [];
    setRouteDurations([]);
    currentPropertyRef.current = null;
    currentAreasRef.current = [];
  }, []);
  //INFO CALCULATING THE SINGLE ROUTE WITH CACHING
  const calculateSingleRoute = useCallback(
    async (
      origin: google.maps.LatLngLiteral,
      destination: google.maps.LatLngLiteral,
      routeKey: string,
      color: string = "blue",
      isHoveredRoute: boolean = false
    ) => {
      if (!directionsService.current || !mapRef.current) return null;

      try {
        // Check cache first
        const cachedRoute = polylineCache.getCachedRoute(origin, destination);
        let result: google.maps.DirectionsResult;

        if (cachedRoute) {
          // console.log(`[Routes] Using cached route for ${routeKey}`);
          result = cachedRoute.data;
        } else {
          // console.log(`[Routes] Fetching new route for ${routeKey}`);
          const request: google.maps.DirectionsRequest = {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          result = await directionsService.current.route(request);

          // Store in cache after successful fetch
          if ("routes" in result && result.routes?.[0]) {
            polylineCache.setCachedRoute(origin, destination, result);
          }
        }

        if ("routes" in result && result.routes?.[0]) {
          const route = result.routes[0];
          const path = route.overview_path;

          // Create animated route
          const animator = new RouteAnimator(mapRef.current, path, {
            strokeColor: color,
            strokeOpacity: isHoveredRoute ? 0.7 : 0.8,
            strokeWeight: isHoveredRoute ? 6 : 8,
            zIndex: isHoveredRoute ? 50 : 999,
          });

          // Store reference for cleanup
          directionsRenderers.current.push({
            setMap: (map: google.maps.Map | null) => {
              if (!map) animator.remove();
            },
          } as unknown as google.maps.DirectionsRenderer);

          // Start animation
          await animator.animate(1000); // 1 seconds duration

          //Calculate route info
          const totalDistanceValue =
            route.legs?.reduce(
              (sum, leg) => sum + (leg.distance?.value || 0),
              0
            ) || 0;

          const totalDurationValue =
            route.legs?.reduce(
              (sum, leg) => sum + (leg.duration?.value || 0),
              0
            ) || 0;

          const keyArray = routeKey.split("-");
          const areaId = keyArray[keyArray.length - 1];

          // Format duration: if >= 60 mins, show hours
          const minutes = Math.round(totalDurationValue / 60);
          const formattedDuration =
            minutes >= 60
              ? `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? "s" : ""
              }${minutes % 60 > 0 ? ` ${minutes % 60} min` : ""}`
              : `${minutes} min`;

          // Format distance in KM
          const distanceInKm = (totalDistanceValue / 1000).toFixed(1);

          setRouteDurations((prev) => [
            ...prev,
            {
              areaId,
              duration: formattedDuration,
              distance: `${distanceInKm} KM`,
            },
          ]);
          return result;
        }
      } catch (error) {
        console.error("Error calculating route:", error);
      }
      return null;
    },
    [directionsService, mapRef]
  );
  //INFO CALCULATING AND DRAWING THE ROUTES (with smart caching)
  const calculateAndDrawRoutes = useCallback(
    async (hoveredProp: Property, areas: AreaOfInterest[]) => {
      // Validate inputs
      if (!hoveredProp.location?.coordinates || areas.length === 0) {
        clearRoutes();
        return;
      }

      // Check if we're already showing routes for the same property and areas
      const areaIds = areas.map((a) => a.id).sort().join(",");
      const isSameProperty = currentPropertyRef.current === hoveredProp.id;
      const isSameAreas = currentAreasRef.current.join(",") === areaIds;

      if (isSameProperty && isSameAreas) {
        // console.log("[Routes] Same property and areas, skipping recalculation");
        return;
      }

      // Update current refs
      currentPropertyRef.current = hoveredProp.id;
      currentAreasRef.current = areas.map((a) => a.id).sort();

      // Clear old routes only when property or areas change
      clearRoutes();
      setRouteDurations([]);

      setIsCalculatingRoutes(true);
      // Origin is now the property marker
      const origin: google.maps.LatLngLiteral = {
        lat: hoveredProp.location.coordinates.lat,
        lng: hoveredProp.location.coordinates.lng,
      };

      try {
        // Process all areas in parallel
        await Promise.all(
          areas.map(async (area) => {
            const destinationCoords = area.location?.coordinates;
            if (!destinationCoords) {
              // console.log(`Skipping area ${area.id} - missing coordinates`);
              return;
            }

            // Destination is now the POI
            const destination: google.maps.LatLngLiteral = {
              lat: destinationCoords.lat,
              lng: destinationCoords.lng,
            };

            const routeKey = `hovered-${hoveredProp.id}-${area.id}`;
            await calculateSingleRoute(
              origin,
              destination,
              routeKey,
              "#BB2828",
              true
            );
          })
        );
      } catch (error) {
        console.error("Error calculating routes:", error);
      } finally {
        setIsCalculatingRoutes(false);
      }
    },
    [calculateSingleRoute, clearRoutes, setRouteDurations]
  );
  //INFO CALCULATING ROUTES TO PROPERTY
  const calculateRoutesToProperty = useCallback(
    async (
      origins: google.maps.LatLngLiteral[],
      destinationProperty: Property
    ) => {
      setIsCalculatingRoutes(true);
      clearRoutes(); // Clear all previous routes before drawing new ones

      const destination = destinationProperty.location?.coordinates;
      if (!destination) {
        console.error(
          "Destination property has no coordinates for route calculation."
        );
        setIsCalculatingRoutes(false);
        return;
      }

      const routePromises = origins.map((origin, index) => {
        const routeKey = `route-${destinationProperty.id}-${origin.lat},${origin.lng}`;
        // const color = ROUTE_COLORS[index % ROUTE_COLORS.length]; // Cycle through colors
        return calculateSingleRoute(origin, destination, routeKey);
      });

      await Promise.all(routePromises); // Wait for all routes to be calculated and rendered

      setIsCalculatingRoutes(false);
    },
    [calculateSingleRoute]
  );

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
              console.error("Error calculating route:", error);
              return null;
            }
          })
        );

        return { durations: results };
      } catch (error) {
        console.error("Error calculating durations:", error);
        return {
          durations: Array(destinations.length).fill(null),
        };
      }
    },
    []
  );
  // Clear all caches (useful for debugging or manual refresh)
  const clearAllCaches = useCallback(() => {
    clearRoutes();
    polylineCache.clearAllRoutes();
    // console.log("[Routes] All caches cleared");
  }, [clearRoutes]);

  // Get cache statistics (useful for debugging)
  const getCacheStats = useCallback(() => {
    return polylineCache.getCacheStats();
  }, []);

  return {
    isCalculatingRoutes,
    clearRoutes,
    calculateAndDrawRoutes,
    calculateRoutesToProperty,
    calculateDurations,
    routeDurations,
    setRouteDurations,
    clearAllCaches,
    getCacheStats,
  };
};
