"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PropertyScoreStepsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-[#FFFAF2] py-12 sm:py-14 px-4 sm:px-6">
      <div className="lg:px-16 mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-2 sm:mb-4 xl:mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="   text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-black mb-3 sm:mb-4 px-4">
            What Defines Your Buy-Ability Score?
          </h1>
          <p className="text-sm sm:text-base xl:text-lg font-bold text-[#848484] max-w-2xl mx-auto px-4">
            This isn't just a number—it's a realistic starting point for your
            property search.
          </p>
        </motion.div>

        {/* Three Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-8 lg:gap-10 xl:gap-16 items-start text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Step 1: Income Strength */}
          <motion.div
            className="p-6 transition-shadow duration-300"
            variants={itemVariants}
          >
            <motion.div
              className="p-4 sm:p-6 lg:p-8 mb-2 flex justify-center items-center"
              variants={imageVariants}
            >
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] aspect-square">
                <Image
                  src="/images/loaning/income-strength.png"
                  alt="Income Strength Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                />
              </div>
            </motion.div>

            <h2 className="   text-base md:text-lg xl:text-xl font-bold text-black mb-3">
              Step 1: Your Combined{" "}
              <span className="text-[#BB2828]">Income Strength</span>
            </h2>
            <p className="text-[#8B8B8B]    font-medium text-sm xl:text-base leading-relaxed max-w-md mx-auto">
              This helps us understand your borrowing capacity. It is the total,
              verifiable income determines your Debt-to-Income Ratio (DTI), this
              along with the repayment runaway(age) will determine the correct
              score.
            </p>
          </motion.div>

          {/* Step 2: Existing Commitments */}
          <motion.div
            className="p-6 transition-shadow duration-300"
            variants={itemVariants}
          >
            <motion.div
              className="p-4 sm:p-6 lg:p-8 mb-2 flex justify-center items-center"
              variants={imageVariants}
            >
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] aspect-square">
                <Image
                  src="/images/loaning/existing-commitments.png"
                  alt="Existing Commitments Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                />
              </div>
            </motion.div>

            <h2 className="   text-base md:text-lg xl:text-xl font-bold text-black mb-3">
              Step 2: Your <span className="text-[#BB2828]">Existing</span>{" "}
              financial commitments
            </h2>
            <p className="text-[#8B8B8B]    font-medium text-sm xl:text-base leading-relaxed max-w-md mx-auto">
              Please enter the total of all your regular monthly debt payments.
              This includes items like car loans, student loans, and the minimum
              payments on your credit cards.
            </p>
          </motion.div>

          {/* Step 3: Down-payment Power */}
          <motion.div
            className="p-6 transition-shadow duration-300 md:col-span-2 lg:col-span-1"
            variants={itemVariants}
          >
            <motion.div
              className="p-4 sm:p-6 lg:p-8 mb-2 flex justify-center items-center"
              variants={imageVariants}
            >
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] aspect-square">
                <Image
                  src="/images/loaning/down-payment-power.png"
                  alt="Down Payment Power Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 280px"
                />
              </div>
            </motion.div>

            <h2 className="   text-base md:text-lg xl:text-xl font-bold text-black mb-3">
              Step 3: Your <span className="text-[#BB2828]">Down-payment</span>{" "}
              power
            </h2>
            <p className="text-[#8B8B8B]    font-medium text-sm xl:text-base leading-relaxed max-w-md mx-auto">
              Your down payment is your initial investment in your new home.
              While a common target is 20% of the property's value, the amount
              can vary significantly. A larger down payment can help you secure
              better options.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyScoreStepsSection;
