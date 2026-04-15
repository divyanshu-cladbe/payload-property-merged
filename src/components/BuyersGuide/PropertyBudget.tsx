import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PropertyBudgetSection: React.FC = () => {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(300);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const matchingProperties = [
    "/svg/buyer-guide/matching-property1.svg",
    "/svg/buyer-guide/matching-property2.svg",
    "/svg/buyer-guide/matching-property3.svg",
    "/svg/buyer-guide/matching-property4.svg",
    "/svg/buyer-guide/matching-property5.svg",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-white py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-20">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-2 xl:gap-20 items-start">
          {/* Left Side - Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Top Left - Living Room */}
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
              variants={imageVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/buyers-guide/modern-living-room.png"
                alt="Modern living room"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Top Right - Aerial View */}
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
              variants={imageVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/buyers-guide/aerial-neighborhood-view.png"
                alt="Aerial neighborhood view"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom Left - Exterior */}
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
              variants={imageVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/buyers-guide/house-exterior.png"
                alt="House exterior"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Bottom Right - Kitchen with Card Overlay */}
            <motion.div
              className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
              variants={imageVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/buyers-guide/modern-kitchen.png"
                alt="Modern kitchen"
                fill
                className="object-cover"
              />
            </motion.div>
            {/* Matching Properties Card */}
            <motion.div
              className="absolute -bottom-12 left-1/2 lg:left-[90%] xl:left-[100%] -translate-x-1/2 bg-white border border-[#C9C9C9] rounded-3xl shadow-lg p-4 w-3/4 sm:w-1/2 md:w-1/3 lg:w-[55%] 2xl:w-2/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-[#7D7D7D] text-xs sm:text-sm font-medium text-center mb-3">
                5 matching properties found
              </p>
              <div className="flex justify-center -space-x-3">
                {matchingProperties.map((src, index) => (
                  <motion.div
                    key={index}
                    className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                  >
                    <Image
                      src={src}
                      alt={`Property ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.p
              className="text-[#BB2828] font-bold text-sm sm:text-base md:text-lg xl:text-xl mb-4 text-center"
              style={{ fontFamily: "Helvetica" }}
              variants={textVariants}
            >
              Clever, New, and Verified
            </motion.p>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-black mb-4 text-center"
              style={{ fontFamily: "Helvetica" }}
              variants={textVariants}
            >
              Dream Big. Plan Smart.
            </motion.h1>

            <motion.p
              className="text-[#616161] font-medium text-xs sm:text-sm xl:text-base italic mb-12 text-center"
              variants={textVariants}
            >
              Now check the offer on the properties in
              <br />
              your Buy-ability and get the best results.
            </motion.p>

            {/* Price Range Card */}
            <motion.div
              className="bg-white border-b border-[#D2D2D2] rounded-3xl shadow-lg px-8 py-2 sm:mx-16 lg:mx-8 mb-8"
              variants={cardVariants}
            >
              <h2 className="text-sm md:text-base font-semibold text-black mb-1">
                Check what's in your Safe Zone vs Stretch Zone.
              </h2>
              <p className="text-[#7D7D7D] font-medium text-xs md:text-sm mb-8">
                Drag the slider or enter your ideal price range
              </p>

              {/* Price Display */}
              <motion.div
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <span className="text-[#1E1E1E] text-sm">Min : </span>
                  <motion.span
                    className="text-[#1E1E1E]"
                    key={minPrice}
                    initial={{ scale: 1.2, color: "#BB2828" }}
                    animate={{ scale: 1, color: "#1E1E1E" }}
                    transition={{ duration: 0.3 }}
                  >
                    {minPrice}L
                  </motion.span>
                </div>
                <div>
                  <span className="text-[#1E1E1E] text-sm">Max : </span>
                  <motion.span
                    className="text-[#1E1E1E]"
                    key={maxPrice}
                    initial={{ scale: 1.2, color: "#BB2828" }}
                    animate={{ scale: 1, color: "#1E1E1E" }}
                    transition={{ duration: 0.3 }}
                  >
                    {maxPrice} Cr.
                  </motion.span>
                </div>
              </motion.div>

              {/* Dual Range Slider */}
              <div className="relative mb-12">
                <div className="relative h-1 bg-[#E6E6E6] rounded-full">
                  <motion.div
                    className="absolute h-1 bg-[#BB2828] rounded-full"
                    style={{
                      left: `${(minPrice / 300) * 100}%`,
                      right: `${100 - (maxPrice / 300) * 100}%`,
                    }}
                    initial={false}
                    animate={{
                      left: `${(minPrice / 300) * 100}%`,
                      right: `${100 - (maxPrice / 300) * 100}%`,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="300"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none top-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#BB2828] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#BB2828] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                />

                <input
                  type="range"
                  min="0"
                  max="300"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none top-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#BB2828] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#BB2828] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
                />
              </div>
            </motion.div>

            {/* Set Budget Button - Centered */}
            <motion.div className="flex justify-center" variants={textVariants}>
              <motion.button
                className="md:w-1/4 lg:w-1/3 bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white text-sm xl:text-base font-medium py-3 px-7 xl:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Set Your Budget
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBudgetSection;
