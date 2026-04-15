import { cn } from "@/lib/utils";
import PropertyCard from "../PropertyCard/PropertyCard";
import { MobileListViewHeader } from "./MobileListViewHeader"
import { Location, Property } from "@/types/property";
import { MobileViewState } from "./MobilePropertyView";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Map, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterIcon from "../icons/FilterIcon";

type MobileListViewProps = {
    currentLocation: Location | null;
    properties: Property[];
    selectedProperty: Property | null;
    setCurrentOptions: React.Dispatch<React.SetStateAction<MobileViewState>>;
    onPropertyClick: (property: Property | null) => void;
    onPropertyHover?: (propertyId: string | null) => void;
    searchQuery?: string;
    handleSearchQueryChange?: (value: string) => void;
    handleSearch?: (e: React.FormEvent) => void;
}

export const MobileListView = ({ currentLocation, properties, selectedProperty, setCurrentOptions, onPropertyClick, onPropertyHover, searchQuery, handleSearchQueryChange, handleSearch }: MobileListViewProps) => {
    const router = useRouter();
    const selectedPropertyId = selectedProperty?.id;

    const redirectToPropertyPage = useCallback((id: string) => {
        router.push(`/property/${id}`);
    }, [router]);

    return (
        <>
            <MobileListViewHeader
                propertiesNumber={properties.length}
                currentLocation={currentLocation}
                setCurrentOptions={setCurrentOptions}
                searchQuery={searchQuery}
                handleSearchQueryChange={handleSearchQueryChange}
                handleSearch={handleSearch}
            />
            <div className="h-full w-full overflow-y-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start p-4 md:p-6">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className={cn(
                                "w-full cursor-pointer",
                                "transition-colors duration-200"
                            )}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                                outline: "none",
                                margin: "0",
                            }}
                            onClick={(e) => {
                                // Only handle click if it's not from the "Go to project" button
                                const target = e.target as HTMLElement;
                                const isButtonClick = target.closest('button');
                                if (!isButtonClick) {
                                    onPropertyClick(property);
                                }
                            }}
                            onMouseEnter={() => onPropertyHover?.(property.id)}
                            onMouseLeave={() => onPropertyHover?.(null)}
                        >
                            <PropertyCard
                                {...property}
                                variant='mobileList'
                                redirectToPropertyPage={redirectToPropertyPage}
                                showViewFullDetailsButton={selectedPropertyId === property.id}
                                nearbyProperties={property.nearbyLocations}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg pb-safe-bottom">
                <div className="flex w-full">
                    <Button
                        onClick={() => setCurrentOptions(MobileViewState.MapView)}
                        variant="ghost"
                        className="flex-1 h-14 rounded-none border-r border-gray-200 text-[#E05D31] hover:bg-orange-50 hover:text-white"
                    >
                        <Map className="h-5 w-5 mr-2" />
                        <span className="font-medium">Map View</span>
                    </Button>
                    <Button
                        onClick={() => setCurrentOptions(MobileViewState.FiltersView)}
                        variant="ghost"
                        className="flex-1 h-14 rounded-none bg-gradient-to-r from-[#E91614] to-[#E05D31] text-white hover:opacity-90 hover:text-white"
                    >
                        {/* <Filter className="h-5 w-5 mr-2" /> */}
                        <FilterIcon />
                        <span className="font-medium">Filter By</span>
                    </Button>
                </div>
            </div>
        </>
    )
}