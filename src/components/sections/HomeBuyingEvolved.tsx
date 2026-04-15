"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.02    
    },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Signature Feature Entrance: Slide from Left
const featureVariants: Variants = {
  hidden: { opacity: 0, x: -30 }, 
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const imageFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: "easeOut",
      delay: i * 0.05 
    },
  }),
};

const ButtonComponent = () => {
  return (
    <motion.button
      className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:bg-[#D54A28] transition-colors duration-300 rounded-lg py-3 px-5 sm:px-7 text-white font-medium text-xs sm:text-sm xl:text-base shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      variants={slideUpVariants}
    >
      Know More
    </motion.button>
  );
};

const HomeBuyingEvolved = () => {
  const features = [
    'If You See It On Your Screen, It Is Available At The Site—No "Ghost" Listings Or Sold-Out Surprises.',
    "You Get The Absolute Bottom-Line Price– No Price Manipulation By The Middlemen.",
    "A Transaction Engine That Allows You To Block Units And Lock Prices Instantly—You Like It, You Book It.",
    'Figure Out Your Financial Gaurdrails—Helps You Visualize Options Within Your "Safe Zone" Vs. "Stretch Zone"',
  ];

  return (
    <motion.section
      className="relative bg-[#FFF6F6] max-w-[92%] sm:max-w-6xl mx-auto rounded-[32px] sm:rounded-[48px] overflow-hidden my-12 flex flex-col lg:flex-row items-center min-h-[650px] xl:max-w-[1704px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Decorative Background Blob */}
      <div className="absolute h-[500px] w-[500px] lg:h-[940px] lg:w-[940px] -top-48 -right-24 lg:-top-96 lg:-right-24 bg-[#E81B1633] rounded-full z-0 opacity-[30%]" />

      {/* --- Left Content --- */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-8 py-10 lg:pl-20 lg:pr-10">
        <motion.div variants={slideUpVariants} className="mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-[#1A1A1A] leading-[1.15] tracking-tight mb-4 sm:mb-6">
            Home buying, evolved. <br className="hidden sm:block" />
            Property.new.
          </h2>
          <p className="text-[#9A9A9A] font-semibold text-xs sm:text-sm tracking-[0.05em]">
            Why Find Homes With Property.New?
          </p>
        </motion.div>

        {/* Updated Feature Entrance */}
        <div className="space-y-4 mb-10 lg:mb-12">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 max-w-lg"
              variants={featureVariants} // Applied Slide-from-Left here
            >
              <div className="mt-1 flex-shrink-0">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3px]" />
              </div>
              <p className="text-[#1A1A1A] text-xs sm:text-[14px] font-medium leading-snug">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <ButtonComponent />
      </div>

      {/* --- Right Content: Image Composition --- */}
      <div className="relative z-10 w-full lg:w-1/2 h-[450px] sm:h-[550px] lg:h-[700px] flex items-center justify-center overflow-hidden lg:overflow-visible">
        <div className="absolute top-10 right-6 lg:top-24 lg:-right-8 w-40 sm:w-56 lg:w-72 z-50">
          <Image src="/images/logo-phone-auth-model.svg" width={200} height={60} alt="Logo" className="object-contain" />
        </div>

        <div className="relative w-full h-full max-w-xs sm:max-w-md lg:max-w-xl">
          <motion.div
            custom={1}
            variants={imageFadeIn}
            className="absolute top-4 right-10 lg:top-0 lg:right-48 w-32 sm:w-48 lg:w-64 h-[200px] sm:h-[280px] lg:h-[340px] z-10"
          >
            <Image src="/images/home/homebuying1.png" fill className="object-cover rounded-2xl" alt="Family" />
          </motion.div>

          <motion.div
            custom={2}
            variants={imageFadeIn}
            className="absolute top-32 -left-10 sm:top-40 sm:-left-20 lg:top-56 lg:-left-72 w-56 sm:w-80 lg:w-[410px] z-30"
          >
            <div className="relative aspect-[1.4/1]">
              <Image src="/images/home/homebuyingcard.png" fill alt="Listing 1" className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            custom={3}
            variants={imageFadeIn}
            className="absolute bottom-10 left-4 sm:bottom-12 sm:left-10 lg:bottom-0 lg:-left-10 w-52 sm:w-72 lg:w-96 z-40"
          >
            <div className="relative aspect-[1.4/1]">
              <Image src="/images/home/homebuyingcard2.png" fill alt="Listing 2" className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={imageFadeIn}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-0 lg:bottom-0 lg:-right-20 w-28 sm:w-40 lg:w-52 h-[180px] sm:h-[280px] lg:h-[340px] z-20"
          >
            <Image src="/images/home/homebuying2.png" fill className="object-cover rounded-2xl" alt="Couple" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeBuyingEvolved;