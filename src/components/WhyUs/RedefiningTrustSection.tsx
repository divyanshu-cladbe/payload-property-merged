"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const RedefiningTrustSection = () => {
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

  return (
    <div className="bg-white py-10 sm:py-16 px-6 md:px-12 lg:px-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-3 text-center mb-6 md:mb-10"
      >
        <h1 className="  text-[#606060] text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
          Redefining trust in{" "}
          <span className="text-[#BB2828]">real estate.</span>
        </h1>
        <p className="text-[#616161] font-medium text-xs sm:text-sm xl:text-base">
          Focusing on Modern approach with Traditional trust.
        </p>
      </motion.div>

      {/* Three Column Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-0 max-w-7xl mx-auto"
      >
        {/* Column 1 - Empowering you with knowledge */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center space-y-2 md:space-y-6 lg:px-8"
        >
          <div className="w-full max-w-sm aspect-[4/3] relative">
            <Image
              src="/images/why-us/grid-1-img.png"
              alt="Modern house"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm md:text-base xl:text-xl">
              Empowering you with knowledge
            </h3>
            <p className="text-[#707070] text-xs sm:text-sm leading-relaxed">
              Finding a home should be an exciting journey, not an endless
              search. We use our deep market knowledge and smart technology to
              understand exactly what you're looking for. This means you won't
              waste time sifting through endless listings; you'll be one step
              closer to finding a home you'll truly love.
            </p>
          </div>
        </motion.div>

        {/* Divider 1 */}
        <div className="hidden lg:block absolute left-1/3 top-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

        {/* Column 2 - An Advisor from Start to Finish */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center space-y-2 md:space-y-6 lg:px-8"
        >
          <div className="w-full max-w-sm aspect-[4/3] relative">
            <Image
              src="/images/why-us/grid-2-img.png"
              alt="Booking confirmation on tablet"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm md:text-base xl:text-xl">
              An Advisor from Start to Finish
            </h3>
            <p className="text-[#707070] text-xs sm:text-sm leading-relaxed">
              Once your booking is confirmed, a dedicated post-booking
              specialist becomes your single point of contact. They'll manage
              everything, from coordinating with the developer to assisting you
              with all the final steps to your new home.
            </p>
          </div>
        </motion.div>

        {/* Divider 2 */}
        <div className="hidden lg:block absolute left-2/3 top-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

        {/* Column 3 - Honest & Verified Information */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center space-y-2 md:space-y-6 lg:px-8"
        >
          <div className="w-full max-w-sm aspect-[4/3] relative">
            <Image
              src="/images/why-us/grid-3-img.png"
              alt="Property listing interface"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm md:text-base xl:text-xl">
              Honest & Verified Information
            </h3>
            <p className="text-[#707070] text-xs sm:text-sm leading-relaxed">
              By partnering directly with trusted developers, we ensure every
              detail is 100% accurate and verified. What you see on our platform
              is the unfiltered truth—no outdated information or misleading
              photos.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RedefiningTrustSection;
