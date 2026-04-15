import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { LocationHelper } from "@/utils/location-helper";

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  boundaryRadius?: number;
  boundaryType?: "circle" | "polygon";
  city?: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}
interface LocationState {
  currentLocation: Location | null;
  selectedCity: string;
  hasUserInteracted: boolean;
  isLocating: boolean;
  error: string | null;
  isLocationModalOpen: boolean;
}

//INFO: Helper to safely access localStorage
const getStoredLocation = (): Location | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("userLocation");
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

//INFO: Helper to get default city location (Delhi)
const getDefaultCityLocation = (cityName: string = "delhi"): Location => {
  const coordinates = LocationHelper.getCityCoordinates(cityName);
  const bounds = LocationHelper.getCityBounds(cityName);

  return {
    lat: coordinates?.lat || 28.6139,
    lng: coordinates?.lng || 77.209,
    address: `${cityName.charAt(0).toUpperCase() + cityName.slice(1)}, India`,
    city: cityName,
    bounds: bounds || undefined,
  };
};

const initialState: LocationState = {
  currentLocation: getStoredLocation() || getDefaultCityLocation("delhi"),
  selectedCity: "delhi",
  hasUserInteracted: false,
  isLocating: false,
  error: null,
  isLocationModalOpen: false,
};

export const getCurrentLocation = createAsyncThunk<
  Location,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("location/getCurrentLocation", async (_, { rejectWithValue }) => {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      address: "Location detected", // This will be updated with actual address later
    };

    return location;
  } catch (error) {
    return rejectWithValue("Unable to get your location");
  }
});

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
      state.hasUserInteracted = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("userLocation", JSON.stringify(action.payload));
      }
    },
    setSelectedCity: (state, action: PayloadAction<string>) => {
      const cityLocation = getDefaultCityLocation(action.payload);
      state.selectedCity = action.payload;
      if (!state.hasUserInteracted) {
        state.currentLocation = cityLocation;
      }
    },
    setUserInteracted: (state, action: PayloadAction<boolean>) => {
      state.hasUserInteracted = action.payload;
    },
    clearLocation: (state) => {
      state.currentLocation = getDefaultCityLocation(state.selectedCity);
      state.hasUserInteracted = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userLocation");
      }
    },
    setLocationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLocationModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLocation.pending, (state) => {
        state.isLocating = true;
        state.error = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.isLocating = false;
        state.currentLocation = action.payload;
        state.hasUserInteracted = true;
        state.error = null;
        state.isLocationModalOpen = false;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.isLocating = false;
        state.error = action.payload ?? "Failed to get location";
      });
  },
});

export const {
  setLocation,
  setSelectedCity,
  setUserInteracted,
  clearLocation,
  setLocationModalOpen,
} = locationSlice.actions;
export const selectLocation = (state: RootState) => state.location;
export default locationSlice.reducer;
