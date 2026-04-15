import React from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { ChevronDown } from "lucide-react";

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    options: { label: string; value: string }[];
    isEditing: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    placeholder?: string;
    selectClassName?: string;
}

export const FormSelect = React.memo<FormSelectProps>(
    ({
        label,
        name,
        value,
        options,
        isEditing,
        onChange,
        className = "",
        readonly = false,
        required = false,
        error,
        placeholder = "Select an option",
        selectClassName = "",
    }) => {
        return (
            <div
                className={`pl-2 col-span-2 md:col-span-1 flex flex-col ${className}`}
            >
                {label && (
                    <label className="text-sm text-gray-500 mb-2 font-medium">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="w-full min-h-[40px] flex items-center relative">
                    {isEditing && !readonly ? (
                        <div className="relative w-full">
                            <select
                                name={name}
                                value={value}
                                onChange={onChange}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors appearance-none bg-white ${selectClassName}`}
                                style={{
                                    borderColor: error ? PROPERTY_COLORS.error : "#D1D5DB",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = error
                                        ? PROPERTY_COLORS.error
                                        : PROPERTY_COLORS.primary;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? PROPERTY_COLORS.error : PROPERTY_COLORS.primary
                                        }20`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = error
                                        ? PROPERTY_COLORS.error
                                        : "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                required={required}
                            >
                                <option value="" disabled>
                                    {placeholder}
                                </option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="w-full px-3 py-2 rounded-md"
                            style={{
                                backgroundColor: isEditing ? "#F9FAFB" : "transparent",
                                color: readonly ? "#6B7280" : "#374151",
                            }}
                        >
                            {options.find((opt) => opt.value === value)?.label || value || (
                                <span className="text-gray-400">Not provided</span>
                            )}
                        </div>
                    )}
                </div>
                {
                    error && (
                        <span
                            className="text-xs mt-1"
                            style={{ color: PROPERTY_COLORS.error }}
                        >
                            {error}
                        </span>
                    )
                }
            </div >
        );
    }
);

FormSelect.displayName = "FormSelect";
