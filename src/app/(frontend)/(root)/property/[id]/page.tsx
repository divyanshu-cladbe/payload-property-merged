"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import PropertyContent from "@/components/PropertyPage";
import { Property } from "@/types/property";
import PropertySkeleton from "@/components/PropertyPage/PropertySkeleton";
import PropertyError from "@/components/PropertyPage/PropertyError";
import PromotionalCard from "@/components/Property/PromotionalCard/PromotionalCard";
import PropertyImageDetails from "./ImageViewer"; // Import the Viewer
import { dummyPropertyData } from "./ImageViewer";
import { getPropertyByIdAction } from "@/actions/properties";

interface Builder {
  id: string;
  legalName: string;
  bondName: string;
  logo?: string;
  rating?: number;
  summary?: string;
}

interface Amenity {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

interface UnitSpecification {
  id: string;
  noOfRooms: number;
  noOfWashrooms: number;
  noOfBalconies: number;
  noOfLivingRooms: number;
  noOfKitchens: number;
  noOfUnits: number;
  plotArea?: string | null;
  superBuiltUpArea: string;
  coveredArea: string;
  carpetArea: string;
  front: string;
  images?: string[] | null;
  videos?: string[] | null;
  threeDModels?: string[] | null;
  floorPlan?: string | null;
  vr?: string[] | null;
  walkthrough?: string[] | null;
  UnitSpecification?: any | null;
  unitConfigs: any[];
}
interface Place {
  name: string;
  rating: number;
  address: string;
  distance: number;
  coordinates: { lat: number; lng: number };

}
interface NearbyLocation {
  id: string;
  category: string;
  categoryDisplayName: string;
  places: Place[];
  searchRadius: string;
  lastUpdated: string;
  dataSource: string;
  isActive: boolean;
  metadata: any;
}

interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  summary?: string;
  address: string;
  city: string;
  region: string;
  state: string;
  price: number;
  images: string[];
  videos?: string[];
  areaInSqft: number;
  possessionStatus: string;
  launchedOn: string;
  targetCompletionDate?: string;
  noOfUnits: number;
  noOfTowers: number;
  reraId?: string;
  tags?: string[];
  similarPropertiesID?: any[];
  location?: { coordinates: { lat: number; lng: number } };
  builder?: Builder;
  amenities?: any[];
  unitSpecifications?: UnitSpecification[];
  nearbyLocations?: NearbyLocation[];
  units?: any[];
  nearby?: any[];
  computed?: {
    pricePerSqft: string;
    pricePerSqmt: string;
    constructionStatus: string;
    projectAge: string;
    isReraRegistered: boolean;
    hasVirtualTour: boolean;
  };
}

export default function PropertyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params?.id as string;

  // VIEW STATE: Toggle based on URL parameter
  const isViewerOpen = searchParams.get("view-all") === "true";

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  // Scroll Lock: Prevent background scrolling when viewer is open
  useEffect(() => {
    if (isViewerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isViewerOpen]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const prop = await getPropertyByIdAction(propertyId);
        if (!prop) {
          throw new Error("Property not found");
        }
        
        // Map payload fields to what frontend expects if needed
        const payloadProp: any = prop;
        const mappedProp = {
           ...prop,
           unitSpecifications: payloadProp.units || prop.unitSpecifications,
           nearbyLocations: payloadProp.nearby || prop.nearbyLocations,
           amenities: prop.amenities?.map((a: any) => ({
             ...a,
             name: a.customName || a.amenity?.name,
             icon: a.customIcon || a.amenity?.icon,
           })) || []
        };
        
        setProperty(mappedProp as unknown as PropertyDetails);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch property details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchPropertyDetails();
  }, [propertyId]);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      if (!property?.similarPropertiesID?.length) {
        setSimilarProperties([]);
        return;
      }
      setSimilarLoading(true);
      try {
        const promises = property.similarPropertiesID.map((id) => {
          // It could be populated string ID or object
          const idValue = typeof id === "object" ? id.id : String(id);
          return getPropertyByIdAction(idValue);
        });
        const results = await Promise.allSettled(promises);
        const properties = results
          .filter(
            (res): res is PromiseFulfilledResult<Property | null> =>
              res.status === "fulfilled" && res.value !== null,
          )
          .map((res) => res.value as Property);
        setSimilarProperties(properties);
      } catch (error) {
        setSimilarProperties([]);
      } finally {
        setSimilarLoading(false);
      }
    };
    fetchSimilarProperties();
  }, [property?.similarPropertiesID]);

  if (loading) return <PropertySkeleton />;
  if (error) return <PropertyError error={error} />;
  if (!property) return null;

  return (
    <main className="min-h-screen bg-[#FFFFFF] relative">
      <div className="w-full max-w-[2300px] 2xl:max-w-[1900px] xl:max-w-7xl lg:max-w-6xl md:max-w-4xl sm:max-w-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* 1. Image Gallery - Note: Inside this component, your 'view all' button 
            should link to ?view-all=true */}
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mb-0 mt-6">
          <PropertyContent.PropertyImageGallery
            images={property.images || []}
            videos={property.videos}
            title={property.title}
            id={property.id}
          />
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-0">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 lg:p-6 lg:pt-0 rounded-lg">
              <PropertyContent.PropertyHeader
                title={property.title}
                price={property.price}
                address={property.address}
                city={property.city}
                state={property.state}
                possessionStatus={property.targetCompletionDate}
                launchedOn={property.launchedOn}
                description={property.description}
                builderName={property.builder?.legalName || "Unknown Builder"}
                builderRating={property.builder?.rating || 0}
                reraId={property.reraId}
                propertyId={property.id}
              />
            </div>
            <div className="px-3 sm:px-4 lg:px-6 rounded-lg mb-4">
              <PromotionalCard variant={"cashback"} />
            </div>
            <div className="px-3 sm:px-4 lg:px-6 rounded-lg">
              <PropertyContent.PropertyHighlights city={property.region} />
            </div>
            <div className="px-3 sm:px-4 lg:px-6 rounded-lg">
              <PropertyContent.PropertyAmenities
                amenities={property.amenities || []}
              />
            </div>
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <PropertyContent.PropertyInfo
                areaInSqft={property.areaInSqft}
                noOfUnits={property.noOfUnits}
                possessionStatus={property.possessionStatus}
                launchedOn={property.launchedOn}
                targetCompletionDate={property.targetCompletionDate}
                reraId={property.reraId}
                tags={property.tags}
              />
            </div>
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <PropertyContent.UnitTypes
                unitSpecifications={property.unitSpecifications || []}
              />
            </div>
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <PropertyContent.PropertyMap
                coordinates={property.location?.coordinates}
                address={property.address}
                city={property.city}
                state={property.state}
                nearbyProperties={property.nearbyLocations}
                propertyId={property.id}
              />
            </div>
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <PropertyContent.PropertyProsAndCons city={property.region} />
            </div>
            <div className="p-3 sm:p-4 lg:p-6 rounded-lg">
              <PropertyContent.PriceTrends
                currentPrice={property.price}
                city={property.city}
                area={property.address}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 lg:pt-0 rounded-lg lg:pl-0">
            <PropertyContent.PropertyContactSection
              builder={property.builder}
              propertyTitle={property.title}
              propertyId={property.id}
            />
            <div className="rounded-lg my-1 mb-4">
              <PromotionalCard variant={"prop20-dark"} />
            </div>
            <PropertyContent.PropertyBuilderInsights
              property={property}
              builder={property.builder}
            />
          </div>
        </div>

        {/* Footer Sections */}
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mt-4 sm:mt-6">
          <PropertyContent.MoreLikeThis
            similarProperties={similarProperties}
            loading={similarLoading}
          />
        </div>
        <div className="p-3 sm:p-4 lg:p-6 rounded-lg mt-4 sm:mt-6">
          <PropertyContent.RecommendedByUs
            similarProperties={similarProperties}
            loading={similarLoading}
          />
        </div>
      </div>

      {/* IMAGE VIEWER OVERLAY */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-hidden">
          <PropertyImageDetails propertyData={dummyPropertyData as any} />
          {/* <PropertyImageDetails propertyData={property as any} /> */}
        </div>
      )}
    </main>
  );
}
