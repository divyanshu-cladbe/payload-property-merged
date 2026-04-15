import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const PartOfHoodSection = () => {
  return (
    <div className="bg-white p-4 sm:p-10 xl:px-36">
      <motion.div
        className="relative bg-gradient-to-r from-[#00000054] via-[#c4a6af] to-[#00000054] p-10 sm:p-16 xl:p-24 rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as const}}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute left-0 bottom-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src="/svg/careers/suitcase-left.svg"
            alt=""
            width={100}
            height={100}
            className="w-16 md:w-20 xl:w-28"
          />
        </motion.div>
        <motion.div
          className="absolute -right-2 xl:right-0 top-[5%]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Image
            src="/svg/careers/suitcase-right.svg"
            alt=""
            width={150}
            height={100}
            className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-40"
          />
        </motion.div>
        <div className="space-y-3 text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-white font-semibold text-xl sm:text-2xl md:text-3xl xl:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Be a part of our hood.
          </motion.h1>
          <motion.p
            className="text-[#FAFAFA]    font-medium text-xs sm:text-sm md:text-base xl:text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Tired of feeling like you're on the outside looking in? Our hood is
            an exclusive space for those who are serious about their craft,
            their business, or their passion.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default PartOfHoodSection;
