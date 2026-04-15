import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query"; // we'll add this hook below
import Icons from "./Icons";
import { PROPERTY_IMAGES } from "@/constants/property-ui-constants";
import { Phone, CalendarDays, ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ScheduleCallDialog } from "@/components/shared/ScheduleCallDialog";
import { useAuth } from "@/lib/auth";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal";

type BuilderInfoProp = {
  logo?: string;
  name: string;
  phoneNo?: string;
  whatsAppNo?: string;
};

export const BuilderInfo = React.memo(
  ({ logo, name, phoneNo, whatsAppNo }: BuilderInfoProp) => {
    const builderNumber = phoneNo || whatsAppNo || "+919616646932";
    const { user } = useAuth();

    const [open, setOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isConnectExpanded, setIsConnectExpanded] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const isMobile = useMediaQuery("(max-width: 640px)");

    const handleCall = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setOpen(false);
      window.location.href = `tel:${builderNumber}`;
    };

    const handleWhatsApp = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setOpen(false);
      window.open(`https://wa.me/${builderNumber}`, "_blank");
    };

    const handleScheduleCall = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setOpen(false);

      // Check if user is authenticated
      if (!user) {
        setShowAuthModal(true);
        return;
      }

      setIsScheduleOpen(true);
    };

    const handleAuthSuccess = () => {
      setShowAuthModal(false);
    };

    const toggleConnectDropdown = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsConnectExpanded(!isConnectExpanded);
    };

    return (
      <div
        className="flex items-center justify-between border-t border-stone-300 mt-1 pt-1.5"
        style={{ marginTop: "0px" }}
      >
        {/* Logo */}
        <div className="flex-shrink-0 w-9 h-9 sm:w-8 sm:h-8 mr-2 lg:w-10 lg:h-10">
          <div className="relative w-full h-full rounded-full bg-gray-100 overflow-hidden">
            <Image
              src={logo || PROPERTY_IMAGES.defaultBuilder}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Builder info */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-xs md:text-sm font-medium truncate">{name}</p>
          <p className="text-xs font-medium truncate text-[#A7A7A7]">Listed By</p>
        </div>

        {/** ICON (opens popover or bottom sheet) */}
        {/* <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="cursor-pointer"
        >
          <Icons.PhoneIcon />
        </div> */}


        {/* Desktop Popover */}
        {!isMobile && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="cursor-pointer"
              >
                <Icons.PhoneIcon />
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-56 rounded-xl shadow-lg p-0 z-[9999]"
              sideOffset={8}
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Connect Now Header - Dropdown */}
              <div
                className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${isConnectExpanded
                  ? "bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white rounded-t-xl"
                  : "text-black hover:bg-gray-50 rounded-t-xl"
                  }`}
                onClick={(e) => toggleConnectDropdown(e)}
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" color={`${isConnectExpanded ? "#fff" : "#E91614"}`} />
                  <span className="text-sm font-medium">Connect Now</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isConnectExpanded ? "rotate-180" : ""
                    }`}
                />
              </div>

              {/* Dropdown Options - Call & WhatsApp */}
              {isConnectExpanded && (
                <div className="p-4 space-y-4 border-t border-gray-200">
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={(e) => handleCall(e)}
                  >
                    <Icons.Call />
                    <span className="text-sm font-medium">Call</span>
                  </div>

                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={(e) => handleWhatsApp(e)}
                  >
                    <Icons.Message />
                    <span className="text-sm font-medium">Whatsapp</span>
                  </div>
                </div>
              )}

              {/* Schedule a call - Always visible */}
              <div className="border-t border-gray-200">
                <div
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-colors px-4 py-3 rounded-b-xl"
                  onClick={(e) => handleScheduleCall(e)}
                >
                  <CalendarDays className="h-4 w-4 text-[#E91614]" />
                  <span className="text-sm font-medium">Schedule a call</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Mobile Bottom Sheet */}
        {isMobile && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle className="sr-only">Connect now</DialogTitle>
            <DialogDescription className="sr-only">
              Connect with the builder
            </DialogDescription>
            <DialogTrigger asChild>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="cursor-pointer"
              >
                <Icons.PhoneIcon />
              </div>
            </DialogTrigger>

            <DialogContent
              className="rounded-2xl w-[210px] p-0 gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Connect Now Header - Dropdown */}
              {/* <div className="space-y-3"> */}
              <div
                className={`px-4 pt-3 flex items-center justify-between cursor-pointer transition-all ${isConnectExpanded
                  ? "bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white rounded-t-2xl pb-2"
                  : "text-black rounded-t-2xl"
                  }`}
                onClick={(e) => toggleConnectDropdown(e)}
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" color={`${isConnectExpanded ? "#fff" : "#E91614"}`} />
                  <span className="text-sm font-medium">Connect Now</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isConnectExpanded ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </div>

              {/* Dropdown Options - Call & WhatsApp */}
              {isConnectExpanded && (
                <div className="p-4 space-y-3  " >
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => handleCall(e)}
                  >
                    <Icons.Call />
                    <span className="text-sm font-medium">Call</span>
                  </div>

                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={(e) => handleWhatsApp(e)}
                  >
                    <Icons.Message />
                    <span className="text-sm font-medium">Whatsapp</span>
                  </div>
                </div>
              )}

              {/* Schedule a call - Always visible */}
              {/* <div className=""> */}
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 transition-colors px-4 pb-3 rounded-b-xl"
                onClick={(e) => handleScheduleCall(e)}
              >
                <CalendarDays className="h-4 w-4 text-[#E91614]" />
                <span className="text-sm font-medium">Schedule a call</span>
                {/* </div> */}
              </div>
              {/* </div> */}
            </DialogContent>
          </Dialog>
        )}

        {/* Schedule Call Dialog */}
        <ScheduleCallDialog
          isOpen={isScheduleOpen}
          onOpenChange={setIsScheduleOpen}
          builderName={name}
          builderPhone={builderNumber}
        />

        {/* Phone Auth Modal */}
        <PhoneAuthModal
          open={showAuthModal}
          onOpenChange={(open) => !open && handleAuthSuccess()}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }
);

BuilderInfo.displayName = "BuilderInfo";