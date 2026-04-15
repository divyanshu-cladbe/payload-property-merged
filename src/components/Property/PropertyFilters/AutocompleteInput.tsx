import { useEffect, useState, useRef } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { MapPin } from "lucide-react";
import { Location } from "@/store/slices/locationSlice";

interface AutocompleteInputProps {
    index: number;
    value: string;
    onChange: (value: string) => void;
    onPlaceSelect: (place: any) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    isGeocoding?: boolean;
    currentLocation?: Location | null;
    disabled?: boolean;
    autoFocus?: boolean;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
    value,
    onChange,
    onPlaceSelect,
    onKeyPress,
    placeholder,
    isGeocoding = false,
    currentLocation,
    disabled = false,
    autoFocus = false,
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus effect
    useEffect(() => {
        if (autoFocus && inputRef.current && !disabled) {
            // Small timeout to ensure the dialog/component is fully mounted and transition is done
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [autoFocus, disabled]);

    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "IN" },
            types: ["establishment", "geocode"],
            ...(currentLocation &&
                typeof google !== "undefined" && {
                location: new google.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
                ),
                radius: currentLocation.boundaryRadius || 15000,
            })
        },
        debounce: 300,
    });

    const handleInputChange = (inputValue: string) => {
        setValue(inputValue);
        onChange(inputValue);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = async (suggestion: any) => {
        try {
            const selectedText =
                suggestion.structured_formatting?.main_text || suggestion.description;
            setValue(selectedText, false);
            onChange(selectedText);
            setShowSuggestions(false);
            clearSuggestions();

            const results = await getGeocode({ placeId: suggestion.place_id });
            const { lat, lng } = getLatLng(results[0]);

            const placeData = {
                name: selectedText,
                coordinates: { lat, lng },
                address: suggestion.description,
                placeId: suggestion.place_id,
            };

            onPlaceSelect(placeData);
        } catch (error) {
            console.error("Error getting place details:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowSuggestions(false);
            onKeyPress(e);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        // Prevent any default behavior that might steal focus
        e.stopPropagation();
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLInputElement>) => {
        // Additional handler for pointer events
        e.stopPropagation();
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // Ensure input is focused
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleFocus = () => {
        setShowSuggestions(true);

        // Scroll input into view when focused (especially important on mobile when keyboard appears)
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }, 100); // Small delay to allow keyboard to start appearing
    };

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                onPointerDown={handlePointerDown}
                onClick={handleClick}
                placeholder={placeholder}
                className="w-full text-sm text-gray-600 bg-transparent focus:outline-none"
                disabled={isGeocoding || disabled}
                tabIndex={disabled ? -1 : 0}
            />

            {ready && showSuggestions && status === "OK" && data.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-[100] no-scrollbar">
                    {data.slice(0, 5).map((suggestion) => (
                        <button
                            key={suggestion.place_id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors focus:bg-gray-100 focus:outline-none"
                        >
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-800 truncate">
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
            {showSuggestions && (
                <div
                    className="fixed inset-0 z-[90]"
                    onClick={() => setShowSuggestions(false)}
                />
            )}
        </div>
    );
};