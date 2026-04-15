"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Tab = string;

interface FaqItem {
  question: string;
  answer: string;
}

type FaqData = {
  [key: string]: FaqItem[];
};

interface FaqsSectionProps {
  title?: string;
  subtitle?: string;
  showTabs?: boolean;
  tabs?: Tab[];
  faqData?: FaqData | FaqItem[];
  defaultExpandedIndex?: number;
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const FaqsSection: React.FC<FaqsSectionProps> = ({
  title = "FAQs",
  subtitle,
  showTabs = true,
  tabs,
  faqData = [],
  defaultExpandedIndex = 0,
  accentColor = "",
}) => {
  const isSimpleArray = Array.isArray(faqData);

  const tabsList: Tab[] = useMemo(() => {
    if (isSimpleArray) return [];
    return tabs || (faqData ? Object.keys(faqData as FaqData) : []);
  }, [isSimpleArray, tabs, faqData]);

  const [activeTab, setActiveTab] = useState<Tab>(tabsList[0] || "");
  const [expandedIndex, setExpandedIndex] = useState<number>(defaultExpandedIndex);

  const currentFaqItems = useMemo((): FaqItem[] => {
    if (isSimpleArray) return faqData as FaqItem[];
    return (faqData as FaqData)[activeTab] || [];
  }, [isSimpleArray, faqData, activeTab]);

  const toggleItem = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? -1 : index));
  };

  const renderFaqItem = (faq: FaqItem, index: number) => {
    const isExpanded = expandedIndex === index;

    return (
      <motion.div
        key={`${activeTab}-${index}`}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-3xl transition-all cursor-pointer flex flex-col overflow-hidden ${
          isExpanded ? `border shadow-md` : "shadow-sm hover:shadow-md"
        }`}
        style={{ borderColor: isExpanded ? accentColor : "transparent" }}
        onClick={() => toggleItem(index)}
      >
        <div className={`flex items-center justify-start p-3 sm:p-5 font-mulish`}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ${isExpanded ? 'text-[#BB2828]' : 'text-black'}`} />
          </motion.div>
          <h3 className="text-[13px] sm:text-sm md:text-base xl:text-lg font-semibold text-black ps-1 sm:ps-2">
            {faq.question}
          </h3>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && faq.answer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.1 },
              }}
              className="overflow-hidden max-w-3xl ms-5 sm:ms-7"
            >
              <div className="px-3 sm:px-5 pb-3 sm:pb-5 text-[#4F4F4F] text-xs sm:text-sm xl:text-base leading-relaxed">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="px-4 md:px-6 lg:px-10 xl:px-56 2xl:px-80 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 sm:py-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-1/3 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute top-8 left-0 sm:left-32 w-6 h-6 bg-white/15 rounded-full"></div>
          <div className="absolute top-6 right-16 w-5 h-5 bg-white/25 rounded-full"></div>
          <div className="absolute top-12 right-8 w-8 h-8 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-7 h-7 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 right-24 w-4 h-4 bg-white/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/3 right-0 sm:right-1/3 w-10 h-10 bg-white/15 rounded-full"></div>
        </div>
        
        <h2 className="inline text-black font-bold text-xl sm:text-2xl md:text-3xl xl:text-[40px] max-w-sm mx-auto relative z-10 px-2">
          Your Questions, <span className="text-[#E81B16]">Answered</span>
        </h2>
        
        {subtitle && (
          <p className="text-[#FFB3B3] font-medium text-sm md:text-base max-w-3xl mx-auto mt-3 sm:mt-4 relative z-10 px-2">
            {subtitle}
          </p>
        )}
      </motion.div>

      <div className="w-full mx-auto">
        {showTabs && tabsList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex bg-white mt-3 sm:mt-5 flex-wrap border-b border-gray-100"
          >
            {tabsList.map((tab, tabIndex) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedIndex(defaultExpandedIndex);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-3 text-sm md:text-base xl:text-lg font-medium transition-colors border-b-2`}
                style={{
                  color: activeTab === tab ? "#BB2828" : "black",
                  borderColor: activeTab === tab ? "#BB2828" : "transparent",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + tabIndex * 0.1 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        )}

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4 sm:space-y-6">
            {currentFaqItems
              .filter((_, index) => index % 2 === 0)
              .map((faq, arrayIndex) => renderFaqItem(faq, arrayIndex * 2))}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {currentFaqItems
              .filter((_, index) => index % 2 === 1)
              .map((faq, arrayIndex) => renderFaqItem(faq, arrayIndex * 2 + 1))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsSection;