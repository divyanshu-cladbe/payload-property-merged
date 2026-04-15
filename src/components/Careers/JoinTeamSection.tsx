import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const JoinTeamSection = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const},
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const},
    },
  };

  return (
    <motion.div
      className="py-8 md:py-16 lg:py-24 px-4 md:px-8 bg-gradient-to-r from-white to-[#FFFFFF00] flex flex-col lg:flex-row justify-between items-center gap-1 lg:gap-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left">
        <motion.div className="space-y-4 mb-6 md:mb-9" variants={itemVariants}>
          <motion.h1
            className="text-[#BC5151]    font-medium text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight"
            variants={itemVariants}
          >
            Join a Team that is Changing <br className="hidden sm:block" />
            the Way People Find Homes.
          </motion.h1>
          <motion.p
            className="text-[#7C6666] text-sm sm:text-base md:text-lg xl:text-xl max-w-xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            At property.new, we're building more than a platform—we're
            redefining the home buying and property experience. If you're
            passionate about technology, real estate, or empowering people to
            make smarter decisions, we want you on our team!
          </motion.p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:items-start gap-5 sm:gap-4 md:gap-7 lg:gap-9"
          variants={containerVariants}
        >
          <motion.div
            className="text-center sm:text-left"
            variants={benefitVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <motion.h1
              className="text-[#BB2828] font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl"
              whileHover={{
                color: "#A01F1F",
                transition: { duration: 0.2 },
              }}
            >
              1x
            </motion.h1>
            <p className="text-[#898989] text-sm sm:text-base md:text-lg xl:text-xl mt-2">
              Skill Enhancement & <br />
              Mentorship
            </p>
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            variants={benefitVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <motion.h1
              className="text-[#BB2828] font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl"
              whileHover={{
                color: "#A01F1F",
                transition: { duration: 0.2 },
              }}
            >
              1x
            </motion.h1>
            <p className="text-[#898989] text-sm sm:text-base md:text-lg xl:text-xl mt-2">
              Career Growth & <br />
              Network Expansion
            </p>
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            variants={benefitVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <motion.h1
              className="text-[#BB2828] font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl"
              whileHover={{
                color: "#A01F1F",
                transition: { duration: 0.2 },
              }}
            >
              1x
            </motion.h1>
            <p className="text-[#898989] text-sm sm:text-base md:text-lg xl:text-xl mt-2">
              Recognition & <br />
              Rewards
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        className="flex-shrink-0 relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        variants={imageVariants}
      >
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
          <Image
            src="/images/careers/join-team-img.png"
            alt=""
            width={180}
            height={100}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JoinTeamSection;
