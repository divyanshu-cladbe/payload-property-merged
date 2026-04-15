"use client";

import { useWishlist } from "@/hooks/useWishlist";

interface WishlistInitializerProps {
  children: React.ReactNode;
}

export function WishlistInitializer({ children }: WishlistInitializerProps) {
  // The useWishlist hook now handles initialization internally
  // This component simply ensures the hook is called once at app level
  useWishlist();

  return <>{children}</>;
}
