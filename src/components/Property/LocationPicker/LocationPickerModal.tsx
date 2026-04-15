import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LocationPickerContent } from "./LocationPickerContent";
import type { City } from "@/hooks/useLocationPicker";

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCities: { [key: string]: City };
  onCitySelect: (cityName: string) => void;
  onDetectLocation: () => void;
  showNameInput?: boolean;
  userName?: string;
  onUserNameChange?: (name: string) => void;
  userExists?: boolean;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  availableCities,
  onCitySelect,
  onDetectLocation,
  showNameInput = false,
  userName = "",
  onUserNameChange,
  userExists = true,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const contentProps = {
    availableCities,
    onCitySelect,
    onDetectLocation,
    showNameInput,
    userName,
    onUserNameChange,
    userExists,
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-[20px]">
          <div className="h-1.5 w-16 rounded-full bg-gray-300 mx-auto my-2" />
          <div className="h-full overflow-auto">
            <LocationPickerContent {...contentProps} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl md:max-w-4xl p-0 overflow-auto max-h-[90vh]">
        <DialogTitle className="sr-only">Select Your Location</DialogTitle>
        <DialogDescription className="sr-only">
          Choose your city from the list or detect your current location automatically
        </DialogDescription>
        <LocationPickerContent {...contentProps} />
      </DialogContent>
    </Dialog>
  );
};
