import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const PrebookingSection = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-[#2F160D] to-[#74291F] rounded-3xl mx-4 sm:mx-8 xl:mx-48 mb-10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Left side - Content */}
        <motion.div
          className="text-white p-6 sm:p-8 md:p-12 lg:p-16 w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-5 sm:space-y-6 text-center">
            <motion.h2
              className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Are you interested in Prebooking?
            </motion.h2>

            {/* Mobile subtitle - only visible on mobile */}
            <motion.p
              className="block lg:hidden text-xs sm:text-sm md:text-base leading-relaxed opacity-90 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Be part of India's only window of dynamic pricing for Real Estate
            </motion.p>

            {/* Desktop subtitle - only visible on desktop */}
            <motion.p
              className="hidden lg:block text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed opacity-90 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              We're giving you a head start. Pre-booking a new residence with us
              isn't just about reserving a home it's about gaining a distinct
              advantage.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center sm:-space-x-5 space-y-3 sm:space-y-0 max-w-xs mx-auto sm:w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 rounded-xl sm:rounded-l-full sm:rounded-r-none py-3 px-6 sm:px-8 text-sm xl:text-base text-white placeholder-white/80 outline-none w-full sm:w-auto"
                whileFocus={{ scale: 1.0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                type="submit"
                className="bg-[#CF3232] hover:bg-[#8B2424] transition-colors rounded-xl sm:rounded-full py-3 px-6 font-semibold text-sm xl:text-base whitespace-nowrap w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="lg:hidden">Contact</span>
                <span className="hidden lg:inline">Know More</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          className="flex flex-1 justify-center items-center pt-4 sm:pt-10 xl:pt-20 w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Certificate/Document Background */}
            <motion.div
              className="bg-[#EAEAEA] rounded-t-2xl p-4 sm:p-6 lg:p-8 shadow-2xl w-52 lg:w-64 h-52 sm:h-64 lg:h-80"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <div className="h-full flex flex-col items-center justify-center space-y-6 lg:space-y-8">
                {/* Trophy/Award Icon */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Image
                    src="/svg/achievements.svg"
                    alt=""
                    width={50}
                    height={40}
                    className="lg:w-[60px] lg:h-[50px]"
                  />
                </motion.div>

                {/* Certificate Lines */}
                <div className="space-y-2 lg:space-y-3 w-full">
                  <motion.div
                    className="h-1.5 lg:h-2 bg-[#E6B8B8] rounded-full w-1/2"
                    initial={{ width: 0 }}
                    whileInView={{ width: "50%" }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <motion.div
                    className="h-1.5 lg:h-2 bg-[#E6B8B8] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <motion.div
                    className="h-1.5 lg:h-2 bg-[#E6B8B8] rounded-full w-3/4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrebookingSection;
