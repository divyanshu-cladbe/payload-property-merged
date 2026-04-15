import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyType } from "@/types/property";

interface PropertyTypeCardProps {
  type: PropertyType;
  icon: React.ElementType;
  isSelected: boolean;
  isSearching: boolean;
  onClick: () => void;
}

export const PropertyTypeCard = React.memo<PropertyTypeCardProps>(
  ({ type, icon: Icon, isSelected, isSearching, onClick }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" as const, bounce: 0.3 }}
    >
      <button
        onClick={onClick}
        disabled={isSearching}
        className={cn(
          "group relative w-full h-[100px] sm:h-[120px] p-3 sm:p-4 rounded-2xl transition-all duration-300",
          "flex flex-col items-center justify-center gap-3",
          isSelected
            ? "bg-white shadow-lg border border-red-100"
            : "bg-white hover:shadow-md border border-gray-100",
          isSearching ? "opacity-70 cursor-not-allowed" : ""
        )}
      >
        <div
          className={cn(
            "rounded-xl p-3 transition-all duration-300",
            isSelected ? "bg-[#BB2828] text-white" : "text-gray-400 bg-gray-50"
          )}
        >
          <Icon />
        </div>

        <span
          className={cn(
            "text-xs text-center leading-tight px-1",
            isSelected ? "text-[#BB2828]" : "text-gray-600"
          )}
        >
          {type}
        </span>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full 
                     flex items-center justify-center shadow-md"
          >
            <Search className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </button>
    </motion.div>
  )
);

PropertyTypeCard.displayName = "PropertyTypeCard";
