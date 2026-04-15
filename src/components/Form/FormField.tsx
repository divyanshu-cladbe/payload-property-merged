import React from "react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  readonly?: boolean;
  placeholder?: string;
  required?: boolean;
  error?: string;
  inputClassName?: string;
}

export const FormField = React.memo<FormFieldProps>(
  ({
    label,
    name,
    value,
    isEditing,
    onChange,
    type = "text",
    className = "",
    readonly = false,
    placeholder,
    required = false,
    error,
    inputClassName = "",
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
        <div className="w-full min-h-[40px] flex items-center">
          {isEditing && !readonly ? (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${inputClassName}`}
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
            />
          ) : (
            <div
              className="w-full px-3 py-2 rounded-md"
              style={{
                backgroundColor: isEditing ? "#F9FAFB" : "transparent",
                color: readonly ? "#6B7280" : "#374151"
              }}
            >
              {value || <span className="text-gray-400">Not provided</span>}
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

FormField.displayName = "FormField";
