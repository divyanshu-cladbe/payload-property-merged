import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const UnlockSmarterSellSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="bg-[#FFF4F4] py-8 sm:py-10 lg:py-16 px-4 sm:px-8 my-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div
        className="text-center space-y-3 sm:space-y-5 max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        variants={itemVariants}
      >
        <motion.h1
          className="   font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight"
          variants={itemVariants}
        >
          Unlock a Smarter Way to <span className="text-[#BB2828]">Sell</span>
        </motion.h1>
        <motion.p
          className="text-[#707070] text-xs sm:text-sm xl:text-base max-w-2xl lg:max-w-3xl mx-auto"
          variants={itemVariants}
        >
          By partnering with us, you'll gain access to a curated portfolio of
          high-value properties and a transparent platform designed to help you
          succeed.
        </motion.p>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <motion.div
          className="md:hidden flex flex-col items-center space-y-8"
          variants={containerVariants}
        >
          {/* Circular Diagram */}
          <motion.div
            className="flex justify-center mb-4"
            variants={imageVariants}
          >
            <Image
              src="/images/careers/smarter-sell-img.png"
              alt="Property Portfolio Diagram"
              width={280}
              height={280}
              className="w-60 h-60 sm:w-72 sm:h-72"
            />
          </motion.div>

          {/* Features List */}
          <motion.div
            className="w-full space-y-8 px-2"
            variants={containerVariants}
          >
            {/* Verified Portfolio */}
            <motion.div
              className="text-center space-y-3"
              variants={featureVariants}
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                <Check className="w-5 h-5 sm:w-6 sm:h-6" color="#CF3232" />
                <h5 className="text-[#CF3232]    font-bold text-lg sm:text-xl">
                  Verified Portfolio
                </h5>
              </div>
              <p className="text-[#919191]   font-medium text-sm sm:text-base leading-relaxed px-4">
                Our verified portfolio isn't just a collection of projects; it's
                a testament to real-world success. Each project has been
                rigorously tested, validated by third-party analysts, and proven
                to capture market's attention. Join now.
              </p>
            </motion.div>

            {/* High-Intent Buyers */}
            <motion.div
              className="text-center space-y-3"
              variants={featureVariants}
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                <Check className="w-5 h-5 sm:w-6 sm:h-6" color="#CF3232" />
                <h5 className="text-[#CF3232]    font-bold text-lg sm:text-xl">
                  High-Intent Buyers
                </h5>
              </div>
              <p className="text-[#919191]   font-medium text-sm sm:text-base leading-relaxed px-4">
                Our advanced lead-generation and intent-data platform does the
                hard work for you. We track buyer-behavior, digital footprints,
                and specific research activities to identify the true nature of
                your high potential leads.
              </p>
            </motion.div>

            {/* Effortless Management */}
            <motion.div
              className="text-center space-y-3"
              variants={featureVariants}
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                <Check className="w-5 h-5 sm:w-6 sm:h-6" color="#CF3232" />
                <h5 className="text-[#CF3232]    font-bold text-lg sm:text-xl">
                  Effortless Management
                </h5>
              </div>
              <p className="text-[#919191]   font-medium text-sm sm:text-base leading-relaxed px-4">
                Track your performance with real-time analytics. See your leads,
                conversions, and commissions in one transparent dashboard,
                giving you a clear view of your success and a sure shot path for
                continuous improvement.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="mt-8" variants={itemVariants}>
            <motion.button
              className="bg-gradient-to-l from-[#E91614] to-[#E05D31] rounded-lg py-3 px-8 sm:px-10 text-white font-medium text-sm sm:text-base hover:shadow-lg transition-shadow duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Sell With Us
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          className="hidden md:flex justify-center items-center lg:items-start gap-12 xl:gap-20 2xl:gap-24"
          variants={containerVariants}
        >
          {/* Circular Diagram */}
          <motion.div className="flex-shrink-0" variants={imageVariants}>
            <Image
              src="/images/careers/smarter-sell-img.png"
              alt="Property Portfolio Diagram"
              width={350}
              height={350}
              className="w-80 h-80 xl:w-96 xl:h-96"
            />
          </motion.div>

          {/* Features and CTA */}
          <motion.div
            className="space-y-8 xl:space-y-10 max-w-2xl"
            variants={containerVariants}
          >
            {/* Features List */}
            <motion.div
              className="space-y-6 xl:space-y-8"
              variants={containerVariants}
            >
              {/* Verified Portfolio */}
              <motion.div variants={featureVariants}>
                <div className="flex items-start gap-3 mb-2">
                  <Check
                    className="w-6 h-6 xl:w-7 xl:h-7 mt-1 flex-shrink-0"
                    color="#CF3232"
                  />
                  <div className="space-y-2">
                    <h5 className="text-[#CF3232]    font-bold text-lg xl:text-xl">
                      Verified Portfolio
                    </h5>
                    <p className="text-[#919191]   font-medium text-sm xl:text-base leading-relaxed">
                      Our verified portfolio isn't just a collection of
                      projects; it's a testament to real-world success. Each
                      project has been rigorously tested, validated by
                      third-party analysts, and proven to capture market's
                      attention. Join now.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* High-Intent Buyers */}
              <motion.div variants={featureVariants}>
                <div className="flex items-start gap-3 mb-2">
                  <Check
                    className="w-6 h-6 xl:w-7 xl:h-7 mt-1 flex-shrink-0"
                    color="#CF3232"
                  />
                  <div className="space-y-2">
                    <h5 className="text-[#CF3232]    font-bold text-lg xl:text-xl">
                      High-Intent Buyers
                    </h5>
                    <p className="text-[#919191]   font-medium text-sm xl:text-base leading-relaxed">
                      Our advanced lead-generation and intent-data platform does
                      the hard work for you. We track buyer-behavior, digital
                      footprints, and specific research activities to identify
                      the true nature of your high potential leads.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Effortless Management */}
              <motion.div variants={featureVariants}>
                <div className="flex items-start gap-3 mb-2">
                  <Check
                    className="w-6 h-6 xl:w-7 xl:h-7 mt-1 flex-shrink-0"
                    color="#CF3232"
                  />
                  <div className="space-y-2">
                    <h5 className="text-[#CF3232]    font-bold text-lg xl:text-xl">
                      Effortless Management
                    </h5>
                    <p className="text-[#919191]   font-medium text-sm xl:text-base leading-relaxed">
                      Track your performance with real-time analytics. See your
                      leads, conversions, and commissions in one transparent
                      dashboard, giving you a clear view of your success and a
                      sure shot path for continuous improvement.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                className="ml-8 xl:ml-10 bg-gradient-to-l from-[#E91614] to-[#E05D31] rounded-lg py-3 px-10 xl:px-12 text-white font-medium text-sm xl:text-base hover:shadow-lg transition-shadow duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sell With Us
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UnlockSmarterSellSection;
