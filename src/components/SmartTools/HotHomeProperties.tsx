"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HotHomePropertiesSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const symbolVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut" as const,
      },
    },
  };

  const propertyCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 lg:mb-0"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-medium    text-[#090909] mb-4 px-2">
            Pick 3 Your Everyday Commutes
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Formula */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="text-center mb-8 sm:mb-10 md:mb-12"
              variants={itemVariants}
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl    font-medium text-[#A34646] px-2">
                How we build "Hot-Home" Properties?
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* Location Icon */}
              <motion.div
                className="flex flex-col items-center"
                variants={iconVariants}
              >
                <motion.div
                  className="w-28 h-32 sm:w-32 sm:h-36 md:w-36 md:h-44 lg:w-40 lg:h-48 bg-white rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center border border-[#AEAEAE]"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <div className="relative">
                    <Image
                      src="/images/smart-tools/location-map-pin.png"
                      alt=""
                      width={200}
                      height={200}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                    />
                  </div>
                </motion.div>
                <motion.p
                  className="mt-3 sm:mt-4 text-[#686868]    font-medium text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-[100px] sm:max-w-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Your favourite Area
                </motion.p>
              </motion.div>

              {/* Plus Sign */}
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl    text-[#AAAAAA] font-medium"
                variants={symbolVariants}
              >
                +
              </motion.div>

              {/* Rupee Icon */}
              <motion.div
                className="flex flex-col items-center"
                variants={iconVariants}
              >
                <motion.div
                  className="w-28 h-32 sm:w-32 sm:h-36 md:w-36 md:h-44 lg:w-40 lg:h-48 bg-white rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center border border-[#AEAEAE]"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <div className="relative">
                    <Image
                      src="/images/smart-tools/rupee.png"
                      alt=""
                      width={200}
                      height={200}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                    />
                  </div>
                </motion.div>
                <motion.p
                  className="mt-3 sm:mt-4 text-[#686868]    font-medium text-xs sm:text-sm md:text-base lg:text-lg text-center max-w-[100px] sm:max-w-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Better Pricing
                </motion.p>
              </motion.div>

              {/* Equals Sign - Hidden on mobile and tablet, shown on large screens */}
              <motion.div
                className="hidden lg:block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl    text-[#AAAAAA] font-medium"
                variants={symbolVariants}
              >
                =
              </motion.div>

              {/* Equals Sign - Shown only on mobile and tablet in new line */}
              <motion.div
                className="lg:hidden w-full text-center text-xl sm:text-2xl md:text-3xl    text-[#AAAAAA] font-medium mt-2"
                variants={symbolVariants}
              >
                =
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Property Card */}
          <motion.div
            className="flex justify-center lg:justify-start mt-1 sm:mt-4 lg:mt-0"
            variants={propertyCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              {/* Map based searches label */}
              <motion.div
                className="text-center mb-2 sm:mb-3"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl    font-medium text-[#A34646]">
                  Map based searches
                </span>
              </motion.div>

              {/* Property Card */}
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeInOut" as const }}
              >
                {/* Property Image */}
                <div className="relative w-full">
                  <Image
                    src="/images/smart-tools/property-img-with-badge.png"
                    alt="Luxury Property with badge, logo and details"
                    width={300}
                    height={200}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
