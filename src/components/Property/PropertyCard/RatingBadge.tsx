import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingBadgeProps = {
  rating?: string;
  variant?: "default" | "map" | "mobileMap" | "mapPopUp" | "mobileList" | "profile";
};

export const RatingBadge = React.memo(
  ({ rating, variant = "default" }: RatingBadgeProps) => {
    if (!rating) return null;

    const numericRating = parseFloat(rating);
    if (isNaN(numericRating)) return null;

    const isSmall = variant === "mobileMap";
    const isMobileList = variant === "mobileList";

    return (
      <div
        className={cn(
          "absolute z-30",
          isMobileList
            ? "top-[-1rem] right-2 w-8 h-12 sm:w-10 sm:h-12"
            : "top-0 right-2 sm:right-6",
          !isMobileList && (isSmall ? "w-8 h-10 sm:w-10 sm:h-12" : "w-10 h-12 sm:w-11 sm:h-15")
        )}
      >
        <svg
          width={isSmall ? "100%" : "110%"}
          height={isSmall ? "100%" : "110%"}
          viewBox="0 0 42 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 38.697V0h41.107v38.697L20.553 56.421 0 38.697z"
            fill="url(#paint0_linear_932_10505)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_932_10505"
              x1={41.1066}
              y1={28.2104}
              x2={0}
              y2={28.2104}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E91614" />
              <stop offset={1} stopColor="#E05D31" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-1 -right-1">
          <Star className={cn("fill-[#FFEAEA] text-[#FFEAEA] mb-0.5 h-3 w-3")}
          />
          <span className={cn("text-[#FFEAEA] font-semibold", isSmall ? "text-[10px] sm:text-xs" : "text-sm sm:text-md")}
          >
            {Math.round(numericRating)}
          </span>
        </div>
      </div>
    );
  }
);

RatingBadge.displayName = "RatingBadge";
