import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CommercialComingSoonResponsiveProps {
  onExploreResidential?: () => void;
}

export const CommercialComingSoon: React.FC<
  CommercialComingSoonResponsiveProps
> = ({ onExploreResidential }) => {
  return (
    <div className="w-full pt-10 pb-5 md:mb-10 md:pt-16 xl:pt-20 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-7xl"
      >
        {/* Main Card Container with Gradient Background */}
        <div className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden bg-gradient-to-r from-[#6D6C5A] to-[#DBAB89]">
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/20" />

          {/* Mobile Layout (Below lg breakpoint) */}
          <div className="lg:hidden relative">
            <div className="px-6 py-10 sm:px-10 sm:py-14 space-y-8 sm:space-y-10">
              {/* Building Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-xl mx-auto"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/home/mobile-modern-commercial-building.png"
                    alt="Modern Commercial Building"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 95vw, 600px"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/30 blur-2xl rounded-full" />
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center space-y-5 sm:space-y-6"
              >
                <h1 className="text-[#FFF3F3] text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold">
                  Coming Soon!!!
                </h1>

                <p className="text-white text-sm sm:text-base md:text-lg xl:text-xl    font-medium leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                  Let our AI compare your shortlisted homes side-by-side—
                  <br className="hidden sm:block" />
                  no emotions, no favoritism, just data-driven insights.
                </p>

                <motion.button
                  onClick={onExploreResidential}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-10 sm:px-12 py-4 sm:py-5 bg-white text-black font-medium text-sm xl:text-base rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  Explore Residential
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout (lg and above) */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-12 xl:gap-16 p-12 xl:p-20 items-center">
              {/* Left Side - Image with Label */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Building Image */}
                <div className="relative mt-12 xl:mt-16">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/home/modern-commercial-building.png"
                      alt="Modern Commercial Building"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1280px) 45vw, 600px"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-black/25 blur-2xl rounded-full" />
                </div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="space-y-8 xl:space-y-10"
              >
                <h1 className="text-[#FFF3F3] text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold">
                  Coming Soon!!!
                </h1>

                <p className="text-white text-sm sm:text-base md:text-lg xl:text-xl    font-medium leading-relaxed">
                  Let our AI compare your shortlisted homes side-by-side—
                  <br />
                  no emotions, no favoritism, just data-driven insights.
                </p>

                <motion.button
                  onClick={onExploreResidential}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-12 py-5 bg-white text-black font-medium text-sm xl:text-base rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  Explore Residential
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Decorative Gradient Overlays */}
          <div className="absolute top-0 left-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-radial from-white/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-radial from-black/20 to-transparent blur-3xl pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

export default CommercialComingSoon;
