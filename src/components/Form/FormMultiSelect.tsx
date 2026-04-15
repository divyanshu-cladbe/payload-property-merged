import React from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { X } from "lucide-react";

interface FormMultiSelectProps {
    label: string;
    name: string;
    value: string[];
    options: { label: string; value: string }[];
    isEditing: boolean;
    onChange: (name: string, value: string[]) => void;
    className?: string;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    placeholder?: string;
}

export const FormMultiSelect = React.memo<FormMultiSelectProps>(
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
        placeholder = "Select options",
    }) => {
        const handleToggle = (optionValue: string) => {
            const newValue = value.includes(optionValue)
                ? value.filter((v) => v !== optionValue)
                : [...value, optionValue];
            onChange(name, newValue);
        };

        const handleRemove = (optionValue: string) => {
            onChange(name, value.filter((v) => v !== optionValue));
        };

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
                        <div className="w-full">
                            {/* Selected items display */}
                            {value.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {value.map((selectedValue) => {
                                        const option = options.find((opt) => opt.value === selectedValue);
                                        return (
                                            <div
                                                key={selectedValue}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                                                style={{
                                                    backgroundColor: `${PROPERTY_COLORS.primary}15`,
                                                    color: PROPERTY_COLORS.primary,
                                                }}
                                            >
                                                <span>{option?.label || selectedValue}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(selectedValue)}
                                                    className="hover:opacity-70 transition-opacity"
                                                    aria-label={`Remove ${option?.label || selectedValue}`}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Options checkboxes */}
                            <div className="space-y-2 border border-gray-300 rounded-md p-3">
                                {options.map((option) => {
                                    const isSelected = value.includes(option.value);
                                    return (
                                        <label
                                            key={option.value}
                                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggle(option.value)}
                                                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                style={{
                                                    accentColor: PROPERTY_COLORS.primary,
                                                }}
                                            />
                                            <span className="text-sm text-gray-700">
                                                {option.label}
                                            </span>
                                        </label>
                                    );
                                })}
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
                            {value.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {value.map((selectedValue) => {
                                        const option = options.find((opt) => opt.value === selectedValue);
                                        return (
                                            <span
                                                key={selectedValue}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-sm"
                                                style={{
                                                    backgroundColor: `${PROPERTY_COLORS.primary}15`,
                                                    color: PROPERTY_COLORS.primary,
                                                }}
                                            >
                                                {option?.label || selectedValue}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : (
                                <span className="text-gray-400">Not provided</span>
                            )}
                        </div>
                    )}
                </div>
                {error && (
                    <span
                        className="text-xs mt-1"
                        style={{ color: PROPERTY_COLORS.error }}
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

FormMultiSelect.displayName = "FormMultiSelect";
