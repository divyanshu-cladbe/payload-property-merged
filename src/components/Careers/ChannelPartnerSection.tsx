import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ChannelPartnerSection = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const timelineStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white py-10 px-4 sm:px-8">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-5 mb-16 md:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-black    font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl"
          variants={fadeInUp}
        >
          Are you a <span className="text-[#DD4040]">Channel Partner</span>?
        </motion.h2>
        <motion.p
          className="text-[#707070] text-xs sm:text-sm xl:text-base max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          By partnering with us, you'll gain access to a curated portfolio of
          high-value properties and a transparent platform designed to help you
          succeed.
        </motion.p>
      </motion.div>

      {/* Hero Image Section with floating elements */}
      <motion.div
        className="relative flex justify-center items-center gap-2 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div
          className="absolute -bottom-8 sm:bottom-0 left-[12%] sm:left-[10%] md:left-[20%] lg:left-[26%] xl:left-[33%] bg-white border-[0.56px] border-[#FF9A9A] shadow-[0px_0px_16.26px_0px_#0000001A] rounded-xl px-3 sm:px-6 py-3 sm:py-4 text-[#898989] text-xs sm:text-sm xl:text-base"
          variants={fadeInLeft}
          animate={floatingAnimation}
        >
          Live Pricing
        </motion.div>
        <motion.div className="" variants={scaleIn}>
          <Image
            src="/images/careers/channel-partner-img.png"
            alt=""
            width={300}
            height={100}
            className="w-[200px] sm:w-[250px] md:w-[300px] h-auto"
          />
        </motion.div>
        <motion.div
          className="absolute -top-10 sm:top-0 right-[2%] sm:right-[0%] md:right-[14%] lg:right-[21%] xl:right-[29%] bg-white border-[0.56px] border-[#FF9A9A] shadow-[0px_0px_16.26px_0px_#0000001A] rounded-xl px-3 sm:px-6 py-3 sm:py-4 text-[#898989] text-xs sm:text-sm xl:text-base"
          variants={fadeInRight}
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1.5,
            },
          }}
        >
          Immersive Projects
        </motion.div>
      </motion.div>

      {/* Timeline Section - Responsive */}
      <motion.div
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={timelineStagger}
      >
        {/* Mobile Version - Vertical Timeline */}
        <div className="block md:hidden">
          <div className="relative max-w-sm mx-auto px-4">
            {/* Vertical Line connecting all circles */}
            <motion.div
              className="absolute left-[28px] top-2 bottom-2 w-0.5 bg-[#E21818]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" as const}}
              viewport={{ once: true }}
            ></motion.div>

            {/* Step 1: Sign up */}
            <motion.div
              className="relative flex items-start mb-16"
              variants={fadeInLeft}
            >
              <div className="flex-shrink-0 relative z-10">
                <motion.div
                  className="w-7 h-7 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </div>
              <div className="ml-6 flex-1">
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-lg mb-3"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Sign up
                </h5>
                <p className="text-[#A4A4A4] font-medium text-sm leading-relaxed">
                  Sign up on our portal to get a unique Channel Partner ID.
                </p>
              </div>
            </motion.div>

            {/* Step 2: Start Sale */}
            <motion.div
              className="relative flex items-start mb-16"
              variants={fadeInLeft}
            >
              <div className="flex-shrink-0 relative z-10">
                <motion.div
                  className="w-7 h-7 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </div>
              <div className="ml-6 flex-1">
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-lg mb-3"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Start Sale
                </h5>
                <p className="text-[#A4A4A4] font-medium text-sm leading-relaxed">
                  Our Verified Inventory & Client-base go hand in hand to boost
                  sales.
                </p>
              </div>
            </motion.div>

            {/* Step 3: Get Paid */}
            <motion.div
              className="relative flex items-start"
              variants={fadeInLeft}
            >
              <div className="flex-shrink-0 relative z-10">
                <motion.div
                  className="w-7 h-7 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </div>
              <div className="ml-6 flex-1">
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-lg mb-3"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Get Paid
                </h5>
                <p className="text-[#A4A4A4] font-medium text-sm leading-relaxed">
                  When client's booking is confirmed, your commission is
                  processed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Version - Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative max-w-6xl mx-auto">
            <div className="flex justify-between items-start relative px-10">
              {/* Step 1: Sign up */}
              <motion.div
                className="flex flex-col items-start text-left max-w-xs relative z-10"
                variants={fadeInUp}
              >
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg xl:text-xl mb-2"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Sign up
                </h5>
                <p className="text-[#A4A4A4] font-medium text-xs sm:text-sm xl:text-base mb-6">
                  Sign up on our portal to get a unique Channel Partner ID.
                </p>
                <motion.div
                  className="w-6 h-6 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </motion.div>

              {/* Step 2: Start Sale */}
              <motion.div
                className="flex flex-col items-center text-center max-w-xs relative z-10"
                variants={fadeInUp}
              >
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg xl:text-xl mb-2"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Start Sale
                </h5>
                <p className="text-[#A4A4A4] font-medium text-xs sm:text-sm xl:text-base mb-6">
                  Our Verified Inventory & Client-base go hand in hand to boost
                  sales.
                </p>
                <motion.div
                  className="w-6 h-6 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </motion.div>

              {/* Step 3: Get Paid */}
              <motion.div
                className="flex flex-col items-end text-right max-w-xs relative z-10"
                variants={fadeInUp}
              >
                <h5
                  className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent font-bold text-sm sm:text-base md:text-lg xl:text-xl mb-2"
                  style={{ fontFamily: "Helvetica" }}
                >
                  Get Paid
                </h5>
                <p className="text-[#A4A4A4] font-medium text-xs sm:text-sm xl:text-base mb-6">
                  When client's booking is confirmed, your commission is
                  processed.
                </p>
                <motion.div
                  className="w-6 h-6 bg-gradient-to-b from-[#DBA4A2] to-white shadow-inner rounded-full flex items-center justify-center relative"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                ></motion.div>
              </motion.div>

              {/* Horizontal Line connecting all three points - positioned at circle level */}
              <motion.div
                className="absolute bottom-3 left-16 right-16 h-0.5 bg-[#E21818] z-0"
                initial={{ width: 0 }}
                whileInView={{ width: "calc(100% - 8rem)" }}
                transition={{ duration: 1.5, ease: "easeInOut" as const, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-10 sm:px-0 max-w-xs sm:max-w-4xl mx-auto mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div
          className="bg-white shadow-[0px_0px_16.26px_0px_#0000001A] rounded-xl text-center py-6 sm:py-7 px-6 space-y-1"
          variants={fadeInUp}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          <motion.h2
            className="text-[#BB2828] font-medium text-xl sm:text-2xl md:text-3xl xl:text-4xl"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" as const, stiffness: 200 }}
            viewport={{ once: true }}
          >
            3000 Cr. +
          </motion.h2>
          <p className="text-[#898989] text-xs sm:text-sm md:text-base xl:text-lg">
            Total Portfolio Value
          </p>
        </motion.div>
        <motion.div
          className="bg-white shadow-[0px_0px_16.26px_0px_#0000001A] rounded-xl text-center py-6 sm:py-7 px-6 space-y-1"
          variants={fadeInUp}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          <motion.h2
            className="text-[#BB2828] font-medium text-xl sm:text-2xl md:text-3xl xl:text-4xl"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" as const, stiffness: 200 }}
            viewport={{ once: true }}
          >
            350 +
          </motion.h2>
          <p className="text-[#898989] text-xs sm:text-sm md:text-base xl:text-lg">
            Total Bookings Made
          </p>
        </motion.div>
        <motion.div
          className="bg-white shadow-[0px_0px_16.26px_0px_#0000001A] rounded-xl text-center py-6 sm:py-7 px-6 space-y-1"
          variants={fadeInUp}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          <motion.h2
            className="text-[#BB2828] font-medium text-xl sm:text-2xl md:text-3xl xl:text-4xl"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" as const, stiffness: 200 }}
            viewport={{ once: true }}
          >
            30 days
          </motion.h2>
          <p className="text-[#898989] text-xs sm:text-sm md:text-base xl:text-lg">
            Average Time to Sale
          </p>
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.button
          className="bg-gradient-to-l from-[#E91614] to-[#E05D31] text-white font-medium text-xs sm:text-sm xl:text-base py-3 px-12 md:px-14 xl:px-16 rounded-lg hover:shadow-lg transition-shadow duration-300"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(233, 22, 20, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          Talk to us
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ChannelPartnerSection;
