import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Heart, MoreVertical, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Icons from "./Icons";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal";
import { toast } from "@/hooks/use-toast";
import { usePropertyActions } from "@/hooks/usePropertyActions";
import { SharePropertyDialog } from "@/components/shared/SharePropertyDialog";

type PropertyImageActionsProps = {
  variant: string;
  isFavorite: boolean;
  likeProperty: (e: React.MouseEvent) => Promise<void>;
  handleCloseIconClick: (e: React.MouseEvent) => void;
  isWishlistLoading?: boolean;
  isWishlistInitialized?: boolean;
  propertyId: string;
  propertyTitle: string;
};

export const PropertyImageActions = React.memo(
  ({
    variant,
    likeProperty,
    handleCloseIconClick,
    isWishlistLoading = false,
    isWishlistInitialized = false,
    propertyId,
    propertyTitle,
  }: PropertyImageActionsProps) => {
    const { user } = useAuth();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const [openMenu, setOpenMenu] = React.useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const {
      isFavorite,
      showHeartLoading,
      handleLikeClick: handlePropertyLike,
      showAuthModal,
      handleAuthSuccess,
    } = usePropertyActions({ propertyId });

    const handleLikeClick = async (e: React.MouseEvent) => {
      e.stopPropagation();
      // Call the property like handler from our hook
      await handlePropertyLike(e);
    };

    const handleInterestedClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!user) {
        // Trigger auth modal instead of just showing toast
        handlePropertyLike(e);
      } else {
        toast({
          variant: "wishlist",
          duration: 5000,
          className: "p-4",
          description: (
            <div className="flex items-center gap-4 w-full">
              <img
                src="/images/Wishlist.png"
                alt="Property"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="">
                <p className="text-lg font-normal text-black">
                  Property has been added to interested list.
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
        // Close menu after showing toast
        setOpenMenu(false);
      }
    };

    return (
      <div className="absolute top-[8px] sm:top-[12px] right-[8px] sm:right-[12px] flex items-center gap-1 sm:gap-1.5 z-20">
        {/* Main Wishlist Button */}
        {variant !== "mapPopUp" && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 sm:h-8 sm:w-8 rounded-full bg-neutral-100 backdrop-blur-[2.30px]",
                "shadow-sm border-0",
                isFavorite && "text-red-500",
                showHeartLoading && "cursor-default"
              )}
              onClick={handleLikeClick}
              disabled={showHeartLoading}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              {showHeartLoading ? (
                <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
              ) : (
                <Heart
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              )}
            </Button>

            {/* ⋮ More Options button */}
            {!isMobile && (
              <Popover open={openMenu} onOpenChange={setOpenMenu}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-8 sm:w-8 rounded-full bg-zinc-100/80 backdrop-blur-[2.30px] border-[0.70px] shadow-sm"
                    aria-label="More options"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-full rounded-2xl shadow-xl p-4 space-y-2 z-[9999]"
                  align="end"
                  sideOffset={8}
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleInterestedClick}
                  >
                    <Icons.InterestedIcon />
                    <span className="text-sm font-medium">Add to interested</span>
                  </div>
                  {/* SHARE ICON */}
                  <SharePropertyDialog
                    propertyId={propertyId}
                    propertyTitle={propertyTitle}
                    trigger={
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icons.ShareArrowIcon />
                        <span className="text-sm font-medium">Share</span>
                      </div>
                    }
                  />
                </PopoverContent>
              </Popover>
            )}

            {/* Mobile bottom sheet */}
            {isMobile && (
              <Dialog open={openMenu} onOpenChange={setOpenMenu}>
                <DialogTitle className="sr-only">Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Share or like property.
                </DialogDescription>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-zinc-100/80 backdrop-blur-[2.30px] border-[0.70px] shadow-sm"
                    aria-label="More options"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="rounded-2xl w-[300px] pb-4 pt-4" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-3">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={handleInterestedClick}
                    >
                      <Icons.InterestedIcon />
                      <span className="text-sm font-medium">Add to interested</span>
                    </div>
                    {/* SHARE ICON */}
                    <SharePropertyDialog
                      propertyId={propertyId}
                      propertyTitle={propertyTitle}
                      variant="mobile"
                      trigger={
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icons.ShareArrowIcon />
                          <span className="text-sm font-medium">Share</span>
                        </div>
                      }
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}

        {/* CARD ACTION ON MAP  */}
        {variant === "mapPopUp" && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-neutral-100 backdrop-blur-[2.30px]",
                "shadow-sm border-0",
                isFavorite && "text-red-500",
                showHeartLoading && "cursor-default"
              )}
              onClick={handleLikeClick}
              disabled={showHeartLoading}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              {showHeartLoading ? (
                <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
              ) : (
                <Heart
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              )}
            </Button>

            <Popover open={openMenu} onOpenChange={setOpenMenu}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-8 sm:w-8 rounded-full bg-zinc-100/80 backdrop-blur-[2.30px] border-[0.70px] shadow-sm"
                  aria-label="More options"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-full rounded-2xl shadow-xl p-2 space-y-6 z-[9999]"
                align="end"
                sideOffset={8}
                data-property-actions="true"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInterestedClick(e);
                  }}
                >
                  <Icons.InterestedIcon />
                </div>
                {/* SHARE ICON */}
                <SharePropertyDialog
                  propertyId={propertyId}
                  propertyTitle={propertyTitle}
                  // variant="compact"
                  isOpen={isShareOpen}
                  onOpenChange={setIsShareOpen}
                  trigger={
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icons.ShareArrowIcon />
                    </div>
                  }
                />
              </PopoverContent>
            </Popover>
          </>
        )}

        {/* Phone Auth Modal */}
        <PhoneAuthModal
          open={showAuthModal}
          onOpenChange={(open) => !open && handleAuthSuccess()}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }
);

PropertyImageActions.displayName = "PropertyImageActions";
