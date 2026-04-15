import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface UserLocationMarkerProps {
    position: { lat: number; lng: number };
    routeInfo?: {
        distance: string;
        duration: string;
    };
}

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
    position,
    routeInfo,
}) => {
    return (
        <>
            {/* User Location Marker - Red Dot */}
            <AdvancedMarker position={position} zIndex={999}>
                <div className="relative">
                    {/* Red pulsing dot */}
                    <div className="relative flex items-center justify-center">
                        {/* Pulsing ring animation */}
                        <div className="absolute w-12 h-12 bg-[#E91614] rounded-full opacity-30 animate-ping"></div>

                        {/* Outer ring */}
                        <div className="absolute w-8 h-8 bg-[#E91614] rounded-full opacity-40"></div>

                        {/* Main red dot */}
                        <div className="relative w-4 h-4 bg-[#E91614] rounded-full border border-white shadow-lg"></div>
                    </div>

                    {/* Distance and Duration Info Popup */}
                    {routeInfo && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-max flex flex-col items-center justify-center px-4 py-2 bg-white rounded-2xl shadow-lg z-50">
                            <div className="flex flex-col items-center leading-none gap-1">
                                <span className="text-sm font-bold text-gray-900">{routeInfo.duration}</span>
                                <span className="text-xs font-medium text-gray-500">{routeInfo.distance}</span>
                            </div>
                        </div>
                    )}
                </div>
            </AdvancedMarker>
        </>
    );
};
