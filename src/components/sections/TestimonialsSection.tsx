"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  image: string;
}

const baseTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anamika Aggarwal",
    role: "Advocate",
    review: "I'm tired of 'ghost listings.' With Property.new, if it was on my screen, it was actually available at the site.",
    image: "/images/home/testimonialAIpic1.png",
  },
  {
    id: 2,
    name: "Ritu Singh",
    role: "Doctor",
    review: "The app didn't just show me houses; it showed me my purchasing power in a way that felt responsible and transparent.",
    image: "/images/home/testimonialAIpic2.png",
  },
  {
    id: 3,
    name: "Milind Kapoor",
    role: "Airline Manager",
    review: "The Digital plans gave me the confidence to move forward because I knew the final delivery would match my financial commitment.",
    image: "/images/home/testimonialAIpic3.png",
  }
];

// const testimonials: Testimonial[] = Array.from({ length: 50 }, (_, i) => ({
//   ...baseTestimonials[i % baseTestimonials.length],
//   id: i + 1, 
// }));

const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 15.1046 21.017 14V9C21.017 7.89543 20.1216 7 19.017 7H15.017C13.9124 7 13.017 7.89543 13.017 9V15M5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C11.1216 16 12.017 15.1046 12.017 14V9C12.017 7.89543 11.1216 7 10.017 7H6.017C4.91243 7 4.017 7.89543 4.017 9V15" fill="#CF3232" />
  </svg>
);

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Desktop Constants from your code
  const CARD_WIDTH_DESKTOP = 429;
  const GAP = 32;

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1280);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Determine width based on screen size
  const getCardWidth = () => {
    if (typeof window === "undefined") return CARD_WIDTH_DESKTOP;
    if (window.innerWidth < 640) return window.innerWidth - 48; // Mobile
    if (window.innerWidth < 1280) return 400; // Tablet
    return CARD_WIDTH_DESKTOP; // Desktop
  };

  const cardWidth = getCardWidth();
  const VISIBLE_COUNT = isDesktop ? 3 : 1;
  const maxIndex = Math.max(0, baseTestimonials.length - VISIBLE_COUNT);

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const onDragEnd = (e: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < maxIndex) handleNext();
    else if (info.offset.x > threshold && currentIndex > 0) handlePrev();
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white overflow-hidden">
      {/* Container logic: 
          On Desktop (xl): Use your exact mx-[326px] 
          On Mobile/Tablet: Use standard px-6 
      */}
      <div className="xl:mx-[326px] px-6 xl:px-0">
        
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-3xl xl:text-[40px] font-bold text-[#1E1E1E] leading-tight">
              What <span className="text-[#CF3232]">Customers</span> has to say?
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-4 max-w-xl">
              Here is what our customers have been saying about Property.new.
            </p>
          </div>

          <div className="flex gap-4 mb-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:shadow-md hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:shadow-md hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
          </div>
        </div>

        {/* CAROUSEL TRACK */}
        <div className="relative">
          <motion.div
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            initial={false}
            animate={{ x: -(currentIndex * (cardWidth + GAP)) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
          >
            {baseTestimonials.map((t, i) => (
              <div 
                key={`${t.id}-${i}`} 
                className="flex-shrink-0 flex flex-col" 
                style={{ width: cardWidth }}
              >
                {/* IMAGE CONTAINER */}
                <div className="relative h-[450px] md:h-[594px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-50 shadow-sm">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover select-none"
                    sizes={isDesktop ? "429px" : "100vw"}
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="mt-6 md:mt-8 flex gap-4 px-2">
                  <div className="mt-1 flex-shrink-0"><QuoteIcon /></div>
                  <div className="flex flex-col gap-3">
                    <p className="text-[#4A4A4A] text-sm md:text-[16px] leading-relaxed italic font-medium">
                      {t.review}
                    </p>
                    <div className="h-[1px] w-full bg-gray-100 my-1" />
                    <h4 className="font-bold text-base md:text-lg text-[#1E1E1E]">
                      {t.name} <span className="text-gray-300 mx-2 font-light">|</span> 
                      <span className="text-[#CF3232] uppercase text-xs md:text-sm font-semibold tracking-wide">
                        {t.role}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}