"use client";

import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ProfileFormData } from "@/hooks/useProfileForm";
import { ModalContent } from "./ModalContent";

interface RequirementModalProps {
    formData: ProfileFormData;
    open?: boolean;
    isSaving?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSuccess?: () => void;
    onSubmit?: () => Promise<void>;
    children?: React.ReactNode;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}



export default function RequirementModal({
    open: externalOpen,
    formData,
    onOpenChange: externalOnOpenChange,
    onSuccess,
    onSubmit,
    children,
    isSaving = false,
    onInputChange,
}: RequirementModalProps) {

    const [internalOpen, setInternalOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 640px)");

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
    const setIsOpen = externalOnOpenChange || setInternalOpen;

    // Validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid =
        formData.name?.trim() !== "" &&
        formData.email?.trim() !== "" &&
        emailRegex.test(formData.email || "") &&
        formData.budgetRange?.trim() !== "" &&
        formData.interestedIn && formData.interestedIn.length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onInputChange(e);
    };

    return (
        <>
            {children && (
                <div onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}>
                    {children}
                </div>
            )}
            {isMobile ? (
                <Sheet
                    open={isOpen}
                    onOpenChange={(open) => {
                        if (!open) return;
                        setIsOpen(open);
                    }}
                >
                    <SheetContent
                        side="bottom"
                        className="h-[85vh] p-0 rounded-t-[20px] overflow-hidden"
                        onInteractOutside={(e) => e.preventDefault()}
                        onEscapeKeyDown={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                        hideCloseButton
                    >
                        <div className="h-1.5 w-16 rounded-full bg-gray-300 mx-auto my-3 absolute left-0 right-0 top-0 z-10" />
                        <ModalContent
                            formData={formData}
                            onInputChange={handleInputChange}
                            onSuccess={onSuccess}
                            onSubmit={onSubmit}
                            isSaving={isSaving}
                            setIsOpen={setIsOpen}
                            isValid={isValid}
                        />
                    </SheetContent>
                </Sheet>
            ) : (
                <Dialog
                    open={isOpen}
                    onOpenChange={(open) => {
                        if (!open) return;
                        setIsOpen(open);
                    }}
                >
                    <DialogContent
                        className="max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-2xl sm:rounded-3xl"
                        onInteractOutside={(e) => e.preventDefault()}
                        onEscapeKeyDown={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                        hideCloseButton
                    >
                        <DialogTitle className="sr-only">Requirement Collection</DialogTitle>
                        <DialogDescription className="sr-only">
                            Enter your details and requirements to find your dream property.
                        </DialogDescription>
                        <div
                            className="bg-white sm:rounded-3xl overflow-hidden h-[600px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalContent
                                formData={formData}
                                onInputChange={handleInputChange}
                                onSuccess={onSuccess}
                                onSubmit={onSubmit}
                                isSaving={isSaving}
                                setIsOpen={setIsOpen}
                                isValid={isValid}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
