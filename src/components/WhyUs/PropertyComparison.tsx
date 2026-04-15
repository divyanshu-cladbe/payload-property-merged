import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PropertyComparisonSection = () => {
  const comparisonFeatures = [
    {
      left: "Price Related fields",
      right: "Property Details Related Fields",
    },
    {
      left: "Area Related fields",
      right: "Builder/Project Repo Related fields",
    },
    {
      left: "Amenities Related fields",
      right: "Potentials & Risks Analysis",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" as const},
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" as const},
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const},
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Decorative Pink Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as const}}
        className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/2"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h2 className="   text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#060606] mb-5">
            Compare Properties{" "}
            <span className="text-[#C24646]">Side-by-Side</span>
          </h2>
          <p className="text-[#919191]   font-bold text-sm sm:text-base md:text-lg xl:text-xl max-w-4xl mx-auto">
            Making a big decision requires clarity. Our side-by-side comparison
            tool is designed to help you easily see the key differences and
            similarities between your favorite properties.
          </p>
        </motion.div>

        {/* Property Comparison Images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-10"
        >
          {/* Left Property */}
          <motion.div
            variants={slideInLeft}
            className="relative w-full md:w-[450px] h-[320px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/why-us/left-property.png"
              alt="Property 1"
              fill
              className="object-cover"
            />
            {/* Verified Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-10 left-0 bg-white rounded-2xl px-4 py-3 shadow-[0px_0px_13.73px_0px_#27272740] flex items-center gap-2"
            >
              <div className="w-5 h-5 bg-[#2CBD31] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-medium text-black text-xs sm:text-sm xl:text-base">
                Verified
              </span>
            </motion.div>
          </motion.div>

          {/* VS Badge */}
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative z-10 bg-white rounded-2xl w-20 h-10 flex items-center justify-center shadow-[0px_0px_13.73px_0px_#27272740] font-medium text-black text-sm md:text-base xl:text-lg"
          >
            VS
          </motion.div>

          {/* Right Property */}
          <motion.div
            variants={slideInRight}
            className="relative w-full md:w-[450px] h-[320px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/images/why-us/right-property.png"
              alt="Property 2"
              fill
              className="object-cover"
            />
            {/* Star Rating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-10 right-0 bg-white rounded-2xl px-4 py-3 shadow-[0px_0px_13.73px_0px_#27272740] flex items-center gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                  className="w-4 h-4 text-[#E6E648]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h3 className="  text-sm sm:text-base md:text-lg xl:text-xl font-bold text-[#919191] mb-8">
            What You'll Get from the Comparison:
          </h3>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 justify-center gap-x-16 gap-y-6 max-w-4xl mx-auto"
          >
            {comparisonFeatures.map((feature, index) => (
              <React.Fragment key={index}>
                {/* Left Column */}
                <motion.div
                  variants={itemVariant}
                  whileHover={{ x: -5 }}
                  className="flex items-center gap-3 justify-start md:justify-end"
                >
                  <svg
                    className="w-6 h-6 text-[#CF3232] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[#919191]   font-medium text-sm md:text-base xl:text-lg">
                    {feature.left}
                  </span>
                </motion.div>

                {/* Right Column */}
                <motion.div
                  variants={itemVariant}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 justify-start"
                >
                  <svg
                    className="w-6 h-6 text-[#CF3232] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[#919191]   font-medium text-sm md:text-base xl:text-lg">
                    {feature.right}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#E05D31] to-[#E91614] hover:from-orange-600 hover:to-red-600 text-white font-medium text-xs sm:text-sm xl:text-base px-10 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Know More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyComparisonSection;
