"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PropertyCardProps } from "./PropertyCard/PropertyCard";

interface PropertyCardSkeletonProps {
  variant?: PropertyCardProps['variant'];
  cardDimensions?: PropertyCardProps['cardDimensions'];
}

const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={cn("bg-gray-200 animate-pulse rounded", className)} />
);

export const PropertyCardSkeleton = ({
  variant = "default",
  cardDimensions,
}: PropertyCardSkeletonProps) => {
  const isSideBySide = ![
    "mapPopUp",
    "mobileMap",
    "mobileList",
    "profile",
  ].includes(variant || "default");

  // Get responsive dimensions, fallback to default values (matching PropertyCard)
  const dimensions = cardDimensions || {
    height: "h-64 md:h-72",
    imageRatio: "aspect-[4/3]",
    padding: "p-2 md:p-3",
    gap: "gap-4",
  };

  // Map Popup Variant - Simple and compact
  if (variant === "mapPopUp") {
    return (
      <Card className="bg-white overflow-hidden rounded-[0.625rem] w-[16.375rem] h-[16.375rem] shadow-md border-0">
        <ShimmerBlock className="w-full h-[145px]" />
        <div className="p-3 space-y-2">
          <ShimmerBlock className="h-5 w-3/4" />
          <ShimmerBlock className="h-4 w-1/2" />
          <ShimmerBlock className="h-5 w-2/5 mt-2" />
        </div>
      </Card>
    );
  }

  // Default / Side-by-Side / Mobile Variants
  return (
    <Card
      className={cn(
        "bg-white overflow-hidden relative shadow-[0px_0px_12.364866256713867px_0px_rgba(0,0,0,0.15)] border-0",
        "transition-all duration-200",
        isSideBySide ? "flex" : "flex-col",
        "rounded-[0.9375rem] md:rounded-[1.25rem]",
        dimensions.padding,
        "w-full max-w-full min-w-0",
        isSideBySide && dimensions.height
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          "relative gap-2",
          isSideBySide ? "h-full w-full md:w-2/4 flex-shrink-0 flex" : "w-full"
        )}
      >
        <ShimmerBlock
          className={cn(
            "w-full rounded-[0.9375rem] md:rounded-[1.25rem]",
            isSideBySide
              ? "h-full"
              : variant === "mobileMap"
                ? "h-[150px] sm:h-[180px]"
                : "h-[280px]"
          )}
        />

        {/* Side Thumbnails (Desktop Side-by-Side only) */}
        {isSideBySide && (
          <div className="hidden lg:flex flex-col gap-5 justify-center flex-shrink-0 h-full items-stretch">
            {/* Matching the 3 thumbnails in PropertyCard */}
            <ShimmerBlock className="w-[4.375rem] h-[5rem] rounded-lg" />
            <ShimmerBlock className="w-[4.375rem] h-[5rem] rounded-lg" />
            <ShimmerBlock className="w-[4.375rem] h-[5rem] rounded-lg" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("flex-1 flex flex-col justify-between pl-3 min-w-0 overflow-hidden")}>
        <div className="flex-1 space-y-2 pt-1">
          {/* Title Details equivalent */}
          <div className="space-y-2">
            <ShimmerBlock className="h-6 w-3/4 rounded-md" />
            <ShimmerBlock className="h-4 w-1/2 rounded-md" />
          </div>

          {/* Distance & Unit Details equivalent (hidden on mobile map) */}
          {variant !== "mobileMap" && (
            <div className="space-y-2 mt-3">
              <div className="flex gap-2">
                <ShimmerBlock className="h-5 w-20 rounded-md" />
                <ShimmerBlock className="h-5 w-20 rounded-md" />
              </div>
              <div className="flex gap-2">
                <ShimmerBlock className="h-5 w-16 rounded-md" />
                <ShimmerBlock className="h-5 w-16 rounded-md" />
              </div>
            </div>
          )}
        </div>

        {/* Footer: Price & Builder */}
        <div className={cn(dimensions.gap.replace("gap-", "space-y-"), "mt-2")}>
          {/* Price/Possession */}
          <div className="flex justify-between items-center">
            <ShimmerBlock className="h-8 w-24 rounded-md" />
            <ShimmerBlock className="h-6 w-20 rounded-md" />
          </div>

          {/* Builder Info */}
          <div className="flex items-center gap-2">
            <ShimmerBlock className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <ShimmerBlock className="h-4 w-32 rounded-md" />
              <ShimmerBlock className="h-3 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};