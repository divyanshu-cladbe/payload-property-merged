"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";
import { ViewFullDetailButton } from "./ViewFullDetailButton";
import { PossessionAndPrice } from "./PossessionAndPrice";
import { BuilderInfo } from "./BuilderInfo";
import { UnitDetails } from "./UnitDetails";
import { DistanceDetails } from "./DistanceDetails";
import { TitleDetails } from "./TitleDetails";
import { PropertyImageContainer } from "./PropertyImageContainer";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { usePopupPositioning } from "@/hooks/usePopupPositioning";
import { PROPERTY_IMAGES } from "@/constants/property-ui-constants";
import { RatingBadge } from "./RatingBadge";
import Image from "next/image";
import { Play } from "lucide-react";
import { NearbyLocation } from "@/types/property/base";

export interface PropertyCardProps extends Property {
  variant?:
  | "default"
  | "map"
  | "detail"
  | "mapPopUp"
  | "mobileMap"
  | "mobileList"
  | "profile";
  mapRef?: React.MutableRefObject<google.maps.Map | null>;
  selectedPropertyId?: string;
  showViewFullDetailsButton?: boolean;
  handlePropertyDeselect?: () => void;
  redirectToPropertyPage?: (id: string) => void;
  initialIsFavorite?: boolean;
  isProfilePage?: boolean;
  onPropertyRemove?: (propertyId: string) => void;
  markerPosition?: { lat: number; lng: number };
  cardDimensions?: {
    height: string;
    imageRatio: string;
    padding: string;
    gap: string;
  };
  nearbyProperties?: NearbyLocation[];
}

const PropertyCard = React.memo(
  ({
    id,
    title,
    price,
    possessionStatus,
    city,
    reraId,
    builder,
    region,
    variant = "default",
    mapRef,
    showViewFullDetailsButton,
    handlePropertyDeselect,
    redirectToPropertyPage,
    isProfilePage = false,
    isBoosted = false,
    boostInfo,
    onPropertyRemove,
    markerPosition,
    cardDimensions,
    nearbyProperties,
    targetCompletionDate,
  }: PropertyCardProps) => {
    const isMobileMapView = variant === "mobileMap";
    const isMobileListView = variant === "mobileList";
    const isOnProfilePage = variant === "profile" || isProfilePage;

    // Use Redux for wishlist state
    const {
      isInWishlist,
      toggleWishlist,
      toggleWishlistWithInstantRemoval,
      isInitialized,
      loading: wishlistLoading,
    } = useWishlist();
    const { user } = useAuth();

    //INFO: Only show favorite state if wishlist is initialized or if it's actually in wishlist
    const isFavorite = isInitialized ? isInWishlist(id) : false;

    const { popUpRef, smartPosition, getPointerStyles } = usePopupPositioning(
      variant,
      mapRef,
      markerPosition
    );
    const cardRef = useRef<HTMLDivElement>(null);

    const propertyImages = PROPERTY_IMAGES.samples;

    // Sample unit data based on reference design
    const sampleUnits = [
      {
        type: "2BHK",
        area: "1000Sqft",
        units: 10,
      },
      {
        type: "3BHK",
        area: "1000Sqft",
        units: 5,
      },
    ];

    // console.log("builder name kya hai", builder)
    const handleRedirection = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        // console.log("🚀 handleRedirection called");
        if (redirectToPropertyPage) {
          const propertyUrl = `/property/${id}`;
          // Open in new tab instead of router.push
          window.open(propertyUrl, "_blank");
          // console.log("✅ Calling redirectToPropertyPage for:", id);
          // redirectToPropertyPage(id);
        } else {
          console.error("❌ redirectToPropertyPage is not provided!");
        }
      },
      [redirectToPropertyPage, id, title]
    );

    const handleMediaGalleryRedirection = useCallback(
      (e: React.MouseEvent, imageUrl?: string) => {
        e.stopPropagation();
        if (redirectToPropertyPage) {
          const propertyUrl = `/property-media-gallery/${id}${imageUrl ? `?image=${encodeURIComponent(imageUrl)}` : ''}`;
          window.open(propertyUrl, "_blank");
        } else {
          console.error("❌ redirectToPropertyPage is not provided!");
        }
      },
      [redirectToPropertyPage, id, title]
    );

    const handleCloseIconClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (handlePropertyDeselect) {
          handlePropertyDeselect();
        }
      },
      [handlePropertyDeselect]
    );

    // Handle click outside to close card (only for mapPopUp variant)
    useEffect(() => {
      if (variant !== "mapPopUp" || !handlePropertyDeselect) return;

      const handleClickOutside = (event: MouseEvent) => {
        const cardElement = cardRef.current || popUpRef.current;
        const target = event.target as Node;
        // Check if the click is on a property marker
        // Check if the click is on a property marker or another property card
        if (
          (target as HTMLElement).closest(".property-marker") ||
          (target as HTMLElement).closest(".property-card") ||
          (target as HTMLElement).closest("[data-property-actions]")
        ) {
          return;
        }

        if (cardElement && !cardElement.contains(target)) {
          handlePropertyDeselect();
        } else {
        }
      };


      // Add event listener with a longer delay to avoid immediate closure from selection clicks
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 500); // Increased delay to 500ms

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [variant, handlePropertyDeselect, cardRef, popUpRef, id]);

    //INFO: Updated likeProperty function using Redux with profile page support
    const likeProperty = useCallback(
      async (e: React.MouseEvent) => {
        e.stopPropagation();

        //INFO: If user is not authenticated, show authentication prompt
        if (!user) {
          toast({
            title: "Login Required",
            description: "Please login to add properties to your wishlist.",
            variant: "destructive",
          });
          return;
        }

        //INFO: Don't allow interaction if wishlist is not initialized for authenticated users
        if (!isInitialized) {
          return;
        }

        //INFO: Use instant removal for profile page, normal toggle for others
        if (isOnProfilePage) {
          //INFO: If removing from wishlist on profile page, call callback for instant UI update
          if (isFavorite && onPropertyRemove) {
            onPropertyRemove(id);
          }
          await toggleWishlistWithInstantRemoval(id);
        } else {
          await toggleWishlist(id);
        }
      },
      [
        toggleWishlist,
        toggleWishlistWithInstantRemoval,
        id,
        isOnProfilePage,
        isInitialized,
        user,
        isFavorite,
        onPropertyRemove,
      ]
    );

    const isSideBySide = ![
      "mapPopUp",
      "mobileMap",
      "mobileList",
      "profile",
    ].includes(variant || "default");

    // Get responsive dimensions, fallback to default values
    const dimensions = cardDimensions || {
      height: "h-64 md:h-72",
      imageRatio: "aspect-[4/3]",
      padding: "p-2 md:p-3",
      gap: "gap-4",
    };

    return (
      <Card
        ref={variant === "mapPopUp" ? popUpRef : cardRef}
        className={cn(
          "property-card bg-white overflow-hidden relative shadow-[0px_0px_12.364866256713867px_0px_rgba(0,0,0,0.15)] border-0",
          variant !== "mapPopUp" &&
          "transition-all duration-200 hover:shadow-md",
          // Layout mode
          isSideBySide && "flex",

          // Sizing and padding - use rem for DPI independence
          variant === "mapPopUp"
            ? "rounded-[0.625rem] w-[16.375rem] h-[16.375rem]"
            : variant === "mobileList"
              ? " p-0 self-stretch"
              : variant === "mobileMap" ? "p-0 self-stretch"
                : `rounded-[0.9375rem] md:rounded-[1.25rem] ${dimensions.padding} self-stretch`,

          // Width - ensure cards don't exceed container and maintain consistent width
          variant === "mobileMap" && "w-full max-w-full min-w-0",
          variant !== "mobileMap" &&
          variant !== "mapPopUp" &&
          "w-full max-w-full min-w-0",

          // Responsive height for side-by-side layout
          isSideBySide && dimensions.height
        )}
      >
        {variant !== "mapPopUp" ? (
          <>
            {/* Image Container */}
            <div
              className={cn(
                "relative flex gap-2",
                isSideBySide
                  ? "h-full w-full md:w-2/4 flex-shrink-0"
                  : "w-full"
              )}
            >
              {/* Main Carousel */}
              <div className="flex-1">
                <PropertyImageContainer
                  variant={variant}
                  propertyImages={propertyImages}
                  title={title}
                  isFavorite={isFavorite}
                  likeProperty={likeProperty}
                  handleCloseIconClick={handleCloseIconClick}
                  isWishlistLoading={wishlistLoading}
                  isWishlistInitialized={isInitialized}
                  isBoosted={isBoosted}
                  boostInfo={boostInfo}
                  propertyId={id}
                  propertyTitle={title}
                  rating={builder?.rating}
                  price={price}
                />
              </div>

              {/* Thumbnail Images - Right side of carousel */}
              {isSideBySide && (
                <div className="hidden lg:flex flex-col gap-5 justify-center flex-shrink-0 h-full items-stretch">
                  {propertyImages.slice(1, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleMediaGalleryRedirection(e, image)}
                      className={cn(
                        "relative w-[4.375rem] h-[5rem] rounded-lg overflow-hidden transition-all hover:opacity-90 hover:scale-105"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {/* Add play icon for video thumbnail (middle one) */}
                      {index === 1 && (
                        <div className="absolute bottom-1 left-1">
                          <Play
                            className="w-4 h-4 text-white drop-shadow-md"
                            fill="white"
                          />
                        </div>
                      )}
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1">
                          <p className="text-white text-xs font-medium drop-shadow-md">360°</p>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="absolute bottom-1 left-1">
                          <span className="text-white font-bold text-xs drop-shadow-md">
                            +15
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Container */}
            <div
              className={cn(
                "flex-1 flex flex-col justify-between min-w-0 overflow-hidden pl-0 sm:pl-3",
                `${variant === "mobileList" ? "p-3" : ""}`,
                `${variant === "mobileMap" ? "p-2" : ""}`
                // dimensions.padding
              )}
            >
              <div className="flex-1">
                <TitleDetails
                  isMobileMapView={isMobileMapView}
                  title={title}
                  rera={reraId}
                  sector={region}
                  city={city}
                  builder={builder}
                  variant={variant}
                  isBoosted={isBoosted}
                  boostInfo={boostInfo}
                  price={price}
                />
                <>
                  {variant === "default" && (
                    <DistanceDetails
                      nearbyProperties={nearbyProperties}
                      isMobileMapView={isMobileMapView}
                      isMobileListView={isMobileListView}
                    />
                  )}
                  <UnitDetails
                    units={sampleUnits}
                    rera={reraId}
                    isMobileMapView={isMobileMapView}
                    isMobileListView={isMobileListView}
                  />
                </>
              </div>

              <div className={cn(dimensions.gap.replace("gap-", "space-y-"))}>
                {(() => {
                  return !showViewFullDetailsButton ? (
                    <PossessionAndPrice
                      isMobileMapView={isMobileMapView}
                      price={price}
                      possession={possessionStatus}
                      variant={variant}
                      targetCompletionDate={targetCompletionDate}
                    />
                  ) : (
                    <ViewFullDetailButton
                      handleFullDetailButtonClick={handleRedirection}
                    />
                  );
                })()}
                <BuilderInfo
                  logo={builder?.logo}
                  name={
                    builder?.legalName || builder?.bondName || "Amiltus Builder"
                  }
                  phoneNo={builder?.phoneNo}
                  whatsAppNo={builder?.whatsAppNo}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <PropertyImageContainer
              variant={variant}
              propertyImages={propertyImages}
              title={title}
              isFavorite={isFavorite}
              likeProperty={likeProperty}
              handleCloseIconClick={handleCloseIconClick}
              isWishlistLoading={wishlistLoading}
              isWishlistInitialized={isInitialized}
              isBoosted={isBoosted}
              boostInfo={boostInfo}
              propertyId={id}
              propertyTitle={title}
              rating={builder?.rating}
              price={price}
            />
            <div
              className="p-2 md:p-3 cursor-pointer"
              onClick={handleRedirection}
            >
              <TitleDetails
                title={title}
                rera={reraId}
                sector={region}
                city={city}
                builder={builder}
                variant={variant}
                price={price}
              />
              <PossessionAndPrice
                price={price}
                possession={possessionStatus}
                variant={variant}
                targetCompletionDate={targetCompletionDate}
              />
            </div>
            {/* Smart InfoWindow pointer */}
            <div style={getPointerStyles()}></div>
          </>
        )}
      </Card>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function - only re-render when these critical props change
    return (
      prevProps.id === nextProps.id &&
      prevProps.showViewFullDetailsButton === nextProps.showViewFullDetailsButton &&
      prevProps.variant === nextProps.variant &&
      prevProps.price === nextProps.price &&
      prevProps.title === nextProps.title &&
      prevProps.possessionStatus === nextProps.possessionStatus &&
      prevProps.isBoosted === nextProps.isBoosted &&
      prevProps.initialIsFavorite === nextProps.initialIsFavorite
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;
