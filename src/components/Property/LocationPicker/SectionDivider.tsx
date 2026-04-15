import React from "react";

interface SectionDividerProps {
  showAllCities: boolean;
  onViewMore: () => void;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  showAllCities,
  onViewMore,
}) => {
  return (
    <>
      {/* Or Divider */}
      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
        <div className="h-[0.5px] bg-[#A7A7A7] flex-1"></div>
        <span className="text-[#A7A7A7] text-xs sm:text-sm">Or</span>
        <div className="h-[0.5px] bg-[#A7A7A7] flex-1"></div>
      </div>

      {/* City List Header */}
      <div className="relative max-w-md mx-auto w-full mt-4">
        <div className="flex justify-center">
          <span className="text-[#A7A7A7] font-medium text-xs sm:text-sm">
            Choose from the below list
          </span>
        </div>
        {!showAllCities && (
          <button
            onClick={onViewMore}
            className="text-[#BB2828] hover:text-red-600 font-medium text-[11px] sm:text-sm absolute -right-2 md:-right-36 top-0"
          >
            View More
          </button>
        )}
      </div>
    </>
  );
};
