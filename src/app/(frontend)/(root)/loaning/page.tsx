"use client";
import BuyabilityCalculatorSection from "@/components/Loaning/BuyabilityCalculator";
import BuyAbilitySection from "@/components/Loaning/BuyAbilitySection";
import PreApprovalSection from "@/components/Loaning/PreApprovalSection";
import PropertyScoreStepsSection from "@/components/Loaning/PropertyScoreSteps";
import YourFavBanksSection from "@/components/Loaning/YourFavBanks";
import FaqsSection from "@/components/sections/FaqsSection";
import React, { useState, useEffect } from "react";

export default function LoaningPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // FAQ data for Loaning page
  const loaningFaqData = [
    {
      question: "What is Pre-Approval?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      question: "Can I schedule multiple property visits in a day?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "How long does it take?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "I'm an NRI—can I buy property remotely?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Pre-approved vs Home loan?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "How do I transfer sale proceeds overseas?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Documents Requirement?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full">
      <BuyAbilitySection />
      <PropertyScoreStepsSection />
      <BuyabilityCalculatorSection />
      <PreApprovalSection />
      <YourFavBanksSection />
      <FaqsSection
        title="FAQs"
        showTabs={false}
        faqData={loaningFaqData}
        defaultExpandedIndex={0}
        accentColor="#BB2828"
        gradientFrom="#BB2828"
        gradientTo="#BE5E5E"
      />
    </main>
  );
}
