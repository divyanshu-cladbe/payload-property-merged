import React from "react";
import Image from "next/image";
import type { City } from "@/hooks/useLocationPicker";

interface CityCardProps {
  city: City;
  imageUrl: string;
  onClick: () => void;
  priority?: boolean;
}

export const CityCard: React.FC<CityCardProps> = ({
  city,
  imageUrl,
  onClick,
  priority = false,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative group overflow-hidden rounded-lg aspect-video w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
      <Image
        src={imageUrl}
        alt={`${city.name} city view`}
        width={400}
        height={300}
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        priority={priority}
      />
      <div className="absolute bottom-2 left-2 text-white z-20">
        <p className="text-sm font-bold  ">{city.name}</p>
        <p className="text-[10px] sm:text-xs">
          {city.propertiesCount} properties
        </p>
      </div>
    </button>
  );
};
