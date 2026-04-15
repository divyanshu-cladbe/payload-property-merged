import React from "react";
import Image from "next/image";
import { Heart, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const floatingHeart = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.2 },
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

const FavouritesSection = () => {
  return (
    <section className="relative py-12 px-4 bg-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 sm:mb-6 max-w-3xl mx-auto"
      >
        <h2 className="   text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-black mb-4">
          Your Favourites, Saved for Later.
        </h2>
        <p className="text-[#616161] font-medium text-sm sm:text-base xl:text-lg max-w-xl mx-auto">
          Get instant updates on your wishlisted properties, like price changes
          or new photos, so you're always the first to know.
        </p>
      </motion.div>

      {/* Property Cards Container */}
      <div className="relative max-w-7xl mx-auto min-h-[350px] sm:min-h-[430px] md:min-h-[490px] lg:min-h-[600px]">
        {/* Left Floating Heart */}
        <motion.div
          variants={floatingHeart}
          initial="hidden"
          whileInView="visible"
          animate="float"
          viewport={{ once: true }}
          className="absolute top-[-3%] sm:top-[1%] md:top-[12%] left-[2%] sm:left-[4%] md:left-[2%] lg:left-[10%] z-10"
        >
          <Image
            src="/svg/why-us/heart-duotone-left.svg"
            alt="Left Floating Heart"
            width={50}
            height={50}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        </motion.div>

        {/* Right Floating Heart */}
        <motion.div
          variants={floatingHeart}
          initial="hidden"
          whileInView="visible"
          animate="float"
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="absolute top-[-3%] sm:top-[1%] md:top-[12%] right-[2%] sm:right-[4%] md:right-[2%] lg:right-[10%] z-10"
        >
          <Image
            src="/svg/why-us/heart-duotone-right.svg"
            alt="Right Floating Heart"
            width={50}
            height={50}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        </motion.div>

        {/* Card 1 - Left */}
        <div className="absolute left-[5%] sm:left-[8%] md:left-[14%] lg:left-[20%] top-[10%] sm:top-[60px] md:top-[80px] lg:top-[90px] w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] z-10">
          <Image
            src="/images/why-us/card2.png"
            alt="Property 1"
            width={300}
            height={380}
            className="w-full h-auto"
          />
        </div>

        {/* Notification Badge - Interested Properties */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0, rotate: -3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="absolute left-[0%] sm:left-[2%] lg:left-[9%] top-[100px] sm:top-[140px] md:top-[180px] lg:top-[200px] z-30 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] px-3 sm:px-4 py-3 flex items-center gap-2 transform -rotate-2"
        >
          <ThumbsUp
            className="w-4 h-4 sm:w-5 sm:h-5 fill-[#7CD248] flex-shrink-0"
            color="#7CD248"
          />
          <span className="font-bold text-black text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            Added to your interested properties
          </span>
        </motion.div>

        {/* Card 2 - Center (No Rotation, Larger) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[20px] sm:top-[30px] md:top-[40px] w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] z-20">
          <Image
            src="/images/why-us/card1.png"
            alt="Property 2"
            width={350}
            height={450}
            className="w-full h-auto"
          />
        </div>

        {/* Card 3 - Right */}
        <div className="absolute right-[5%] sm:right-[8%] md:right-[14%] lg:right-[20%] top-[35px] sm:top-[60px] md:top-[80px] lg:top-[90px] w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] z-10">
          <Image
            src="/images/why-us/card3.png"
            alt="Property 3"
            width={300}
            height={380}
            className="w-full h-auto"
          />
        </div>

        {/* Notification Badge - Wishlist */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0, rotate: -3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="absolute right-[0%] sm:right-[2%] lg:right-[10%] bottom-[110px] sm:bottom-[125px] md:bottom-[120px] lg:bottom-[180px] z-30 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] px-3 sm:px-4 py-3 flex items-center gap-2 transform -rotate-2"
        >
          <Heart
            className="w-4 h-4 sm:w-5 sm:h-5 fill-[#BB2828] flex-shrink-0"
            color="#BB2828"
          />
          <span className="font-bold text-black text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            Added to your wishlist
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FavouritesSection;
