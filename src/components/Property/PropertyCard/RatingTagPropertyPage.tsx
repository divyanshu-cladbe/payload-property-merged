import React, { useId } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingBadgeProps = {
  rating?: string;
  variant?: "default" | "map" | "mobileMap" | "mapPopUp" | "mobileList" | "profile";
  className?: string;
};

export const RatingTagPropertyPage = React.memo(
  ({ rating, variant = "default", className }: RatingBadgeProps) => {
    const gradientId = useId().replace(/:/g, "");

    if (!rating) return null;

    const numericRating = parseFloat(rating);
    if (isNaN(numericRating)) return null;

    const isSmall = variant === "mobileMap";
    const isMobileList = variant === "mobileList";

    const hasPositioning =
      className?.includes("static") ||
      className?.includes("relative") ||
      className?.includes("top-") ||
      className?.includes("left-");

    return (
      <div
        className={cn(
          !hasPositioning && "absolute z-40",
          !hasPositioning &&
            (isMobileList ? "top-[-1rem] right-2" : "top-0 right-2 sm:right-6"),
          isMobileList
            ? "w-8 h-12 sm:w-10 sm:h-12"
            : isSmall
              ? "w-8 h-10 sm:w-10 sm:h-12"
              : "w-10 h-12 sm:w-11 sm:h-14 lg:w-12 lg:h-16",
          className,
        )}
      >
        <svg
          className="w-full h-full drop-shadow-md"
          viewBox="0 0 42 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Rounded Path Logic */}
          <path
            d="M4 0C1.79086 0 0 1.79086 0 4V38.697C0 39.7533 0.418432 40.7663 1.16335 41.5146L19.3874 55.666C20.0639 56.1664 21.0434 56.1664 21.7199 55.666L39.9439 41.5146C40.6889 40.7663 41.1073 39.7533 41.1073 38.697V4C41.1073 1.79086 39.3164 0 37.1073 0H4Z"
            fill={`url(#${gradientId})`}
          />
          <defs>
            <linearGradient
              id={gradientId}
              x1="41.1066"
              y1="28.2104"
              x2="0"
              y2="28.2104"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E91614" />
              <stop offset={1} stopColor="#E05D31" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center mb-1">
          <Star className="fill-[#FFEAEA] text-[#FFEAEA] w-2.5 h-2.5 sm:w-3 sm:h-3 mb-0.5" />
          <span
            className={cn(
              "text-[#FFEAEA] font-bold leading-none",
              isSmall
                ? "text-[10px] sm:text-xs"
                : "text-xs sm:text-sm lg:text-base",
            )}
          >
            {Math.round(numericRating)}
          </span>
        </div>
      </div>
    );
  },
);

// RatingBadge.displayName = "RatingBadge";