import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSearching: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SearchButton = React.memo<SearchButtonProps>(
  ({ onClick, disabled, isSearching, className, children }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full sm:w-auto px-6 py-2.5 rounded-full text-white font-medium text-sm sm:text-base",
        "bg-[#BB2828] hover:bg-red-700 transition-colors duration-300",
        disabled ? "opacity-70 cursor-not-allowed" : "",
        className
      )}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <Search className="w-5 h-5 inline mr-2" />
      {children || (isSearching ? "Searching..." : "Search")}
    </motion.button>
  )
);

SearchButton.displayName = "SearchButton";
