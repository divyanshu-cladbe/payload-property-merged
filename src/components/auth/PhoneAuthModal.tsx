"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOtpAuth } from "@/hooks/useOtpAuth";
import { useAuth } from "@/lib/auth";
import { useProfileForm, ProfileFormData } from "@/hooks/useProfileForm";
import AuthContent from "./AuthContent";
import RequirementModal from "./RequirementModal";

interface PhoneAuthModalProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  checkPersistence?: boolean;
}

export default function PhoneAuthModal({
  children,
  onSuccess,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  checkPersistence = false,
}: PhoneAuthModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { user, updateProfile } = useAuth();

  // Track previous user to detect login
  const prevUserRef = useRef(user);
  const hasOpenedRequirementModalRef = useRef(false);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = externalOnOpenChange || setInternalOpen;

  // Callback for when OTP verification succeeds
  const handleVerifySuccess = (userData: typeof user) => {
    if (userData) {
      // Check if user is new (no name or email)
      const isNew = !userData.name || !userData.email;

      // Close auth modal first
      setIsOpen(false);

      if (isNew) {
        setJustLoggedIn(true);

        // Update form data with the new user's phone number
        updateInitialData({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          interestedIn: Array.isArray(userData.interestedIn) ? userData.interestedIn : (userData.interestedIn ? [userData.interestedIn] : []),
          budgetRange: userData.budgetRange || "",
        });

        // Show requirement modal after a delay
        setTimeout(() => {
          setShowRequirementModal(true);
        }, 300);
      } else {
        // Existing user - proceed normally
        setTimeout(() => {
          onSuccess?.();
        }, 100);
      }
    }
  };

  const otpAuth = useOtpAuth({ onVerifySuccess: handleVerifySuccess });

  // Profile form for requirement modal
  const {
    formData,
    isSaving,
    handleInputChange,
    handleSave,
    updateInitialData,
    updateField,
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
    onSave: async (data) => {
      await updateProfile(data);
    },
  });

  // Wrapper to handle both string and array values
  const handleInputChangeWrapper = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Check if value is an array (from synthetic events)
    if (Array.isArray(value)) {
      updateField(name as keyof ProfileFormData, value);
    } else {
      handleInputChange(e);
    }
  }, [handleInputChange, updateField]);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      // console.log("📝 Updating form data for user:", user);
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

  // Reset auth state when modal closes
  useEffect(() => {
    if (!isOpen) {
      otpAuth.resetAuth();
    }
  }, [isOpen]);

  // Check for incomplete profile on mount (persistence)
  useEffect(() => {
    if (!checkPersistence) return;

    if (
      user &&
      (!user.name || !user.email || !user.interestedIn || user.interestedIn.length === 0 || !user.budgetRange) &&
      !hasOpenedRequirementModalRef.current
    ) {
      // console.log(
      //   "🔄 Persistence: Found incomplete profile or requirements, opening RequirementModal"
      // );
      hasOpenedRequirementModalRef.current = true;
      setJustLoggedIn(true);
      setShowRequirementModal(true);

      // Ensure form data is synced
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

  }, [user]);

  // Handle successful verification
  const handleVerify = async () => {
    try {
      const userData = await otpAuth.handleVerify();

      if (userData) {
        // Check if user is new (no name or email)
        const isNew = !userData.name || !userData.email;

        // Close auth modal first
        setIsOpen(false);

        if (isNew) {
          setJustLoggedIn(true);

          // Update form data with the new user's phone number
          updateInitialData({
            name: userData.name || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            interestedIn: Array.isArray(userData.interestedIn) ? userData.interestedIn : (userData.interestedIn ? [userData.interestedIn] : []),
            budgetRange: userData.budgetRange || "",
          });

          // Show requirement modal after a delay
          setTimeout(() => {
            setShowRequirementModal(true);
          }, 300);
        } else {
          // Existing user - proceed normally
          setTimeout(() => {
            onSuccess?.();
          }, 100);
        }
      }
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRequirementSuccess = () => {
    setShowRequirementModal(false);
    setJustLoggedIn(false);
    sessionStorage.removeItem("requirementModalOpen");
    onSuccess?.();
  };

  const authContentProps = {
    ...otpAuth,
    handleVerify,
    onClose: handleClose,
  };

  return (
    <>
      {children && <div onClick={() => setIsOpen(true)}>{children}</div>}

      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-[20px]">
            <DialogTitle className="sr-only">Phone Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Enter your phone number to receive a verification code
            </DialogDescription>
            <div className="h-1.5 w-16 rounded-full bg-gray-300 mx-auto my-2" />
            <div className="h-full overflow-auto px-4">
              <AuthContent {...authContentProps} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-2xl p-0 overflow-auto max-h-[90vh] ">
            <DialogTitle className="sr-only">Phone Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Enter your phone number to receive a verification code
            </DialogDescription>
            <AuthContent {...authContentProps} />
          </DialogContent>
        </Dialog>
      )}

      {/* Requirement Modal for new users */}
      <RequirementModal
        open={showRequirementModal}
        formData={formData}
        isSaving={isSaving}
        onOpenChange={setShowRequirementModal}
        onSuccess={handleRequirementSuccess}
        onSubmit={handleSave}
        onInputChange={handleInputChangeWrapper}
      />
    </>
  );
}
