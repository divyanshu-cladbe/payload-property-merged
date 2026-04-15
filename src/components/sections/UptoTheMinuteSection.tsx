import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useContentElement } from "@/hooks/useContentElement";

const UptoTheMinuteSection = () => {
  const selectSecureImage = useContentElement(
    "Select_N_Secure_Image",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/fe174189-f1c0-4296-e6b9-64371d21c600/public",
  );
  const verifyFinalizeImage = useContentElement(
    "Verify_N_Finalize_Image",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/1cfc415d-05e7-4b27-d96f-a4af3510b200/public",
  );
  const commitBookImage = useContentElement(
    "Commit_N_Book_Image",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/1494f62b-0351-4e4f-3d2f-4b73f9f0d700/public",
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const hoverScale = {
    scale: 1.03,
    transition: { duration: 0.2, ease: "easeInOut" as const },
  };

  const cards = [
    {
      number: "01",
      title: "Explore",
      description:
        "Your home's key feature—real-time pricing with PLC options—to make a decision.",
      image: selectSecureImage,
      imageAlt: "Explore illustration",
      imageWidth: 540,
      imageHeight: 340,
      numberDelay: 0.3,
      contentDelay: 0.4,
      imageDelay: 0.5,
      pbClass: "pb-6 sm:pb-1",
    },
    {
      number: "02",
      title: "Select",
      description:
        "Get elaborate guidance along with financial viability for buying your own home",
      image: verifyFinalizeImage,
      imageAlt: "Select illustration",
      imageWidth: 400,
      imageHeight: 400,
      numberDelay: 0.4,
      contentDelay: 0.5,
      imageDelay: 0.6,
      pbClass: "pb-6",
    },
    {
      number: "03",
      title: "Commit",
      description:
        "Seal your Deal and sign your Builder-Buyer agreement by paying a token amount.",
      image: commitBookImage,
      imageAlt: "Commit illustration",
      imageWidth: 340,
      imageHeight: 140,
      numberDelay: 0.5,
      contentDelay: 0.6,
      imageDelay: 0.7,
      pbClass: "pb-0",
    },
  ];

  return (
    <div
      className="w-full mx-auto max-w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 relative"
      style={{
        backgroundImage: "url('/images/home/uptominbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        {/* ── Three Step Cards ─────────────────────────────────────────────── */}
        <motion.div
          className="
            grid grid-cols-1 md:grid-cols-3
            gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12
            items-stretch
            mb-6 sm:mb-10
            max-w-[1690px]
            mx-auto
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.number}
              className="
                bg-gradient-to-b from-white to-[#FFEFEF]
                border border-[#FFC3C3]
                sm:shadow-[0px_16px_32px_4px_#0C0C0D1A]
                rounded-2xl
                relative overflow-hidden
                flex flex-col
                w-full
                min-h-[240px] sm:min-h-[260px] lg:min-h-[290px] xl:min-h-[320px] 2xl:min-h-[360px]
              "
              variants={cardVariants}
              whileHover={hoverScale}
            >
              {/* Number badge */}
              <motion.div
                className="
                  absolute -top-3 -left-3
                  bg-[#BB2828] rounded-full
                  w-14 h-14
                  sm:w-16 sm:h-16
                  lg:w-18 lg:h-18
                  xl:w-20 xl:h-20
                  flex justify-center items-center z-10
                "
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: card.numberDelay,
                  duration: 0.6,
                  ease: "easeOut" as const,
                }}
                viewport={{ once: true }}
              >
                <h6 className="font-semibold text-white text-sm sm:text-base md:text-lg xl:text-xl tracking-wide">
                  {card.number}
                </h6>
              </motion.div>

              <div className="flex flex-col justify-between h-full">
                {/* Card text content */}
                <motion.div
                  className="flex flex-col justify-center items-center text-center space-y-2 sm:space-y-3 p-5 sm:p-6 pt-10 sm:pt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.contentDelay, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-[#BB2828] font-bold text-sm sm:text-base lg:text-lg xl:text-xl">
                    {card.title}
                  </h2>
                  <p className="text-[#746363] font-semibold text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed px-2 max-w-[280px] sm:max-w-none">
                    {card.description}
                  </p>
                </motion.div>

                {/* Card image */}
                <motion.div
                  className={`flex justify-center items-end ${card.pbClass} flex-grow`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.imageDelay, duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={card.imageWidth}
                    height={card.imageHeight}
                    className="
                      object-contain
                      w-full
                      max-w-[160px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px]
                      h-auto
                    "
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom link ──────────────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          viewport={{ once: true }}
        >
          <Link
            href="/buyers-guide"
            className="inline-flex items-center gap-2 text-[#BB2828] font-medium text-sm xl:text-base underline hover:text-[#9a1f1f] transition-colors duration-300"
          >
            <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              See how it works
            </motion.span>
            <motion.div
              whileHover={{ x: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <MoveRight size={20} color="#BB2828" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default UptoTheMinuteSection;