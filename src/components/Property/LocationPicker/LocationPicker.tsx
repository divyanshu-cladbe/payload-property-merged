"use client";

import React from "react";
import { useLocationPicker } from "@/hooks/useLocationPicker";
import { LocationButton } from "./LocationButton";
import { LocationPickerModal } from "./LocationPickerModal";

export const LocationPicker: React.FC = () => {
  const {
    currentLocation,
    isLocationModalOpen,
    availableCities,
    handleCitySelect,
    handleDetectLocation,
    openModal,
    closeModal,
  } = useLocationPicker();

  return (
    <>
      <LocationButton
        currentLocation={currentLocation}
        onOpenModal={openModal}
      />

      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={closeModal}
        availableCities={availableCities}
        onCitySelect={handleCitySelect}
        onDetectLocation={handleDetectLocation}
      />
    </>
  );
};

export default LocationPicker;
