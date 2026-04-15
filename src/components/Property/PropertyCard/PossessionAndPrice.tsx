import React from "react";
import { formatIndianCurrency } from "@/utils/format-indian-currency";
import {
  Building,
  CarFront,
  CircleParking,
  Dumbbell,
  TentTree,
  Trees,
  Users,
  Waves,
} from "lucide-react";
import {
  PROPERTY_COLORS,
  PROPERTY_DEFAULTS,
} from "@/constants/property-ui-constants";

type PossessionAndPriceProps = {
  isMobileMapView?: boolean;
  price?: string;
  max?: number;
  possession?: string;
  emi?: number;
  variant?: string;
  targetCompletionDate?: string;
};

const AMENITY_ICONS = {
  swimmingPool: Waves,
  gym: Dumbbell,
  // clubhouse: Users,
  joggingTrack: TentTree,
  parking: CircleParking,
  greenArea: Trees,
  // building: Building,
} as const;

const DEFAULT_AMENITIES = [
  "swimmingPool",
  // "building",
  // "clubhouse",
  "gym",
  "parking",
  "greenArea",
  "joggingTrack",
] as const;

export const PossessionAndPrice = React.memo(
  ({
    isMobileMapView,
    price,
    possession,
    variant,
    targetCompletionDate
  }: PossessionAndPriceProps) => {

    return (
      <div className="mt-1 mb-1 pb-1">
        <div className="flex items-center justify-between gap-2 truncate">
          <div className="flex items-center justify-start flex-shrink gap-1 md:gap-2">
            {DEFAULT_AMENITIES.map((amenity) => {
              const IconComponent = AMENITY_ICONS[amenity];
              return (
                <IconComponent
                  key={amenity}
                  className="w-4 h-4 xl:w-6 xl:h-5 text-[#A7A7A7]"
                  strokeWidth={1.3}
                />
              );
            })}
          </div>
          {variant !== "mapPopUp" ? (
            <div className="text-right min-w-0 flex-1">
              <p
                className="font-semibold truncate text-base lg:text-lg xl:text-xl"
                style={{ color: PROPERTY_COLORS.primary }}
              >
                {PROPERTY_DEFAULTS.pricePrefix}
                {formatIndianCurrency(price)}
              </p>
            </div>
          ) : (
            <div className="text-right min-w-0 flex-1">
              <p
                className="font-semibold truncate text-sm md:text-base "
                style={{ color: PROPERTY_COLORS.primary }}
              >
                {PROPERTY_DEFAULTS.pricePrefix}
                {formatIndianCurrency(price)}
              </p>
            </div>
          )}
        </div>
        {possession && (
          <div className="flex items-center justify-between gap-1">
            <div className="px-1.5 py-0.5 md:px-2 md:py-1 mt-0.5 truncate rounded-[5.09px] bg-stone-50 text-zinc-500 text-xs">
              Target Possession by {targetCompletionDate}
            </div>
            <div className="shrink-0 truncate text-center items-center">
              {variant !== "mapPopUp" ? (
                <p className="text-[#235920] text-sm md:text-sm ">
                  {PROPERTY_DEFAULTS.emiText}
                </p>
              ) : (
                <p className="text-[#235920] text-[10px] md:text-[11px] ">
                  {PROPERTY_DEFAULTS.emiText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PossessionAndPrice.displayName = "PossessionAndPrice";
