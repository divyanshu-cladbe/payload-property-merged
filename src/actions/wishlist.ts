"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { User } from "@/payload-types";

// Helper to get authenticated user via Payload
export const getAuthenticatedUser = async (): Promise<User | null> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const headers = await getHeaders();
    
    const { user } = await payload.auth({ headers });
    return user as User | null;
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
};

export const getWishlistAction = async (): Promise<string[]> => {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return [];

    // The wishlist field on User might be populated or an array of IDs.
    // If populated, it returns Property objects. We just need the IDs.
    const wishlist = user.wishlist || [];
    return wishlist.map((item) => (typeof item === "object" && item !== null ? String(item.id) : String(item)));
  } catch (error) {
    console.error("Failed to fetch wishlist", error);
    return [];
  }
};

export const toggleWishlistAction = async (propertyId: string): Promise<{ success: boolean; isAdded: boolean; items: string[] }> => {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const payload = await getPayload({ config: configPromise });
    const currentWishlist = user.wishlist || [];
    const currentIds = currentWishlist.map((item) => (typeof item === "object" && item !== null ? String(item.id) : String(item)));
    
    const isCurrentlyInWishlist = currentIds.includes(propertyId);
    let newIds: string[] = [];

    if (isCurrentlyInWishlist) {
      newIds = currentIds.filter(id => id !== propertyId);
    } else {
      newIds = [...currentIds, propertyId];
    }

    // Update user in Payload
    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        wishlist: newIds.map(id => isNaN(Number(id)) ? id : Number(id)) as any,
      },
    });

    return { 
      success: true, 
      isAdded: !isCurrentlyInWishlist, 
      items: newIds 
    };
  } catch (error) {
    console.error("Failed to toggle wishlist", error);
    return { success: false, isAdded: false, items: [] };
  }
};
