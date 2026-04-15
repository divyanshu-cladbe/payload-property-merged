"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";

interface SimilarProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  areaInSqft: number;
  possessionStatus: string;
  images: string[];
  builder?: {
    id: string;
    name: string;
    logo?: string;
  };
}

interface SimilarPropertiesProps {
  similarProperties: SimilarProperty[];
}

export const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  similarProperties,
}) => {
  if (!similarProperties || similarProperties.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  };

  const formatPricePerSqFt = (price: number, area: number) => {
    return `₹${Math.round(price / area).toLocaleString()}/sq.ft`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Similar Properties</h2>
        <button className="text-red-600 text-sm font-medium hover:underline flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarProperties.slice(0, 3).map((property) => (
          <div
            key={property.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-48">
              {property.images && property.images.length > 0 ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {property.possessionStatus}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {property.title}
              </h3>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{property.address}, {property.city}</span>
              </div>
              
              {property.builder && (
                <p className="text-sm text-gray-600 mb-2">
                  by {property.builder.name}
                </p>
              )}
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-red-600">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatPricePerSqFt(property.price, property.areaInSqft)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {property.areaInSqft.toLocaleString()} sq.ft
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};