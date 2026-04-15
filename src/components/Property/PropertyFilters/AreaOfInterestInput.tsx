import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTE_COLORS } from "@/constants/constants";
import type { AreaOfInterest } from "@/types/property";
import { AreaOfInterestDialog } from "./AreaOfInterestDialog";
import { SquarePen } from "lucide-react";

interface AreaOfInterestInputProps {
  areas: AreaOfInterest[];
  newAreaName: string;
  isGeocoding: boolean;
  canAddMore: boolean;
  isAtLimit: boolean;
  onNameChange: (name: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddArea: (name?: string) => void;
  // onClearAll: () => void;
  onRemoveArea?: (areaId: string) => void;
  onUpdateArea?: (areaId: string, newName: string) => void;
  onUpdateAreaWithGeocode?: (areaId: string, newName: string) => Promise<void>;
  onUserLocationUpdate?: (
    enabled: boolean,
    userLocation: { lat: number; lng: number } | null
  ) => void;
}

export const AreaOfInterestInput = React.memo<AreaOfInterestInputProps>(
  ({
    areas,
    newAreaName,
    isGeocoding,
    canAddMore,
    isAtLimit,
    onNameChange,
    onKeyPress,
    onAddArea,
    onRemoveArea,
    onUpdateArea,
    onUpdateAreaWithGeocode,
    onUserLocationUpdate,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderTriggerButton = () => {
      if (areas.length === 0) {
        return (
          <Button
            variant="outline"
            className="h-[49px] px-4 rounded-xl bg-[#F9F6F6] border-none hover:bg-gray-100 flex items-center gap-3 transition-colors"
          >
            <div className="flex items-center -space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#E02323] to-[#FFB8B8] flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm">
                A
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#485CE2] to-[#A9C1FF] flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm">
                B
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#33D885] to-[#48AF7F] flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm">
                C
              </div>
            </div>
            <span className="text-sm font-normal ">
              Point of interest
            </span>
            <SquarePen className="hover:text-[#BB2828] transition-colors" />
          </Button>
        );
      }

      const gradients = [
        "bg-gradient-to-b from-[#E02323] to-[#FFB8B8]",
        "bg-gradient-to-b from-[#485CE2] to-[#A9C1FF]",
        "bg-gradient-to-b from-[#33D885] to-[#48AF7F]",
      ];

      return (
        <Button
          variant="outline"
          className="h-[49px] px-4 rounded-xl bg-[#F9F6F6] border-none hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <div className="flex items-center -space-x-2">
            {areas.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm ${gradients[index % gradients.length]
                  }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
            ))}
            {areas.length > 3 && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm">
                +{areas.length - 3}
              </div>
            )}
          </div>
          <span className="text-sm font-medium">
            {areas.length} point{areas.length !== 1 ? "s" : ""} of interest
          </span>
          <SquarePen className="hover:text-[#BB2828] transition-colors" />
        </Button>
      );
    };

    return (
      <AreaOfInterestDialog
        areas={areas}
        newAreaName={newAreaName}
        isGeocoding={isGeocoding}
        canAddMore={canAddMore}
        isAtLimit={isAtLimit}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onNameChange={onNameChange}
        onKeyPress={onKeyPress}
        onAddArea={onAddArea}
        onRemoveArea={onRemoveArea}
        onUpdateArea={onUpdateArea}
        onUpdateAreaWithGeocode={onUpdateAreaWithGeocode}
        onCalculationUpdate={(enabled, userLocation) => {
          onUserLocationUpdate?.(enabled, userLocation);
        }}
        trigger={renderTriggerButton()}
      />
    );
  }
);

AreaOfInterestInput.displayName = "AreaOfInterestInput";
