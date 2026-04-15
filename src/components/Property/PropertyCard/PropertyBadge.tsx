import React from "react";
import { cn } from "@/lib/utils";

import Icons from "./Icons";
import {
  PROPERTY_BOOST_STYLES,
  PROPERTY_DEFAULTS, BADGE_CONFIG, BADGE_TOOLTIP_CONTENT
} from "@/constants/property-ui-constants";


type PropertyBadgeProps = {
  isBoosted?: boolean;
  variant?: string;
  boostInfo?: {
    type: "premium" | "featured" | "sponsored";
    priority: number;
    boostedUntil: string;
  };
  showCategoryBadges?: boolean;
  price?: string | number;
};

type BadgeVariant = "value" | "budget" | "lux";

type BadgeProps = {
  variant: BadgeVariant;
  className?: string;
};

function capitalizeFirstOnly(str: string | undefined) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const AuthenticBadge = React.memo(() => (
  <div className="inline-flex items-center gap-1 md:gap-1.5 rounded-md border border-stone-300 bg-white py-0.5 md:py-1 pl-0.5 md:pl-1 pr-2 md:pr-3 shadow-sm">
    <div className="flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full bg-black">
      <Icons.TickIcon size={15} bgColor="#000" tickColor="#fff" />
    </div>
    <span className="font-['Alata'] text-[10px] md:text-xs font-normal leading-none text-black">
      {PROPERTY_DEFAULTS.authenticBadgeText}
    </span>
  </div>
));

AuthenticBadge.displayName = "AuthenticBadge";

const BoostedBadge = React.memo(
  ({ type }: { type?: "premium" | "featured" | "sponsored" }) => (
    <div
      className={cn(
        "inline-flex items-center gap-1 md:gap-1.5 rounded-md py-0.5 md:py-1 pl-1 md:pl-1.5 pr-2 md:pr-2.5 text-xs font-semibold text-white",
        "bg-gradient-to-r from-[#A01D1D] to-[#DC7B7B]"
      )}
    >
      <div className="flex h-3 w-3 md:h-4 md:w-4 items-center justify-center rounded-full">
        <Icons.TickIcon size={15} bgColor="#fff" tickColor="#000" />
      </div>
      <span className="font-['Alata'] text-[10px] md:text-xs font-normal leading-none text-white">
        {capitalizeFirstOnly(type) || PROPERTY_DEFAULTS.boostedBadgeText}
      </span>
    </div>
  )
);

BoostedBadge.displayName = "BoostedBadge";


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Building2, Gem, Tag } from "lucide-react";

const Badge = React.memo(({ variant, className }: BadgeProps) => {
  const config = BADGE_CONFIG[variant];
  // @ts-ignore
  const tooltipContent = BADGE_TOOLTIP_CONTENT[variant];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="h-4 w-4 text-[#C19D60]" />;
      case "Gem":
        return <Gem className="h-4 w-4 text-[#C19D60]" />;
      case "Tag":
        return <Tag className="h-4 w-4 text-[#C19D60]" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild> */}
            <div
              className={cn(
                "inline-flex items-center rounded-md p-[1px] shadow-sm cursor-help",
                className
              )}
              style={{
                background: config.borderGradient,
              }}
            >
              <div className="inline-flex items-center rounded-[calc(0.375rem-1px)] bg-white py-0.5 md:py-1 px-2 md:px-3">
                <span
                  className={cn(
                    "text-[10px] md:text-xs leading-none ",
                    config.fontClass
                  )}
                  style={{ color: config.textColor }}
                >
                  {config.label}
                </span>
              </div>
            </div>
          {/* </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="start"
            className="bg-[#FFFBF5] text-black border-none shadow-xl p-0 w-[230px] overflow-hidden rounded-xl z-[9999]"
          >
            <div className="relative">
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-lg leading-tight mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                    {tooltipContent.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium truncate leading-snug">
                    {tooltipContent.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  {tooltipContent.features.map((feature: any, index: number) => (
                    <div key={index} className="flex gap-3 items-start group">
                      <div className="mt-0.5 shrink-0">
                        {getIcon(feature.icon)}
                      </div>
                      <div className="border-b border-gray-100 pb-3 flex-1 last:border-0 last:pb-0">
                        <p className="text-xs text-gray-800 leading-snug">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </>
  );
});

Badge.displayName = "Badge";

export const PropertyBadge = React.memo(
  ({
    isBoosted = false,
    boostInfo,
    variant,
    showCategoryBadges = true,
    price,
  }: PropertyBadgeProps) => {

    const getBadgeVariant = () => {
      if (price === undefined || price === null || price === "") return "value"; 
      const priceValue = typeof price === "string" ? parseFloat(price) : price;

      if (isNaN(priceValue)) return "value";

      if (priceValue >= 15000000) {
        return "lux";
      } else if (priceValue < 10000000) {
        return "budget";
      } else {
        return "value";
      }
    };

    const badgeVariant = getBadgeVariant();


    if (isBoosted) {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          <BoostedBadge type={boostInfo?.type} />
          {showCategoryBadges && variant !== "mapPopUp" && variant !== "mobileMap" && (
            <Badge variant={badgeVariant} />
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 flex-wrap">
        <AuthenticBadge />
        {showCategoryBadges && variant !== "mapPopUp" && variant !== "mobileMap" && (
          <Badge variant={badgeVariant} />
        )}
      </div>
    );
  }
);

PropertyBadge.displayName = "PropertyBadge";