import React from "react";
import { motion } from "framer-motion";

const MarqueeSection = () => {
  const departments = [
    "Sales",
    "Tech",
    "Finance",
    "Marketing",
    "Design",
    "Support",
    "Sales",
    "Tech",
    "Finance",
    "Marketing",
    "Design",
    "Support",
  ];

  return (
    <motion.div
      className="w-full py-4 sm:py-6 md:py-8 mt-4 sm:mt-6 md:mt-8 bg-white max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" as const}}
    >
      <motion.div
        className="relative overflow-hidden"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Marquee container - NO framer motion animations that affect position */}
        <div className="flex animate-marquee whitespace-nowrap">
          {departments.map((dept, index) => (
            <motion.span
              key={index}
              className="mx-4 text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-[#E45555] select-none"
              style={{ fontFamily: "Helvetica" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.03,
                ease: "easeOut" as const,
              }}
              whileHover={{
                scale: 1.1,
                color: "#D44444",
                transition: { duration: 0.2 },
              }}
            >
              {dept}
            </motion.span>
          ))}
        </div>

        {/* Left fade overlay */}
        <motion.div
          className="absolute top-0 left-0 w-20 sm:w-32 md:w-60 lg:w-80 h-full bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Right fade overlay */}
        <motion.div
          className="absolute top-0 right-0 w-20 sm:w-32 md:w-60 lg:w-80 h-full bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MarqueeSection;
