import { useState, useCallback } from 'react';

export interface UserLocationState {
    userLocation: { lat: number; lng: number } | null;
    calculateFromLocation: boolean;
}

export const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [calculateFromLocation, setCalculateFromLocation] = useState(false);

    const handleUserLocationUpdate = useCallback((enabled: boolean, location: { lat: number; lng: number } | null) => {
        setCalculateFromLocation(enabled);
        setUserLocation(location);
    }, []);

    return {
        userLocation,
        calculateFromLocation,
        handleUserLocationUpdate,
    };
};
