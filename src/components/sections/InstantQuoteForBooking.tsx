"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { TrustedIcon, IconoirView360 } from "@/common/icons/iconset";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CardComponent = ({
  image,
  className,
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "shadow-xl rounded-lg lg:rounded-3xl overflow-hidden bg-white w-[130px] h-[160px] lg:w-[200px] lg:h-[240px] xl:w-[300px] xl:h-[370px]",
        className,
      )}
    >
      <div className="relative h-20 lg:h-24 xl:h-44 w-full">
        <Image src={image} alt="card-image" fill className="object-cover" />
      </div>
      <div className="bg-white flex gap-1 lg:gap-2 flex-col p-3 xl:p-4">
        <div className="h-[4px] lg:h-2 w-24 lg:w-28 xl:w-32 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-12 lg:w-14 xl:w-16 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-28 lg:w-32 xl:w-36 bg-[#D9D9D9] rounded-xl"></div>
        <div className="h-[4px] lg:h-2 w-8 lg:w-9 xl:w-10 bg-[#D9D9D9] rounded-xl"></div>
      </div>
    </div>
  );
};

const boxVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const TOTAL_CARDS = 4;

const InstantQuoteForBooking = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.scrollWidth / TOTAL_CARDS;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, TOTAL_CARDS - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full mx-auto py-16 px-4 max-w-[1690px]  overflow-hidden">
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth pb-2 lg:pb-0 lg:overflow-visible lg:snap-none lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-4 scrollbar-hide"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >

        {/* box - 1  immersive discovery */}
        <motion.div
          variants={boxVariants}
          className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[90vw] lg:w-full lg:flex-shrink mx-auto h-[218px] lg:h-[360px] xl:h-[492px] border border-[#FFC3C3] bg-gradient-to-t from-[#facece5b] from-25% to-[#FFFFFF] rounded-3xl overflow-hidden"
        >
          <div className="absolute top-9 left-6 lg:top-[60px] lg:left-10 xl:top-[80px] xl:left-20 z-20 leading-tight">
            <p className="hidden lg:block font-bold text-lg lg:text-xl xl:text-4xl">
              Immersive <span className="text-[#E81B16]">Discovery</span>
            </p>
            <p className="block lg:hidden font-bold text-xl lg:text-xl xl:text-4xl leading-tight">
              Immersive <br /><span className="text-[#E81B16]">Discovery</span>{' '}
              & the <br />best is here.
            </p>
            <p className="hidden lg:block text-xs lg:text-[12px] xl:text-sm leading-4 lg:leading-5 lg:max-w-56 xl:max-w-sm xl:leading-6 xl:mt-6 mt-1">
              Generate customized payment plans in seconds. Our Smart Quotation
              engine calculates all taxes and premiums so you can book with 100%
              financial clarity.
            </p>
          </div>
          <div className="flex items-center justify-end  absolute top-10 lg:top-14 xl:top-16 right-0">
            <Image
              src="/images/home/box-2-frame-1.png"
              alt="Image"
              width={300}
              height={324}
              className="w-[130px] lg:w-[220px] xl:w-[300px] h-auto rounded-lg"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-2 right-20 lg:right-28 xl:right-32">
            <Image
              src="/images/home/box-2-frame-2.png"
              alt="Image"
              width={270}
              height={324}
              className="w-[120px] lg:w-[200px] xl:w-[270px] h-auto"
            />
          </div>
          <div className="block lg:hidden absolute -bottom-2 right-16 lg:right-28 xl:right-32">
            <Image
              src="/images/home/box-2-frame-3.png"
              alt="360 Image"
              width={270}
              height={324}
              className="w-[120px] lg:w-[200px] xl:w-[270px] h-auto"
            />
          </div>
          <div className="hidden lg:block">
            <p className="absolute bottom-[48px] lg:bottom-20 xl:bottom-28 left-10 lg:left-24 xl:left-30 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg xl:rounded-2xl bg-white shadow-md text-xs lg:text-[12px] xl:text-xl">
              <TrustedIcon className="text-red-700 mr-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
              Quote for A - 101
            </p>
          </div>
          <div className="block lg:hidden">
            <p className="absolute bottom-[58px] lg:bottom-28 xl:bottom-40 left-6 lg:left-14 xl:left-20 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg lg:rounded-2xl bg-white shadow-md text-[9px] lg:text-[12px] xl:text-xl">
              <TrustedIcon className="text-red-700 mr-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
              Map View
            </p>
            <p className="absolute bottom-[30px] lg:bottom-20 xl:bottom-28 left-56 lg:left-24 xl:left-36 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg lg:rounded-2xl bg-white shadow-md text-[9px] lg:text-[12px] xl:text-xl">
              <IconoirView360 className="text-red-700 mr-1 w-3 h-3 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
              360° View
            </p>
          </div>
        </motion.div>

        {/* box - 2  instant quote */}
        <motion.div
          variants={boxVariants}
          className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[90vw] lg:w-full lg:flex-shrink mx-auto h-[218px] lg:h-[360px] xl:h-[492px] border border-[#FFC3C3] bg-gradient-to-t from-[#facece5b] from-25% to-[#FFFFFF] to-65% rounded-2xl lg:rounded-3xl xl:rounded-3xl overflow-hidden"
        >
          <div className="absolute top-9 left-6 lg:top-[60px] lg:left-10 xl:top-[90px] xl:left-12 z-20 leading-tight">
            <p className="hidden lg:block xl:block font-bold text-lg lg:text-xl xl:text-4xl">
              Instant Quote for <br />
              <span className="text-[#E81B16]">Booking</span>
            </p>
            <p className="block lg:hidden font-bold text-xl lg:text-xl xl:text-4xl leading-tight">
              Instant quote <br />
              <span className="text-[#E81B16]"> Booking </span>
              at the tip <br /> of your fingertips.
            </p>
            <p className="hidden lg:block text-xs lg:text-[12px] xl:text-sm leading-4 lg:leading-5 lg:max-w-56 xl:max-w-sm xl:leading-6 xl:mt-6 mt-1">
              Experience your future home before it's built. Take
              high-definition 360° virtual tours with interactive map Features
              for nearby locations that are your most frequent commutes.
            </p>
          </div>
          <div className="absolute top-[36px] lg:top-[50px] xl:top-[80px] right-0">
            <Image
              src="/images/home/laptop-half.png"
              alt="Image"
              width={400}
              height={324}
              className="w-[140px] lg:w-[280px] xl:w-[400px] h-auto"
            />
          </div>
          <p className="xl:hidden lg:hidden absolute bottom-[50px] lg:bottom-36 xl:bottom-40 left-6 lg:left-14 xl:left-20 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg bg-white shadow-md text-[9px] lg:text-base xl:text-xl">
            <TrustedIcon className="text-red-700 mr-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
            Quote for A-101
          </p>
        </motion.div>

        {/* box - 3 trust score */}
        <motion.div
          variants={boxVariants}
          className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[90vw] lg:w-full lg:flex-shrink mx-auto h-[218px] lg:h-[360px] xl:h-[492px] border border-[#FFC3C3] bg-gradient-to-t from-[#facece5b] from-25% to-[#FFFFFF] rounded-3xl overflow-hidden"
        >
          <Image
            src="/images/home/rating-top.png"
            alt="rating"
            width={186}
            height={124}
            className="absolute right-2 w-[80px] lg:w-[140px] xl:w-[186px] h-auto"
          />
          <div className="absolute lg:top-3 xl:-top-2 -right-2">
            <Image
              src="/images/home/trustscore.png"
              alt="Trust Score"
              width={480}
              height={224}
              className="w-[200px] lg:w-[300px] xl:w-[460px] h-auto"
            />
          </div>
          <div className="absolute top-10 left-6 lg:top-[90px] lg:left-10 xl:top-[100px] xl:left-20 z-20">
            <p className="hidden lg:block font-bold text-xl lg:text-xl xl:text-4xl leading-tight">
              Trust Score for <br /> your  best <br />
              <span className="text-[#E81B16]"> predictability</span>
            </p>
            <p className="block lg:hidden font-bold text-xl lg:text-xl xl:text-4xl leading-tight">
              Trust Score for <br />your  best <br />
              <span className="text-[#E81B16]"> predictability</span>
            </p>
            <p className="hidden lg:block text-xs lg:text-[12px] xl:text-sm leading-4 lg:leading-5 lg:max-w-56 xl:max-w-[350px] xl:leading-6 xl:mt-6 mt-1">
              we believe your home should be a sanctuary, not a source of
              restlessness. Our Trust Score Comparison strips away the marketing
              noise to reveal the actual price.
            </p>
            <p className="lg:hidden absolute top-24 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg lg:rounded-2xl bg-white shadow-md text-[9px] lg:text-[12px] xl:text-xl">
              <TrustedIcon className="text-red-700 mr-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
              Trusted by many
            </p>
          </div>
        </motion.div>

        {/* box - 4 verified listings */}
        <motion.div
          variants={boxVariants}
          className="relative flex-shrink-0 snap-center w-[85vw] sm:w-[90vw] lg:w-full lg:flex-shrink mx-auto h-[218px] lg:h-[360px] xl:h-[492px] border border-[#FFC3C3] bg-gradient-to-t from-[#facece5b] from-25% to-[#FFFFFF] rounded-3xl overflow-hidden"
        >
          <div className="absolute top-8 left-6 lg:top-[60px] lg:left-10 xl:top-[80px] xl:left-20 z-20 leading-tight">
            <p className="font-bold text-xl lg:text-xl xl:text-4xl">
              Verified listings <br /> from the
              <span className="text-[#E81B16]"> genuine </span> <br /> builders.
            </p>
            <p className="hidden lg:block text-xs lg:text-[12px] xl:text-sm leading-4 lg:leading-5 lg:max-w-56 xl:max-w-xs xl:leading-6 xl:mt-6 mt-1">
              Buy with confidence. Every listing is RERA-compliant and
              developer-verified, backed by our secured Prism Logic data
              protection.
            </p>
          </div>
          <p className="lg:hidden absolute top-32 left-6 px-3 lg:px-4 xl:px-6 font-bold py-2 xl:py-3 justify-center items-center flex rounded-lg lg:rounded-2xl bg-white shadow-md text-[9px] lg:text-[12px] xl:text-xl">
            <TrustedIcon className="text-red-700 mr-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-9 xl:h-9" />
            Trusted by many
          </p>
          <CardComponent
            image="/images/home/card-image2.png"
            className="absolute -right-6 lg:-right-5 xl:-right-6 bottom-10 lg:bottom-24 xl:bottom-26"
          />
          <CardComponent
            image="/images/home/card-image1.png"
            className="absolute right-2 lg:right-16 xl:right-20 bottom-6 lg:bottom-12 xl:bottom-18"
          />
        </motion.div>

      </motion.div>

      {/* Pagination dots — mobile only */}
      <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.scrollWidth / TOTAL_CARDS;
              el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
            }}
            className={cn(
              "rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-5 h-2 bg-[#E81B16]"
                : "w-2 h-2 bg-[#D9D9D9]",
            )}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default InstantQuoteForBooking;