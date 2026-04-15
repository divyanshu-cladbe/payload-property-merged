"use client";

import InvestorGuideSection from "@/components/BuyersGuide/InvestorGuide";
import LargestReturnSection from "@/components/BuyersGuide/LargestReturn";
import PremiumProjectsSection from "@/components/BuyersGuide/PremiumProjects";
import PrePurchaseSection from "@/components/BuyersGuide/PrePurchaseSection";
import PropertyBudgetSection from "@/components/BuyersGuide/PropertyBudget";
import PropertyMapSection from "@/components/BuyersGuide/PropertyMap";
import RealEstateSection from "@/components/BuyersGuide/RealEstateSection";
import FaqsSection from "@/components/sections/FaqsSection";
import PerfectHomeSection from "@/components/sections/PerfectHomeSection";
import React, { useEffect, useState } from "react";

export default function BuyersGuidePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const buyerFaqData = [
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
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full">
      <InvestorGuideSection />
      <RealEstateSection />
      <LargestReturnSection />
      <PerfectHomeSection />
      <PrePurchaseSection />
      <PropertyBudgetSection />
      <PropertyMapSection />
      <PremiumProjectsSection />
      <FaqsSection
        title="Frequently Asked Questions"
        subtitle="At property.new, we're building more than a platform—we're redefining the home buying and property experience. If you're passionate about technology, real est"
        showTabs={false}
        faqData={buyerFaqData}
        defaultExpandedIndex={0}
        accentColor="#BB2828"
        gradientFrom="#BB2828"
        gradientTo="#BE5E5E"
      />
    </main>
  );
}
