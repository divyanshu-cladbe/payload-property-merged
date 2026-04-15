"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EstateIQSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br mt-10 from-[#572E2E] via-[#1a0f0f] to-[#572E2E] overflow-hidden">
      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={gridVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 72, 67, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 72, 67, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold    text-white"
                variants={textVariants}
              >
                <motion.span
                  className="text-[#FF6B6B]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Estate IQ
                </motion.span>{" "}
                - AI Not Advertising
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg xl:text-xl    text-white leading-relaxed"
                variants={textVariants}
              >
                Finding your perfect home should be smart, transparent, and
                seamless. Our Estate IQ, a powerful AI assistant designed to
                give you a decisive edge.
              </motion.p>
            </div>

            <motion.button
              className="group relative px-8 py-3 bg-[#4A2828] hover:bg-[#5A3333] border border-[#6B3939] rounded-lg text-[#D89999] font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6B6B]/20"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore
            </motion.button>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src="/images/smart-tools/estate-property-logo.png"
                alt="Estate IQ AI Assistant"
                width={400}
                height={400}
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
