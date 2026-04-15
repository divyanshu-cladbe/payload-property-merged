"use client";

import React from "react";
import { Info } from "lucide-react";

interface PropertyInfoProps {
  areaInSqft: number | string;
  noOfUnits: number;
  projectType?: string;
  launchedOn: string;
  // Added these back to match your data source and fix the TS error
  possessionStatus?: string; 
  targetCompletionDate?: string;
  targetPossession?: string;
  reraPossession?: string;
  reraId?: string;
  tags?: string[];
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({
  areaInSqft,
  noOfUnits,
  projectType = "Residential Villas",
  launchedOn,
  possessionStatus,
  targetCompletionDate,
  targetPossession,
  reraPossession = "For Sale",
}) => {
  const displayValue = (val?: string | number) => val || "N/A";

  const infoItems = [
    {
      label: "Total Project Area",
      value: typeof areaInSqft === "number" ? `${areaInSqft}Sq.ft.` : areaInSqft,
    },
    {
      label: "No. of units",
      value: noOfUnits,
    },
    {
      label: "Type of project",
      value: projectType,
    },
    {
      label: "Launched on",
      value: launchedOn,
    },
    {
      label: "Target Possession",
      // Uses targetPossession first, falls back to targetCompletionDate
      value: targetPossession || targetCompletionDate || launchedOn,
      hasIcon: true,
    },
    {
      label: "RERA Possession",
      // Uses reraPossession first, falls back to possessionStatus
      value: reraPossession || possessionStatus || "For Sale",
      hasIcon: true,
    },
  ];

  return (
    <div className="w-full bg-white py-4">
      <h2 className="text-xl font-semibold text-[#1A1A1A] mb-8">
        Property Info
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-y-8 gap-x-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="text-[13px] sm:text-[15px] font-medium text-[#A1A1A1] whitespace-nowrap">
                {item.label}
              </p>
              {item.hasIcon && (
                <Info size={14} className="text-[#1A1A1A] cursor-help" />
              )}
            </div>
            <p className="text-[15px] sm:text-[17px] font-semibold text-[#1A1A1A]">
              {displayValue(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};