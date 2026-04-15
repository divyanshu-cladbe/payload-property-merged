import React from "react";
import { Heart } from "lucide-react";
import { Property } from "@/types/property";
import PropertyGrid from "@/components/Property/PropertyGrid";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { useStyles } from "@/hooks/useStyles";
import PropertyCard from "../Property/PropertyCard/PropertyCard";

interface WishlistSectionProps {
  wishlistProperties: Property[];
  isLoading: boolean;
  error?: string | null;
  onPropertySelect?: (property: Property | null) => void;
  onPropertyRemove?: (propertyId: string) => void;
}

export const WishlistSection = React.memo<WishlistSectionProps>(
  ({
    wishlistProperties,
    isLoading,
    error,
    onPropertySelect,
    onPropertyRemove,
  }) => {
    const styles = useStyles();

    const handlePropertyRedirect = (id: string) => {
      // Navigate to property detail page
      window.location.href = `/property/${id}`;
    };

    if (isLoading) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border">
          <WishlistHeader count={0} />
          <div className="flex items-center justify-center py-12">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2"
              style={{ borderColor: PROPERTY_COLORS.primary }}
            />
            <span className="ml-3 text-gray-600">Loading your wishlist...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border">
          <WishlistHeader count={0} />
          <div className="flex flex-col items-center justify-center py-12">
            <div
              className="text-4xl mb-4"
              style={{ color: PROPERTY_COLORS.error }}
            >
              ⚠️
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load wishlist
            </h3>
            <p className="text-gray-600 text-center">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border">
        <WishlistHeader count={wishlistProperties.length} />

        {wishlistProperties.length === 0 ? (
          <EmptyWishlistState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                variant="mobileMap"
                redirectToPropertyPage={onPropertySelect ? (id) => onPropertySelect(property) : handlePropertyRedirect}
                onPropertyRemove={onPropertyRemove}
                isProfilePage={true}
              />
            ))}
            {/* <PropertyGrid
              properties={wishlistProperties}
              isLoading={false}
              onPropertySelect={onPropertySelect}
              onPropertyRemove={onPropertyRemove}
              variant="profile"
              className="gap-6"
              skeletonCount={4}
            /> */}
          </div>
        )}
      </div>
    );
  }
);

// Sub-component for wishlist header
const WishlistHeader = React.memo<{ count: number }>(({ count }) => {

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Heart
          className="w-6 h-6 mr-3 fill-current"
          style={{ color: PROPERTY_COLORS.primary }}
        />
        <h2 className="text-xl font-bold">My Wishlist</h2>
      </div>
      <div
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{
          backgroundColor: PROPERTY_COLORS.backgroundSoft,
          color: PROPERTY_COLORS.primary,
        }}
      >
        {count} {count === 1 ? "Property" : "Properties"}
      </div>
    </div>
  );
});

// Sub-component for empty wishlist state
const EmptyWishlistState = React.memo(() => {

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: PROPERTY_COLORS.backgroundSoft }}
      >
        <Heart className="w-8 h-8" style={{ color: PROPERTY_COLORS.muted }} />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your wishlist is empty
      </h3>

      <p className="text-gray-600 text-center mb-6 max-w-md">
        Start exploring properties and add your favorites to see them here.
        Click the heart icon on any property to add it to your wishlist.
      </p>

      <button
        className="px-6 py-2 rounded-full font-medium transition-colors"
        style={{
          backgroundColor: PROPERTY_COLORS.primary,
          color: PROPERTY_COLORS.white,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = PROPERTY_COLORS.primaryHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = PROPERTY_COLORS.primary;
        }}
        onClick={() => (window.location.href = "/properties")}
      >
        Explore Properties
      </button>
    </div>
  );
});

WishlistSection.displayName = "WishlistSection";
WishlistHeader.displayName = "WishlistHeader";
EmptyWishlistState.displayName = "EmptyWishlistState";
