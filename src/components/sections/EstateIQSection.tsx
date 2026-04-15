"use client";
import Image from "next/image";
import React from "react";
import { GameIconsCheckMark } from "@/common/icons/iconset";

const features = [
  "Map your daily commute and favourite city hubs to suggest homes that put time back on your clock.",
  "We pit the top contenders against each other—analysing multiple factors to get the best.",
  "Strip away the complexity of property math and factor all statutory costs before you commit.",
  "Know the Development Pipeline of your neighbourhood, before you visit it.",
];

const EstateIQSection = () => {
  return (
    <section className="mx-auto px-2 sm:px-4 xl:px-6 py-12">
      <div className="max-w-[1704px] mx-auto border border-[#FFC3C3] rounded-2xl bg-gradient-to-t to-[#ffffff] from-[#FFEFEF] overflow-hidden relative">
        {/* property.new logo — absolute top right of the whole card */}
        <div className=" hidden lg:block absolute top-4 right-6 sm:top-6 sm:right-8 xl:top-8 xl:right-10 z-30">
          <Image
            src="/svg/logo.svg"
            alt="property.new"
            width={280}
            height={140}
            className="w-22 sm:w-16 lg:w-32 xl:w-32 h-auto"
          />
        </div>

        {/* Red decorative circles — far right edge */}
        <div className="absolute right-0 bottom-0 z-10 pointer-events-none">
          <div className="w-20 h-20 sm:w-28 sm:h-28 xl:w-36 xl:h-36 rounded-full z-10 bg-[#E81B16]/40 translate-x-1/2 translate-y-1/4" />
          <div className="w-14 h-14 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full bg-[#E81B16]/30 absolute bottom-0 translate-y-1/2 right-4" />
          <div className="w-14 h-14 sm:w-20 sm:h-20 xl:w-28 xl:h-28 rounded-full bg-[#E81B16]/50 absolute bottom-10 translate-x-1/2 right-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Left content ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-10 xl:p-14 pr-4 ">
            {/* Heading row */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="images/home/estateIQLogo.png"
                width={44}
                height={44}
                alt="estateIQ-logo"
                className="w-12 h-12 sm:w-10 sm:h-10 xl:w-[44px] xl:h-[44px]"
              />
              <p className="text-[22px] sm:text-3xl xl:text-4xl font-bold leading-tight">
                Estate IQ for ease.
              </p>
            </div>

            {/* Subtitle — indented to align with text */}
            <p className="text-sm sm:text-xl ml-10 lg:ml-4 text-gray-500 mt-1 pl-4 sm:pl-[52px] xl:pl-[56px]">
              Beyond the square footage.
            </p>

            {/* Separator */}
            <div className="h-[1px] ml-12 lg:ml-10  w-[190px] sm:w-64 xl:w-80 my-5 sm:my-6 rounded-3xl bg-gradient-to-r from-[#FBC2C0] to-[#3D1F1E]" />

            {/* Features 2×2 grid */}
            <ul className=" flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5 sm:gap-x-8 sm:gap-y-6 space-y-3 mt-6 mb-8">
              {features.map((text, i) => (
                <li key={i} className="flex gap-2 max-w-80">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center mt-0.5">
                    <GameIconsCheckMark className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <p className="text-[13px] sm:text-[11px] xl:text-sm leading-relaxed text-black">
                    {text}
                  </p>
                </li>
              ))}
            </ul>

            <button className="mt-7 sm:mt-9 self-start bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white py-2.5 px-6 sm:px-8 rounded-md text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity">
              Know More
            </button>
          </div>

          {/* ── Right content ──────────────────────────────────────────── */}
          <div className="relative h-[320px] sm:h-[400px] lg:h-auto lg:min-h-[500px] xl:min-h-[560px]">
            {/* Location scoring card — upper area */}
            <div className="absolute top-6 sm:top-8 lg:top-16 xl:top-12 left-12 sm:left-4 lg:left-6 xl:left-10 z-30">
              <Image
                src="/images/home/locationScoring.png"
                alt="Location scoring"
                width={256}
                height={257}
                className="w-[260px] sm:w-[210px] lg:w-[330px] xl:w-[356px] h-auto drop-shadow-md"
              />
            </div>

            {/* Location quality card — overlaps scoring card, shifted right */}
            <div className="absolute top-10 sm:top-14 lg:top-28 xl:top-20 left-36 sm:left-32 lg:left-36 xl:left-44 z-20">
              <Image
                src="/images/home/locationquality.png"
                alt="Location quality"
                width={300}
                height={34}
                className="w-[240px] sm:w-[200px] lg:w-[320px] xl:w-[380px] h-auto drop-shadow-md"
              />
            </div>

            {/* House cards stack — bottom, slightly overflows */}
            <div className="absolute bottom-0 left-0 sm:left-3 lg:left-1 xl:left-4 2xl:left-28 z-20">
              <div className="relative inline-block translate-y-[45%]">
                {/* 92-score rating tag badge */}
                <Image
                  src="/images/home/rating-tag.png"
                  alt="Rating tag"
                  width={36}
                  height={57}
                  className="absolute right-14 sm:right-12 xl:right-14 -top-3 sm:-top-5 z-30 w-10 sm:w-8 xl:w-9 h-auto"
                />
                <Image
                  src="/images/smart-tools/house-cards-stack-with-rating.png"
                  alt="House cards"
                  width={456}
                  height={357}
                  className="w-[540px] sm:w-[300px] lg:w-[520px] xl:w-[590px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstateIQSection;
