"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertyEligibilitySection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-[#FFF3F3] my-8 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center space-y-6"
            variants={fadeInLeft}
          >
            <motion.h3
              className="   text-[#C24646] text-sm md:text-base xl:text-lg font-bold"
              variants={fadeInUp}
            >
              Calculate Eligibility With Ease
            </motion.h3>

            <motion.h1
              className="   text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-black"
              variants={fadeInUp}
            >
              <motion.span
                className="text-[#C24646]"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                42 +{" "}
              </motion.span>
              Properties Matches Your Budget
            </motion.h1>

            <motion.p
              className="text-[#9B9090] font-medium text-sm md:text-base xl:text-lg italic leading-relaxed max-w-xl mx-auto"
              variants={fadeInUp}
            >
              Our Unique System Helps You Visualize Your Options. See Which
              Units Fall In Your{" "}
              <span className="text-[#E12525]">"Safe Zone"</span> (Well Within
              Your Budget) And Which Are In Your{" "}
              <span className="text-[#E12525]">"Stretch Zone"</span> (A Small
              Step Up For A Big Upgrade).
            </motion.p>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="flex-1 w-full max-w-xl space-y-6"
            variants={fadeInRight}
          >
            {/* Property Image */}
            <motion.div
              className="flex justify-center items-center gap-2 mb-8"
              variants={scaleIn}
            >
              <motion.div
                className="relative w-64 h-20 sm:w-96 sm:h-[7.5rem] overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/why-us/property-row-img.png"
                  alt="Property"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Search Bar */}
            <motion.div className="relative" variants={fadeInUp}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <Search className="w-5 h-5" color="#FF7575" />
              </div>
              <motion.input
                type="text"
                placeholder="New Delhi"
                defaultValue="New Delhi"
                className="w-full py-4 pl-12 pr-4 rounded-xl border border-[#FF7575] focus:border-red-500 focus:outline-none text-gray-700 text-sm sm:text-base md:text-lg xl:text-xl shadow-lg relative z-0"
                whileFocus={{ scale: 1.02, borderColor: "#EF4444" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Budget Display */}
            <motion.div className="px-8 py-2 text-center" variants={fadeInUp}>
              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold text-[#BB2828] mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring" as const,
                  stiffness: 100,
                }}
              >
                Rs. 1 Cr
              </motion.div>
              <motion.div
                className="text-[#AEAEAE] font-medium text-sm sm:text-base md:text-lg xl:text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Your Budget
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
