import React from "react";
import { cn } from "@/lib/utils";

interface UnitConfig {
  type: string;
  area: string;
  units: number;
}

interface UnitDetailsProps {
  isMobileMapView?: boolean;
  isMobileListView?: boolean;
  units?: UnitConfig[];
  className?: string;
  rera?: string;
}

export const UnitDetails: React.FC<UnitDetailsProps> = ({
  isMobileMapView = false,
  isMobileListView = false,
  units = [],
  className,
  rera,
}) => {
  // If no units data, don't render anything
  if (!units.length) {
    return null;
  }

  const textSize =
    isMobileMapView || isMobileListView
      ? "text-xs sm:text-xs"
      : "text-xs ";
  const gapSize = isMobileMapView
    ? "gap-1 sm:gap-1"
    : "gap-1 lg:gap-1.5 xl:gap-2";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between mt-1.5 lg:mt-2 mb-0",
        gapSize,
        className
      )}
      role="region"
      aria-label="Unit configurations"
    >
      <div className={cn("flex items-center flex-wrap gap-1 sm:gap-1")}>
        {units.map((unit, index) => (
          <span
            key={`${unit.type}-${index}`}
            className={cn(
              "border border-[#E9E9E9] px-1.5 sm:px-1.5 py-0.5 sm:py-.5 rounded-md text-[#7D7D7D] shadow-sm",
              // "hover:border-[#000000] transition-colors font-normal",
              textSize
            )}
            title={`${unit.type} - ${unit.area} (${unit.units} units available)`}
          >
            {unit.type}-{unit.area}
          </span>
        ))}
      </div>
      {rera && (
        <span
          className={cn(
            "border border-[#BB2828] px-1.5 sm:px-1 py-0.5 sm:py-.5 rounded-xl text-[#BB2828] bg-white",
            "flex items-center gap-1 shrink-0 font-normal ",
            textSize
          )}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.255 11.555L4.25 8.548l1.002-1.001L7.255 9.55l4.007-4.007 1.002 1.002-5.009 5.01z"
              fill="#BB2828"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M.707 8.5a7.792 7.792 0 1115.584 0 7.792 7.792 0 01-15.584 0zm7.792 6.376a6.375 6.375 0 110-12.75 6.375 6.375 0 010 12.75z"
              fill="#BB2828"
            />
          </svg>
          {/* <Image
            src="/icons/rera-check.png"
            alt="RERA"
            width={10}
            height={10}
            className="sm:w-3 sm:h-3"
          /> */}
          RERA
        </span>
      )}
    </div>
  );
};
