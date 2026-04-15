import React from "react";
import Icons from "./Icons";
import Image from "next/image";
export function PropertyHighlights({ city }: { city: string }) {
  const consData = [
    `One of the biggest project in the heart of ${city}`,
    "Lorem ipsum dolor sit amet, consectetur adipiscing",
    "Lorem ipsum dolor sit amet, consectetur adipiscing",
    "Lorem ipsum dolor sit amet, consectetur adipiscing",
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 max-w-7xl mx-auto">
        <div className="flex-1">
          <div className="bg-gradient-to-r from-[#FFF9F3] from-50% to-[#FFE2C1] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full relative overflow-hidden">
            {/* Background Image - Positioned absolutely */}
            <div className="absolute right-0 bottom-0 w-96 h-full bg-contain bg-bottom bg-no-repeat mix-blend-multiply lg:opacity-70 opacity-55">
              <Image
                src="/images/highlightImage.png"
                alt="project-highlight-image"
                fill
              />
            </div>

            {/* Content with higher z-index */}
            <div className="relative z-10">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-4 sm:mb-6 lg:mb-8">
                Project Highlights
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {consData.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <Icons.CheckIcon color="red" />
                    <p className="text-black text-sm sm:text-base sm:text-gray-600 leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
