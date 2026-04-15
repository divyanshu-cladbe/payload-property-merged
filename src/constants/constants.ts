// constants.ts
export const INDIA_CENTER = { lat: 20.5937, lng: 78.9629 };

export const ZOOM_LEVELS = {
  COUNTRY: 5, // Show country level
  STATE: 7, // Show state clusters
  CITY: 9, // Show city clusters
  PROPERTIES: 12, // Show individual properties
};

export const MAX_ZOOM_FOR_CLUSTERS = ZOOM_LEVELS.CITY;
export const MIN_ZOOM_FOR_PROPERTIES = ZOOM_LEVELS.PROPERTIES;

export const ROUTE_COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#ea580c",
  "#8b5cf6",
] as const;

export const GOOGLE_MAPS_LIBRARIES: (
  | "places"
  | "geometry"
  | "drawing"
  | "visualization"
  | "marker"
)[] = ["places", "geometry","marker"];

export const PROPERTY_CARD_STYLES = {
  card: "bg-white rounded-lg shadow-lg max-w-xs w-72 overflow-hidden transition-all duration-200 hover:shadow-xl",
  image: "w-full h-40 object-cover",
  content: "p-4",
  title: "font-semibold text-gray-900 text-lg mb-2 line-clamp-1",
  detail: "text-sm text-gray-600 flex items-center gap-1",
  detailIcon: "w-4 h-4 text-gray-400",
  price: "text-lg font-bold text-blue-600 mt-2",
};

