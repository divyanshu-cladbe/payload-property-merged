import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PrePurchaseSection: React.FC = () => {
  const steps = [
    {
      icon: "/svg/buyer-guide/builder.svg",
      title: "Finalise Builder & Project",
      number: "01",
    },
    {
      icon: "/svg/buyer-guide/house.svg",
      title: "Check for Pre approval offer",
      number: "02",
    },
    {
      icon: "/svg/buyer-guide/qr-code.svg",
      title: "Receive Your Early Bid Price",
      number: "03",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-white py-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-[#BB2828] text-sm sm:text-base md:text-lg xl:text-xl font-bold mb-5"
            style={{ fontFamily: "Helvetica" }}
          >
            Your Key, On Paper for the official start.
          </p>
          <h2 className="   text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-black mb-6">
            Why Pre-purchase with property.new?
          </h2>
          <p
            className="text-[#575757] text-sm md:text-base max-w-2xl mx-auto"
            style={{ fontFamily: "Helvetica" }}
          >
            The market moves fast, but your price shouldn't. By signing the
            agreement early, you immediately lock in the purchase price. This
            shields your investment from future price hikes and inflation during
            the construction or preparation phase.
          </p>
        </motion.div>

        {/* Steps with connecting lines */}
        <div className="relative">
          {/* Desktop connecting lines */}
          <div className="hidden md:block absolute top-16 left-0 right-0 px-[12%]">
            <motion.div
              className="relative h-0.5 bg-[#FD7777] origin-left"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Gap for middle circle */}
              <div className="absolute left-[calc(50%-4rem)] w-32 h-0.5 bg-white"></div>
            </motion.div>
          </div>

          {/* Steps Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative z-10"
                variants={itemVariants}
              >
                {/* Icon Circle */}
                <motion.div
                  className="w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36 rounded-full border-[3px] border-[#FD7777] flex items-center justify-center mb-6 sm:mb-8 bg-white"
                  style={{
                    boxShadow:
                      "inset 0px 0px 10px 20px #FEC1C126, 0px 0px 10px 5px #00000026",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative flex items-center justify-center">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* Step Number and Title */}
                <div className="flex justify-center items-start gap-2 text-[#818181]    font-semibold text-sm sm:text-base xl:text-lg">
                  <p>{step.number}</p>
                  <h3>{step.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrePurchaseSection;
