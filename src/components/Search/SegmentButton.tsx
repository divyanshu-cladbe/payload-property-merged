import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PropertySegment } from "@/types/property";

interface SegmentButtonProps {
  segment: PropertySegment;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const SegmentButton = React.memo<SegmentButtonProps>(
  ({ segment, isSelected, onClick, disabled }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 rounded-full transition-colors duration-300",
        "text-sm sm:text-base font-medium whitespace-nowrap",
        isSelected
          ? "text-white bg-[#BB2828]"
          : "text-gray-500 hover:text-gray-700 bg-gray-100",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <span className="relative z-10 select-none text-sm">{segment}</span>
    </motion.button>
  )
);

SegmentButton.displayName = "SegmentButton";
