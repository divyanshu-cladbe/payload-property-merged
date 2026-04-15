import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GetAccessSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const slideFromRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFE8E8] py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 mt-10 md:mt-12 mb-6">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Content */}
        <div className="space-y-5 md:space-y-7 max-w-sm md:max-w-lg lg:max-w-xl text-center md:text-left w-full">
          <motion.h1
            className="   font-bold text-black text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight"
            variants={slideUpVariants}
          >
            Get First Access
            <br />
            to <span className="text-[#CF3232]">Fresh</span> Projects
          </motion.h1>

          <motion.p
            className="   text-black text-sm sm:text-base md:text-lg leading-relaxed"
            variants={slideUpVariants}
          >
            What you see is what you get, and every property is verified. It's
            not a new concept—it's just the first time someone's actually doing
            it right.
          </motion.p>

          <motion.button
            className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:from-[#E91614] hover:to-[#E05D31] text-white font-semibold text-xs sm:text-sm xl:text-base rounded-lg py-3 px-8 md:px-10 transition-all duration-300 shadow-md hover:shadow-lg"
            variants={slideUpVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Talk to us
          </motion.button>
        </div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-auto flex justify-center lg:justify-end"
          variants={slideFromRightVariants}
        >
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <Image
              src="/images/why-us/cards-header.png"
              alt="Property cards preview"
              width={550}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GetAccessSection;
