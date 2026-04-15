import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CoreValuesSection = () => {
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

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.3,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="bg-[#FFF5F5] py-12 px-10 my-2">
      <motion.div
        className="text-center space-y-2 mb-10"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="   text-black font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl">
          <span className="text-[#DD4040]">Core Values</span> in Action
        </h1>
        <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
          Know more about our work culture.
        </p>
      </motion.div>

      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 lg:gap-40 max-w-7xl mx-auto">
        {/* Left side - Core Values */}
        <motion.div
          className="flex-1 max-w-lg md:max-w-xl lg:max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 lg:gap-x-20">
            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="mt-1 flex-shrink-0"
                variants={hoverVariants}
              >
                <Image
                  src="/svg/careers/action-goal.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
              <div className="space-y-1">
                <h5 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm sm:text-base md:text-lg xl:text-xl">
                  Purpose Driven Work
                </h5>
                <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
                  Your efforts help thousands find their dream home or
                  investment property—every single day.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="mt-1 flex-shrink-0"
                variants={hoverVariants}
              >
                <Image
                  src="/svg/careers/fediverse.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
              <div className="space-y-1">
                <h5 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm sm:text-base md:text-lg xl:text-xl">
                  Collaborative Culture
                </h5>
                <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
                  We thrive on new ideas, creative solutions, and celebrating
                  wins together.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="mt-1 flex-shrink-0"
                variants={hoverVariants}
              >
                <Image
                  src="/svg/careers/chart-grow.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
              <div className="space-y-1">
                <h5 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm sm:text-base md:text-lg xl:text-xl">
                  Continuous Growth
                </h5>
                <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
                  We invest in your learning through mentorship, workshops, and
                  opportunities to take on impactful projects.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="mt-1 flex-shrink-0"
                variants={hoverVariants}
              >
                <Image
                  src="/svg/careers/briefcase.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
              <div className="space-y-1">
                <h5 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm sm:text-base md:text-lg xl:text-xl">
                  Flexibility
                </h5>
                <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
                  Hybrid and remote options for work-life balance, plus generous
                  leave policies.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="mt-1 flex-shrink-0"
                variants={hoverVariants}
              >
                <Image
                  src="/svg/careers/idea.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
              <div className="space-y-1">
                <h5 className="bg-gradient-to-r from-[#CC5151] to-[#737EC5] bg-clip-text text-transparent    font-bold text-sm sm:text-base md:text-lg xl:text-xl">
                  Diverse & Inclusive
                </h5>
                <p className="text-[#707070] text-xs sm:text-sm xl:text-base">
                  We believe great ideas have no boundaries—our team comes from
                  every background and experience level.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          className="flex-shrink-0 items-center"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/careers/core-values-img.png"
            alt="Core Values Image"
            width={400}
            height={320}
            className="rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CoreValuesSection;
