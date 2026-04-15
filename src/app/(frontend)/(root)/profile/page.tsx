"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { Property } from "@/types/property";
import { useWishlist } from "@/hooks/useWishlist";
import { useProfileForm, ProfileFormData } from "@/hooks/useProfileForm";
// Extracted components
import { ProfileCompletionCard } from "@/components/Profile/ProfileCompletionCard";
import { PersonalInfoCard } from "@/components/Profile/PersonalInfoCard";
import { WishlistSection } from "@/components/Profile/WishlistSection";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  // Local state
  const [completionPercentage, setCompletionPercentage] = useState(20);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Wishlist state management
  useWishlist(); // Initialize wishlist state
  const [wishlistProperties, setWishlistProperties] = useState<Property[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState<string | null>(null);

  // Handle property removal from wishlist in real-time
  const handlePropertyRemove = useCallback((propertyId: string) => {
    setWishlistProperties((prev) =>
      prev.filter((property) => property.id !== propertyId)
    );
  }, []);

  // Profile form management
  const {
    formData,
    isEditing,
    isSaving,
    saveError,
    handleInputChange,
    handleEdit,
    handleSave,
    handleCancel,
    updateInitialData,
  } = useProfileForm({
    initialData: {
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      interestedIn: Array.isArray(user?.interestedIn) ? user.interestedIn : (user?.interestedIn ? [user.interestedIn] : []),
      budgetRange: user?.budgetRange || "",
    },
    onSave: async (data: ProfileFormData) => {
      await updateProfile(data);
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      updateInitialData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        interestedIn: Array.isArray(user.interestedIn) ? user.interestedIn : (user.interestedIn ? [user.interestedIn] : []),
        budgetRange: user.budgetRange || "",
      });
    }
  }, [user, updateInitialData]);

  // Fetch wishlist data
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setWishlistLoading(true);
        setWishlistError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/get-wishlist`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = (await response.json()) as {
          status: string;
          data?: Property[];
          wishlist?: Property[];
        };

        const properties = data.data || data.wishlist || [];
        setWishlistProperties(properties);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        setWishlistError(
          error instanceof Error ? error.message : "Failed to load wishlist"
        );
      } finally {
        setWishlistLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      const fields = [
        formData.name,
        formData.email,
        formData.phoneNumber,
        formData.address,
        formData.city,
        formData.state,
        formData.interestedIn.length > 0 ? formData.interestedIn.join(",") : "",
        formData.budgetRange,
      ];

      const filledFields = fields.filter(
        (field) => field && field.trim().length > 0
      );
      const percentage = Math.round(
        (filledFields.length / fields.length) * 100
      );
      setCompletionPercentage(Math.max(20, percentage)); // Minimum 20%
    };

    calculateCompletion();
  }, [formData]);

  // Handle property selection from wishlist
  const handlePropertySelect = (property: Property | null) => {
    if (property) {
      router.push(`/property/${property.id}`);
    }
  };

  // Handle add details action
  const handleAddDetails = () => {
    if (!isEditing) {
      handleEdit();
    }
  };

  // Handle profile image change
  const handleImageChange = (image: string) => {
    setProfileImage(image);
    // TODO: Upload image to server
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-8xl mt-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
          <span className="ml-3">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl mt-10 sm:mt-20">
      {/* Profile Completion Card */}
      <ProfileCompletionCard
        completionPercentage={completionPercentage}
        userName={formData.name}
        preferences={{
          interestedIn: formData.interestedIn,
          budgetRange: formData.budgetRange,
        }}
        onAddDetails={handleAddDetails}
      />

      {/* Personal Information Card */}
      <PersonalInfoCard
        formData={formData}
        isEditing={isEditing}
        isSaving={isSaving}
        profileImage={profileImage}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
      />

      {/* Wishlist Section */}
      <WishlistSection
        wishlistProperties={wishlistProperties}
        isLoading={wishlistLoading}
        error={wishlistError}
        onPropertySelect={handlePropertySelect}
        onPropertyRemove={handlePropertyRemove}
      />

      {/* Error Display */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-700">
            Failed to save profile: {saveError.message}
          </p>
        </div>
      )}
    </div>
  );
}
