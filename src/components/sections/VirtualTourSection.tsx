"use client";

import CloudPanoViewer from "@/components/CloudPanoViewer";

interface VirtualTourSectionProps {
  title?: string;
  description?: string;
  tourId?: string;
}

export default function VirtualTourSection({
  title = "Experience Properties in 360°",
  description = "Take a virtual tour and explore every corner of the property from the comfort of your home.",
  tourId = "DEMO",
}: VirtualTourSectionProps) {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* CloudPano Viewer */}
        <div className="max-w-5xl mx-auto">
          <CloudPanoViewer
            tourId={tourId}
            title="Property Virtual Tour"
            height="600px"
            className="shadow-2xl rounded-lg overflow-hidden"
          />
        </div>

        {/* Optional CTA or info below */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Use your mouse or touch to navigate • Click hotspots to move between rooms
          </p>
        </div>
      </div>
    </section>
  );
}
