"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const ExploreSection = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section className="pb-8 sm:py-14 sm:mb-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Side - Property Card */}
          <motion.div
            className="w-full flex justify-center order-2 lg:order-1"
            variants={imageVariants}
          >
            <div className="w-full max-w-lg lg:max-w-none">
              <Image
                src="/images/why-us/luxury-property.png"
                alt="Luxury Property"
                width={650}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right Side - CTA Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2"
            variants={contentVariants}
          >
            <motion.div
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <h2 className="   text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-black mb-3 sm:mb-4">
                Ready to <span className="text-[#BB2828]">Explore?</span>
              </h2>
              <p className="   font-medium text-[#343434] text-sm sm:text-base lg:text-base xl:text-lg max-w-2xl mb-4 sm:mb-6 mx-auto lg:mx-0">
                Explore our projects today and take the first step towards
                owning your dream home with property.new!
              </p>
            </motion.div>

            {/* Value Propositions */}
            <motion.div
              className="mb-6 sm:mb-8 text-center lg:text-left"
              variants={itemVariants}
            >
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed"
                style={{ fontFamily: "Helvetica" }}
              >
                <span className="text-[#462929]">Direct buyers.</span>{" "}
                <span className="text-[#C3C3C3]">Stunning listings.</span>{" "}
                <span className="text-[#462929]">Instant reservations.</span>{" "}
                <span className="text-[#C3C3C3]">Skyrocket sales.</span>
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-xl mx-auto lg:mx-0">
              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                variants={featureVariants}
                custom={0}
              >
                <div className="bg-gradient-to-b from-[#BB2828] to-[#E97D7D] rounded-full p-1 flex-shrink-0 mt-0.5">
                  <Check
                    size={16}
                    className="text-white w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
                <p className="text-[#919191]   font-medium text-xs sm:text-sm md:text-base leading-relaxed text-left">
                  A clean discovery of brand-new homes with first-movers
                  advantage
                </p>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                variants={featureVariants}
                custom={1}
              >
                <div className="bg-gradient-to-b from-[#BB2828] to-[#E97D7D] rounded-full p-1 flex-shrink-0 mt-0.5">
                  <Check
                    size={16}
                    className="text-white w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
                <p className="text-[#919191]   font-medium text-xs sm:text-sm md:text-base leading-relaxed text-left">
                  Online Instant Booking for efficient sales
                </p>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 sm:gap-4"
                variants={featureVariants}
                custom={2}
              >
                <div className="bg-gradient-to-b from-[#BB2828] to-[#E97D7D] rounded-full p-1 flex-shrink-0 mt-0.5">
                  <Check
                    size={16}
                    className="text-white w-3 h-3 sm:w-4 sm:h-4"
                  />
                </div>
                <p className="text-[#919191]   font-medium text-xs sm:text-sm md:text-base leading-relaxed text-left">
                  Verified Projects, Transparent Deals, Real-Time Pricing for
                  better trust
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="pt-2 sm:pt-4 flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                className="bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;
