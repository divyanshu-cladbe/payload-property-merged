import { useCallback, useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UsePropertyActionsProps {
  propertyId: string;
  onPropertyRemove?: (propertyId: string) => void;
  isProfilePage?: boolean;
}

export const usePropertyActions = ({
  propertyId,
  onPropertyRemove,
  isProfilePage = false,
}: UsePropertyActionsProps) => {
  const { user } = useAuth();
  const {
    isInWishlist,
    toggleWishlist,
    toggleWishlistWithInstantRemoval,
    isInitialized,
    loading: wishlistLoading,
  } = useWishlist();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const isFavorite = isInitialized ? isInWishlist(propertyId) : false;
  // Only show loading when actively toggling, not during initialization
  const showHeartLoading = isToggling || wishlistLoading;

  // Reset auth modal when user logs in
  useEffect(() => {
    if (user && showAuthModal) {
      setShowAuthModal(false);
    }
  }, [user, showAuthModal]);

  const handleLikeClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      // If user is not authenticated, trigger auth modal
      if (!user) {
        setShowAuthModal(true);
        return;
      }

      // If wishlist is not initialized, don't allow interaction
      if (!isInitialized) {
        return;
      }

      try {
        setIsToggling(true);

        // Use instant removal for profile page, normal toggle for others
        if (isProfilePage) {
          if (isFavorite && onPropertyRemove) {
            onPropertyRemove(propertyId);
          }
          await toggleWishlistWithInstantRemoval(propertyId);
        } else {
          await toggleWishlist(propertyId);
        }

        // Show toast notification
        toast({
          title: isFavorite ? "Removed from wishlist" : "",
          variant: "wishlist",
          duration: 5000,
          className: "p-4",
          description: isFavorite ? (
            "The property has been removed from your wishlist"
          ) : (
            <div className="flex items-center gap-4 w-full">
              <img
                src="/images/Wishlist.png"
                alt="Property"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="">
                <p className="text-lg font-normal text-black">
                  Property has been added to wishlist
                </p>
              </div>
              <Button
                variant="link"
                className="absolute right-1 bottom-1 font-semibold text-base hover:underline flex-shrink-0"
                onClick={() => {
                  window.location.href = "/profile";
                }}
              >
                View
              </Button>
            </div>
          ),
        });
      } finally {
        setIsToggling(false);
      }
    },
    [
      user,
      isInitialized,
      isProfilePage,
      isFavorite,
      onPropertyRemove,
      propertyId,
      toggleWishlist,
      toggleWishlistWithInstantRemoval,
    ]
  );

  const handleAuthSuccess = useCallback(() => {
    // console.log("User authenticated successfully");
    setShowAuthModal(false);
  }, []);

  return {
    isFavorite,
    showHeartLoading,
    handleLikeClick,
    showAuthModal,
    handleAuthSuccess,
    isWishlistInitialized: isInitialized,
    wishlistLoading,
  };
};
