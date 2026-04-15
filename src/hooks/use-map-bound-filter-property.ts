import { useState, useEffect, useRef } from 'react';
import RBush from 'rbush';
import { Coordinates, Property } from '@/types/property';

interface MapBound {
    ne: Coordinates;
    sw: Coordinates;
}

interface RBushType {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    property: Property;
}

export function useMapBoundFilterProperty(properties: Property[]) {
    const [mapBounds, setMapBounds] = useState<MapBound | null>(null);
    const [mapBasedFilteredProperty, setMapBasedFilteredProperty] = useState<Property[]>([]);
    const RBushRef = useRef(new RBush<RBushType>());

    // Build the spatial index when properties change
    useEffect(() => {
        RBushRef.current.clear();

        if (!properties || properties.length === 0) return;

        properties.forEach((property) => {
            if (property.location?.coordinates) {
                const { lat, lng } = property.location.coordinates;
                RBushRef.current.insert({
                    minX: lng,
                    minY: lat,
                    maxX: lng,
                    maxY: lat,
                    property: property
                });
            }
        });
    }, [properties]);

    // Filter properties based on map bounds with debouncing
    useEffect(() => {
        if (!mapBounds) {
            setMapBasedFilteredProperty([]);
            return;
        }

        // Debounce the filtering to prevent excessive computations
        const timeoutId = setTimeout(() => {
            const { ne, sw } = mapBounds;

            const searchBox = {
                minX: Math.min(sw.lng, ne.lng),
                minY: Math.min(sw.lat, ne.lat),
                maxX: Math.max(sw.lng, ne.lng),
                maxY: Math.max(sw.lat, ne.lat)
            };

            const results = RBushRef.current.search(searchBox);
            const filteredProperties = results.map((item) => item.property);

            // Only update if the result is different to prevent unnecessary re-renders
            setMapBasedFilteredProperty(prev => {
                if (prev.length === filteredProperties.length &&
                    prev.every((prop, index) => prop.id === filteredProperties[index]?.id)) {
                    return prev;
                }
                return filteredProperties;
            });
        }, 200); // Debounce by 200ms

        return () => clearTimeout(timeoutId);
    }, [mapBounds]);

    return {
        mapBasedFilteredProperty,
        setMapBounds
    };
}