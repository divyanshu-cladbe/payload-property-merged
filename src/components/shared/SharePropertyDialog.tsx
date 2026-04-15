"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { shareOptions, ShareOption } from "@/config/shareOptions";

interface SharePropertyDialogProps {
  propertyId: string;
  propertyTitle: string;
  trigger: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "mobile" | "compact";
}

export const SharePropertyDialog: React.FC<SharePropertyDialogProps> = ({
  propertyId,
  propertyTitle,
  trigger,
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  variant = "default",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnOpenChange || setInternalIsOpen;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const propertyUrl = `${baseUrl}/property/${propertyId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopied(true);
      toast({
        title: "Link Copied",
        description: "The link copied to your clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Failed to copy link to your clipboard!",
        variant: "destructive",
      });
    }
  };

  const handleShare = (option: ShareOption) => {
    option.action(propertyUrl, propertyTitle);
    setIsOpen(false);
  };

  // Responsive classes based on variant
  const getDialogClasses = () => {
    switch (variant) {
      case "mobile":
        return "rounded-2xl w-[calc(100%-2rem)] sm:max-w-lg p-0";
      case "compact":
        return "rounded-2xl sm:max-w-14 w-[320px] p-4";
      default:
        return "rounded-2xl max-w-2xl w-[95vw] sm:w-full p-0";
    }
  };

  const getGridClasses = () => {
    switch (variant) {
      case "mobile":
        return "grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6";
      case "compact":
        return "grid grid-cols-3 gap-3 mb-4";
      default:
        return "grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={getDialogClasses()}>
        <DialogTitle className="sr-only">Share Property</DialogTitle>
        <DialogDescription className="sr-only">
          Share this property via social media or copy the link to share with others
        </DialogDescription>
        <div className={variant === "compact" ? "p-2" : "p-4 sm:p-6"}>
          <h3
            className={cn(
              "font-bold text-center",
              variant === "compact"
                ? "text-lg mb-3"
                : "text-xl sm:text-2xl mb-4 sm:mb-6"
            )}
          >
            Share Property
          </h3>

          {/* Share Options Grid */}
          <div className={getGridClasses()}>
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleShare(option)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={cn(
                    "rounded-full flex items-center justify-center text-white transition-colors",
                    variant === "compact"
                      ? "w-12 h-12"
                      : "w-12 h-12 sm:w-14 sm:h-14"
                  )}
                >
                  {option.icon}
                </div>
                <span
                  className={cn(
                    "font-medium text-gray-700 text-center",
                    variant === "compact" ? "text-xs" : "text-xs sm:text-sm"
                  )}
                >
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          {/* Copy Link Section */}
          <div
            className={variant === "compact" ? "border-t pt-4" : "border-t pt-4 sm:pt-6"}
          >
            <label
              className={cn(
                "font-semibold text-gray-900 block",
                variant === "compact"
                  ? "text-sm mb-2"
                  : "text-sm sm:text-base mb-2 sm:mb-3"
              )}
            >
              Copy Link
            </label>
            <div
              className={cn(
                "flex gap-2",
                variant === "mobile" ? "flex-col sm:flex-row items-stretch" : "items-center"
              )}
            >
              <input
                type="text"
                readOnly
                value={propertyUrl}
                className={cn(
                  "flex-1 min-w-0 bg-gray-50 rounded-lg text-gray-600 border border-gray-200 focus:outline-none",
                  variant === "compact"
                    ? "px-3 py-2 text-sm truncate"
                    : "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm"
                )}
              />
              <Button
                size={variant === "compact" ? "sm" : "lg"}
                onClick={handleCopyLink}
                className={cn(
                  "shrink-0 transition-all",
                  variant === "mobile" && "w-full sm:w-auto",
                  variant === "compact"
                    ? "min-w-[80px] bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white"
                    : "px-4 sm:px-6",
                  // copied && "bg-green-600 hover:bg-green-700"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1 sm:mr-2" /> Copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4 mr-1 sm:mr-2" /> Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
