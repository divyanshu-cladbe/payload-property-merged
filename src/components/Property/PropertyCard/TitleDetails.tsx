import React from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { RatingBadge } from "./RatingBadge";
import { PropertyBadge } from "./PropertyBadge";

type TitleDetailsProps = {
  isMobileMapView?: boolean;
  title: string;
  rera?: string;
  sector?: string;
  city?: string;
  builder: {
    rating?: string;
  };
  variant?: string;
  isBoosted?: boolean;
  boostInfo?: {
    type: "premium" | "featured" | "sponsored";
    priority: number;
    boostedUntil: string;
    metadata?: Record<string, any>;
  };
  price?: string | number;
};

export const TitleDetails = React.memo(
  ({
    isMobileMapView,
    title,
    rera,
    sector,
    city,
    builder,
    variant,
    isBoosted = false,
    boostInfo,
    price,
  }: TitleDetailsProps) => {
    // console.log("info boosted", boostInfo);
    return (
      <div className={`min-w-0 ${variant === "default" ? "overflow-hidden" : "relative"} `} >
        {variant === "default" &&
          (
            <PropertyBadge isBoosted={isBoosted} boostInfo={boostInfo} price={price} />
          )}
        {variant === "mobileList" &&
          (
            <PropertyBadge isBoosted={isBoosted} boostInfo={boostInfo} price={price} />
          )}
        {variant === "mobileMap" &&
          (
            <PropertyBadge isBoosted={isBoosted} boostInfo={boostInfo} price={price} />
          )}

        <div className="flex items-start justify-between gap-2 min-w-0 overflow-hidden pt-1">
          {variant !== "mapPopUp" ? (
            <h4 className="text-sm lg:text-md xl:text-lg font-extrabold truncate min-w-0 flex-1 leading-tight">
              {title}
            </h4>
          ) : (
            <h4 className="text-sm sm:text-[1rem] truncate font-extrabold min-w-0 flex-1 leading-tight">
              {title}
            </h4>
          )}
        </div>
        {variant === "default" && (
          <RatingBadge
            rating={builder?.rating}
            variant="default"
          />
        )}
        {variant === "mobileList" && (
          <RatingBadge
            rating={builder?.rating}
            variant="mobileList"
          />
        )}
        {variant === "mobileMap" && (
          <RatingBadge
            rating={builder?.rating}
            variant="mobileList"
          />
        )}
        <div>
          <p
            className={`${isMobileMapView ? `text-xs` : `text-xs`
              } truncate font-medium `}
            style={{ color: PROPERTY_COLORS.dark }}
          >
            {sector}, {city}
          </p>
        </div>
      </div>
    );
  }
);

TitleDetails.displayName = "TitleDetails";
