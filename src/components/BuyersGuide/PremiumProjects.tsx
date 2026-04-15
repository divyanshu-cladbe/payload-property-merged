"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PremiumProjectsSection: React.FC = () => {
  const benefits = [
    { id: 1, text: "Lower Initial Price" },
    { id: 2, text: "Flexible Payment" },
    { id: 3, text: "Potential for Appreciation" },
    { id: 4, text: "Tax benefits" },
    { id: 5, text: "Best Selection of Units" },
    { id: 6, text: "Customization Offers" },
  ];

  return (
    <section className="w-full pt-10 pb-6 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-[#BB2828] text-sm sm:text-base md:text-lg xl:text-xl font-bold mb-4"
            style={{ fontFamily: "Helvetica" }}
          >
            At premium projects Only
          </p>
          <h2 className="   text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-black mb-6 max-w-xl xl:max-w-3xl mx-auto">
            Securing Tomorrow's Price, with Today's Peace of Mind.
          </h2>
          <p className="text-[#8E8E8E]    font-medium text-sm md:text-base max-w-2xl mx-auto">
            The properties which you will invest at will be verified along with
            the builder's history to give you the safety net before your huge
            investment.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-1 sm:gap-12 items-center">
          {/* Left Side - Property Card */}
          {/* Property Image Card */}
          <motion.div
            className="relative overflow-hidden mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/buyers-guide/luxury-apartment-view.png"
                alt="Luxury apartment view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Right Side - Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-5 sm:gap-y-8 lg:gap-y-10 place-items-center lg:place-items-start">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="flex justify-start items-start gap-2 w-full max-w-xs mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full flex-shrink-0">
                  <Image
                    src="/svg/buyer-guide/circle.svg"
                    alt="circle"
                    width={25}
                    height={25}
                  />
                </div>
                <span className="text-black    text-base md:text-base xl:text-lg font-medium">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumProjectsSection;