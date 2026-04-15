import React, { useState } from "react";
import usePlacesAutocomplete, {
    getGeocode,
} from "use-places-autocomplete";
import { MapPin } from "lucide-react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";

interface AddressAutocompleteFieldProps {
    label: string;
    name: string;
    value: string;
    isEditing: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddressSelect?: (addressData: {
        address: string;
        city: string;
        state: string;
    }) => void;
    className?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    inputClassName?: string;
}

export const AddressAutocompleteField = React.memo<AddressAutocompleteFieldProps>(
    ({
        label,
        name,
        value,
        isEditing,
        onChange,
        onAddressSelect,
        className = "",
        placeholder,
        required = false,
        error,
        inputClassName = "",
    }) => {
        const [showSuggestions, setShowSuggestions] = useState(false);

        const {
            ready,
            suggestions: { status, data },
            setValue,
            clearSuggestions,
        } = usePlacesAutocomplete({
            requestOptions: {
                componentRestrictions: { country: "IN" },
                types: ["address"],
            },
            debounce: 300,
        });

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            setValue(inputValue);
            onChange(e);
            setShowSuggestions(true);
        };

        const handleSuggestionClick = async (suggestion: any) => {
            try {
                // Get detailed address components
                const results = await getGeocode({ placeId: suggestion.place_id });
                const addressComponents = results[0].address_components;

                let streetAddress = "";
                let city = "";
                let state = "";
                let streetNumber = "";
                let route = "";
                let sublocality = "";

                // Extract address components
                addressComponents.forEach((component: any) => {
                    if (component.types.includes("street_number")) {
                        streetNumber = component.long_name;
                    } else if (component.types.includes("route")) {
                        route = component.long_name;
                    } else if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
                        sublocality = component.long_name;
                    } else if (component.types.includes("locality")) {
                        city = component.long_name;
                    } else if (component.types.includes("administrative_area_level_1")) {
                        state = component.long_name;
                    }
                });

                // Build street address without city and state
                const addressParts = [];
                if (streetNumber) addressParts.push(streetNumber);
                if (route) addressParts.push(route);
                if (sublocality) addressParts.push(sublocality);

                streetAddress = addressParts.join(", ");

                // Create a synthetic event to update the address field
                const syntheticEvent = {
                    target: {
                        name: name,
                        value: streetAddress,
                    },
                } as React.ChangeEvent<HTMLInputElement>;

                setValue(streetAddress, false);
                onChange(syntheticEvent);
                setShowSuggestions(false);
                clearSuggestions();

                // Call the callback with extracted data
                if (onAddressSelect) {
                    onAddressSelect({
                        address: streetAddress,
                        city: city,
                        state: state,
                    });
                }
            } catch (error) {
                console.error("Error getting place details:", error);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Escape") {
                setShowSuggestions(false);
            }
        };

        return (
            <div className={`pl-2 col-span-2 md:col-span-1 flex flex-col ${className}`}>
                {label && (
                    <label className="text-sm text-gray-500 mb-2 font-medium">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="w-full min-h-[40px] flex items-center relative">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name={name}
                                value={value}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={(e) => {
                                    setShowSuggestions(true);
                                    e.currentTarget.style.borderColor = error
                                        ? PROPERTY_COLORS.error
                                        : PROPERTY_COLORS.primary;
                                    e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? PROPERTY_COLORS.error : PROPERTY_COLORS.primary}20`;
                                }}
                                placeholder={placeholder}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors ${inputClassName}`}
                                style={{
                                    borderColor: error ? PROPERTY_COLORS.error : "#D1D5DB",
                                }}
                                onBlur={(e) => {
                                    // Delay hiding suggestions to allow click
                                    setTimeout(() => setShowSuggestions(false), 200);
                                    e.currentTarget.style.borderColor = error
                                        ? PROPERTY_COLORS.error
                                        : "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                required={required}
                            />

                            {ready && showSuggestions && status === "OK" && data.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                                    {data.slice(0, 5).map((suggestion) => (
                                        <button
                                            key={suggestion.place_id}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            type="button"
                                            className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors focus:bg-gray-100 focus:outline-none"
                                        >
                                            <div className="flex items-start gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm text-gray-800 truncate">
                                                        {suggestion.structured_formatting?.main_text ||
                                                            suggestion.description}
                                                    </div>
                                                    {suggestion.structured_formatting?.secondary_text && (
                                                        <div className="text-xs text-gray-500 mt-0.5 truncate">
                                                            {suggestion.structured_formatting.secondary_text}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div
                            className="w-full px-3 py-2 rounded-md"
                            style={{
                                backgroundColor: "transparent",
                                color: "#374151"
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

AddressAutocompleteField.displayName = "AddressAutocompleteField";
