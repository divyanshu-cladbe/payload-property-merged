"use client";

import BuyabilityCalculatorSection from "@/components/Loaning/BuyabilityCalculator";
import FaqsSection from "@/components/sections/FaqsSection";
import BeyondSearchBarSection from "@/components/SmartTools/BeyondSearchBar";
import EstateIQSection from "@/components/SmartTools/EstateIQ";
import HotHomePropertiesSection from "@/components/SmartTools/HotHomeProperties";
import ImageComparisonSlider from "@/components/SmartTools/ImageComparisonSlider";
import PreLaunchSection from "@/components/SmartTools/PreLaunchSection";
import PropertyFeatureSection from "@/components/SmartTools/PropertyFeature";
import React, { useEffect, useState } from "react";

export default function SmartToolsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const toolsFaqData = {
    General: [
      {
        question: "What sets us apart from other property platforms?",
        answer:
          "We combine data-driven insights, modern tech (like Estate IQ), and a friendly human touch to make the property buying, selling, or investing journey transparent and easy for everyone.",
      },
      {
        question: "Can I schedule multiple property visits in a day?",
        answer: lorem,
      },
      {
        question: "Who can use our platform?",
        answer: lorem,
      },
      {
        question: "I'm an NRI—can I buy property remotely?",
        answer: lorem,
      },
      {
        question: "Do you charge buyers any fees?",
        answer: lorem,
      },
      {
        question: "How do I transfer sale proceeds overseas?",
        answer: lorem,
      },
      {
        question: "How can I compare properties?",
        answer: lorem,
      },
    ],
    "Tech & Data": [],
    "Support & Contact": [],
  };

  return (
    <main className="min-h-screen w-full">
      <EstateIQSection />
      <BeyondSearchBarSection />
      <PreLaunchSection />
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl mb-8">
                <ImageComparisonSlider
                    beforeImage="/images/background.jpg"  // Replace with your image path
                    afterImage="/images/background.webp"     // Replace with your image path
                    beforeAlt="Before renovation"
                    afterAlt="After renovation"
                    initialPosition={50}
                />
            </div>
      <BuyabilityCalculatorSection />
      <HotHomePropertiesSection />
      <PropertyFeatureSection />
      <FaqsSection
        title="Frequently Asked Questions"
        subtitle="At property.new, we're building more than a platform—we're redefining the home buying and property experience. If you're passionate about technology, real est"
        showTabs={true}
        faqData={toolsFaqData}
        defaultExpandedIndex={0}
        accentColor="#BB2828"
        gradientFrom="#BB2828"
        gradientTo="#BE5E5E"
      />
    </main>
  );
}
