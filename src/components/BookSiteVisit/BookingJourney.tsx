"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BookingJourneySection() {
  return (
    <>
      <section className="bg-[#FFF1F1] mt-6 py-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-[85rem] mx-auto">
          {/* Hero Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-9 items-center justify-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-6 lg:space-y-8 text-center md:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="   font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl text-[#1a1a1a]"
              >
                Your Property's Booking Journey has to be{" "}
                <span className="text-[#E05D5D]">Simple & Sweet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#636363]    text-sm sm:text-base xl:text-lg leading-relaxed max-w-lg mx-auto md:mx-0 font-medium"
              >
                The core goal of this platform is to streamline a complex,
                multi-stage transaction. The process should feel transparent and
                efficient. Here's a suggested 5-step user journey:
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E8552E] hover:bg-[#D94A28] text-white font-medium text-sm xl:text-base px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Properties
              </motion.button>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[280px] sm:h-[400px] lg:h-[450px] xl:h-[500px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {/* Customer Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute bottom-[14%] right-0 w-full h-full"
                >
                  <Image
                    src="/images/book-visit/happy-customer-with-background.png"
                    alt="Happy customer using mobile app"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </motion.div>
              </div>

              {/* Success Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring" as const,
                  stiffness: 200,
                }}
                className="absolute top-10 md:top-32 lg:top-36 -left-1 md:-left-7 lg:-left-8 bg-white rounded-xl px-4 lg:px-6 py-3 lg:py-4 shadow-2xl flex items-center gap-1 sm:gap-3 z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.8,
                    type: "spring" as const,
                    stiffness: 300,
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 bg-[#D94545] rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white stroke-[3]" />
                </motion.div>
                <span className="font-medium   text-xs sm:text-sm lg:text-base text-[#323B49] whitespace-nowrap">
                  Booked Successfully
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid - Overlapping Card */}
      <div className="px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 relative z-20 mb-10">
        <div className="max-w-xs sm:max-w-xl md:max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] px-6 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-14 shadow-xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-medium text-[#BB2828]   ">
                  100%
                </h3>
                <p className="text-[#888888]    font-medium text-sm sm:text-base md:text-lg xl:text-xl">
                  Value-driven Deals
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="text-center space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-medium text-[#BB2828]   ">
                  360°
                </h3>
                <p className="text-[#888888]    font-medium text-sm sm:text-base md:text-lg xl:text-xl">
                  AR/VR View
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="text-center space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-medium text-[#BB2828]   ">
                  5 Star
                </h3>
                <p className="text-[#888888]    font-medium text-sm sm:text-base md:text-lg xl:text-xl">
                  Search Tools
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="text-center space-y-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-medium text-[#BB2828]   ">
                  Top
                </h3>
                <p className="text-[#888888]    font-medium text-sm sm:text-base md:text-lg xl:text-xl">
                  Listings & Agents
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
