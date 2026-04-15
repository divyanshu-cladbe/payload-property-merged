"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, MoreVertical } from "lucide-react";
import { useContentElement } from "@/hooks/useContentElement";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.08, // Snappier sequence
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Signature Feature Entrance: Slide from Left
const featureVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideInRight: Variants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BudgetMapSection = () => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [isBudgetCalculated, setIsBudgetCalculated] = useState(false);

  const properties = [
    {
      name: "Project Sunshine Heights",
      location: "Girnar Hills, Delhi",
      price: "INR 1.2 Cr-2.8 Cr",
      image: "/images/home/blog-img1.png",
    },
    {
      name: "Project Green Valley",
      location: "Vasant Kunj, Delhi",
      price: "INR 2.5 Cr-4.2 Cr",
      image: "/images/home/budget-bg-img.png",
    },
    {
      name: "Project Blue Ridge",
      location: "Dwarka, Delhi",
      price: "INR 1.8 Cr-3.5 Cr",
      image: "/images/home/property-card-img4.png",
    },
  ];

  const handleSkip = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSwipeDirection("left");

    // After the current card slides out, change to next card and slide it in
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % properties.length);
      setSwipeDirection("entering");

      // Then remove the entering animation to settle the card
      setTimeout(() => {
        setSwipeDirection("");
        setIsAnimating(false);
      }, 500);
    }, 400);
  };

  const currentProperty = properties[currentIndex];

  const [formData, setFormData] = useState({
    income: "",
    downPayment: "",
    age: "",
    existingEmi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const eligibilityImage2 = "/images/home/moneypic.png";
  const eligibilityImage1 = useContentElement(
    "Check_Eligibility_Image_2",
    "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/07a13286-6da4-4b82-c62f-eed4fde8f800/public",
  );

  const featuresList = [
    "Validate Your Purchasing Power Against Real-Time Market Data.",
    'Calculate A Sustainable "Safe Zone" To Avoid Over-Leveraging.',
    'View "Stretch Zone" Opportunities For Higher-Yield Assets.',
  ];

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideInFromStack {
            from {
              transform: translateX(20px) scale(0.92);
              opacity: 0.5;
            }
            to {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
          }
          .slide-in-animation {
            animation: slideInFromStack 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `,
        }}
      />
      <div className="max-w-[1604px] mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            className="text-[#E81B16] text-sm sm:text-base md:text-lg xl:text-[16px] font-bold mb-1 sm:mb-2"
            variants={itemVariants}
          >
            Know Your Safe Zone & Stretch Zone
          </motion.p>
          <motion.h1
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold text-black"
            variants={itemVariants}
          >
            Emotional Vision,{" "}
            <span className="">Logical Execution</span>
          </motion.h1>

          <motion.p
            className="text-[#9B9090] text-xs sm:text-sm md:text-base xl:text-lg mt-3 font-medium max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed"
            variants={itemVariants}
          >
            Calculate Your Buyability to help you shortlist better
          </motion.p>
        </motion.div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center">
          {/* Left Side - The Form */}
          <motion.div
            className="lg:col-span-1 flex flex-col order-2 lg:order-1 lg:max-w-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form className="space-y-10 mb-8">
              {[
                {
                  label: "Monthly Income",
                  sub: "(Combined)",
                  name: "income",
                  placeholder: "Enter amount",
                },
                {
                  label: "Down Payment",
                  sub: "",
                  name: "downPayment",
                  placeholder: "Enter amount",
                },
                {
                  label: "Age",
                  sub: "(Oldest Applicant)",
                  name: "age",
                  placeholder: "Years",
                },
                {
                  label: "Existing EMI",
                  sub: "(if any)",
                  name: "existingEmi",
                  placeholder: "Enter amount",
                },
              ].map((input) => (
                <motion.div
                  key={input.name}
                  variants={featureVariants} // Using feature entrance for form lines
                  className="relative border-b border-gray-200 py-2 focus-within:border-[#BB2828] transition-colors"
                >
                  <label className="block text-sm font-semibold text-black">
                    {input.label}
                    {input.sub && (
                      <span className="text-[#BABABA] font-normal ml-1">
                        {input.sub}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    name={input.name}
                    value={(formData as any)[input.name]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-full bg-transparent border-none outline-none text-gray-700 py-1 placeholder:text-gray-300 text-sm"
                  />
                </motion.div>
              ))}
            </form>

            <motion.p
              variants={itemVariants}
              className="text-[10px] sm:text-xs text-[#BABABA] leading-relaxed mb-8"
            >
              <span className="text-[#848484] font-semibold">Disclaimer:</span>{" "}
              Loan eligibility estimates are for informational purposes based on
              your inputs.
            </motion.p>

            <motion.button
              variants={itemVariants}
              className="bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white font-semibold py-4 px-10 rounded-xl w-full sm:w-fit text-sm shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/loaning")}
            >
              Check Eligibility
            </motion.button>
          </motion.div>

          {/* Right Side - Visuals */}
          <div className="relative w-full max-w-[900px] h-[400px] md:w-[850px] sm:h-[650px] lg:w-[950px] lg:h-[700px] xl:w-[1100px] xl:h-[750px] order-2 lg:order-2 mb-8 lg:mb-0">
            {/* Background cards for stack effect - showing next properties */}
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 right-[-40px] lg:right-[-50px] w-[85%] h-[85%] rounded-[24px] lg:rounded-[28px] shadow-lg transition-all duration-300 overflow-hidden z-5 ${
                swipeDirection === "entering" ? "scale-[1.05]" : ""
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  src={properties[(currentIndex + 2) % properties.length].image}
                  alt={properties[(currentIndex + 2) % properties.length].name}
                  fill
                  className="object-cover opacity-30"
                />
              </div>
              <div className="absolute inset-0 bg-white/50"></div>
            </div>
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 right-[-20px] lg:right-[-25px] w-[92%] h-[92%] rounded-[26px] lg:rounded-[30px] shadow-lg transition-all duration-200 overflow-hidden z-10 ${
                swipeDirection === "entering" ? "scale-[1.02]" : ""
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  src={properties[(currentIndex + 1) % properties.length].image}
                  alt={properties[(currentIndex + 1) % properties.length].name}
                  fill
                  className="object-cover opacity-50"
                />
              </div>
              <div className="absolute inset-0 bg-white/30"></div>
            </div>

            {/* Main Card with swipe animation */}
            <div
              className={`absolute inset-0 transition-all z-20 ${
                swipeDirection === "left"
                  ? "duration-\[400ms\] translate-x-[110%] rotate-6 opacity-0 scale-95"
                  : swipeDirection === "entering"
                    ? "slide-in-animation"
                    : "duration-\[400ms\] translate-x-0 rotate-0 opacity-100 scale-100"
              }`}
              style={{
                transformOrigin: "center bottom",
                transitionTimingFunction:
                  swipeDirection === "left"
                    ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                    : "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <div className="relative bg-black rounded-[24px] lg:rounded-[32px] overflow-hidden w-full h-full shadow-2xl">
                {/* Image Background */}
                <div className="absolute inset-0">
                  <Image
                    src={currentProperty.image}
                    alt={currentProperty.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 lg:p-6 z-20">
                  <div className="flex items-center">
                    <div className="w-14 h-10 lg:w-16 lg:h-12 relative">
                      <Image
                        src="/svg/amiltus-logo.svg"
                        alt="Amiltus Logo"
                        width={64}
                        height={48}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 lg:p-2.5 hover:bg-white/30 rounded-full transition-colors bg-white/20 backdrop-blur-md">
                      <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </button>
                    <button className="p-2 lg:p-2.5 hover:bg-white/30 rounded-full transition-colors bg-white/20 backdrop-blur-md">
                      <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20">
                  <div className="mb-16 lg:mb-20">
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl xl:text-3xl font-extrabold mb-2 lg:mb-3">
                      {currentProperty.name}
                    </h2>
                    <p className="text-white/90 font-medium text-sm xl:text-base">
                      {currentProperty.location}
                    </p>
                  </div>

                  {/* Price Badge - Positioned absolutely */}
                  <div className="absolute right-6 lg:right-8 bottom-[100px] sm:bottom-[120px] lg:bottom-[140px]">
                    <p className="text-white text-lg sm:text-xl md:text-2xl xl:text-3xl font-medium tracking-wide">
                      {currentProperty.price}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 lg:gap-4">
                    <button
                      onClick={handleSkip}
                      className="flex-1 bg-white/25 shadow-[0px_0px_4px_0px_#00000040] backdrop-blur-md border border-white/20 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium hover:bg-black/40 transition-all duration-300 text-xs sm:text-sm lg:text-base"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => console.log("Know Acute Pricing clicked")}
                      className="flex-1 bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
                    >
                      Know Acute Pricing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Budget Display - Below Card */}
          <div className="lg:hidden text-center order-3 w-full">
            <p className="text-2xl sm:text-3xl font-light text-black mb-1">
              Rs.50,00,000
            </p>
            <p className="text-black text-sm sm:text-base font-medium mb-6">
              My Budget
            </p>
            <button className="bg-gradient-to-r from-[#E91614] to-[#E05D31] hover:shadow-lg text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-md text-sm sm:text-base">
              Calculate Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetMapSection;
