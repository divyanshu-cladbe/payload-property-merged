"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PropertyBadge } from "./PropertyBadge";
import { PropertyImageActions } from "./PropertyImageActions";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { shuffle } from "lodash";

type PropertyImageContainerProps = {
  variant: string;
  propertyImages: string[];
  setApi?: (api: CarouselApi) => void;
  title: string;
  isFavorite: boolean;
  likeProperty: (e: React.MouseEvent) => Promise<void>;
  handleCloseIconClick: (e: React.MouseEvent) => void;
  isWishlistLoading?: boolean;
  isWishlistInitialized?: boolean;
  isBoosted?: boolean;
  propertyId: string;
  propertyTitle: string;
  rating?: string;
  boostInfo?: {
    type: "premium" | "featured" | "sponsored";
    priority: number;
    boostedUntil: string;
    metadata?: Record<string, any>;
  };
  price?: string | number;
};

export const PropertyImageContainer = ({
  variant,
  propertyImages,
  setApi,
  title,
  isFavorite,
  likeProperty,
  handleCloseIconClick,
  isWishlistLoading = false,
  isWishlistInitialized = false,
  isBoosted = false,
  boostInfo,
  propertyId,
  propertyTitle,
  price,
}: PropertyImageContainerProps) => {
  const [current, setCurrent] = useState(0);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [randomizedImages, setRandomizedImages] = useState(propertyImages);

  const MAX_VISIBLE_DOTS = 7;
  const total = propertyImages.length;

  // Calculate the visible window of dots
  const getVisibleWindow = () => {
    if (total <= MAX_VISIBLE_DOTS) {
      // Show all dots if we have fewer than max
      return { start: 0, end: total - 1, offset: 0 };
    }

    const halfWindow = Math.floor(MAX_VISIBLE_DOTS / 2); // 3 dots on each side

    // Keep active dot centered unless near edges
    let start = current - halfWindow;
    let end = current + halfWindow;

    // Handle left edge
    if (start < 0) {
      start = 0;
      end = MAX_VISIBLE_DOTS - 1;
    }
    // Handle right edge
    else if (end >= total) {
      end = total - 1;
      start = total - MAX_VISIBLE_DOTS;
    }

    return { start, end, offset: start };
  };

  const { start, end, offset } = getVisibleWindow();

  // Calculate styles for each dot
  const getDotStyles = (index: number) => {
    const isActive = index === current;
    const isVisible = index >= start && index <= end;

    if (!isVisible) {
      return {
        opacity: 0,
        transform: 'scale(0)',
        width: 0,
        margin: 0,
      };
    }

    // Position within visible window
    const positionInWindow = index - start;
    const centerPosition = Math.floor(MAX_VISIBLE_DOTS / 2);
    const distanceFromCenter = Math.abs(positionInWindow - centerPosition);

    // Check if at edges and more content exists
    const isAtLeftEdge = positionInWindow === 0 && start > 0;
    const isAtRightEdge = positionInWindow === MAX_VISIBLE_DOTS - 1 && end < total - 1;
    const isEdgeDot = isAtLeftEdge || isAtRightEdge;

    if (isActive) {
      return {
        opacity: 1,
        transform: 'scale(1)',
        width: 8,
        margin: 2,
      };
    }

    if (isEdgeDot) {
      // Smaller dots at edges to indicate more content
      return {
        opacity: 0.4,
        transform: 'scale(0.625)', // 5px dot
        width: 6,
        margin: 2,
      };
    }

    // Normal inactive dots
    return {
      opacity: 0.6,
      transform: 'scale(0.75)', // 6px dot
      width: 6,
      margin: 2,
    };
  };
  // -----------------------

  useEffect(() => {
    setRandomizedImages(shuffle([...propertyImages]));
  }, [propertyImages]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      setCurrent(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    updateIndex();
    emblaApi.on("select", updateIndex);

    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi]);

  const handleSetApi = (api: CarouselApi) => {
    setEmblaApi(api);
    if (setApi) setApi(api);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden group",
        variant === "map"
          ? "h-[120px] sm:h-[145px] w-[220px] sm:w-[262px] rounded-tl-lg rounded-tr-lg rounded-br-lg"
          : variant === "mobileMap"
            ? "h-[150px] sm:h-[180px] w-full"
            : variant === "mobileList"
              ? "h-[200px] sm:h-[180px] w-full p-0 m-0"
              : variant === "mapPopUp"
                ? "h-[120px] sm:h-[145px] w-full rounded-t-[10px] object-cover"
                : "h-full w-full rounded-tl-lg rounded-[15px] sm:rounded-[20px] rounded-br-[15px] sm:rounded-br-[20px]",
      )}
    >
      <Carousel setApi={handleSetApi} className="w-full h-full">
        <CarouselContent>
          {randomizedImages.map((image, index) => (
            <CarouselItem key={index} className="p-0">
              <div
                className={cn(
                  "relative",
                  variant === "map"
                    ? "h-[7.5rem] sm:h-[9.063rem]"
                    : variant === "mobileMap"
                      ? "h-[9.375rem] sm:h-[11.25rem]"
                      : variant === "mapPopUp"
                        ? "h-[7.5rem] sm:h-[9.063rem]"
                        : "h-[17.5rem] sm:h-[17.5rem]",
                )}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        {canPrev && (
          <div
            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselPrevious
              variant="ghost"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 bg-white shadow-sm static translate-y-0"
            />
          </div>
        )}
        {canNext && (
          <div
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselNext
              variant="ghost"
              size="icon"
              className="h-6 w-6 sm:h-7 sm:w-7 bg-white shadow-sm static translate-y-0"
            />
          </div>
        )}

        {/* Property Badge */}
        {variant === "mapPopUp" && (
          <div className="absolute top-3 sm:top-4 left-1.5 sm:left-2 z-20">
            <PropertyBadge
              isBoosted={isBoosted}
              boostInfo={boostInfo}
              variant={variant}
              price={price}
            />
          </div>
        )}

        <PropertyImageActions
          variant={variant}
          isFavorite={isFavorite}
          likeProperty={likeProperty}
          handleCloseIconClick={handleCloseIconClick}
          isWishlistLoading={isWishlistLoading}
          isWishlistInitialized={isWishlistInitialized}
          propertyId={propertyId}
          propertyTitle={propertyTitle}
        />

        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 h-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: total }).map((_, index) => {
              const styles = getDotStyles(index);
              const isActive = index === current;

              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-full bg-white transition-all duration-300 ease-out",
                    !isActive && "bg-white/90"
                  )}
                  style={{
                    width: `${styles.width}px`,
                    height: `${styles.width}px`,
                    opacity: styles.opacity,
                    transform: styles.transform,
                    marginLeft: `${styles.margin}px`,
                    marginRight: `${styles.margin}px`,
                    backgroundColor: isActive ? PROPERTY_COLORS.indicator : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>
      </Carousel>
    </div>
  );
};