// types.ts
import type { Property, Location, AreaOfInterest, Coordinates } from "@/types/property";
import { MutableRefObject } from "react";
import { MapBound } from "./PropertyMapMarker";

export interface RouteInfo {
  distance: string;
  duration: string;
  renderer?: google.maps.DirectionsRenderer;
}

// export interface PropertyCardInfo {
//   property: Property;
//   position: google.maps.LatLng;
// }

export type BoundType = {
  north: number;
  south: number;
  west: number;
  east: number;
};

export interface PropertyCardInfo {
  property: Property;
  position: google.maps.LatLng;
  anchor?: google.maps.marker.AdvancedMarkerElement | HTMLElement; // Anchor for InfoWindow
}

export interface PropertyMapMarkerProps {
  mapApi?: string;
  properties: Property[];
  selectedProperty: Property | null;
  onPropertyClick?: (property: Property | null) => void;
  areasOfInterest: AreaOfInterest[];
  referencePoint?: Location;
  onLoad?: () => void;
  className?: string;
  padding?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  centerOnSelect?: boolean;
  removeAreaOfInterestRef: MutableRefObject<PropertyMapMarkerDataRef | null> | null;
  handlePropertyDeselect: () => void;
  setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
  userLocation?: { lat: number; lng: number } | null;
  calculateFromLocation?: boolean;
  hoveredPropertyId?: string | null;
};

export interface PropertyMapProps extends PropertyMapMarkerProps {
  currentBound: { INDIA_BOUNDS: BoundType, INDIA_CENTER: Coordinates };
}

export type CityClusterData = {
  count: number;
  position: google.maps.LatLngLiteral;
  properties: Property[];
  totalValue: number;
  distanceFromCenter: number;
};

export interface Ref<T> {
  value: T;
}

export function ref<T>(value: T): Ref<T> {
  return { value };
}

export interface PropertyMapMarkerDataRef {
  clearRoutes: () => void;
}
