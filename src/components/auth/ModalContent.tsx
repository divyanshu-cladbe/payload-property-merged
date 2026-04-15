"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/Form/FormField";
import { FormSelect } from "@/components/Form/FormSelect";
import { Check } from "lucide-react";
import { ProfileFormData } from "@/hooks/useProfileForm";

const benefits = [
    "Optimized Communication and Agent Match",
    "Pre-approved for loan Properties",
    "Faster Identification of the Ideal Property",
    "Accurate Affordability Analysis",
    "Preparation for a Smoother Buying Process",
];
const BudgetRanges = [
    { label: "Below 50L", value: "Below 50L" },
    { label: "50L - 1Cr", value: "50L - 1Cr" },
    { label: "1Cr - 2Cr", value: "1Cr - 2Cr" },
    { label: "2Cr - 5Cr", value: "2Cr - 5Cr" },
    { label: "Above 5Cr", value: "Above 5Cr" },
]
const InterestedPropertyTypes = [
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
    { label: "Plots", value: "Plots" },
    { label: "Villa", value: "Villa" },
]

// Extract Content component to prevent re-creation on every render
interface ContentProps {
    formData: ProfileFormData;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSuccess?: () => void;
    onSubmit?: () => Promise<void>;
    isSaving?: boolean;
    setIsOpen: (open: boolean) => void;
    isValid?: boolean;
}

export const ModalContent = React.memo<ContentProps>(({ formData, onInputChange, onSuccess, onSubmit, isSaving, setIsOpen, isValid }) => (
    <div className="flex flex-col sm:flex-row h-full">
        {/* Left Panel - Benefits */}
        <div className="hidden sm:flex w-2/5 p-8 flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background texture/image overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/requirement-Image.png"
                    alt="Background"
                    fill
                    className="object-cover mix-blend-overlay"
                    priority
                />
            </div>

            <div className="relative z-10 space-y-8 mt-20 items-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 ">
                        <div className="bg-white rounded-full p-1 mt-0.5 shrink-0">
                            <Check className="w-3 h-3 text-[#D63A3A] stroke-[4]" />
                        </div>
                        <span className="text-sm font-medium leading-tight">{benefit}</span>
                    </div>
                ))}
            </div>

            {/* Decorative circle/image at bottom left if needed */}
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-6 sm:p-10 bg-white flex flex-col h-full overflow-y-auto relative">
            {/* Top Right Corner Logo */}
            <div className="absolute -top-3 right-0  hidden sm:flex items-end justify-start z-10 ">
                <Image
                    src="/images/LoginModalLogo.png"
                    alt="Property.new"
                    width={100}
                    height={40}
                    className="object-contain w-36 h-36"
                />
            </div>

            <div className="flex justify-between items-start mb-6 mt-4 relative z-20">
                <div>
                    <h2 className="text-3xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                        Help us find your dream<br />property!
                    </h2>
                    <p className="text-gray-400 text-sm">Fill in your requirements</p>
                </div>
            </div>

            <div className="space-y-6 flex-1" onClick={(e) => e.stopPropagation()}>
                <FormField
                    label=""
                    name="name"
                    value={formData.name}
                    isEditing={true}
                    onChange={onInputChange}
                    placeholder="Name"
                    type="text"
                    inputClassName="rounded-[60px] px-6 h-12 bg-gray-50 border-gray-100 focus:bg-white"
                />

                <FormField
                    label=""
                    name="email"
                    type="email"
                    value={formData.email}
                    isEditing={true}
                    onChange={onInputChange}
                    placeholder="Email"
                    inputClassName="rounded-[60px] px-6 h-12 bg-gray-50 border-gray-100 focus:bg-white"
                />

                <FormSelect
                    label=""
                    name="budgetRange"
                    value={formData.budgetRange}
                    isEditing={true}
                    onChange={onInputChange}
                    options={BudgetRanges}
                    placeholder="Set Budget Range"
                    selectClassName="rounded-[60px] px-6 h-12 bg-gray-50 border-gray-100 focus:bg-white text-gray-500"
                />

                <div className="flex flex-col gap-2 col-span-2 pl-2">
                    <label className="text-sm text-gray-500 font-medium">
                        Interested Property Type
                        {/* <span className="text-red-500 ml-1">*</span> */}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {InterestedPropertyTypes.map((type) => {
                            // Check if the type is selected in the array (handle both string and array)
                            const interestedInArray = Array.isArray(formData.interestedIn)
                                ? formData.interestedIn
                                : (formData.interestedIn ? [formData.interestedIn] : []);
                            const isSelected = interestedInArray.includes(type.value);

                            return (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default button behavior
                                        e.stopPropagation();

                                        // Toggle selection in array
                                        let newSelections: string[];
                                        if (isSelected) {
                                            newSelections = interestedInArray.filter(t => t !== type.value);
                                        } else {
                                            newSelections = [...interestedInArray, type.value];
                                        }

                                        // Create a synthetic event compatible with common handlers
                                        const event = {
                                            target: {
                                                name: "interestedIn",
                                                value: newSelections,
                                                type: "text",
                                            },
                                            currentTarget: {
                                                name: "interestedIn",
                                                value: newSelections,
                                                type: "text",
                                            }
                                        } as unknown as React.ChangeEvent<HTMLInputElement>;

                                        onInputChange(event);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                                        ? "bg-red-50 border-[#E93A3A] text-[#E93A3A] shadow-sm"
                                        : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:border-gray-200"
                                        }`}
                                >
                                    {type.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Button
                    type="button"
                    className={`w-full h-12 rounded-lg text-white font-semibold text-lg mt-4 ${!isValid ? "bg-gray-300 cursor-not-allowed" : "bg-[#E93A3A] hover:opacity/90"
                        }`}
                    disabled={isSaving || !isValid}
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (!isValid) return;
                        try {
                            if (onSubmit) {
                                await onSubmit();
                            }
                            onSuccess?.();
                            setIsOpen(false);
                        } catch (error) {
                            console.error("Failed to submit:", error);
                            // Error is already handled by the parent
                        }
                    }}
                >
                    {isSaving ? "Saving..." : "Submit"}
                </Button>
            </div>
        </div>
    </div>
));

ModalContent.displayName = "ModalContent";