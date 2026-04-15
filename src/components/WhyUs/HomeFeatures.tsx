import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HomeFeaturesSection: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: "/svg/why-us/tick-icon.svg",
      title: "Fit Your Lifestyle",
      description:
        "Your home should be a reflection of how you live. Think about your daily routines, your family's needs, and your future plans. Do you need a dedicated office space, a large yard for pets, or a modern open-plan kitchen?",
    },
    {
      id: 2,
      icon: "/svg/why-us/tick-icon.svg",
      title: "Fit Your Budget",
      description:
        "Your financial comfort is the foundation of a confident purchase. Go beyond just the listing price and consider all aspects of your budget, including your pre-approved loan amount, down payment, and future expenses like maintenance and taxes.",
    },
    {
      id: 3,
      icon: "/svg/why-us/tick-icon.svg",
      title: "Fit Your Desired Location",
      description:
        "Location is about more than just a pin on a map—it's about community. Consider what matters most to you: the commute to work, the quality of local schools, proximity to family, or access to green spaces and amenities.",
    },
  ];

  // Container animation for staggering children
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

  // Individual feature card animation
  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  // Heading animation
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  // House icon floating animation
  const houseVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="bg-[#BB2828] py-16 px-6 lg:py-24 relative overflow-hidden">
      {/* Animated House Icon */}
      <motion.div
        className="absolute right-0 lg:right-[15%] top-0"
        variants={houseVariants}
        initial="hidden"
        whileInView="visible"
        animate="float"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/svg/why-us/house-icon.svg"
          alt=""
          width={170}
          height={100}
          className="w-28 h-24 sm:w-40 sm:h-36 lg:w-48 lg:h-44"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Animated Heading */}
        <motion.h2
          className="text-white    text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center mb-10 md:mb-6 px-1 sm:px-4 max-w-3xl lg:max-w-4xl mx-auto"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Let's start by defining what truly matters to you
        </motion.h2>

        {/* Animated Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-left"
              variants={featureVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              {/* Icon with rotation animation on hover */}
              <motion.div
                className="relative w-20 h-20 md:w-32 md:h-32 mb-6"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <div className="absolute inset-0 flex items-end justify-start">
                  <Image
                    src={feature.icon}
                    alt="tick-icon"
                    width={80}
                    height={70}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-[#FFBCBC]    text-base sm:text-lg md:text-xl xl:text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#FFBCBC] text-sm xl:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
