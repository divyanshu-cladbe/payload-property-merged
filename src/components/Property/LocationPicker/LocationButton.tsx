"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Location } from "@/store/slices/locationSlice";

interface LocationButtonProps {
  currentLocation: Location | null;
  onOpenModal: () => void;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  currentLocation,
  onOpenModal,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 border border-[#BB2828] shadow-[inset_0px_0px_10px_#BB282840] text-[#BB2828] hover:text-white font-medium text-xs rounded-2xl"
      onClick={onOpenModal}
    >
      <MapPin className="h-4 w-4" />
      <span className="max-w-[100px] truncate">
        {mounted ? (currentLocation?.address || "Select Location") : "Loading..."}
      </span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  );
};