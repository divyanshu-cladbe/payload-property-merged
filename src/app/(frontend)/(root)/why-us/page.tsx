"use client";

import PropertyFeaturesSection from "@/components/WhyUs/PropertyFeaturesSection";
import GetAccessSection from "@/components/WhyUs/GetAccessSection";
import RedefiningTrustSection from "@/components/WhyUs/RedefiningTrustSection";
import React, { useEffect, useState } from "react";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import PropertyComparisonSection from "@/components/WhyUs/PropertyComparison";
import PropertyEligibilitySection from "@/components/WhyUs/PropertyEligibility";
import FavouritesSection from "@/components/WhyUs/FavouritesSection";
import ExploreSection from "@/components/WhyUs/ExploreSection";
import HomeFeaturesSection from "@/components/WhyUs/HomeFeatures";
import PropertyVisitSection from "@/components/WhyUs/PropertyVisitSection";
import CommitmentSection from "@/components/WhyUs/CommitmentSection";
import UnitBookingSection from "@/components/WhyUs/UnitBookingSection";
import CustomerReviewsSection from "@/components/WhyUs/CustomerReviewsSection";
import TestimonialSection from "@/components/WhyUs/TestimonialSection";
import ConnectionSection from "@/components/WhyUs/ConnectionSection";

export default function WhyUsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full">
      <GetAccessSection />
      <RedefiningTrustSection />
      <PropertyFeaturesSection />
      <FeaturesSection />
      <PropertyComparisonSection />
      <PropertyEligibilitySection />
      <FavouritesSection />
      <ExploreSection />
      <HomeFeaturesSection />
      <PropertyVisitSection />
      <UnitBookingSection />
      <CommitmentSection />
      <CustomerReviewsSection />
      <TestimonialSection />
      <ConnectionSection />
    </main>
  );
}
