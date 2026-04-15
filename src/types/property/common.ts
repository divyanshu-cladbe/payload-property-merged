// types/property/common.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location extends Coordinates {
  address?: string;
  // coordinates?: Coordinates;
  name?: string; // Make coordinates required
}

export interface PropertyLocation {
  sector?: string;
  city?: string;
  state?: string;
  coordinates: Coordinates; // Make coordinates required
  address?: string;
}

export interface PropertyPrice {
  min?: number;
  max?: number;
  perSqft?: number;
  reitYield?: number;
  reitNavValue?: number;
  maintenanceCharges?: number;
  otherCharges?: {
    name: string;
    amount: number;
  }[];
}
