import React from "react";
import Image from "next/image";

const PropertyFeaturesSection = () => {
  const checklistItems = [
    { id: 1, text: "near my office" },
    { id: 2, text: "near wife's gym" },
    { id: 3, text: "near kid's school" },
    { id: 4, text: "near everyday's mall" },
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Booking Process - Takes 2 columns */}
          <div className="bg-[#FFF5F5] rounded-2xl px-8 py-10 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="   text-2xl md:text-3xl lg:text-4xl font-bold text-[#C24646] mb-4 leading-tight">
                  Our Booking Process
                  <br />
                  Better Than The Rest
                </h2>
                <p className="   text-[#5F5F5F] font-medium text-sm md:text-base leading-relaxed">
                  All payments are processed through a secure gateway, and you
                  receive an instant, official receipt from the builder. Your
                  financial security is our top priority.
                </p>
              </div>
              <div className="flex justify-center items-end">
                <div className="relative w-56 md:w-64 lg:w-72 h-[380px]">
                  <Image
                    src="/images/why-us/property-app-mockup.png"
                    alt="Property App Mockup"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Fulfill Your Checklist - Takes 1 column */}
          <div className="bg-[#FFF5F5] rounded-2xl px-8 py-10">
            <h2 className="   text-2xl md:text-3xl lg:text-4xl font-bold text-[#C24646] mb-3 leading-tight">
              Fulfill Your Checklist
            </h2>
            <p className="   text-[#5F5F5F] font-medium text-sm md:text-base mb-8 leading-relaxed">
              Find properties that are close to your preferences.
            </p>

            <div className="space-y-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                    <svg
                      className="w-full h-full text-[#C24646]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="   text-[#5F5F5F] font-medium text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Three Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3D & AR Views */}
          <div className="bg-[#FFF5F5] rounded-2xl px-8 pt-10 pb-6">
            <h2 className="   text-2xl md:text-3xl lg:text-4xl font-bold text-[#C24646] mb-3 leading-tight">
              3D & AR Views
            </h2>
            <p className="   text-[#5F5F5F] font-medium text-sm md:text-base mb-6 leading-relaxed">
              To bring to you highest quality walkthroughs of the projects in
              our experience centre.
            </p>
            <div className="relative w-full h-64 md:h-72">
              <Image
                src="/images/why-us/3D-floor-plan.png"
                alt="3D Floor Plan"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Precise Map View */}
          <div className="bg-[#FFF5F5] rounded-2xl px-8 pt-10 pb-6">
            <h2 className="   text-2xl md:text-3xl lg:text-4xl font-bold text-[#C24646] mb-3 leading-tight">
              Precise Map View
            </h2>
            <p className="   text-[#5F5F5F] font-medium text-sm md:text-base mb-6 leading-relaxed">
              Intuitive search based on the maps to help give you the
              condensable idea.
            </p>
            <div className="relative w-full h-64 md:h-72">
              <Image
                src="/images/why-us/map-view.png"
                alt="Map View"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* Calculate Eligibility */}
          <div className="bg-[#FFF5F5] rounded-2xl px-8 pt-10 pb-6">
            <h3 className="   text-2xl md:text-3xl lg:text-4xl font-bold text-[#C24646] mb-3 leading-tight">
              Calculate Eligibility
            </h3>
            <p className="   text-[#5F5F5F] font-medium text-sm md:text-base mb-6 leading-relaxed">
              Get a realistic estimate of what you can afford in just a few
              simple steps.
            </p>
            <div className="relative w-full h-64 md:h-72">
              <Image
                src="/images/why-us/woman-using-phone.png"
                alt="Woman using phone"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFeaturesSection;