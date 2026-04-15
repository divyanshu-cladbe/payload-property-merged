import { useCallback, useEffect, useState, useTransition } from "react";
import { getWishlistAction, toggleWishlistAction } from "@/actions/wishlist";
import { useAuth } from "@/lib/auth";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { user } = useAuth();

  const loadWishlist = useCallback(async () => {
    if (!user) {
      setIsInitialized(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const items = await getWishlistAction();
      setWishlistItems(items);
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      setError("Failed to load wishlist");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const isInWishlist = useCallback(
    (propertyId: string) => {
      return wishlistItems.includes(propertyId);
    },
    [wishlistItems]
  );

  const toggleWishlist = useCallback(
    (propertyId: string) => {
      if (!user) return;

      const isCurrentlyInWishlist = wishlistItems.includes(propertyId);

      // Optimistic update
      if (isCurrentlyInWishlist) {
        setWishlistItems((prev) => prev.filter((id) => id !== propertyId));
      } else {
        setWishlistItems((prev) => [...prev, propertyId]);
      }

      startTransition(async () => {
        const result = await toggleWishlistAction(propertyId);
        if (result.success) {
          // Sync with exact server state
          setWishlistItems(result.items);
        } else {
          // Revert on failure
          if (isCurrentlyInWishlist) {
            setWishlistItems((prev) => [...prev, propertyId]);
          } else {
            setWishlistItems((prev) => prev.filter((id) => id !== propertyId));
          }
        }
      });
    },
    [user, wishlistItems]
  );

  const toggleWishlistWithInstantRemoval = toggleWishlist;

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return {
    wishlistItems,
    loading: loading || isPending,
    error,
    isInitialized,
    isInWishlist,
    toggleWishlist,
    toggleWishlistWithInstantRemoval,
    loadWishlist,
    isAuthenticated: !!user,
  };
};
