export const MAP_CONFIG = {
  // India geographical bounds and center
  INDIA_CENTER: { lat: 20.5937, lng: 78.9629 },
  INDIA_BOUNDS: {
    north: 35.6745,
    south: 6.7468,
    west: 68.1119,
    east: 97.4153,
  },
  
  // new comment
  // Default map settings
  DEFAULT_ZOOM: 12,
  DEFAULT_MAP_OPTIONS: {
    disableDefaultUI: false,
    gestureHandling: "greedy" as const,
    restriction: {
      strictBounds: false,
    },
  },

  // Required Google Maps libraries
  LIBRARIES: ["places", "geometry", "marker"] as string[],

  // Map container styles
  CONTAINER_STYLES: {
    width: "100%",
    height: "100%",
  },

  // Default map style (can be replaced with any style JSON from SnazzyMaps)
  MAP_STYLE: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#FFC0CB" }],
    },
  ] as const,

  // Zoom levels for different views
  ZOOM_LEVELS: {
    COUNTRY: 5,
    STATE: 7,
    CITY: 9,
    PROPERTIES: 12,
  },

  // Dynamic clustering configuration optimized for city clusters at zoom 5-8
  MAX_ZOOM_FOR_CLUSTERS: 12, // Clusters work up to zoom 12 for city-level grouping
  MIN_ZOOM_FOR_PROPERTIES: 13, // Show individual properties at zoom 13+
  MAX_ZOOM: 22, // Google Maps standard maximum

  // Route colors for directions
  ROUTE_COLORS: [
    "#2563eb",
    "#dc2626",
    "#16a34a",
    "#ea580c",
    "#8b5cf6",
  ] as const,
} as const;

export type MapBounds = typeof MAP_CONFIG.INDIA_BOUNDS;
export type MapCenter = typeof MAP_CONFIG.INDIA_CENTER;
export type MapLibraries = typeof MAP_CONFIG.LIBRARIES;
export type MapStyle = typeof MAP_CONFIG.MAP_STYLE;
