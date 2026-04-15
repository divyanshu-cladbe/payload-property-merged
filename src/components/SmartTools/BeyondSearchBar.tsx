"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const BeyondSearchBarSection = () => {
  const comparisonFeatures = [
    { label: "Location Quality", checked: true },
    { label: "Amenities & Lifestyle", checked: true },
    { label: "Price-Value Alignment", checked: true },
    { label: "Documentation Clarity", checked: true },
    { label: "Builder Reputation", checked: true },
    { label: "Investment Potential", checked: true },
    { label: "Safety & Security", checked: true },
    { label: "User Review", checked: true },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const checklistVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section className="py-14 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center space-y-5 mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p
            className="text-[#2E2A2A]    font-medium text-xs sm:text-sm xl:text-base"
            variants={itemVariants}
          >
            Be an Early Investor and acquire a high-yield asset with the
            Pre-Launch Power.
          </motion.p>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold text-black"
            variants={itemVariants}
          >
            What lies Beyond the Search Bar
          </motion.h2>
        </motion.div>

        {/* Top Two Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* 360 Virtual Tours Card */}
          <motion.div
            className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#DCDCDC]"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl    font-semibold text-[#2E2A2A] mb-3">
              360 Virtual Tours
            </h3>
            <p className="text-[#2E2A2A] mb-2    font-medium text-xs sm:text-sm xl:text-base">
              Be an Early Investor and acquire a high-yield asset with the
              Pre-Launch Power.
            </p>
            <div className="relative overflow-hidden aspect-video">
              <Image
                src="/images/smart-tools/bedroom-interior-with-360.png"
                alt="Bedroom interior with 360 badge"
                fill
                className="object-contain"
              />
              {/* Virtual Tour Button */}
              <motion.button
                className="absolute bottom-4 sm:bottom-14 xl:bottom-12 left-1 sm:left-4 bg-white text-[#323B49] border border-[#44DDF7] px-3 sm:px-6 py-2 sm:py-3 rounded-2xl   font-medium hover:bg-gray-100 transition-colors shadow-md text-xs sm:text-sm lg:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour
              </motion.button>
            </div>
          </motion.div>

          {/* Dynamic Property Pricing Card */}
          <motion.div
            className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-[#DCDCDC]"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl    font-semibold text-[#2E2A2A] mb-3">
              Dynamic Property Pricing
            </h3>
            <p className="text-[#2E2A2A] mb-2    font-medium text-xs sm:text-sm xl:text-base">
              Be an Early Investor and acquire a high-yield asset with the
              Pre-Launch Power.
            </p>
            <div className="relative overflow-hidden aspect-video">
              <Image
                src="/images/smart-tools/modern-house-with-brown-bg.png"
                alt="Modern house exterior with brown background"
                fill
                className="object-contain"
              />
              {/* Virtual Tour Buttons */}
              <motion.button
                className="absolute top-7 sm:top-16 md:top-24 xl:top-14 right-0 sm:right-10 md:right-28 xl:right-12 bg-white text-[#323B49] border border-[#44DDF7] px-3 sm:px-5 py-2 sm:py-3 rounded-2xl   font-medium hover:bg-gray-100 transition-colors shadow-md text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour
              </motion.button>
              <motion.button
                className="absolute bottom-5 sm:bottom-28 md:bottom-44 xl:bottom-28 left-0 sm:left-10 md:left-24 xl:left-12 bg-white text-[#323B49] border border-[#44DDF7] px-3 sm:px-5 py-2 sm:py-3 rounded-2xl   font-medium hover:bg-gray-100 transition-colors shadow-md text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Predictive Comparison Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-md border border-[#DCDCDC] overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          {/* Left side - Image with Text */}
          <motion.div
            className="p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base sm:text-lg md:text-xl xl:text-2xl    font-semibold text-[#2E2A2A] mb-3">
              Predictive comparison
            </h3>
            <p className="text-[#2E2A2A] mb-2    font-medium text-xs sm:text-sm xl:text-base">
              Be an Early Investor and acquire a high-yield asset with the
              Pre-Launch Power.
            </p>
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                className="relative -bottom-3 lg:-bottom-28 overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Image
                  src="/images/smart-tools/house-cards-stack-with-rating.png"
                  alt="Stack of three house card with rating"
                  width={400}
                  height={400}
                  className="max-w-xl mx-auto w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Features Checklist */}
          <div className="bg-[#FFF5F5] p-6 md:p-8 flex items-center justify-center">
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {comparisonFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={checklistVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <Check
                      className="w-5 h-5 text-[#CF3232]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[#707070] text-sm md:text-base">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondSearchBarSection;
