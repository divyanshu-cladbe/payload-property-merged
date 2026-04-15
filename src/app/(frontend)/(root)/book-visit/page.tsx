"use client";

import BookingJourneySection from "@/components/BookSiteVisit/BookingJourney";
import ProcessSection from "@/components/BookSiteVisit/ProcessSection";
import ScheduleVisitSection from "@/components/BookSiteVisit/ScheduleVisit";
import FaqsSection from "@/components/sections/FaqsSection";
import UnitBookingSection from "@/components/WhyUs/UnitBookingSection";
import React, { useEffect, useState } from "react";

export default function BookSiteVisitPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const bookVisitFaqData = [
    {
      question: "What is the process of booking a unit?",
      answer:
        "1. Selection: Choose your unit based on availability. 2. Booking Form: Complete the Application Form. 3. Payment: Submit the Booking Amount 4. Allotment: Receive the formal Allotment Letter and the detailed Cost Sheet. 5. Documentation: Sign the Agreement",
    },
    {
      question:
        "What is the total cost of the property, including all charges?",
      answer: lorem,
    },
    {
      question:
        "When will I have to pay the Stamp Duty and Registration charges?",
      answer: lorem,
    },
    {
      question: "What key legal documents should I check before booking?",
      answer: lorem,
    },
    {
      question: "How will I receive updates on the construction progress?",
      answer: lorem,
    },
    {
      question: "What happens if there is a delay in possession?",
      answer: lorem,
    },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full">
      <BookingJourneySection />
      <ProcessSection />
      <ScheduleVisitSection />
      <UnitBookingSection />
      <FaqsSection
        title="Frequently Asked Questions"
        subtitle="At property.new, we're building more than a platform—we're redefining the home buying and property experience. If you're passionate about technology, real est"
        showTabs={false}
        faqData={bookVisitFaqData}
        defaultExpandedIndex={0}
        accentColor="#BB2828"
        gradientFrom="#BB2828"
        gradientTo="#BE5E5E"
      />
    </main>
  );
}
