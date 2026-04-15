import { cn } from "@/lib/utils"

export const MapError = () => {
    return (
        <div
            className={cn(
                "relative h-full w-full flex items-center justify-center",
            )}
        >
            <div className="text-center">
                <h3 className="text-lg font-semibold text-red-600">
                    Map Unavailable
                </h3>
                <p className="text-sm text-gray-600">
                    Google Maps API key is not configured
                </p>
            </div>
        </div>
    )
}