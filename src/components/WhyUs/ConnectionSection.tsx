import React from "react";
import { motion } from "framer-motion";

export default function ConnectionSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#DD5757] to-[#AD4D24] px-8 py-20 md:px-16 lg:px-24 mb-14 mx-3 sm:mx-6 lg:mx-20">
      {/* Decorative circles - left side */}
      <motion.div
        className="absolute -left-6 -bottom-20 md:-bottom-14 -translate-x-1/3 translate-y-1/3"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" as const}}
      >
        <div className="relative h-48 w-48">
          <motion.div
            className="absolute h-32 w-32 md:h-40 md:w-40 rounded-full bg-red-300/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
          <motion.div
            className="absolute left-20 md:left-24 h-32 w-32 md:h-40 md:w-40 rounded-full bg-red-300/30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 0.5,
            }}
          />
        </div>
      </motion.div>

      {/* Decorative circles - right side */}
      <motion.div
        className="absolute -right-20 md:-right-12 -bottom-20 md:-bottom-14 translate-x-1/3 translate-y-1/2"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" as const}}
      >
        <div className="relative h-48 w-48">
          <motion.div
            className="absolute h-32 w-32 md:h-40 md:w-40 rounded-full bg-orange-300/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute right-36 md:right-32 h-32 w-32 md:h-40 md:w-40 rounded-full bg-orange-300/30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 1.5,
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.h1
          className="mb-6 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold text-white"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const}}
        >
          Bridging the gap between customers & builders.
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-3xl text-sm md:text-base xl:text-lg text-white"
          style={{ fontFamily: "Helvetica Neue" }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
        >
          By creating a direct and seamless connection between you and the
          nation's top developers, we eliminate the uncertainty and fragmented
          information that often complicate the process.
        </motion.p>

        <motion.button
          className="rounded-2xl bg-white px-11 py-4 text-sm xl:text-base font-medium text-black transition-all hover:bg-gray-100 hover:shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </div>
    </section>
  );
}
