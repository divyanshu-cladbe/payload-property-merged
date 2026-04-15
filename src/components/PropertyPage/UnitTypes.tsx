"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Icons from "./Icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface UnitSpecification {
  id: string;
  noOfRooms: number;
  noOfWashrooms: number;
  noOfBalconies: number;
  noOfLivingRooms: number;
  noOfKitchens: number;
  noOfUnits: number;
  plotArea?: string | null;
  superBuiltUpArea: string;
  coveredArea: string;
  carpetArea: string;
  front: string;
  images?: string[] | null;
  videos?: string[] | null;
  threeDModels?: string[] | null;
  floorPlan?: string | null;
  unitConfigs: any[];
}

interface UnitTypesProps {
  unitSpecifications: UnitSpecification[];
}

const DetailBox = React.memo(
  ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col gap-1">
      <h3 className="text-[#A1A1A1] font-medium text-[13px] sm:text-[15px]">
        {label}
      </h3>
      <p className="text-[#1A1A1A] text-[20px] sm:text-[24px] font-light leading-tight">
        {value}
      </p>
    </div>
  ),
);
DetailBox.displayName = "DetailBox";

export const UnitTypes: React.FC<UnitTypesProps> = ({ unitSpecifications }) => {
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [selectedView, setSelectedView] = useState(0);

  const defaultUnits = useMemo(
    () => [
      {
        id: "1",
        noOfRooms: 2,
        noOfWashrooms: 2,
        noOfBalconies: 1,
        superBuiltUpArea: "1500",
        carpetArea: "1000",
        coveredArea: "3000",
        front: "Garden Facing",
        floorPlan: "/images/floor-plans/1.png",
      },
      {
        id: "2",
        noOfRooms: 2,
        noOfWashrooms: 2,
        noOfBalconies: 1,
        superBuiltUpArea: "1500",
        carpetArea: "1000",
        coveredArea: "3000",
        front: "Park Facing",
        floorPlan: "/images/floor-plans/2.png",
      },
      {
        id: "3",
        noOfRooms: 2,
        noOfWashrooms: 2,
        noOfBalconies: 1,
        superBuiltUpArea: "1500",
        carpetArea: "1000",
        coveredArea: "3000",
        front: "Garden Facing",
        floorPlan: "/images/floor-plans/1.png",
      },
      {
        id: "4",
        noOfRooms: 2,
        noOfWashrooms: 2,
        noOfBalconies: 1,
        superBuiltUpArea: "1500",
        carpetArea: "1000",
        coveredArea: "3000",
        front: "Road Facing",
        floorPlan: "/images/floor-plans/2.png",
      },
    ],
    [],
  );

  const displayUnits = useMemo(
    () => (unitSpecifications?.length > 0 ? unitSpecifications : defaultUnits),
    [unitSpecifications, defaultUnits],
  );

  const currentUnit = displayUnits[selectedUnit] || displayUnits[0];
  const nextUnit = displayUnits[(selectedUnit + 1) % displayUnits.length];

  const viewOptions = useMemo(
    () => [
      { id: "floorplan", label: "Floor Plan" },
      { id: "3d", label: "3D View" },
      { id: "images", label: "Images" },
      { id: "video", label: "Videos" },
    ],
    [],
  );

  const detailsConfig = useMemo(
    () => [
      { label: "Unit Type", value: `${currentUnit.noOfRooms} BHK` },
      { label: "Property Type", value: "Apartment" },
      { label: "Covered Area", value: `${currentUnit.coveredArea}Sq. ft.` },
      { label: "Carpet Area", value: `${currentUnit.carpetArea}Sq. ft.` },
    ],
    [currentUnit],
  );

  return (
    <div className="w-full bg-white font-sans">
      {/* 1. Header with BHK Tabs and Full Details Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex bg-[#F8F8F8] p-1 rounded-xl sm:rounded-2xl shadow-sm border border-[#EBEBEB]">
          {displayUnits.map((unit, index) => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(index)}
              className={cn(
                "px-4 py-2 sm:px-8 sm:py-3 rounded-xl sm:rounded-2xl transition-all text-center min-w-[80px] sm:min-w-[120px]",
                selectedUnit === index
                  ? "bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white shadow-md"
                  : "text-[#1A1A1A] hover:bg-gray-100",
              )}
            >
              <p className="font-semibold text-[13px] sm:text-[15px]">
                {unit.noOfRooms} Bhk
              </p>
              <p
                className={cn(
                  "text-[10px] sm:text-[11px]",
                  selectedUnit === index ? "text-white/80" : "text-[#A1A1A1]",
                )}
              >
                {unit.superBuiltUpArea} Sq.ft.
              </p>
            </button>
          ))}
        </div>
        <button className="text-[#E91614] font-medium text-[14px] sm:text-[15px] underline underline-offset-4 pr-2">
          Full Details
        </button>
      </div>

      {/* 2. Main Content Card */}
      <div className="bg-[#ffffff] rounded-[32px] pr-2  flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left: View Navigation */}
        <div className="flex bg-[#F8F8F8] p-1  sm:rounded-2xl shadow-sm border-[#EBEBEB] sm:my-none lg:my-auto h-fit self-center flex-row border backdrop-blur-md rounded-2xl lg:flex-col gap-3 lg:w-32 order-2 lg:order-1">
          {viewOptions.map((view, index) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(index)}
              className={cn(
                "flex-1 lg:flex-none h-12 lg:h-14 flex items-center justify-center lg:justify-start lg:px-6 rounded-xl sm:rounded-2xl transition-all text-[12px] sm:text-[15px] font-semibold whitespace-nowrap",
                selectedView === index
                  ? "bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white text-[12px] shadow-sm mx-1 px-2"
                  : "text-[#1A1A1A] hover:bg-white/50",
              )}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Center: Image Gallery */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="flex gap-4 h-[300px] sm:h-[450px] lg:h-[500px]">
            <div className="relative flex-[2] rounded-3xl overflow-hidden shadow-sm border border-black/5">
              <Image
                src={currentUnit.floorPlan || "/images/floor-plans/1.png"}
                alt="Selected Floor Plan"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="relative flex-1 rounded-xl overflow-hidden border border-black/5">
                <Image
                  src={nextUnit.floorPlan || "/images/floor-plans/2.png"}
                  alt="Next Floor Plan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center group cursor-pointer">
                <Image
                  src={nextUnit.floorPlan || "/images/floor-plans/2.png"}
                  alt="More designs"
                  fill
                  className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="relative z-10 text-white text-[16px] sm:text-[20px] font-semibold">
                  +15 more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="lg:w-[350px] xl:w-[400px] order-3 flex flex-col">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-[#1A1A1A] text-[24px] sm:text-[32px] font-semibold">
              Sierra
            </h2>
            <p className="text-[#A1A1A1] text-[13px] sm:text-[15px] leading-relaxed text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-8 mb-auto">
            {detailsConfig.map((item, idx) => (
              <DetailBox key={idx} label={item.label} value={item.value} />
            ))}
          </div>

          <div className="mt-8 lg:mt-4 flex-col lg:flex-row sm:flex space-y-8 items-end justify-between lg:gap-4">
            <div className="flex flex-col">
              <span className="text-[#A1A1A1] text-[14px] sm:text-[15px] font-medium">
                Starts from
              </span>
              <p className="text-[#1A1A1A] text-[32px] sm:text-[44px] font-bold leading-none tracking-tight">
                1.2 Cr.
              </p>
            </div>
            <Button
              variant="custom" 
              size="custom"
              className="bg-gradient-to-r from-[#E91614] to-[#E05D31] hover:bg-[#E05D31] h-10 sm:h-12 px-3 sm:px-6 rounded-xl sm:rounded-xl  gap-3 shadow-lg active:scale-95 transition-all"
            >
              <span className="text-white text-[12px] sm:text-[18px] font-semibold whitespace-nowrap">
                Get instant Quote
              </span>
              <Icons.chargeIcon className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
