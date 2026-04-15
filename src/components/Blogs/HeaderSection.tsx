"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeaderSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative w-full h-[200px] md:h-[250px] lg:h-[340px] mt-8 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/images/blogs/bg-pattern-img.webp"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-8 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div variants={logoVariants} className="flex-shrink-0">
          <div className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 flex items-center justify-center">
            <Image src="/svg/blogs/p-logo.svg" alt="" width={58} height={78} className="w-full h-full" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-4%]"
          variants={headingVariants}
        >
          Keep Up with the Latest Trends in Real Estate.
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default HeaderSection;
