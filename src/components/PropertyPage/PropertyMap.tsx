"use client";

import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MAP_CONFIG } from "@/constants/map-constants";
import Icons from "./Icons";
import { useAreaOfInterestManager } from "@/hooks/useAreaOfInterestManager";
import { AreaOfInterestDialog } from "@/components/Property/PropertyFilters/AreaOfInterestDialog";
import { useAreaOfInterest } from "@/hooks/useAreaOfInterest";
import { NearbyLocationMarkers } from "../Property/PropertyMap/markers/NearbyLocationMarkers";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for classes

interface PropertyMapProps {
  coordinates?: { lat: number; lng: number };
  address: string;
  city: string;
  state: string;
  nearbyProperties?: any[];
  propertyId?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  coordinates = { lat: 28.367, lng: 79.4304 },
  address,
  city,
  state,
  nearbyProperties = [],
  propertyId,
}) => {
  const {
    areasOfInterest,
    removeArea: removeAreaFromManager,
    areasCount,
  } = useAreaOfInterestManager();

  const {
    newAreaName,
    isGeocoding,
    canAddMore,
    isAtLimit,
    handleNameChange,
    handleKeyPress,
    addArea,
    updateAreaName,
    updateAreaWithGeocode,
  } = useAreaOfInterest(areasOfInterest, { maxAreas: 3 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllNearby, setShowAllNearby] = useState(false);
  
  // New State for Map Interaction
  const [isMapActive, setIsMapActive] = useState(false);

  const gradients = [
    "bg-gradient-to-b from-[#E02323] to-[#FFB8B8]",
    "bg-gradient-to-b from-[#485CE2] to-[#A9C1FF]",
    "bg-gradient-to-b from-[#33D885] to-[#48AF7F]",
  ];

  const nearbyItems = [
    { icon: "/images/propertyPage/nearbyiconHospital.png", label: "Hospital" },
    { icon: "/images/propertyPage/nearbyiconCollege.png", label: "College" },
    { icon: "/images/propertyPage/nearbyiconCafe.png", label: "Cafe / Restro" },
    { icon: "/images/propertyPage/nearbyiconMetro.png", label: "Railway Station" },
    { icon: "/images/propertyPage/nearbyiconHospital.png", label: "Hospital" },
    { icon: "/images/propertyPage/nearbyiconCollege.png", label: "School" },
  ];

  const visibleItems = showAllNearby ? nearbyItems : nearbyItems.slice(0, 4);
  const hasExtraItems = nearbyItems.length > 4;

  return (
    <div className="w-full space-y-10 px-1">
      {/* 1. Map Section */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Map</h2>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-gray-200">
          
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <Map
              defaultCenter={coordinates}
              defaultZoom={13}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_VECTOR_MAP_ID}
              disableDefaultUI={true}
              // Switch between 'none' and 'greedy' based on state
              gestureHandling={isMapActive ? "greedy" : "none"}
              styles={MAP_CONFIG.MAP_STYLE as unknown as google.maps.MapTypeStyle[]}
              className={cn(
                "w-full h-full transition-all duration-500",
                !isMapActive && "blur-[2px] brightness-95"
              )}
            >
              <AdvancedMarker position={coordinates} title={address} />
              <NearbyLocationMarkers nearbyLocations={nearbyProperties} propertyId={propertyId} />
              {areasOfInterest.map((area, index) => (
                <AdvancedMarker key={area.id} position={area.location.coordinates}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg ${gradients[index % gradients.length]}`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>

          {/* Interaction Overlay/Button */}
          {!isMapActive && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5">
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
                <Button 
                  variant="white" 
                  onClick={() => setIsMapActive(true)}
                  className="rounded-full bg-white text-black border shadow-xl hover:bg-gray-50 gap-2 h-10 sm:h-12 px-4 sm:px-6 w-auto whitespace-nowrap text-xs sm:text-sm transition-transform active:scale-95"
                >
                  <Icons.affordableIcon /> Click to interact
                </Button>
              </div>
            </div>
          )}

          {/* Optional: Show a "Lock Map" button when active so user can scroll the page easily again */}
          {isMapActive && (
            <button 
              onClick={() => setIsMapActive(false)}
              className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-xs font-bold text-gray-600 hover:bg-white"
            >
              🔒 Lock Map
            </button>
          )}
        </div>
      </section>

      {/* 2. Nearby Places Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Nearby Places</h3>
          {hasExtraItems && (
            <Button 
              variant="pureDefault" 
              size="sm" 
              onClick={() => setShowAllNearby(!showAllNearby)}
              className="bg-gray-100 h-8 px-4 text-xs hover:bg-gray-200 transition-colors"
            >
              {showAllNearby ? "Show less" : "See all"}
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {visibleItems.map((item, i) => (
            <div 
              key={i} 
              className="p-2 rounded-xl flex items-center gap-3 border border-gray-200 shadow-sm bg-white"
            >
              <Image 
                src={item.icon} 
                width={40} 
                height={40} 
                alt={item.label} 
                className="rounded-lg shrink-0 object-cover" 
              />
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-gray-800 truncate">10 mins | 5KM</p>
                <p className="text-[10px] text-gray-400 truncate">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};