"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const variants: any = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  hourglass: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut", delay: 0.2 },
    },
  },
};

const HoldUnitSection = () => {
  return (
    <section className="w-full max-w-[1704px] mx-auto px-2 sm:px-4 xl:px-6 py-6 sm:py-8 lg:py-12">
      {/* Banner container */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[500px] 2xl:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/home/bumperOffer.png"
          alt="Property banner"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Dark gradient — left ~45% fading right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 via-40% to-transparent to-65%" />

        {/* Decorative pink circle — right edge, vertically centered */}
        {/* <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-full bg-[#E91614]/40 pointer-events-none z-10" /> */}

        {/* All content */}
        <motion.div
          className="absolute inset-0 z-20"
          variants={variants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Top row: logo left + emoji center-left */}
          <div className="relative flex items-start px-4 sm:px-8 lg:px-10 xl:px-14 pt-4 sm:pt-6 lg:pt-8 xl:pt-10 ml-2 sm:ml-6 lg:ml-6 mt-4 lg:mt-6">
            {/* Logo */}
            <motion.div variants={variants.fadeUp} className="z-10">
              <Image
                src="/images/home/propertyLogoWhite.png"
                alt="property.new"
                width={120}
                height={40}
                className="w-10 sm:w-20 lg:w-24 xl:w-28 h-auto brightness-0 invert absoulte top-0 left-4 sm:top-6 sm:left-8 lg:top-8 lg:left-10 xl:top-10 xl:left-14"
              />
            </motion.div>

            {/* Floating emoji — positioned roughly 1/3 from left */}
            {/* <motion.div
              variants={variants.hourglass}
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 3, -3, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute left-[28%] sm:left-[30%] lg:left-[32%] top-3 sm:top-5 lg:top-7 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl select-none"
            >
              🤩
            </motion.div> */}
          </div>

          {/* Bottom content: heading + badge + button */}
          <div className="absolute left-6 flex flex-col gap-2 sm:gap-3 lg:gap-6 xl:gap-8 px-0 sm:px-8 lg:px-10 xl:px-14 pb-4 sm:pb-7 lg:pb-9 xl:pb-12  mt-1 lg:mt-4 xl:mt-6">
            {/* Heading */}
            <motion.h2
              variants={variants.fadeUp}
              className="text-white font-semibold text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight"
            >
              Freeze Your <span className="text-[#FF614D]">Property</span>
              <br />
              From As Low As
            </motion.h2>

            {/* Rs. 999 badge */}
            <motion.div
              variants={variants.fadeUp}
              className="flex items-center w-fit rounded-lg lg:rounded-md overflow-hidden"
            >
              {/* Rs. section — slightly lighter red */}
              <div className="bg-gradient-to-r to-[#E05D31]  from-[#E91614] flex items-center px-2 sm:px-5 lg:px-4 py-1.5 sm:py-2 lg:py-2.5">
                <span className="text-[#E91614] bg-white py-1/2 px-1  lg:p-1 rounded-sm font-bold text-sm sm:text-sm lg:text-base xl:text-xl 2xl:text-5xl mr-3">
                  Rs.
                </span>

                {/* 999 section */}

                <span className="text-white font-montserrat font-extrabold text-xl sm:text-4xl lg:text-5xl xl:text-6xl leading-none tracking-wide">
                  999
                </span>
              </div>
            </motion.div>

            {/* Explore Now button */}
            <motion.button
              variants={variants.fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black font-semibold text-[10px] sm:text-xs lg:text-sm px-5 sm:px-7 lg:px-9 xl:px-10 py-1.5 sm:py-2 lg:py-2.5 xl:py-3 rounded-3xl w-fit hover:bg-gray-100 transition-colors"
            >
              Explore Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HoldUnitSection;
