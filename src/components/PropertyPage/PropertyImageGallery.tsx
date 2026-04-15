"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface PropertyImageGalleryProps {
  images: string[];
  videos?: string[];
  title: string;
  id: string;
  redirectToPropertyPage?: boolean;
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  title,
  id,
}) => {
  const router = useRouter();

  const defaultImages = [
    "/images/sample-property/sample1.png",
    "/images/sample-property/sample2.png",
    "/images/sample-property/sample3.png",
    "/images/sample-property/sample4.png",
  ];

  // UPDATED: Now triggers the overlay on the same page
  const handleDetailRedirection = useCallback(
  (e: React.MouseEvent, type: "images" | "videos" | "360" | "all" = "all") => {
    e.stopPropagation();
    // We pass both the view-all trigger AND the specific filter type
    router.push(`?view-all=true&type=${type}`, { scroll: false });
  },
  [router]
);
  

  const displayImages = defaultImages;
  // const displayImages = images && images.length > 0 ? images : defaultImages;
  const otherImagesCount = 15;

  return (
    <>
      {/* Mobile layout */}
      <div className="block sm:hidden">
        {/* Main image - Clickable */}
        <div 
          className="relative w-full min-h-[200px] rounded-2xl overflow-hidden cursor-pointer"
          onClick={handleDetailRedirection}
        >
          <Image
            src={displayImages[0]}
            alt={`${title} - Main Image`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnails row */}
        <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar items-center justify-center">
          <div className="relative shrink-0 w-[6.25rem] h-[6.25rem] rounded-xl overflow-hidden cursor-pointer" onClick={(e)=>handleDetailRedirection(e,"all")}>
            <Image src={displayImages[1]} alt="Photo" fill className="object-cover" />
          </div>
          
          <div className="relative shrink-0 w-[6.25rem] h-[6.25rem] rounded-xl overflow-hidden cursor-pointer" onClick={(e) => handleDetailRedirection(e, "360")}>
            <Image src={displayImages[2]} alt="360 View" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-white font-semibold text-xs">360°</p>
            </div>
          </div>

          <div className="relative shrink-0 w-[6.25rem] h-[6.25rem] rounded-xl overflow-hidden cursor-pointer" onClick={(e) => handleDetailRedirection(e, "videos")}>
            <Image src={displayImages[1]} alt="Video" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-black" fill="black" />
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-[6.25rem] h-[6.25rem] rounded-xl overflow-hidden cursor-pointer" onClick={(e) => handleDetailRedirection(e, "images")}>
            <Image src={displayImages[3]} alt="More images" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-white font-semibold text-xs">+{otherImagesCount} more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden sm:flex flex-row gap-3 h-auto sm:h-[31.25rem]">
        {/* Main Image - Clickable */}
        <div 
          className="w-full sm:w-2/3 h-[12.5rem] sm:h-auto relative rounded-2xl overflow-hidden cursor-pointer group"
          onClick={handleDetailRedirection}
        >
          <Image
            src={displayImages[0]}
            alt={`${title} - Main Image`}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            priority
          />
        </div>

        {/* Thumbnails Column */}
        <div className="w-full sm:w-1/3 flex flex-col gap-3">
          {/* Video Thumbnail */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group h-[150px] sm:h-1/2 "
            onClick={handleDetailRedirection}
          >
            <Image
              src={displayImages[1]}
              alt="Video Thumbnail"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="flex justify-center items-center gap-1 absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 text-xs font-bold rounded-md">
              <Play size={12} fill="white" /> Video
            </div>
          </div>

          <div className="flex gap-3 h-[150px] sm:h-1/2">
            {/* 360 View Thumbnail */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group w-1/2"
              onClick={handleDetailRedirection}
            >
              <Image
                src={displayImages[2]}
                alt="360 View Thumbnail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4 text-white font-bold bg-black/60 px-3 py-1.5 rounded-md text-xs">
                360° View
              </div>
            </div>

            {/* More Images Thumbnail */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-pointer group w-1/2"
              onClick={handleDetailRedirection}
            >
              <Image
                src={displayImages[3]}
                alt="More Images Thumbnail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                 <span className="text-white font-bold text-lg">+{otherImagesCount} Photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};