"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Builder {
  id: string;
  legalName: string;
  bondName: string;
  logo?: string;
  yearsOfExperience?: number;
}

interface BuilderCardProps {
  builder?: Builder;
}

export const BuilderCard: React.FC<BuilderCardProps> = ({ builder }) => {
  const builderName =
    builder?.legalName || builder?.bondName || "Amiltus Builders";
  const builderLogo = builder?.logo || "/images/sample-property/builder1.png";

  return (
    <div className="bg-white px-4 pt-4 sm:px-6 sm:pt-4">
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={builderLogo}
            alt={builderName}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-base sm:text-xl truncate">
            {builderName}
          </h3>
          <div className="flex items-center gap-1">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-600 ml-1">(4.2)</span> */}
            <p className="text-[#A7A7A7]">Listed by</p>
          </div>
        </div>
      </div>
    </div>
  );
};
