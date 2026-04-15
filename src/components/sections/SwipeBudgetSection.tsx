import React, { useState } from "react";
import { Heart, MoreVertical } from "lucide-react";
import Image from "next/image";

const SwipeBudgetSection = () => {
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

  return (
    <div className="max-w-[1807px] mx-auto relative overflow-hidden">
      {/* Custom styles for animations */}
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

      {/* Background with gradient pattern */}
      {/* <div
        className="absolute inset-0 bg-gradient-to-br from-[#F5E6E8] via-[#F8F0F2] to-[#F2E4E6]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 218, 225, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 192, 203, 0.2) 0%, transparent 50%)
          `,
        }}
      /> */}

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-24 max-w-[1500px] w-full">
          {/* Top/Left Section - Budget Calculator */}
          <div className="flex-1 max-w-[500px] w-full text-center lg:text-left order-1 lg:order-1">
            <p className="text-[#C24646] text-sm md:text-base xl:text-lg mb-2 lg:mb-4 font-bold italic">
                Trending Properties
            </p>

            <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-4 lg:mb-6 text-black   ">
              Well Within Your <span className="text-[#BB2828]">Budget</span>
            </h1>

            <p className="text-black text-sm md:text-base xl:text-lg mb-8 lg:mb-12 leading-relaxed">
              Because Finding the correct home is a mix of{" "}
              <br className="hidden xl:block" />
              heart and numbers.
            </p>

            {isBudgetCalculated ? (
              <div className="hidden lg:block mb-12">
                <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-light text-black mb-2">
                  Rs.50,00,000
                </p>
                <p className="text-black text-sm md:text-base xl:text-lg font-medium">
                  My Budget
                </p>
              </div>
            ) : (
              <button className="hidden lg:block bg-gradient-to-r from-[#E91614] to-[#E05D31] hover:shadow-lg text-white px-10 py-4 rounded-xl text-sm xl:text-base font-medium transition-all duration-300 shadow-md">
                Calculate Budget
              </button>
            )}
          </div>

          {/* Middle/Right Section - Property Card Stack */}
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

export default SwipeBudgetSection;
