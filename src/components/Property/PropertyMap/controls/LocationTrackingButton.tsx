import React from "react";
// import { Crosshair } from "lucide-react";

interface LocationTrackingButtonProps {
    onClick: () => void;
    isActive: boolean;
}

const Crosshair = ({ className }: { className?: string }) => {
    return (
        <svg
            width={27}
            height={27}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M22.52 12.51H21.16a8.01 8.01 0 00-7.207-7.208v-1.36a.734.734 0 10-1.468 0v1.36a8 8 0 00-7.158 7.207H3.965a.734.734 0 000 1.469h1.36a8.01 8.01 0 007.208 7.207v1.36a.735.735 0 001.468 0v-1.36a8.02 8.02 0 007.207-7.207h1.361a.734.734 0 000-1.469h-.049zm-9.302 7.235a6.502 6.502 0 116.502-6.502 6.511 6.511 0 01-6.502 6.512v-.01z"
                className="fill-current"
            />
            <path
                d="M17.654 13.254a4.445 4.445 0 11-4.436-4.445 4.436 4.436 0 014.436 4.445z"
                className="fill-current"
            />
        </svg>
    );
};
export const LocationTrackingButton: React.FC<LocationTrackingButtonProps> = ({
    onClick,
    isActive,
}) => {
    return (
        <button
            onClick={onClick}
            className={`absolute bottom-2 right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group
        ${isActive
                    ? "bg-gradient-to-r from-[#E05D31] to-[#E91614]"
                    : "bg-white hover:bg-gradient-to-r hover:from-[#E05D31] hover:to-[#E91614]"
                }
      `}
            title="Center on my location"
        >
            <Crosshair
                className={
                    isActive ? "text-white" : "text-[#ABABAB] group-hover:text-white"
                }
            />
            {/* <Crosshair className="w-6 h-6" /> */}
        </button>
    );
};
