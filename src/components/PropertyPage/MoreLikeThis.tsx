"use client";

import React from "react";
import PropertyCard from "../Property/PropertyCard/PropertyCard";
import { Property } from "@/types/property";

interface MoreLikeThisProps {
  similarProperties?: Property[];
  variant?: string;
  loading?: boolean;
}

export const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
  similarProperties,
  variant,
  loading = false,
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className="bg-white pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          More Like This
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Use the actual data if available, fallback to empty array
  const displayProperties =
    similarProperties && similarProperties.length > 0 ? similarProperties : [];

  // Early return if still no properties
  if (!displayProperties || displayProperties.length === 0) {
    // console.log("No similar properties to display");
    return (
      <div className="bg-white pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
          More Like This
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>No similar properties found</p>
        </div>
      </div>
    );
  }

  // console.log("sim props:", displayProperties);
  return (
    <div className="bg-white ">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
        More Like This ({displayProperties.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayProperties.map((property, index) => {
          // Ensure property has required fields
          if (!property.id || !property.title) {
            console.warn(
              `Property ${index} missing required fields:`,
              property
            );
            return null;
          }

          return (
            <PropertyCard key={property.id} {...property} variant="mobileList" />
          );
        })}
      </div>
    </div>
  );
};
