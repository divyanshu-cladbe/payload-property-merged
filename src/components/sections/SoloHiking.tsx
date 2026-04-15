"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// 1. Animation Variants
const animations: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2 
      } 
    },
  },
  content: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  },
};

const fadeUp = (delay?: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, delay: delay ?? 0 } 
  },
});

const SoloHiking = () => {
  return (
    <motion.div
      className="max-w-[1631px] w-[95%] mx-auto bg-gradient-to-r from-[#2F160D] to-[#74291F] rounded-[40px] sm:rounded-[50px] mb-10 overflow-hidden py-20 sm:py-28 lg:py-36 px-6 sm:px-12"
      variants={animations.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex justify-center items-center">
        <motion.div
          className="text-white w-full lg:w-3/4 xl:w-1/2 space-y-6 text-center"
          variants={animations.content}
        >
          {/* Heading */}
          <motion.h2
            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            variants={fadeUp(0.4)}
          >
            Solo Hiking into Digital Jungle?
          </motion.h2>

          {/* Subtitles */}
          <motion.div variants={fadeUp(0.6)}>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
              In an era of infinite "verified" tags, the true game-changer isn't
              just more data, it’s correct agency handholding. Let us match your
              lifestyle with a floor plan.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4"
            variants={fadeUp(0.8)}
          >
            <CTAButton label="Get in Touch" />
            <CTAButton label="Get in Touch" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 2. Reusable Button Component
const CTAButton = ({ label }: { label: string }) => (
  <motion.button
    className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:brightness-110 transition-all duration-300 rounded-lg py-3.5 px-8 text-white font-medium text-sm xl:text-base shadow-lg hover:shadow-xl w-full sm:w-auto"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    variants={fadeUp()} // Inherits transition from parent stagger
  >
    {label}
  </motion.button>
);

export default SoloHiking;