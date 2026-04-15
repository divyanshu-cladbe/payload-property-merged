"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export const FeaturesSection = () => {
  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: any = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants: any = {
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const iconVariants: any = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const textVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.5,
      },
    },
  };

  return (
    <section className="bg-white py-8 sm:py-14 md:py-16 xl:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 xl:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1 - Handpicked Deals */}
          <motion.div
            className="h-full"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div variants={hoverVariants}>
              <Card className="bg-[#FFFCE4] border-0 rounded-xl h-full">
                <div className="p-4 md:p-5 xl:p-6 flex flex-col justify-center items-center text-center space-y-3 md:space-y-4 h-full min-h-[280px] md:min-h-[320px] xl:min-h-[350px]">
                  <motion.div
                    className="flex-shrink-0"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Image
                      src="/svg/features/mortgage.svg"
                      alt=""
                      width={80}
                      height={80}
                      className="w-28 h-16 md:w-32 md:h-20 xl:w-36 xl:h-24"
                    />
                  </motion.div>
                  <motion.div variants={textVariants}>
                    <h3 className="text-black font-semibold text-sm md:text-base xl:text-lg">
                      Handpicked Deals
                    </h3>
                    <p className="text-[#636060] text-xs md:text-sm xl:text-base leading-relaxed">
                      We work directly with builders to bring you the best deals
                      and offers available in the market. Our platform is the
                      first to get access to launch prices and promotional
                      rates.
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Card 2 - Transparent Pricing */}
          <motion.div
            className="h-full"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div variants={hoverVariants}>
              <Card className="bg-[#212121] border-0 rounded-xl h-full">
                <div className="p-4 md:p-5 xl:p-6 flex flex-col justify-center items-center text-center space-y-3 md:space-y-4 h-full min-h-[280px] md:min-h-[320px] xl:min-h-[350px]">
                  <motion.div
                    className="bg-gradient-to-r from-[#D0BE37] to-[#FCFFA0] rounded-lg py-2 px-3 flex-shrink-0"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Image
                      src="/svg/features/authentic.svg"
                      alt=""
                      width={80}
                      height={80}
                      className="w-16 h-4 md:w-20 md:h-5 xl:w-28 xl:h-7"
                    />
                  </motion.div>
                  <motion.div variants={textVariants}>
                    <h3 className="text-[#FAFC9B] font-semibold text-sm md:text-base xl:text-lg">
                      Transparent Pricing
                    </h3>
                    <p className="text-[#BABABA] text-xs md:text-sm xl:text-base leading-relaxed">
                      When you add any Preferential Location Charges (PLCs) like
                      a corner unit or a specific floor, the differential price
                      is calculated and shown immediately.
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Card 3 - 360° Immersion */}
          <motion.div
            className="h-full"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div variants={hoverVariants}>
              <Card className="bg-[#B1FFBD] border-0 rounded-xl h-full">
                <div className="p-4 md:p-5 xl:p-6 flex flex-col justify-center items-center text-center space-y-3 md:space-y-4 h-full min-h-[280px] md:min-h-[320px] xl:min-h-[350px]">
                  <motion.div
                    className="flex-shrink-0"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Image
                      src="/svg/features/3d.svg"
                      alt=""
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24"
                    />
                  </motion.div>
                  <motion.div variants={textVariants}>
                    <h3 className="text-[#56B164] font-semibold text-sm md:text-base xl:text-lg">
                      360° Immersion
                    </h3>
                    <p className="text-[#5F5F5F] text-xs md:text-sm xl:text-base leading-relaxed">
                      Get a true sense of the space and layout before you ever
                      set foot on the property. Explore floor plans, amenities,
                      and even the surrounding project area.
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Card 4 - A Clean Platform */}
          <motion.div
            className="h-full"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div variants={hoverVariants}>
              <Card className="bg-[#FFFCE4] border-0 rounded-xl h-full overflow-hidden">
                <div className="flex justify-center items-center h-full min-h-[280px] md:min-h-[320px] xl:min-h-[350px]">
                  <motion.div
                    className="flex-1 flex justify-center items-center"
                    whileHover="hover"
                  >
                    <Image
                      src="/svg/features/map.svg"
                      alt=""
                      width={120}
                      height={200}
                      className="w-full h-full object-contain max-w-[120px] md:max-w-[140px] xl:max-w-[160px]"
                    />
                  </motion.div>
                  <motion.div
                    className="flex-1 p-3 md:p-4 xl:p-5 text-center"
                    variants={textVariants}
                  >
                    <h3 className="text-[#5A3E94] font-semibold text-sm md:text-base xl:text-lg mb-2 md:mb-3">
                      A Clean Platform
                    </h3>
                    <p className="text-[#5F5F5F] text-xs md:text-sm xl:text-base leading-relaxed">
                      We only feature RERA-approved, new multi-house residence
                      projects to ensure good experience for serious homebuyers.
                    </p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
