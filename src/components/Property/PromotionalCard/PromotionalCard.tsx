import React from "react";
import { cn } from "@/lib/utils";
import Icons from "./Icons";

export type PromotionalCardVariant =
  | "cashback"
  | "prop20-simple"
  | "prop20-dark"
  | "prop20-image";

export interface PromotionalCardProps {
  variant: PromotionalCardVariant;
  className?: string;
}

const PromotionalCard: React.FC<PromotionalCardProps> = ({
  variant,
  className,
}) => {
  // Variant 1: Cashback Card (Red gradient with cashback amount)
  if (variant === "cashback") {
    return (
      <section
        aria-label="Property cashback promotion"
        className={cn(
          "relative overflow-hidden rounded-2xl p-[2px]",
          className
        )}
      >
        <div className="relative rounded-[14px] p-5 md:p-6 bg-gradient-to-r from-[#7F0303] to-[#E56767] shadow-[0px 0px 10px 2px #00000026]">
          {/* Inner glossy edge */}
          {/* <div className="absolute inset-0 rounded-[14px] ring-1 ring-black/30" /> */}

          <div className="relative flex items-center justify-between gap-3 md:gap-6">
            {/* Left: Logo + Divider + Content + Button */}
            <div className="flex items-center gap-2 md:gap-5 flex-1 min-w-0">
              <div className="shrink-0">
                <Icons.PropertyIcon />
              </div>
              {/* Divider  */}
              <div className="h-10 md:h-14 w-px bg-white shrink-0" />
              {/* Content  */}
              <div className="flex items-center justify-between gap-2 md:gap-4 flex-1 min-w-0">
                <div className="text-white flex-1 min-w-0">
                  <h3 className="text-[12px] md:text-[16px] leading-snug font-semibold text-white/95">
                    Book exclusive properties with ease and get updates on our
                    latest bookings.
                  </h3>
                </div>
                {/* Button  */}
                <div className="hidden sm:flex absolute right-1/4 top-8 md:top-11 shrink-0 rounded-full border bg-[#6E494926] border-white/70 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
                  T & C Apply
                </div>
              </div>
            </div>

            {/* Right: Divider + Cashback Amount */}
            <div className="flex items-center gap-2 md:gap-5 shrink-0">
              <div className="h-10 md:h-14 w-px bg-white" />
              <div className="text-right text-white min-w-[70px] md:min-w-[100px]">
                <div className="text-[24px] md:text-[36px] leading-none font-semibold opacity-95">
                  Rs.200
                </div>
                <div className="text-[11px] md:text-[14px] opacity-90">Cashback</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant 2: Simple PROP 20 (Red gradient, simple layout)
  if (variant === "prop20-simple") {
    return (
      <section
        className={cn(
          "relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-r from-[#7F0303] to-[#E56767] shadow-[0px 0px 10px 2px #00000026]",
          className
        )}
      >
        <div className="relative rounded-[14px] p-5 md:p-6">
          {/* Watermark pattern - gear/percent */}
          <Icons.waterMarkIcon />

          <div className="relative flex items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-5 flex-1 min-w-0">
              <div className="shrink-0">
                <Icons.PropertyIcon />
              </div>
              {/* Divider  */}
              <div className="relative h-10 md:h-14 w-px shrink-0">
                <div className="absolute inset-0 bg-white/40 blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white/60" />
              </div>
              <div className="text-white flex-1 min-w-0">
                <div className="text-[24px] md:text-[36px] leading-none font-bold tracking-tight">
                  PROP 20
                </div>
                <p className="mt-1 text-[12px] md:text-[15px] text-white/95">
                  Book exclusive properties with ease and get updates on our
                  latest bookings.
                </p>
              </div>
            </div>
            <div className="absolute right-1 bottom-8 md:bottom-11 shrink-0 rounded-xl border bg-[#6E494926] border-white/70 px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
              T & C Apply
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant 3: Dark PROP 20 (Dark brown/black gradient)
  if (variant === "prop20-dark") {
    return (
      <section
      className={cn(
        "relative overflow-hidden rounded-2xl p-[2px]",
        className
      )}
    >
      <div className="relative rounded-[14px] p-5 md:p-6 bg-gradient-to-r from-[#390E0E] to-[#624646] shadow-[0px_0px_10px_2px_#00000026]">
        {/* Watermark percent - gear shape */}
        <div className="absolute inset-0 pointer-events-none">
          <Icons.waterMarkIcon />
        </div>

        <div className="relative flex items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
            {/* Icon Container - Centered Alignment */}
            <div className="shrink-0 flex items-center justify-center">
              <Icons.PropertyIcon />
            </div>

            {/* Divider - Vertical Alignment Match */}
            <div className="h-12 md:h-16 w-px bg-white/25 shrink-0 self-center" />

            {/* Content Section */}
            <div className="text-white flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-white/70 text-[11px] md:text-[13px] leading-none mb-1">
                Use Code
              </p>
              <h3 className="text-[24px] md:text-[32px] leading-tight font-semibold">
                Prop20
              </h3>
              <p className="mt-1 text-[12px] md:text-[15px] text-white/90 lg:truncate leading-snug">
                Book exclusive properties with ease and get updates on our
                latest bookings.
              </p>
            </div>
          </div>

          {/* T&C Badge - Refined Positioning */}
          <div className="shrink-0 self-end lg:self-center">
            <div className="rounded-full border bg-[#A15959] border-white/70 px-3 md:px-4 py-1 md:py-2 text-[10px] md:text-sm font-medium text-white/90 transition-colors hover:bg-white/20 whitespace-nowrap cursor-pointer">
              T & C Apply
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }

  // Variant 4: Image-based PROP 20 (Light pink with property image)
  if (variant === "prop20-image") {
    return (
      <section
        className={cn(
          "relative overflow-hidden rounded-2xl p-[2px]",

          className
        )}
      >
        <div className="relative rounded-[14px] p-5 md:p-6 bg-gradient-to-r from-[#ffffff] to-[#FFC7C7] shadow-[0px 0px 10px 2px #00000026]">
          <div className="relative flex items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
              {/* Thumbnail */}
              <img
                alt="Property"
                src="/images/sample-property/sample1.png"
                className="h-[70px] w-[85px] md:h-[100px] md:w-[120px] rounded-[14px] object-cover ring-1 ring-black/10 shrink-0"
              />
              {/* <div className="h-14 w-px bg-neutral-300" /> */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] md:text-[13px] text-neutral-600">Use Code</p>
                <h3 className="text-[24px] md:text-[32px] leading-tight font-bold text-[#B32424]">
                  Prop20
                </h3>
                <p className="mt-1 text-[12px] md:text-[15px] text-neutral-600">
                  Book exclusive properties with ease and get updates on our
                  latest bookings.
                </p>
              </div>
            </div>
            <div className="self-center shrink-0">
              <div className="absolute right-1 top-1 rounded-full border bg-[#FF8484] border-white/70 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
                T & C Apply
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

PromotionalCard.displayName = "PromotionalCard";

export default PromotionalCard;
