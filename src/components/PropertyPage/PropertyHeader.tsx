"use client";

import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { formatIndianCurrency } from "@/utils/format-indian-currency";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RatingTagPropertyPage } from "../Property/PropertyCard/RatingTagPropertyPage";
import Icons from "./Icons";
import PropertyCardIcons from "../Property/PropertyCard/Icons";
import { Button } from "@/components/ui/button";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { SharePropertyDialog } from "@/components/shared/SharePropertyDialog";

interface PropertyHeaderProps {
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  possessionStatus?: string;
  launchedOn?: string;
  description?: string;
  builderName: string;
  builderRating?: number;
  reraId?: string;
  propertyId: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  title,
  price,
  address,
  city,
  state,
  description,
  builderName,
  possessionStatus,
  builderRating,
  reraId,
  propertyId,
}) => {
  const {
    isFavorite,
    showHeartLoading,
    handleLikeClick,
    showAuthModal,
    handleAuthSuccess,
  } = usePropertyActions({ propertyId });

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const formatEMI = (price: number) => {
    return `EMI from ${Math.round((price / 10000000) * 0.8)}K`;
  };

  return (
    <div className="w-full">
      {/* Mobile & Small Tablet layout */}
      <div className="block md:hidden px-1">
        {/* Top badges and rating */}
        <div className="flex flex-col gap-2">
          <span className="text-[#A7A7A7] text-[10px] sm:text-xs font-normal">{reraId}</span>
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <span className="px-2 sm:px-3 py-1 rounded-md bg-[#6DD94D1A] text-[#3A9D1C] text-[10px] sm:text-xs font-semibold">
                Residential
              </span>
              <span className="px-2 sm:px-3 py-1 rounded-xl border border-[#BB2828] text-[#BB2828] bg-white text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                <Image
                  src="/icons/rera-check.png"
                  width={12}
                  height={12}
                  alt="RERA"
                />
                RERA
              </span>
              <span className="px-2 sm:px-3 py-1 rounded-md bg-[#1C9D921A] text-[#1C9D92] text-[10px] sm:text-xs font-semibold">
                Estd. {possessionStatus}
              </span>
            </div>
            <div className="hidden"><RatingTagPropertyPage rating={builderRating?.toString() || "0"} /></div>
          </div>
        </div>

        {/* Affordable chip */}
        <div
          className="mt-3 w-28 sm:w-32 h-7 relative bg-white rounded-[5px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-1px] outline-neutral-400"
        >
          <div className="left-[32px] sm:left-[38px] top-[5px] absolute text-center justify-start text-black text-[10px] sm:text-xs font-medium">
            Affordable
          </div>
          <div className="w-8 h-8 left-[-7px] top-[-3px] absolute bg-neutral-800 rounded-full border border-stone-700" />
          <div className="w-4 h-4 left-[2px] top-[5px] absolute overflow-hidden">
            <Icons.affordable />
          </div>
        </div>

        {/* Title and actions */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <h1 className="text-black text-xl sm:text-2xl font-semibold leading-tight">{title}</h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full shadow border border-zinc-100",
                isFavorite && "text-red-500",
              )}
              onClick={handleLikeClick}
              disabled={showHeartLoading}
            >
              {showHeartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart
                  className="h-4 w-4"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              )}
            </Button>
            <SharePropertyDialog
              propertyId={propertyId}
              propertyTitle={title}
              variant="mobile"
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full shadow border border-zinc-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icons.share isHovered={isHover} />
                </Button>
              }
            />
          </div>
        </div>

        {/* Builder */}
        <p className="text-[#4354C4] text-xs sm:text-sm mt-1">Listed by {builderName}</p>

        {/* Price + EMI */}
        <div className="mt-3 flex flex-wrap items-baseline gap-2 sm:gap-3">
          <span className="text-[#BB2727] text-xl sm:text-2xl font-bold">
            ₹ {formatIndianCurrency(price)}
          </span>
          <span className="text-slate-900 text-xs sm:text-sm font-medium">
            {formatEMI(price)}
          </span>
        </div>

        {/* BHK chips */}
        <div className="mt-3 flex gap-2">
          {["2 BHK", "3 BHK"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-500 text-[10px] sm:text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Address */}
        <p className="mt-3 text-[#C44343] text-xs sm:text-sm font-medium">{address}</p>

        {/* Description */}
        {description && (
          <div className="mt-2">
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
              {description} {""}
              <button className="text-[#BB2727] font-medium whitespace-nowrap">Read More</button>
            </p>
          </div>
        )}
      </div>

      {/* Large Tablet & Desktop layout */}
      <div className="hidden md:block">
        <div className="relative flex flex-col gap-4">
          {/* Rating Badge - Absolute positioned relative to container */}
          <div className="lg:block lg:absolute lg:top-1 lg:left-0 hidden">
            <RatingTagPropertyPage
              variant="default"
              rating={builderRating?.toString() || "0"}
              className="static"
            />
          </div>

          {/* Title and Action Buttons Row */}
          <div className="flex items-start justify-between pl-14">
            <div className="space-y-1">
              <h1 className="text-black text-xl lg:text-3xl font-semibold">
                {title}
              </h1>
              <p className="text-[#C44343] text-sm lg:text-base font-medium">
                {address}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-center lg:gap-3">
              <div className="flex gap-2">
                <span className="flex items-center gap-1 px-2 lg:px-3 py-1 bg-[#C2C2C233] rounded-lg shadow-sm border border-gray-100 text-[10px] lg:text-xs font-medium whitespace-nowrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" className="lg:w-6 lg:h-6">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                      <path d="M21.25 12v3.38a3.38 3.38 0 0 1-3.38 3.382H8.661a3.38 3.38 0 0 1-2.389-.992L3.22 13.6a2.96 2.96 0 0 1 0-3.2l3.054-4.17a3.38 3.38 0 0 1 2.39-.992h9.206a3.38 3.38 0 0 1 3.38 3.382z"></path>
                      <path d="m9.61 11.905l1.946 1.946a.735.735 0 0 0 1.047 0l3.922-3.921"></path>
                    </g>
                  </svg>
                  Sponsored
                </span>
                <span className="flex items-center gap-1 px-2 lg:px-3 py-1 bg-[#C2C2C233] rounded-lg shadow-sm border border-gray-100 text-[10px] lg:text-xs font-medium whitespace-nowrap">
                  <Icons.affordableIcon /> Affordable
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {description && (
            <div className="pl-4 text-justify ">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 lg:line-clamp-none">
                {description}{" "}
                <button className="text-[#BB2727] font-semibold hover:underline">
                  Read More
                </button>
              </p>
            </div>
          )}

          {/* Tags and RERA Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pl-4 pt-2 gap-4">
            <div className="flex flex-wrap gap-2">
              {["2 BHK", "3 BHK", "Villa", "Apartment"].map((tag, index) => (
                <span
                  key={tag}
                  className={cn(
                    "px-3 lg:px-4 py-1.5 text-[10px] lg:text-xs rounded-[5px]",
                    index > 1
                      ? "text-[#E0A55D] bg-[#E0A55D1A]"
                      : "text-[#A7A7A7] bg-[#8080801A]",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-1 bg-[#FFF1F1] rounded-[8px]">
                <span className="flex bg-[#E81B16] items-center justify-center text-white text-[9px] lg:text-[10px] font-bold px-2 py-1 border-t rounded-bl-[8px] rounded-tl-[8px] gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" className="lg:w-[15px] lg:h-[15px]">
                    <g fill="currentColor">
                      <path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z"></path>
                      <path fillRule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18" clipRule="evenodd"></path>
                    </g>
                  </svg>
                  RERA
                </span>
                <span className="text-[#BB2828] text-[10px] lg:text-xs font-medium mr-1.5 whitespace-nowrap">
                  {reraId}
                </span>
              </div>
              <div className="bg-[#76AD9D33] px-2 lg:px-3 py-1 rounded-[8px] text-[#76AD9D] text-[10px] lg:text-xs font-medium whitespace-nowrap">
                Target Possession on {possessionStatus}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PhoneAuthModal
        open={showAuthModal}
        onOpenChange={(open) => !open && handleAuthSuccess()}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export { PropertyHeader };