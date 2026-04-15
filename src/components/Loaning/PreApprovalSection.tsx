"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BenefitItemProps {
  text: string;
  index: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-start gap-3 mb-4"
  >
    <div className="flex-shrink-0 mt-1">
      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <p className="text-white    text-sm md:text-base xl:text-lg font-semibold">
      {text}
    </p>
  </motion.div>
);

const PreApprovalSection: React.FC = () => {
  const leftBenefits = [
    "Defines your budget & timeline.",
    "Strengthens your negotiation.",
    "Speedens up the whole process.",
  ];

  const rightBenefits = [
    "Realistic Payment slab generated.",
    "Confient & Better Financial Planning.",
    "Uncover potential issues before final loaning.",
  ];

  return (
    <section className="w-full px-3 sm:px-4 py-8 sm:py-12 md:py-16">
      <div className="lg:mx-8 xl:mx-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#FF7373] via-[#AD1818] to-[#FF7E47] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-[#CACACA]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-9">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white    text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-tight"
              >
                How <span className="text-[#FFD485]">Pre-approval loan</span>{" "}
                makes the difference ?
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-2">
                {/* Left Column Benefits */}
                <div>
                  {leftBenefits.map((benefit, index) => (
                    <BenefitItem key={index} text={benefit} index={index} />
                  ))}
                </div>

                {/* Right Column Benefits */}
                <div>
                  {rightBenefits.map((benefit, index) => (
                    <BenefitItem
                      key={index}
                      text={benefit}
                      index={index + leftBenefits.length}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Image and CTA */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center gap-4 mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  type: "spring" as const,
                  stiffness: 100,
                }}
                className="relative w-40 h-36 sm:w-48 sm:h-44 lg:w-56 lg:h-52 xl:w-60 xl:h-56"
              >
                <Image
                  src="/images/loaning/money-hand.png"
                  alt="Money hand illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFF4F4] border border-[#A4A4A4] text-[#BB2828] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-sm xl:text-base hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Talk to an agent
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreApprovalSection;
