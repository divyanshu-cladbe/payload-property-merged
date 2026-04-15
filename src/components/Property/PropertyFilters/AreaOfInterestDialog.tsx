import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  X,
  MapPin,
  GripVertical,
  SquarePen,
  Trash2,
  Search as SearchIcon,
  Pen,
  Check,
} from "lucide-react";
import type { AreaOfInterest } from "@/types/property";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AutocompleteInput } from "./AutocompleteInput";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLocation } from "@/store/slices/locationSlice";
import { useToast } from "@/hooks/use-toast";
import type { RouteDuration } from "@/hooks/useRouteCalculation";

interface AreaOfInterestDialogProps {
  areas: AreaOfInterest[];
  newAreaName: string;
  isGeocoding: boolean;
  canAddMore: boolean;
  isAtLimit: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNameChange: (name: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddArea: (name?: string) => void;
  onRemoveArea?: (areaId: string) => void;
  onUpdateArea?: (areaId: string, newName: string) => void;
  onUpdateAreaWithGeocode?: (areaId: string, newName: string) => Promise<void>;
  onCalculationUpdate?: (
    enabled: boolean,
    userLocation: { lat: number; lng: number } | null,
    distances: RouteDuration[]
  ) => void;
  trigger?: React.ReactNode;
  isMobile?: boolean;
  isEditing?: boolean;
}

export const AreaOfInterestDialog: React.FC<AreaOfInterestDialogProps> = ({
  areas,
  newAreaName,
  isGeocoding,
  canAddMore,
  isAtLimit,
  isOpen,
  onOpenChange,
  onNameChange,
  onKeyPress,
  onAddArea,
  onRemoveArea,
  onUpdateArea,
  onUpdateAreaWithGeocode,
  onCalculationUpdate,
  trigger,
  isMobile,
  isEditing: initialIsEditing = false,
}) => {
  const [showInput, setShowInput] = useState(false);
  const isSmall = useMediaQuery("(max-width: 768px)");
  const useMobileLayout = isMobile ?? isSmall;
  const { currentLocation } = useAppSelector(selectLocation);
  const { toast } = useToast();

  // State to track which POI is being edited
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  // State to track the value being edited
  const [editingValue, setEditingValue] = useState<string>("");

  // State for distance calculation feature
  const [calculateFromLocation, setCalculateFromLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distances, setDistances] = useState<RouteDuration[]>([]);

  // Initialize editingIndex based on initialIsEditing prop
  useEffect(() => {
    if (initialIsEditing && areas.length > 0) {
      setEditingIndex(0); // Start editing the first area if in initial editing mode
    } else {
      setEditingIndex(null);
    }
  }, [initialIsEditing, areas.length]);

  useEffect(() => {
    if (isOpen) {
      setShowInput(areas.length === 0);
    }
  }, [isOpen, areas.length, initialIsEditing]);

  const gradients = [
    "from-[#E02323] to-[#FFB8B8]",
    "from-[#485CE2] to-[#A9C1FF]",
    "from-[#33D885] to-[#48AF7F]",
  ];

  const handleAddArea = () => {
    if (newAreaName.trim()) {
      onAddArea();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newAreaName.trim() && canAddMore) {
      handleAddArea();
    }
    onKeyPress(e);
  };

  const handlePlaceSelect = async (place: any) => {
    const name = place?.name || place?.address || "";
    if (!name) return;

    // if (useMobileLayout) {
    try {
      onNameChange(name);
      await Promise.resolve(onAddArea(name));
      setShowInput(true);
    } catch { }
    // } else {
    // }
  };

  // Handle toggle change for location-based distance calculation
  const handleToggleChange = async (checked: boolean) => {
    // console.log("🔘 Toggle changed:", checked);
    setCalculateFromLocation(checked);

    if (checked) {
      // Helper function to get position with specific options
      const getPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

      try {
        let position: GeolocationPosition | null = null;
        let usedFallback = false;

        try {
          // First attempt: High accuracy with increased timeout
          // console.log("📍 Attempting high accuracy location...");
          position = await getPosition({
            enableHighAccuracy: true,
            timeout: 10000, // Increased to 10s
            maximumAge: 0,
          });
        } catch (highAccuracyError) {
          console.warn("High accuracy location failed, trying low accuracy...", highAccuracyError);

          try {
            // Second attempt: Low accuracy (fallback) with longer timeout
            position = await getPosition({
              enableHighAccuracy: false,
              timeout: 20000, // Increased to 20s
              maximumAge: Infinity, // Accept cached position
            });
          } catch (lowAccuracyError) {
            console.warn("Low accuracy location failed, trying default options...", lowAccuracyError);
            try {
              // Third attempt: Default options (browser decides)
              position = await getPosition();
              // console.log("✅ Default geolocation succeeded");
            } catch (defaultError) {
              console.warn("All geolocation attempts failed, checking fallback location...", defaultError);
              // console.log("📍 Current location from Redux:", currentLocation);
              // Use currentLocation from Redux as fallback
              if (currentLocation?.lat && currentLocation?.lng) {
                usedFallback = true;
                // console.log("✅ Using current location from Redux as fallback:", {
                //   lat: currentLocation.lat,
                //   lng: currentLocation.lng,
                //   city: currentLocation.city
                // });
              } else {
                console.error("❌ No fallback location available. currentLocation:", currentLocation);
                throw defaultError; // No fallback available
              }
            }
          }
        }

        let userLoc: { lat: number; lng: number };

        // console.log("🔍 Determining user location - usedFallback:", usedFallback, "position:", !!position);

        if (usedFallback && currentLocation) {
          // Use Redux current location as fallback
          userLoc = {
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          };
        } else if (position) {
          // Use geolocation position
          userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        } else {
          throw new Error("No location available");
        }

        setUserLocation(userLoc);
        // console.log("📍 User location set:", userLoc);

        // Log city name for testing
        try {
          const results = await getGeocode({ location: userLoc });
          const city = results[0]?.address_components.find((c: any) =>
            c.types.includes("locality")
          )?.long_name;
          // console.log("Detected City:", city);

          toast({
            title: usedFallback ? "Using Current City Location" : "Location Detected",
            description: usedFallback
              ? `Using your current city (${city || currentLocation?.city || "Unknown"}) as reference point`
              : `Your current location is ${city}`,
            duration: 3000,
          });
        } catch (e) {
          // console.log("Could not detect city name from coordinates");
          toast({
            title: usedFallback ? "Using Current City Location" : "Location Detected",
            description: usedFallback
              ? `Using your current city as reference point`
              : "Location detected successfully",
            duration: 3000,
          });
        }

        // Calculate distances if areas exist
        if (areas.length > 0) {
          await calculateDistances(userLoc, areas);
        }

      } catch (error: any) {
        // Handle geolocation errors
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to detect your location. Please enable location services in your browser or system settings.";
        let errorTitle = "Location Error";

        if (error?.code === 1) {
          errorTitle = "Permission Denied";
          errorMessage =
            "Location access was denied. Please enable location permissions in your browser settings and try again.";
        } else if (error?.code === 2) {
          errorTitle = "Position Unavailable";
          errorMessage =
            "Your location is currently unavailable. This may be due to:\n• Location services disabled on your device\n• Running on localhost without HTTPS\n• Browser location settings not configured\n\nPlease check your system and browser settings.";
        } else if (error?.code === 3) {
          errorTitle = "Request Timeout";
          errorMessage =
            "Location request timed out. Please check your internet connection and try again.";
        }

        toast({
          variant: "destructive",
          title: errorTitle,
          description: errorMessage,
          duration: 7000,
        });

        // Reset toggle on error
        setCalculateFromLocation(false);
      }
    } else {
      // Clear location and distances when toggle is disabled
      setUserLocation(null);
      setDistances([]);
    }
  };

  // Calculate distances from user location to all POIs
  const calculateDistances = async (
    origin: { lat: number; lng: number },
    pois: AreaOfInterest[]
  ) => {
    if (!window.google?.maps) {
      console.error("Google Maps not loaded");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const newDistances: RouteDuration[] = [];

    try {
      // Calculate distance for each POI
      await Promise.all(
        pois.map(async (area, index) => {
          const destinationCoords = area.location?.coordinates;
          if (!destinationCoords) return;

          try {
            const result = await directionsService.route({
              origin,
              destination: destinationCoords,
              travelMode: google.maps.TravelMode.DRIVING,
            });

            if (result.routes[0]?.legs[0]) {
              const leg = result.routes[0].legs[0];
              const totalDistanceValue = leg.distance?.value || 0;
              const totalDurationValue = leg.duration?.value || 0;

              // Format duration
              const minutes = Math.round(totalDurationValue / 60);
              const formattedDuration =
                minutes >= 60
                  ? `${Math.floor(minutes / 60)} hour${Math.floor(minutes / 60) > 1 ? "s" : ""
                  }${minutes % 60 > 0 ? ` ${minutes % 60} min` : ""}`
                  : `${minutes} min`;

              // Format distance in KM
              const distanceInKm = (totalDistanceValue / 1000).toFixed(1);

              newDistances.push({
                areaId: area.id,
                duration: formattedDuration,
                distance: `${distanceInKm} KM`,
              });
            }
          } catch (error) {
            console.error(`Error calculating route for ${area.name}:`, error);
          }
        })
      );

      setDistances(newDistances);
    } catch (error) {
      console.error("Error calculating distances:", error);
    }
  };

  // Recalculate distances when areas change and toggle is enabled
  useEffect(() => {
    if (calculateFromLocation && userLocation && areas.length > 0) {
      calculateDistances(userLocation, areas);
    } else if (calculateFromLocation && areas.length === 0) {
      setDistances([]);
    }
  }, [areas, calculateFromLocation, userLocation]);

  // Notify parent of calculation updates
  useEffect(() => {
    onCalculationUpdate?.(calculateFromLocation, userLocation, distances);
  }, [calculateFromLocation, userLocation, distances, onCalculationUpdate]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      {useMobileLayout ? (
        <DialogContent className="w-[95vw] max-w-md p-4 rounded-2xl max-h-[90vh] flex flex-col">
          <DialogTitle className="text-lg font-semibold text-center">
            Add Point Of Interest
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose your place to add to your areas of interest.
          </DialogDescription>
          <div className="text-center px-2 mt-1">
            <p className="text-sm text-gray-600">
              Find any place, landmark, or address you want to save as a point
              of interest.
            </p>
          </div>
          <div className="mt-4 space-y-2 overflow-y-auto flex-1">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="flex-1 bg-gray-100 rounded-lg p-2 flex items-center gap-2"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-b ${gradients[index % gradients.length]
                      } flex items-center justify-center text-white text-xs font-semibold shadow-sm flex-shrink-0`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex-1 relative">
                    <AutocompleteInput
                      key={`autocomplete-${index}-${currentLocation?.city || "default"
                        }`}
                      index={index}
                      value={
                        editingIndex === index
                          ? editingValue // Use editing value when editing
                          : areas[index]?.name ||
                          (index === areas.length ? newAreaName : "")
                      }
                      onChange={(value) => {
                        if (editingIndex === index) {
                          // Update editing value when editing existing POI
                          setEditingValue(value);
                        } else if (index === areas.length) {
                          // Update new area name when adding new POI
                          onNameChange(value);
                        }
                      }}
                      onPlaceSelect={(place) => {
                        if (index === areas.length) {
                          handlePlaceSelect(place);
                        }
                      }}
                      onKeyPress={onKeyPress}
                      placeholder="Add area, place or landmark"
                      isGeocoding={isGeocoding}
                      currentLocation={currentLocation}
                      autoFocus={isOpen && index === areas.length}
                      disabled={
                        calculateFromLocation || // Disable when toggle is enabled
                        (areas[index] && editingIndex !== index) || // Disable if existing POI and not currently editing it
                        (!areas[index] &&
                          areas.length > 0 &&
                          editingIndex !== null) // Disable add new if existing POIs and editing one
                      }
                    />
                  </div>
                  {areas[index] && (
                    <>
                      <button
                        onClick={async () => {
                          if (editingIndex === index) {
                            // Save the edited value and geocode if name changed
                            if (editingValue.trim()) {
                              if (
                                onUpdateAreaWithGeocode &&
                                editingValue.trim() !== areas[index].name
                              ) {
                                // Geocode the new location
                                await onUpdateAreaWithGeocode(
                                  areas[index].id,
                                  editingValue.trim()
                                );
                              } else if (onUpdateArea) {
                                // Just update the name without geocoding
                                onUpdateArea(
                                  areas[index].id,
                                  editingValue.trim()
                                );
                              }
                            }
                            setEditingIndex(null);
                            setEditingValue("");
                          } else {
                            // Enter editing mode for this POI
                            setEditingIndex(index);
                            setEditingValue(areas[index].name);
                          }
                        }}
                      // className="text-green-500" // Changed hover color for clarity
                      >
                        {editingIndex === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Pen className="h-4 w-4" />
                        )}
                      </button>
                      {editingIndex === index && (
                        <button
                          onClick={() => onRemoveArea?.(areas[index].id)} // remove button for existing POIs when editing
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" /> {/* Remove icon */}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 mt-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">From my location</span>
              <Switch
                checked={calculateFromLocation}
                onCheckedChange={handleToggleChange}
              />
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:opacity-90 text-white px-12 py-5 rounded-xl text-base font-semibold shadow-md"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-5xl p-0 max-h-[90vh]  gap-0 bg-white border-none shadow-2xl rounded-3xl overflow-hidden">
          <DialogTitle className="sr-only">Add Point Of Interest</DialogTitle>
          <DialogDescription className="sr-only">
            Choose your place to add to your areas of interest.
          </DialogDescription>
          {/* Two-column desktop layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Red gradient + helper + map preview  */}
            <div className="relative bg-gradient-to-br from-[#E05D31] to-[#E91614] p-0 flex flex-col">
              {/* Card stack preview */}
              <div
                className="relative flex justify-center mb-6"
                style={{ height: "120px" }}
              >
                {/* Back card C - more visible */}
                <div className="absolute bg-white rounded-2xl border border-gray-200 w-[280px] h-[50px] bottom-0 left-1/2 -translate-x-1/2 z-[1] shadow-lg">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      C
                    </div>
                  </div>
                </div>
                {/* Middle card B */}
                <div className="absolute bg-white rounded-2xl border border-gray-200 w-[300px] h-[55px] bottom-3 left-1/2 -translate-x-1/2 z-[2] shadow-lg">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      B
                    </div>
                  </div>
                </div>
                {/* Front card A */}
                <div className="absolute bg-white rounded-2xl border border-gray-200 w-[320px] h-[60px] bottom-6 left-1/2 -translate-x-1/2 z-[3] shadow-xl">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#FF6B6B] to-[#FF5252] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-[#FFB8B8] rounded-full w-3/4"></div>
                      <div className="h-2.5 bg-[#FFB8B8] rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Helper text */}
              <div className="text-center px-10 mb-8 mx-5">
                <p className="text-white text-base leading-relaxed font-normal">
                  Find any place, landmark, or address you want to save as a
                  point of interest.
                </p>
              </div>

              {/* Map preview area */}
              <div className="flex-1 flex items-end ">
                <div className="w-full overflow-hidden shadow-lg">
                  <img
                    src="/images/New-POI-Input-dialog.png"
                    alt="Map preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right: Form section */}
            <div className="relative bg-white px-6 py-6 overflow-visible mt-6">
              <h2 className="text-2xl font-bold mb-9">
                Enter point of interest
              </h2>

              {/* Inputs stack */}
              <div className="relative space-y-9">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-200"
                  >
                    <div className="flex items-center gap-3 px-4 py-3" onMouseDown={(e) => e.stopPropagation()}>
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-b ${gradients[index % gradients.length]
                          } flex items-center justify-center text-white text-sm font-semibold shadow-md flex-shrink-0`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex-1 relative">
                        <AutocompleteInput
                          key={`autocomplete-${index}-${currentLocation?.city || "default"
                            }`}
                          index={index}
                          value={
                            editingIndex === index
                              ? editingValue // Use editing value when editing
                              : areas[index]?.name ||
                              (index === areas.length ? newAreaName : "")
                          }
                          onChange={(value) => {
                            if (editingIndex === index) {
                              // Update editing value when editing existing POI
                              setEditingValue(value);
                            } else if (index === areas.length) {
                              // Update new area name when adding new POI
                              onNameChange(value);
                            }
                          }}
                          onPlaceSelect={(place) => {
                            if (index === areas.length) {
                              handlePlaceSelect(place);
                            }
                          }}
                          onKeyPress={handleKeyPress}
                          placeholder="Add area, place or landmark"
                          isGeocoding={isGeocoding}
                          currentLocation={currentLocation}
                          autoFocus={isOpen && index === areas.length}
                          disabled={
                            calculateFromLocation || // Disable when toggle is enabled
                            (areas[index] && editingIndex !== index) || // Disable if existing POI and not currently editing it
                            (!areas[index] &&
                              areas.length > 0 &&
                              editingIndex !== null) // Disable add new if existing POIs and editing one
                          }
                        />
                      </div>
                      {areas[index] && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={async () => {
                              if (editingIndex === index) {
                                // Save the edited value and geocode if name changed
                                if (editingValue.trim()) {
                                  if (
                                    onUpdateAreaWithGeocode &&
                                    editingValue.trim() !== areas[index].name
                                  ) {
                                    // Geocode the new location
                                    await onUpdateAreaWithGeocode(
                                      areas[index].id,
                                      editingValue.trim()
                                    );
                                  } else if (onUpdateArea) {
                                    // Just update the name without geocoding
                                    onUpdateArea(
                                      areas[index].id,
                                      editingValue.trim()
                                    );
                                  }
                                }
                                setEditingIndex(null);
                                setEditingValue("");
                              } else {
                                // Enter editing mode for this POI
                                setEditingIndex(index);
                                setEditingValue(areas[index].name);
                              }
                            }}
                            className="rounded-full h-7 w-7" // Changed hover color for clarity
                          >
                            {editingIndex === index ? (
                              <Check className="h-3.5 w-3.5 " />
                            ) : (
                              <Pen className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          {editingIndex === index && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRemoveArea?.(areas[index].id)} // remove button for existing POIs when editing
                              className="rounded-full h-7 w-7"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Save button and toggle */}
              <div className="flex items-center justify-between gap-2 mt-10 px-0">
                <div className="flex items-center gap-2 bg-[#F4F4F4] rounded-xl py-1.5 px-2.5 ">
                  <span className="text-sm font-semibold text-[#737373] ">
                    From my location
                  </span>
                  <Switch
                    checked={calculateFromLocation}
                    onCheckedChange={handleToggleChange}
                  />
                </div>
                <Button
                  onClick={() => onOpenChange(false)}
                  className="flex-grow bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:opacity-90 text-white px-14 py-5 rounded-xl text-base font-normal shadow-lg disabled:opacity-50"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
