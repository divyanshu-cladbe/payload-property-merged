"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useContentElement } from "@/hooks/useContentElement";

// --- Types ---
interface PropertyCardProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  SeparatorColor: string;
  gradient: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

// --- Animation Variants ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Sub-components ---
const PropertyCard = ({
  title,
  subtitle,
  SeparatorColor,
  gradient,
  imageSrc,
  imageAlt,
  index,
}: PropertyCardProps) => {
  return (
    <motion.article
      className={[
        "relative flex flex-col items-center text-white w-full cursor-pointer rounded-[16px] sm:rounded-[24px] mt-6",
        // Height ladder: compact on mobile, grows up
        "h-[260px] sm:h-[420px] md:h-[560px] lg:h-[650px] xl:h-[750px]",
      ].join(" ")}
      style={{ background: gradient }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2 } }}
    >
      {/* 32+ Projects Badge */}
      <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30">
        <motion.span
          className={[
            "text-[#999999] font-medium bg-white rounded-lg sm:rounded-xl border border-[#AFD9E6] shadow-sm whitespace-nowrap block",
            // Font + padding ladder
            "text-[9px] px-2.5 py-1",
            "sm:text-xs sm:px-4 sm:py-1.5",
            "md:text-sm md:px-5 md:py-2",
            "lg:text-base lg:px-6 lg:py-2.5",
          ].join(" ")}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3 }}
        >
          32+ Projects
        </motion.span>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center z-10 pt-7 sm:pt-12 md:pt-16 px-3 sm:px-6 w-full">
        <motion.div
          className={[
            "font-bold tracking-tight mb-2 sm:mb-4",
            // Font size ladder
            "text-sm sm:text-xl md:text-2xl lg:text-3xl",
          ].join(" ")}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.1 }}
        >
          {title}
        </motion.div>

        {/* Separator — hidden on mobile to keep cards compact */}
        <div
          className="hidden sm:block border-t opacity-30 mb-3 sm:mb-4 w-4/5 max-w-[260px]"
          style={{ borderColor: SeparatorColor }}
        />

        {/* Subtitle — hidden on mobile */}
        <motion.div
          className={[
            "hidden sm:block font-medium opacity-80 max-w-[250px] leading-snug",
            "text-xs sm:text-sm md:text-base",
          ].join(" ")}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {subtitle}
        </motion.div>
      </div>

      {/* House Image */}
      <div className="relative mt-auto w-full h-[58%] overflow-hidden rounded-b-[16px] sm:rounded-b-[24px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-bottom"
          priority={index < 2}
        />
      </div>
    </motion.article>
  );
};

const PerfectHomeSection = () => {
  const image1 = useContentElement(
    "Perfect_Home_Image_1",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/8a9e8138-5fd9-47aa-9d39-0fea4f5ea000/public",
  );
  const image2 = useContentElement(
    "Perfect_Home_Image_2",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/607ad0aa-85b4-4470-0a26-2a16a0027000/public",
  );
  const image3 = useContentElement(
    "Perfect_Home_Image_3",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/20bace0b-6e3c-4e90-59af-727bbbd1c500/public",
  );
  const image4 = useContentElement(
    "Perfect_Home_Image_4",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/ec122507-7191-4aae-3e24-321987944200/public",
  );

  const propertyTypes = useMemo(
    () => [
      {
        id: "budget",
        title: <span className="text-[#316A97]">BUDGET HOMES</span>,
        subtitle: (
          <span className="text-[#316A97]">Affordable Homes, To Win You.</span>
        ),
        SeparatorColor: "#316A97",
        gradient: "linear-gradient(180deg, #CEF4FF 0%, #FFCECE 100%)",
        imageSrc: image1,
        imageAlt: "Budget",
      },
      {
        id: "value",
        title: <span className="text-[#AE53B9]">VALUE FOR MONEY</span>,
        subtitle: (
          <span className="text-[#AE53B9]">
            Best Amenities In Best Price Ranges
          </span>
        ),
        SeparatorColor: "#AE53B9",
        gradient: "linear-gradient(180deg, #F3E3FF 0%, #FFF1DE 100%)",
        imageSrc: image2,
        imageAlt: "Value",
      },
      {
        id: "luxury",
        title: <span className="text-[#A9AF4A]">LUXURY HOMES</span>,
        subtitle: (
          <span className="text-[#A9AF4A]">
            Luxury Living, Your Next Level is Here
          </span>
        ),
        SeparatorColor: "#A9AF4A",
        gradient: "linear-gradient(180deg, #FFF4CE 0%, #FFCECE 100%)",
        imageSrc: image3,
        imageAlt: "Luxury",
      },
      {
        id: "ultra",
        title: <span className="text-[#4AAF76]">ULTRA LUXURY HOMES</span>,
        subtitle: (
          <span className="text-[#4AAF76]">
            Customised For Those With Ultra Taste
          </span>
        ),
        SeparatorColor: "#4AAF76",
        gradient: "linear-gradient(180deg, #CEFFD0 0%, #CEDFFF 100%)",
        imageSrc: image4,
        imageAlt: "Ultra",
      },
    ],
    [image1, image2, image3, image4],
  );

  return (
    <section className="w-full py-4 px-4 sm:px-6 xl:px-10 bg-white">
      <div className="max-w-[2140px] mx-auto">
        <header className="text-center mb-8">
          <motion.h2
            className="text-2xl sm:text-4xl xl:text-[40px] font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Have a vision for your{" "}
            <span className="text-[#BB2828]">perfect</span> home?
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg sm:text-base xl:text-lg"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We have a project that brings it to life
          </motion.p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {propertyTypes.map((property, index) => (
            <PropertyCard key={property.id} {...property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerfectHomeSection;