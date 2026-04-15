import { useState, useEffect } from "react";
import { getGeocode } from "use-places-autocomplete";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectLocation,
  setLocation,
  setLocationModalOpen,
  type Location,
} from "@/store/slices/locationSlice";
import { getCityClustersAction } from "@/actions/location";

export interface City {
  name: string;
  lat: number;
  lng: number;
  propertiesCount: number;
}

export const useLocationPicker = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { currentLocation, isLocationModalOpen } =
    useAppSelector(selectLocation);

  const [availableCities, setAvailableCities] = useState<{
    [key: string]: City;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available cities from Payload Local API
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const clusters = await getCityClustersAction();

        const citiesMap: { [key: string]: City } = {};
        clusters.forEach((cluster) => {
          const cityName = cluster.city;
          if (!citiesMap[cityName]) {
            citiesMap[cityName] = {
              name: cityName,
              lat: cluster.lat,
              lng: cluster.lng,
              propertiesCount: cluster.propertyCount,
            };
          } else {
            citiesMap[cityName].propertiesCount += cluster.propertyCount;
          }
        });

        setAvailableCities(citiesMap);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const showUnavailableCityToast = (cityName: string) => {
    toast({
      variant: "destructive",
      title: "Service Unavailable",
      description: `Sorry, we are currently not serving in ${cityName}. Please select from our available cities.`,
      duration: 5000,
    });
  };

  const saveLocationToStorage = (location: Location) => {
    localStorage.setItem("userLocation", JSON.stringify(location));
  };

  const handleCitySelect = async (cityName: string) => {
    const cityKey = Object.keys(availableCities).find(
      (key) => key.toLowerCase() === cityName.toLowerCase()
    );

    if (!cityKey) {
      showUnavailableCityToast(cityName);
      return;
    }

    const selectedCity = availableCities[cityKey];
    const location: Location = {
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      address: selectedCity.name,
      city: selectedCity.name.toLowerCase(),
      boundaryRadius: 15000,
      boundaryType: "circle",
    };

    saveLocationToStorage(location);
    dispatch(setLocation(location));
    closeModal();
  };

  const handleDetectLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) => {
              console.error("Geolocation error:", error);
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        }
      );

      const results = await getGeocode({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });

      if (!results || results.length === 0) {
        throw new Error("No geocoding results found");
      }

      const addressComponents = results[0]?.address_components || [];

      const city =
        addressComponents.find((c) => c.types.includes("locality"))
          ?.long_name ||
        addressComponents.find((c) =>
          c.types.includes("administrative_area_level_2")
        )?.long_name ||
        addressComponents.find((c) =>
          c.types.includes("administrative_area_level_3")
        )?.long_name ||
        addressComponents.find((c) =>
          c.types.includes("sublocality_level_1")
        )?.long_name;

      if (!city) {
        throw new Error(
          "Could not determine city from your location. Please select a city manually."
        );
      }

      const cityKey = Object.keys(availableCities).find(
        (key) => key.toLowerCase() === city.toLowerCase()
      );

      if (!cityKey) {
        showUnavailableCityToast(city);
        return;
      }

      const selectedCity = availableCities[cityKey];
      const location: Location = {
        lat: selectedCity.lat,
        lng: selectedCity.lng,
        address: selectedCity.name,
        city: selectedCity.name.toLowerCase(),
        boundaryRadius: 15000,
        boundaryType: "circle",
      };

      saveLocationToStorage(location);
      dispatch(setLocation(location));
      closeModal();

      toast({
        title: "Location Detected",
        description: `Your location has been set to ${selectedCity.name}`,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error getting location:", error);

      let errorMessage =
        "Unable to detect your location. Please try again or select a city manually.";
      let errorTitle = "Location Error";

      if (error?.code === 1) {
        errorTitle = "Permission Denied";
        errorMessage =
          "Location access was denied. Please enable location permissions in your browser settings and try again.";
      } else if (error?.code === 2) {
        errorTitle = "Position Unavailable";
        errorMessage =
          "Your location is currently unavailable. Please check your device settings and try again.";
      } else if (error?.code === 3) {
        errorTitle = "Request Timeout";
        errorMessage =
          "Location request timed out. Please check your internet connection and try again.";
      } else if (error?.message?.includes("city")) {
        errorTitle = "City Detection Failed";
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  const openModal = () => dispatch(setLocationModalOpen(true));
  const closeModal = () => dispatch(setLocationModalOpen(false));

  return {
    currentLocation,
    isLocationModalOpen,
    availableCities,
    isLoading,
    handleCitySelect,
    handleDetectLocation,
    openModal,
    closeModal,
  };
};
