"use client";

import { ListTodo, Star, User } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Animation Variants
const fadeInFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const fadeInFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
    },
  }),
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
    },
  }),
};

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (delay: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
    },
  }),
};

const slideInTopLeft: Variants = {
  hidden: { opacity: 0, x: -30, y: -30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.7,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const slideInBottomRight: Variants = {
  hidden: { opacity: 0, x: 30, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.9,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const hoverScale: Variants = {
  hover: {
    scale: 1.1,
    rotate: 2,
    transition: {
      duration: 0.3,
    },
  },
};

const hoverScaleRotateLeft: Variants = {
  hover: {
    scale: 1.1,
    rotate: -2,
    transition: {
      duration: 0.3,
    },
  },
};

const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const iconRotate: Variants = {
  hover: {
    rotate: 360,
    transition: {
      duration: 0.6,
    },
  },
};

const starWiggle: Variants = {
  animate: {
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

export default function InvestorGuideSection() {
  return (
    <section className="bg-white mt-8 md:mt-12 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center items-center">
          {/* Left Content */}
          <motion.div
            variants={fadeInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 md:space-y-7 max-w-xl lg:max-w-2xl mx-auto xl:mx-0 text-center lg:text-left"
          >
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              className="text-[#CF3232]    font-semibold text-sm xl:text-base"
            >
              Invest Better.
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              className="text-black    text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold"
            >
              The Ultimate <span className="text-[#BB2828]">Investor's</span>{" "}
              Guide that also helps you to find home
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.4}
              className="text-[#565656]    text-sm xl:text-base leading-relaxed"
            >
              Real estate is undeniably long-term wealth that is tangible asset
              that appreciates over time, provides a hedge against inflation,
              and can generate consistent passive income. Don't wait to buy real
              estate—buy real estate and wait.
            </motion.p>

            <motion.button
              variants={fadeInDown}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.5}
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:bg-red-700 text-white font-medium text-xs sm:text-sm px-7 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.span variants={buttonHover}>
                Explore Investment options
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Right Content - Image with Stats */}
          <motion.div
            variants={fadeInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main circular background */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Pink circular background */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                className="absolute inset-0 bg-[#DC0155]/30 rounded-full"
              />

              {/* Person Image */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
                className="absolute inset-0 flex items-end justify-center"
              >
                <Image
                  src="/images/buyers-guide/investor-thinking.png"
                  alt="Investor thinking"
                  width={400}
                  height={500}
                  className="object-cover object-top rounded-b-full"
                  priority
                />
              </motion.div>

              {/* Stat Card - Projects (Top Left) */}
              <motion.div
                variants={slideInTopLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="absolute top-5 sm:top-10 -left-3 sm:-left-4 bg-[#F4F3F8] rounded-2xl shadow-[0px_18.84px_39.25px_0px_#00000026] p-[10px] sm:p-4 flex items-center gap-3"
              >
                <motion.div
                  variants={iconRotate}
                  whileHover="hover"
                  className="bg-[#DC0155] rounded-2xl p-[10px]"
                >
                  <ListTodo className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-white" />
                </motion.div>
                <motion.div variants={hoverScale}>
                  <p className="text-[#333333] font-medium text-sm">2K+</p>
                  <p className="text-[#909090] text-xs">Projects</p>
                </motion.div>
              </motion.div>

              {/* Stat Card - Satisfaction (Middle Left) */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="absolute top-2/3 -translate-y-1/2 -left-3 sm:-left-20 bg-[#F4F3F8] rounded-2xl shadow-[0px_18.84px_39.25px_0px_#00000026] p-[10px] sm:p-4 flex items-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <motion.div variants={starWiggle} animate="animate">
                    <Star className="w-5 h-5 xl:w-6 xl:h-6 text-[#F2C94C] fill-current" />
                  </motion.div>
                  <motion.div variants={hoverScaleRotateLeft}>
                    <p className="text-[#333333] font-medium text-sm sm:text-base">
                      4.8
                    </p>
                    <p className="text-[#909090] text-xs sm:text-sm">
                      Satisfaction
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Stat Card - Cities (Bottom Right) */}
              <motion.div
                variants={slideInBottomRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover="hover"
                className="absolute bottom-28 sm:bottom-24 -right-3 sm:-right-16 bg-[#F4F3F8] rounded-2xl shadow-[0px_18.84px_39.25px_0px_#00000026] p-[10px] sm:p-4 flex items-center gap-3"
              >
                <motion.div
                  variants={iconRotate}
                  whileHover="hover"
                  className="bg-[#DC0155] rounded-2xl p-[10px]"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-white" />
                </motion.div>
                <motion.div variants={hoverScaleRotateLeft}>
                  <p className="text-[#333333] font-medium text-sm">20 +</p>
                  <p className="text-[#909090] text-xs">Cities</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
