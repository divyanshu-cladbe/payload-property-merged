"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icons from "./Icons";

interface Builder {
  id: string;
  legalName: string;
  bondName: string;
  logo?: string;
  summary?: string;
  yearsOfExperience?: number;
  rating?: number;
}

interface Property {
  summary?: string;
  price: number;
}

export default function PropertyBuilderInsights({
  property,
  builder,
}: {
  property: Property;
  builder?: Builder;
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatToCr = (amount: number) => {
    const cr = amount / 10000000;
    const value = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1);
    return `Rs. ${value} Cr.`;
  };

  const trackingStats = [
    { label: "Completed Projects", value: "05" },
    { label: "Listings", value: "07" },
    { label: "Completed Projects", value: "05" },
    { label: "Listings", value: "07" },
  ];

  return (
    <div className="bg-white p-[1px] rounded-[24px] bg-gradient-to-b from-[#77B736] to-[#2D57AB] shadow-xl overflow-hidden max-w-full">
      <div className="bg-white rounded-[23px] overflow-hidden flex flex-col h-full">
        
        {/* Header: Gradient Background with Bowl Shape */}
        <div className="bg-gradient-to-r from-[#7AB642] to-[#3659A7] px-4 py-6 sm:px-6 sm:py-8 relative rounded-b-[35%] sm:rounded-b-[40%] flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white rounded-full p-2 shadow-md">
              <Icons.propertyIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="z-10">
              <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                Insight Edge
              </h2>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                Exclusive Project Insights
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80">
            <Icons.shieldIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-5 sm:p-7 md:p-8 flex flex-col gap-6 sm:gap-8">
          
          {/* Price and Rating Row */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl sm:text-3xl font-bold text-[#C2410C]">
                {formatToCr(property.price || 20000000)}
              </div>
              <span className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Total Value
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <Icons.starIcon className="text-yellow-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-bold text-gray-700 text-xs sm:text-sm">
                {builder?.rating || 4.5}
              </span>
            </div>
          </div>

          {/* Section: Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Icons.summaryIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                Summary
              </h3>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed text-left font-normal">
              {property.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."}
            </p>
          </div>

          {/* Section: About the Builder */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Icons.builderIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                  About the builder
                </h3>
              </div>
              <div className="bg-[#719E47] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                <Icons.shieldIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Verified</span>
              </div>
            </div>

            <div className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              {showFullDescription
                ? builder?.summary
                : `${(builder?.summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").substring(0, 120)}...`}
              {!showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="text-red-700 text-xs sm:text-sm font-bold ml-1 hover:underline"
                >
                  Read More
                </button>
              )}
            </div>

            {/* Builder Identity */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 sm:w-14 sm:h-14 relative rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <Image
                  src={builder?.logo || "/images/sample-property/builder1.png"}
                  alt={builder?.legalName || "Amiltus Builders"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm sm:text-lg text-black truncate">
                  {builder?.legalName || "Amiltus Builders"}
                </h4>
                <p className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase mt-0.5">Project By</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 w-full"></div>

          {/* Section: Past Tracking */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <Icons.clockIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                Past Tracking
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {trackingStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center"
                >
                  <div className="text-xl sm:text-3xl font-bold text-black leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-gray-400 mt-2 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}