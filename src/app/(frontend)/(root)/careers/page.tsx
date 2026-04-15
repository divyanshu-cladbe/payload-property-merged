"use client";

import BuildTogetherFormSection from "@/components/Careers/BuildTogetherForm";
import CeoWordsSection from "@/components/Careers/CeoWordsSection";
import ChannelPartnerSection from "@/components/Careers/ChannelPartnerSection";
import CoreValuesSection from "@/components/Careers/CoreValuesSection";
import GrowHeroSection from "@/components/Careers/GrowHeroSection";
import JoinTeamSection from "@/components/Careers/JoinTeamSection";
import MarqueeSection from "@/components/Careers/MarqueeSection";
import PartOfHoodSection from "@/components/Careers/PartOfHoodSection";
import UnlockSmarterSellSection from "@/components/Careers/UnlockSmarterSell";
import { useEffect, useState } from "react";

export default function CareersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full">
      <GrowHeroSection />
      <MarqueeSection />
      <JoinTeamSection />
      <CoreValuesSection />
      <ChannelPartnerSection />
      <UnlockSmarterSellSection />
      <BuildTogetherFormSection />
      <PartOfHoodSection />
      <CeoWordsSection />
    </main>
  );
}
