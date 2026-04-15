"use client";

import React, { useState } from "react";
import {
  Waves,
  Dumbbell,
  Gamepad2,
  Users,
  Zap,
  Activity,
  Baby,
  Trees,
} from "lucide-react";
import { Button } from "../ui/button";

interface Amenity {
  id: string;
  name: string;
  type: string;
}

interface PropertyAmenitiesProps {
  amenities?: Amenity[];
}

const getAmenityIcon = (name: string) => {
  const iconName = name.toLowerCase();
  if (iconName.includes("swimming")) return Waves;
  if (iconName.includes("gym")) return Dumbbell;
  if (iconName.includes("tennis")) return Activity;
  if (iconName.includes("basketball")) return Gamepad2;
  if (iconName.includes("clubhouse")) return Users;
  if (iconName.includes("power") || iconName.includes("backup")) return Zap;
  if (iconName.includes("yoga")) return Activity;
  if (iconName.includes("kids")) return Baby;
  if (iconName.includes("garden") || iconName.includes("park")) return Trees;
  return Activity;
};

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({
  amenities,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultAmenities = [
    { id: "1", name: "Swimming", type: "recreation" },
    { id: "2", name: "Gymnasium", type: "fitness" },
    { id: "3", name: "Tennis", type: "outdoor" },
    { id: "4", name: "Basketball Court", type: "outdoor" },
    { id: "5", name: "Clubhouse", type: "recreation" },
    { id: "6", name: "Power Backup", type: "utility" },
    { id: "7", name: "Yoga Area", type: "fitness" },
    { id: "8", name: "Kids Play", type: "recreation" },
    { id: "9", name: "Jogging Track", type: "fitness" },
    { id: "10", name: "Landscape Garden", type: "outdoor" },
    { id: "11", name: "Security", type: "utility" },
    { id: "12", name: "Intercom", type: "utility" },
  ];

  // LOGIC FIX: Check both existence AND length properly
  const hasProps = Array.isArray(amenities) && amenities.length > 0;
  const allAmenities = hasProps ? amenities : defaultAmenities;

  // Show 7 items if not expanded
  const visibleItems = isExpanded ? allAmenities : allAmenities.slice(0, 7);

  return (
    <div className="w-full bg-white py-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-[#1A1A1A] relative inline-block">
          Amenities
        </h2>

        {/* BUTTON FIX: Added z-index and explicit block display */}
        {allAmenities.length > 7 && (
          <Button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#d00000] hover:bg-[#b00000] text-white text-sm font-semibold px-6 py-2 rounded-xl border-none shadow-none z-10 relative block"
          >
            {isExpanded ? "Show less" : "See all"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
        {visibleItems.map((amenity, index) => {
          const IconComponent = getAmenityIcon(amenity.name);
          return (
            <div
              key={`${amenity.id}-${index}`}
              className="flex items-center gap-3 group transition-all"
            >
              <div className="shrink-0">
                <IconComponent className="w-6 h-6 text-[#1A1A1A] stroke-[1.5px]" />
              </div>
              <span className="text-[15px] font-medium text-[#A1A1A1] whitespace-nowrap overflow-hidden text-ellipsis">
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
