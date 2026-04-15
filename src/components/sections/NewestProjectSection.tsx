"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useContentElement } from "@/hooks/useContentElement";

// --- Types ---
interface StatusItem {
  id: number;
  label: string;
  image: string;
  status: string;
  alt: string;
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, duration: 0.4 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const circleVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
};

// --- Sub-Components ---
const FeatureChip = ({ label }: { label: string }) => (
  <motion.div
    className="flex items-center gap-1.5 sm:gap-2 text-[#5E5E5E] bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md whitespace-nowrap flex-shrink-0"
    variants={chipVariants}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 relative flex-shrink-0">
      <Image
        src="/icons/feature-circle.svg"
        alt=""
        fill
        className="object-contain"
      />
    </div>
    <span className="text-[10px] sm:text-xs md:text-sm font-medium">{label}</span>
  </motion.div>
);

const ProjectCard = ({ item, index }: { item: StatusItem; index: number }) => (
  <motion.div
    className="flex flex-col items-center"
    variants={itemVariants}
    custom={index}
  >
    <motion.div
      className="relative"
      variants={circleVariants}
      whileHover="hover"
    >
      {/* Badge at top */}
      <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-[0px_0px_15px_0px_#00000040_inset] border-2 border-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="flex p-1 text-[7px] sm:text-[9px] md:text-[13px] text-center items-center justify-center font-bold text-[#939393] whitespace-nowrap">
            {item.label}
          </span>
        </motion.div>
      </div>

      {/* Circle Container — outer ring matches image size at every breakpoint */}
      <motion.div
        className={[
          // Size ladder: matches inner image exactly
          "w-28 h-28",         // mobile ~112px
          "sm:w-36 sm:h-36",   // small  ~144px
          "md:w-44 md:h-44",   // tablet ~176px
          "lg:w-48 lg:h-48",   // desktop ~192px
          "xl:w-56 xl:h-56",   // large desktop ~224px
          "2xl:w-64 2xl:h-64", // xl desktop ~256px
          "rounded-full",
          "p-1",               // thin gap between ring and image
          "border-2 border-[#AC1C1C]",
        ].join(" ")}
        whileHover={{ boxShadow: "0 15px 30px rgba(0,0,0,0.1)", y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Inner image — always fills the outer ring */}
        <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, (max-width: 1280px) 192px, (max-width: 1536px) 224px, 256px"
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </motion.div>
    </motion.div>

    {/* Status text */}
    <motion.div
      className="mt-3 sm:mt-4 md:mt-5 text-center px-1"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
      viewport={{ once: true }}
    >
      <h3 className="text-[11px] sm:text-sm md:text-base xl:text-lg font-semibold text-[#2E2A2A] leading-tight">
        {item.status}
      </h3>
    </motion.div>
  </motion.div>
);

const NewestProjectSection = () => {
  const images = {
    uc: useContentElement(
      "New_Project_Under_Construction_Image",
      "/images/home/prelaunch.png",
    ),
    np: useContentElement(
      "New_Project_Near_Possession_Image",
      "/images/home/undercons.png",
    ),
    pl: useContentElement(
      "New_Project_Pre_Launch_Image",
      "/images/home/nearpossess.png",
    ),
    rtm: useContentElement(
      "New_Project_Ready_To_Move_Image",
      "/images/home/readtomove.png",
    ),
  };

  const features = [
    "Live Pricing",
    "Price Lock",
    "Trust Score",
    "New Launches",
    "Smart Search",
  ];

  const statusItems: StatusItem[] = useMemo(
    () => [
      {
        id: 1,
        label: "32 + Projects",
        image: images.uc,
        status: "Pre Launch",
        alt: "Modern construction",
      },
      {
        id: 2,
        label: "32 + Projects",
        image: images.np,
        status: "Under Construction",
        alt: "Under construction site",
      },
      {
        id: 3,
        label: "32 + Projects",
        image: images.pl,
        status: "Near Possession",
        alt: "Near possession home",
      },
      {
        id: 4,
        label: "32 + Projects",
        image: images.rtm,
        status: "Ready To Move",
        alt: "Ready to move home",
      },
    ],
    [images],
  );

  return (
    <motion.section
      className="w-full max-w-[1680px] mx-auto py-10 md:py-16 px-4 sm:px-8 xl:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <header className="text-center mb-10 md:mb-16">
        <motion.h2
          className="text-lg sm:text-3xl md:text-4xl xl:text-[40px] font-bold text-[#151515] mb-3 tracking-tight"
          variants={itemVariants}
        >
          Only the Newest <span className="text-[#BB2828]">Projects</span> are
          here!
        </motion.h2>
        <motion.p
          className="text-xs sm:text-base md:text-lg font-medium text-[#2E2A2A] mb-6"
          variants={itemVariants}
        >
          Take a look at exciting new projects that are just as real as you are.
        </motion.p>

        {/* Feature chips — scrollable on mobile, wrapping on md+ */}
        {/* <motion.div
          className="flex flex-nowrap md:flex-wrap md:justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar px-2 py-3"
          variants={containerVariants}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {features.map((feature) => (
            <FeatureChip key={feature} label={feature} />
          ))}
        </motion.div> */}
      </header>

      {/* Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 sm:gap-x-6 md:gap-y-16 lg:gap-x-8 xl:gap-x-12 place-items-center">
        {statusItems.map((item, index) => (
          <ProjectCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default NewestProjectSection;