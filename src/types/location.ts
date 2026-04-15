export interface Locations {
    lat: number;
    lng: number;
    address: string;
  }
  
  export interface LocationState {
    currentLocation: Locations | null;
    isLocating: boolean;
    error: string | null;
    isLocationModalOpen: boolean;
  }
  
  export const initialState: LocationState = {
    currentLocation: null,
    isLocating: false,
    error: null,
    isLocationModalOpen: false
  };

  
export interface City {
  name: string;
  lat: number;
  lng: number;
  propertiesCount: number;
}