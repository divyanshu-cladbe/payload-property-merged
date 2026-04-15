import { AreaOfInterest, Coordinates, Location, Property, PropertyFilters } from "@/types/property";
import { BoundType } from "../PropertyMap/types";
import { MapBound } from "@/hooks/useMapBounds";
import { MobileMapView } from "./MobileMapView";
import { useState } from "react";
import { MobileListView } from "./MobileListView";
import { MobileViewFilters } from "./MobileViewFilters";
import { usePropertiesPage } from "@/contexts/PropertiesPageContext";

type MobileProps = {
    mapApi?: string;
    currentBound: { INDIA_BOUNDS: BoundType, INDIA_CENTER: Coordinates };
    mapBasedFilteredProperty: Property[];
    setMapBounds: React.Dispatch<React.SetStateAction<MapBound>>;
}

export enum MobileViewState {
    ListView,
    FiltersView,
    MapView
}

export const MobilePropertyView = ({
    mapApi,
    currentBound,
    mapBasedFilteredProperty,
    setMapBounds,
}: MobileProps) => {
    // Get all data from context
    const {
        selectedProperty,
        areasOfInterest,
        properties,
        currentLocation,
        filters,
        handleFilterChange,
        handlePropertyDeselect,
        handlePropertySelect,
        clearAllFilters,
        searchQuery,
        handleSearchQueryChange,
        handleSearch,
    } = usePropertiesPage();

    const [currentOptions, setCurrentOptions] = useState<MobileViewState>(MobileViewState.MapView);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

    return (
        <div className="relative w-full h-full">
            {/* {currentOptions === MobileViewState.MapView && */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    visibility: currentOptions === MobileViewState.MapView ? 'visible' : 'hidden',
                    zIndex: 0
                }}
            >
                <MobileMapView
                    mapApi={mapApi}
                    currentBound={currentBound}
                    properties={properties}
                    areasOfInterest={areasOfInterest}
                    selectedProperty={selectedProperty}
                    mapBasedFilteredProperty={mapBasedFilteredProperty}
                    onPropertyClick={handlePropertySelect}
                    handlePropertyDeselect={handlePropertyDeselect}
                    setMapBounds={setMapBounds}
                    setCurrentOptions={setCurrentOptions}
                    searchQuery={searchQuery}
                    onSearchQueryChange={handleSearchQueryChange}
                    onSearch={handleSearch}
                    hoveredPropertyId={hoveredPropertyId}
                    onPropertyHover={setHoveredPropertyId}
                />
            </div>
            {/* } */}
            {currentOptions === MobileViewState.ListView &&
                <div className="relative z-10 w-full h-full bg-gray-50">
                    <MobileListView
                        properties={properties}
                        currentLocation={currentLocation}
                        selectedProperty={selectedProperty}
                        setCurrentOptions={setCurrentOptions}
                        onPropertyClick={handlePropertySelect}
                        onPropertyHover={setHoveredPropertyId}
                        searchQuery={searchQuery}
                        handleSearchQueryChange={handleSearchQueryChange}
                        handleSearch={handleSearch}
                    />
                </div>
            }
            {currentOptions === MobileViewState.FiltersView &&
                <div className="relative z-10 w-full h-full bg-white">
                    <MobileViewFilters filters={filters} handleFilterChange={handleFilterChange} setCurrentOptions={setCurrentOptions} clearAllFilters={clearAllFilters} />
                </div>
            }
        </div>
    )
}