import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContentElement } from "@/hooks/useContentElement";

export default function TransitionHomeSection() {
  // Get dynamic images
  const transitionLeftImage = useContentElement("Transition_Home_Section_Left", "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/c36f98ac-bba8-450b-c482-5f8c18549800/public");
  const transitionRightImage = useContentElement("Transition_Home_Section_Right", "https://imagedelivery.net/LrlZ6zZf5_j0lzjrliryVw/526f1490-f9ac-4ca9-30a4-05f2c8bb9000/public");

  return (
    <section className="w-full px-4 py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
          {/* Left Side - 30% - Image */}
          <div className="md:w-[30%] relative min-h-[250px] md:min-h-[400px] animate-slide-in-left">
            <Image
              src={transitionLeftImage}
              alt="property.new"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side - 70% - Background Image with Content */}
          <div className="md:w-[70%] relative min-h-[300px] md:min-h-[400px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={transitionRightImage}
                alt="Modern home interior"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center text-left px-8 md:px-16 py-12">
              {/* Heading */}
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl xl:text-4xl font-normal mb-6 animate-slide-in-right">
                We bring the heart back into the hunt
              </h2>

              {/* Paragraph */}
              <p className="text-[#F4F4F4] text-sm md:text-base xl:text-lg mb-8 max-w-3xl leading-relaxed animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                Making home buying process should be as inspiring as the outcome
                of it. We infuse every step with the joy, clarity, excitement,
                and peace of mind you deserve.
              </p>

              {/* Button */}
              <Link href="/properties">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 self-start animate-slide-in-right hover:bg-gray-100 hover:shadow-lg hover:scale-105 active:scale-95" style={{ animationDelay: "0.2s" }}>
                  Explore Properties
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
