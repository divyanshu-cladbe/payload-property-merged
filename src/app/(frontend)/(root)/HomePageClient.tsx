"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLocation } from "@/store/slices/locationSlice";
import { PagesIdList } from "@/utils/pagesIdList";
import { BlogsResponse } from "@/lib/types/blog";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PrebookingSection from "@/components/sections/PrebookingSection";
import PerfectHomeSection from "@/components/sections/PerfectHomeSection";
import TransitionHomeSection from "@/components/sections/TransitionHomeSection";
import NewestProjectSection from "@/components/sections/NewestProjectSection";
import BudgetMapSection from "@/components/sections/BudgetMapSection";
import SwipeBudgetSection from "@/components/sections/SwipeBudgetSection";
import FaqsSection from "@/components/sections/FaqsSection";
import EstateIQSection from "@/components/sections/EstateIQSection";
import HoldUnitSection from "@/components/sections/HoldUnitSection";
import UptoTheMinuteSection from "@/components/sections/UptoTheMinuteSection";
import BlogsPreviewSection from "@/components/sections/BlogsPreviewSection";
import PropertyListingGridSection from "@/components/sections/PropertyListingGridSection";
import { PageContentLoader } from "@/components/PageContentLoader";
import HomeBuyingEvolved from "@/components/sections/HomeBuyingEvolved";
import FindingHomes from "@/components/sections/FindingHomes";
import SoloHiking from "@/components/sections/SoloHiking";
import InstantQuoteForBooking from "@/components/sections/InstantQuoteForBooking";
// import VirtualTourSection from "@/components/sections/VirtualTourSection";

interface HomePageClientProps {
  blogsData: BlogsResponse;
}

export function HomePageClient({ blogsData }: HomePageClientProps) {
  const { currentLocation } = useAppSelector(selectLocation);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const isPreview =
    searchParams.get("cmsPreview") === "1" &&
    Boolean(searchParams.get("cityId")) &&
    Boolean(searchParams.get("pageId"));

  // FAQ data with tabs for Home Page
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const homeFaqData = {
    General: [
      {
        question: "What sets us apart from other property platforms?",
        answer:
          "We combine data-driven insights, modern tech (like Estate IQ), and a friendly human touch to make the property buying, selling, or investing journey transparent and easy for everyone.",
      },
      { question: "Who can use our platform?", answer: lorem },
      { question: "Do you charge buyers any fees?", answer: lorem },
      { question: "How can I compare properties?", answer: lorem },
      {
        question: "Can I schedule multiple property visits in a day?",
        answer: lorem,
      },
      { question: "I'm an NRI—can I buy property remotely?", answer: lorem },
      { question: "How do I transfer sale proceeds overseas?", answer: lorem },
    ],
    "Tech & Data": [
      { question: "How does Estate IQ work?", answer: lorem },
      { question: "Do you provide data on resale properties?", answer: lorem },
    ],
    "Support & Contact": [
      { question: "How do I contact support?", answer: lorem },
      { question: "Do you offer 24/7 support?", answer: lorem },
    ],
  };

  const cityId = currentLocation?.city || "delhi";
  const pageId = PagesIdList.homePage;

  return (
    <PageContentLoader cityId={cityId} pageId={pageId}>
      {isPreview && !bannerDismissed && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          background: "#1a1a1a", color: "#fff", padding: "10px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: "13px", borderBottom: "2px solid #f59e0b",
        }}>
          <span>
            Preview mode — CMS content for <strong>{searchParams.get("pageId")}</strong> / <strong>{searchParams.get("cityId")}</strong>
          </span>
          <button
            onClick={() => setBannerDismissed(true)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}
      <main className="min-h-screen w-full">
        <HeroSection />
        <PerfectHomeSection />
        <PropertyListingGridSection
          title="Short listed for **you!**"
          description="First Look. First Choice."
        />
        <NewestProjectSection />
        <BudgetMapSection />
        <InstantQuoteForBooking/>
        {/* <HomeBuyingEvolved /> */}
        {/* <FindingHomes /> */}

        {/* <TransitionHomeSection /> */}
        {/* <FeaturesSection /> */}
        {/* <VirtualTourSection /> */}

        <UptoTheMinuteSection />
        {/* <SwipeBudgetSection /> */}
        <EstateIQSection />

        <BlogsPreviewSection
          blogsData={blogsData}
          showSeeAll={true}
          onSeeAllClick={() => router.push("/blogs")}
        />
        <HoldUnitSection />

        <PropertyListingGridSection
          title="Handpicked for **you!**"
          description="First Look. First Choice."
        />
        <FaqsSection
          title="Your Questions, Answered."
          showTabs={true}
          faqData={homeFaqData}
          defaultExpandedIndex={0}
          accentColor="#FFAAAA"
          gradientFrom="#BB2828"
          gradientTo="#BE5E5E"
        />

        <TestimonialsSection />
        {/* <SoloHiking /> */}
        {/* <PrebookingSection /> */}
      </main>
    </PageContentLoader>
  );
}
