"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PropertyFeatureSection = () => {
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

  const leftContentVariants: any = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const textVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const phoneVariants: any = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const buttonVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.section
      className="w-full bg-[#FFE5E5] mb-10 py-16 px-4 sm:px-6 md:px-12 lg:px-20 rounded-3xl max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-2">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center"
            variants={leftContentVariants}
          >
            <motion.p
              className="text-[#BB2828] font-semibold text-xs sm:text-sm xl:text-base mb-4"
              variants={textVariants}
            >
              New Feature!!
            </motion.p>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold text-black mb-6"
              variants={textVariants}
            >
              Ready to find a place that{" "}
              <span className="text-[#BB2828]">fits your life</span>, not the
              other way around?
            </motion.h2>

            <motion.p
              className="text-[#202020] text-xs sm:text-sm xl:text-base mb-8 max-w-7xl mx-auto"
              variants={textVariants}
            >
              Simply select your top 5 favourite locations—whether it's your
              office, your kid's school, your gym, your favourite coffee shop,
              or even your local dog park.
            </motion.p>

            <motion.button
              className="bg-[#BB2828] hover:bg-red-700 text-white font-medium text-xs px-10 py-3 rounded-lg transition-colors duration-300 shadow-[0px_0px_2.56px_0px_#00000040] hover:shadow-xl"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              WATCH HOW
            </motion.button>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-[300px]"
              variants={phoneVariants}
            >
              {/* Phone Frame */}
              <div className="relative overflow-hidden -bottom-[76px] lg:right-20">
                <Image
                  src="/images/smart-tools/mockup-phone.png"
                  alt=""
                  width={300}
                  height={200}
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PropertyFeatureSection;
