import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CeoWordsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote:
        "They champion diversity, work-life balance, and an environment where every idea counts.",
      quoteDesktop:
        "We champion diversity, work-life balance, and an environment where every idea counts.",
      name: "Shanky Kumar",
      title: "CEO",
      image: "/images/careers/ceo-img.png",
      linkedin: "https://in.linkedin.com/in/shanky-kumar-08b54618",
    },
    {
      quote:
        "Innovation thrives when we create spaces for every voice to be heard and valued.",
      quoteDesktop:
        "We believe innovation thrives when we create spaces for every voice to be heard and valued.",
      name: "Shanky Kumar",
      title: "CEO",
      image: "/images/careers/ceo-img.png",
      linkedin: "https://in.linkedin.com/in/shanky-kumar-08b54618",
    },
    {
      quote:
        "Our success comes from empowering our team to think boldly and act with purpose.",
      quoteDesktop:
        "We know our success comes from empowering our team to think boldly and act with purpose.",
      name: "Shanky Kumar",
      title: "CEO",
      image: "/images/careers/ceo-img.png",
      linkedin: "https://in.linkedin.com/in/shanky-kumar-08b54618",
    },
  ];

  const currentTestimonial = testimonials[currentSlide];

  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const slideVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const progressVariants: any = {
    inactive: { scaleX: 1, opacity: 0.3 },
    active: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto px-4 py-8 lg:py-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden relative z-10">
        {/* CEO Image */}
        <motion.div
          className="flex justify-center mb-6"
          variants={imageVariants}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-image-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={currentTestimonial.image}
                  alt={`${currentTestimonial.name}, ${currentTestimonial.title}`}
                  width={280}
                  height={280}
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-16 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#BB2828]" : "bg-gray-300"
              }`}
              variants={progressVariants}
              animate={index === currentSlide ? "active" : "inactive"}
              whileHover={{ scaleY: 2, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </motion.div>

        {/* Content */}
        <motion.div className="text-center" variants={slideVariants}>
          <motion.h2
            className="text-[#BB2828] text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            In their own words
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`mobile-quote-${currentSlide}`}
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-black mb-6 px-4 sm:px-6"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              "{currentTestimonial.quote}"
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-name-${currentSlide}`}
              className="mb-6"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="text-sm sm:text-base md:text-lg xl:text-xl text-[#6B6B6B] font-medium">
                {currentTestimonial.name}, {currentTestimonial.title}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <Link
              href={currentTestimonial.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn Profile"
                  width={40}
                  height={40}
                />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-center lg:items-center lg:gap-16 xl:gap-20 relative z-10">
        {/* Left Side - CEO Image */}
        <motion.div className="flex-shrink-0" variants={imageVariants}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desktop-image-${currentSlide}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={currentTestimonial.image}
                  alt={`${currentTestimonial.name}, ${currentTestimonial.title}`}
                  width={380}
                  height={380}
                  className="rounded-2xl object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators - Desktop */}
          <motion.div
            className="flex justify-center items-center gap-2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-20 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#BB2828]" : "bg-gray-300"
                }`}
                variants={progressVariants}
                animate={index === currentSlide ? "active" : "inactive"}
                whileHover={{ scaleY: 3, opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div className="flex-1 max-w-2xl" variants={slideVariants}>
          <motion.h2
            className="text-[#BB2828] text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            In their own words
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`desktop-quote-${currentSlide}`}
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-black mb-6 max-w-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              "{currentTestimonial.quoteDesktop}"
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-info-${currentSlide}`}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-sm sm:text-base md:text-lg xl:text-xl text-[#6B6B6B] font-medium">
                {currentTestimonial.name}, {currentTestimonial.title}
              </p>
              <Link
                href={currentTestimonial.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity ml-2"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="LinkedIn Profile"
                    width={28}
                    height={28}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CeoWordsSection;
