import React, { useState } from "react";
import Image from "next/image";
import Icons from "./Icons";
import { BuilderCard } from "./BuilderCard";
import { Button } from "../ui/button";
import { SharePropertyDialog } from "@/components/shared/SharePropertyDialog";
import { cn } from "@/lib/utils";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { Heart, Loader2 } from "lucide-react";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal"; // Ensure this import exists

interface Builder {
  id: string;
  legalName: string;
  bondName: string;
  logo?: string;
  yearsOfExperience?: number;
}

export default function PropertyContactSection({
  builder,
  propertyTitle,
  propertyId,
}: {
  builder?: Builder;
  propertyTitle: string;
  propertyId: string;
}) {
  const {
    isFavorite,
    showHeartLoading,
    handleLikeClick,
    showAuthModal,
    handleAuthSuccess,
  } = usePropertyActions({ propertyId });

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleGetAssistance = () => {
    console.log("Get assistance clicked");
  };

  const handleGetQuote = () => {
    console.log("Get instant quote clicked");
  };

  const handleDownloadBrochure = () => {
    console.log("Download brochure clicked");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden w-full max-w-2xl mx-auto">
      {/* Header Section with Price & Primary Action */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 sm:p-6 bg-white gap-4 ">
        {/* Price Info Section */}
        <div className="shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-black whitespace-nowrap">
            Rs. 1Cr - 2Cr
          </h2>
          <p className="text-sm sm:text-base text-gray-600">EMI from 50k</p>
        </div>

        {/* Button Section */}
        <div className="w-full lg:w-auto">
          <Button
            onClick={handleGetQuote}
            variant={"details"}
            className="h-12 w-full lg:w-[170px] flex items-center justify-center gap-2 shrink-0"
          >
            <span className="-ml-1">Get a Quote</span>
            <Icons.chargeIcon />
          </Button>
        </div>
      </div>

      {/* Brochure, Wishlist & Share Section */}
      <div className="border-t border-gray-300 flex flex-row justify-between items-stretch">
        <div className="flex items-center justify-between flex-grow px-4 sm:px-6 py-4 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <Icons.adobeIcon />
            <span className="font-medium text-black text-sm sm:text-base whitespace-nowrap">
              Brochure
            </span>
          </div>
          <button
            onClick={handleDownloadBrochure}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <Icons.downloadIcon />
          </button>
        </div>

        <div className="bg-white flex justify-center items-center px-4 gap-3 border-l border-[#D7D7D7] shrink-0">
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-all",
              isFavorite && "text-red-500",
            )}
            onClick={handleLikeClick}
            disabled={showHeartLoading}
          >
            {showHeartLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Heart
                className="h-5 w-5"
                fill={isFavorite ? "currentColor" : "none"}
              />
            )}
          </Button>

          {/* Share Button */}
          <SharePropertyDialog
            propertyId={propertyId}
            propertyTitle={propertyTitle}
            isOpen={isShareOpen}
            onOpenChange={setIsShareOpen}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm border border-zinc-200 hover:bg-zinc-50"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <Icons.share isHovered={isHover} />
              </Button>
            }
          />
        </div>
      </div>

      {/* Builder Information Section */}
      <div className="border-t border-gray-300 w-full">
        <BuilderCard builder={builder} />

        {/* Secondary Actions */}
        <div className="flex flex-col xl:flex-row gap-3 p-4 bg-gray-50/50 ">
          <Button
            onClick={handleGetAssistance}
            variant={"white"}
            className="h-14 py-3 xl:py-0 flex-1 border-gray-300"
          >
            <Icons.customerSupportIcon />
            <span className="ml-2 font-medium">Get Assistance</span>
          </Button>

          <Button
            onClick={() => console.log("Schedule Visit")}
            variant={"details"}
            className="h-14 py-3 xl:py-0  flex-1"
          >
            <span className="mr-2 font-medium text-white">Schedule Visit</span>
            <Icons.chargeIcon />
          </Button>
        </div>
      </div>

      {/* CRITICAL: Added the Auth Modal to make logic work */}
      <PhoneAuthModal
        open={showAuthModal}
        onOpenChange={(open) => !open && handleAuthSuccess()}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
