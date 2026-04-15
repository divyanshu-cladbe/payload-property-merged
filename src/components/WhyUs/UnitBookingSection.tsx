import React from "react";
import { motion } from "framer-motion";

export default function UnitBookingSection() {
  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants: any = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={itemVariants}
            className="text-[#919191]   text-xs sm:text-sm md:text-base font-medium mb-2"
          >
            Your First Step to Ownership
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black    font-bold mb-3 sm:mb-4"
          >
            Booking on the{" "}
            <motion.span
              className="text-[#BB2828]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              go
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#919191]   text-sm sm:text-base xl:text-lg font-medium max-w-2xl lg:max-w-3xl mx-auto px-4"
          >
            This payment temporarily takes the unit off the market, ensuring no
            one else can book it while you complete the necessary pre-financing
            and paperwork.
          </motion.p>
        </motion.div>

        {/* Main Content - Image */}
        <motion.div
          className="relative w-full max-w-5xl mx-auto"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Desktop Image */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/images/why-us/booking-calendar.png"
              alt="Booking interface showing unit details and calendar"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Mobile/Tablet Image - More compact */}
          <motion.div
            className="block md:hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/images/why-us/booking-calendar.png"
              alt="Booking interface showing unit details and calendar"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
