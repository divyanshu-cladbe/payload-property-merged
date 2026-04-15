import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PropertyMapSection: React.FC = () => {
  const buyerAvatars = [
    "/svg/buyer-guide/buyer-avatar1.svg",
    "/svg/buyer-guide/buyer-avatar2.svg",
    "/svg/buyer-guide/buyer-avatar3.svg",
    "/svg/buyer-guide/buyer-avatar4.svg",
  ];

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

  const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
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
    hidden: { opacity: 0, x: 80 },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="bg-white py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-20">
      <motion.div
        className="mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side - Map Section */}
          <motion.div
            className="relative overflow-hidden h-[500px] lg:h-[600px] order-2 lg:order-1"
            variants={slideInLeft}
          >
            {/* Map Background with Property Card */}
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/buyers-guide/map-view-card.png"
                alt="Map view with Property Card"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Statistics Section */}
          <motion.div
            className="flex flex-col justify-center items-center space-y-10 order-1 lg:order-2"
            variants={slideInRight}
          >
            {/* Percentage Display */}
            <motion.div className="text-center" variants={scaleIn}>
              <motion.h2
                className="text-[#BB2828]    text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut" as const,
                  type: "spring" as const,
                  stiffness: 100,
                }}
              >
                33%
              </motion.h2>
              <motion.p
                className="text-[#8A8A8A]    text-base sm:text-lg md:text-xl xl:text-2xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                of our buyers picked a property with{" "}
                <br className="hidden sm:block" />
                Pre approved agreements
              </motion.p>
            </motion.div>

            {/* Buyer Avatars */}
            <motion.div
              className="flex justify-center lg:justify-start -space-x-5"
              variants={fadeInUp}
            >
              {buyerAvatars.map((avatar, index) => (
                <motion.div
                  key={index}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg"
                  custom={index}
                  variants={avatarVariants}
                  whileHover={{
                    scale: 1.15,
                    zIndex: 10,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    backgroundColor: index === 2 ? "#8B7BB8" : undefined,
                  }}
                >
                  <Image
                    src={avatar}
                    alt={`Buyer ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 w-full lg:w-auto"
              variants={fadeInUp}
            >
              <motion.button
                className="bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white text-sm lg:text-base font-medium py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(233, 22, 20, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Raise a Request
              </motion.button>
              <motion.button
                className="bg-white border border-[#A4A4A4] text-[#E91614] text-sm lg:text-base font-medium py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#E91614",
                  boxShadow: "0 20px 25px -5px rgba(164, 164, 164, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Check Existing Offers
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyMapSection;
