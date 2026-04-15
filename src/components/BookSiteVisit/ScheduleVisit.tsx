"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ScheduleVisitSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#300101] to-[#632C2C] py-20 px-6 mb-8 overflow-hidden">
      {/* Property.new logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const}}
        viewport={{ once: true }}
        className="absolute -top-7 sm:-top-9 -right-1 w-32 h-32 sm:w-40 sm:h-40 rounded-full"
      >
        <Image
          src="/svg/book-visit/property-new-logo.svg"
          alt="Property.new logo with background"
          height={100}
          width={100}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <div className="mx-auto relative z-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-16 justify-center items-center">
          {/* Left side - Clock illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const}}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
              className="relative w-40 h-40 sm:w-60 sm:h-56 xl:w-72 xl:h-60"
            >
              {/* Clock */}
              <Image
                src="/images/book-visit/clock.png"
                alt="clock"
                width={200}
                height={200}
              />
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white text-center md:text-left space-y-6 xl:space-y-8 xl:col-span-2 xl:max-w-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="   text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold"
            >
              Schedule Your Visit in 60 seconds.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base xl:text-lg text-[#D9D9D9] leading-relaxed max-w-xl"
            >
              Access our live scheduling calendar to see all available dates and
              time slots for your chosen property.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:from-orange-600 hover:to-red-600 text-white font-medium text-sm xl:text-base px-7 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Select your slot
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
