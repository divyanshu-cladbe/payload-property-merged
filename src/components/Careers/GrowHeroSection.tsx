import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GrowHeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.2,
    },
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-[#A0473A] via-[#D14545] to-[#EBAA61] md:bg-gradient-to-r md:from-[#A0473A] md:via-[#D14545] md:to-[#EBAA61] pt-12 pb-8 sm:pt-16 sm:pb-12 lg:py-20 px-4 sm:px-6 lg:px-8 rounded-b-2xl sm:rounded-b-3xl mt-8 sm:mt-10 md:mt-16 overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12 max-w-7xl mx-auto relative z-10">
        {/* Left Content */}
        <motion.div
          className="flex-1 w-full lg:max-w-2xl"
          variants={slideInLeft}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Property Logo */}
            <motion.div
              className="hidden sm:block flex-shrink-0 mt-1"
              variants={fadeInUp}
            >
              <Image
                src="/svg/careers/career-logo.svg"
                alt=""
                width={45}
                height={45}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px]"
              />
            </motion.div>

            {/* Text Content */}
            <div className="space-y-6 sm:space-y-8 text-center sm:text-left w-full">
              <motion.h1
                className="   font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                variants={fadeInUp}
              >
                Grow with{" "}
                <motion.span
                  className="text-[#FFA1A1]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Us
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-white/90 font-medium text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto sm:mx-0"
                variants={fadeInUp}
              >
                At property.new, we're building more than a platform—we're
                redefining the home buying and property experience. If you're
                passionate about technology, real estate, or empowering people
                to make smarter decisions, we want you on our team!
              </motion.p>

              <motion.div variants={fadeInUp}>
                <motion.button
                  className="bg-white text-black font-semibold text-sm sm:text-base lg:text-lg rounded-full py-3 px-8 sm:py-4 sm:px-10 shadow-lg transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  Apply Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Laptop Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end w-full max-w-md sm:max-w-lg lg:max-w-xl"
          variants={slideInRight}
        >
          <motion.div
            variants={floatingAnimation}
            animate="animate"
            className="relative"
          >
            <Image
              src="/images/careers/hero-laptop-img.png"
              alt="Woman working on laptop"
              width={400}
              height={333}
              className="object-contain w-full h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[450px]"
              priority
            />

            {/* Subtle glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300/30 to-pink-300/30 rounded-full blur-3xl scale-110 -z-10"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GrowHeroSection;
