import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SearchForm from "../SearchFilter";
import { useContentElement } from "@/hooks/useContentElement";
import imgproxyLoader from "@/utils/ImgProxyURLGenerator";

export const HeroSection = () => {
  // Get the dynamic hero image URL - works for ANY element ID
  // const heroImageUrl = useContentElement(
  //   "Hero_Section_Image",
  //   "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/f39c2998-9f4c-4db7-b8d5-e9b8cb5d7400/public"
  // );
  // const heroImageUrl = imgproxyLoader({
  //   src: "s3://property-new/1773209928723-469e6a31-fdf2-42c4-931a-cddccf7eb403.png",
  //   width: 1853,
  //   height: 636,
  //   quality: 100,
  // });

   const heroImageUrl = "/images/home/home-hero-image.png"

  return (
    <section className="w-full relative overflow-visible py-2 px-[8px]">
      {/* Hero container with specific height - Enhanced mobile responsiveness */}
      <div className="relative h-[380px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-3xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="hidden sm:block rounded-md relative w-full h-full">
            <Image
              src={heroImageUrl}
              alt="Hero Image"
              fill
              priority
              className="object-cover transition-transform duration-300"
              style={{
                objectPosition: "center",
                transformOrigin: "center",
              }}
            />
          </div>
          <div className="block lg:hidden relative w-full h-full">
            <Image
              src="/images/home/hero-small-bg.png"
              alt="Hero Image"
              fill
              priority
              className="object-cover transition-transform duration-300"
              style={{
                objectPosition: "center",
                transformOrigin: "center",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Search Form Section - Enhanced mobile spacing */}
      <div className="relative z-30 -mt-[25px] sm:-mt-[35px] md:-mt-[40px] lg:-mt-[45px] px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl mx-auto"
        >
          <SearchForm />
        </motion.div>
      </div>

      {/* White space below for the floating effect - Adjusted for mobile */}
      <div className="h-6 xs:h-8 sm:h-12 md:h-14 lg:h-16 bg-white"></div>
    </section>
  );
};

export default HeroSection;
