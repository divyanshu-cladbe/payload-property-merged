"use client";

import React from "react";
import { motion } from "framer-motion";

const PreLaunchSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#E63D3D] py-16 px-4 sm:py-20 mb-10">
      <div className="mx-auto max-w-7xl text-center">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="   font-bold text-white text-lg sm:text-xl md:text-2xl xl:text-3xl"
        >
          See it. Compare it. Afford it.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="mt-4 sm:mt-6 text-white    font-medium text-sm md:text-base xl:text-lg"
        >
          Be an Early Investor and acquire a high-yield{" "}
          <br className="hidden sm:block" />
          asset with the Pre-Launch Power.
        </motion.p>
      </div>
    </section>
  );
};

export default PreLaunchSection;
