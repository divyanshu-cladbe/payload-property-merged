"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BuyAbilitySection() {
  return (
    <section className="bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 mt-10 md:mt-12 xl:mt-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:gap-16 items-center justify-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const}}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4 sm:space-y-5 md:space-y-6 max-w-xl lg:max-w-7xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="   text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-black leading-tight"
            >
              Look at Homes. Know{" "}
              <span className="text-[#BB2828]">your true</span> buying power.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#120F0F]    font-medium text-sm sm:text-base md:text-base lg:text-lg xl:text-lg leading-relaxed"
            >
              Stop house hunting with a question mark over your budget.
              Calculate your Buy-Ability Score today and receive your initial
              pre-approval eligibility. It takes minutes, and it could be the
              difference between making an offer and securing the best property
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-5 pt-2 sm:pt-4 w-fit mx-auto lg:mx-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-3 border border-[#E05A30] text-[#DF5959] rounded-md shadow-md hover:bg-red-50 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap"
              >
                Calculate your Buy-Ability Score
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-3 border border-[#E05A30] text-[#DF5959] rounded-md shadow-md hover:bg-red-50 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap"
              >
                Secure a Pre-approved loan
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const}}
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-[230px] sm:h-[400px] lg:h-[450px] w-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative w-full h-full max-w-xl mx-auto"
            >
              <Image
                src="/images/loaning/buy-ability.png"
                alt="Buy ability score illustration"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
