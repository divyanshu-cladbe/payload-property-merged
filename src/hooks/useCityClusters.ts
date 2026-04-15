import { useState, useCallback } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAllProperties } from '@/store/slices/propertySlice';

interface CityCluster {
  city: string;
  state: string;
  propertyCount: number;
  avgPrice: string;
  priceRange: {
    min: number;
    max: number;
  };
  coordinates: {
    coordinates: [number, number]; // [lng, lat]
  } | null;
}

/**
 * useCityClusters
 *
 * Previously fetched city clusters from a backend endpoint (/properties/clusters).
 * Now builds clusters client-side from the properties already loaded in Redux state.
 * Each property's location.coordinates gives us the lat/lng we need.
 */
export const useCityClusters = () => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Read all properties from Redux (populated by getPropertiesAction)
  const allProperties = useAppSelector(selectAllProperties);

  // Build clusters by grouping properties by city
  const buildClusters = useCallback((): CityCluster[] => {
    const cityMap = new Map<string, {
      city: string;
      state: string;
      prices: number[];
      lat: number;
      lng: number;
    }>();

    for (const prop of allProperties as any[]) {
      const lat = prop.location?.coordinates?.lat;
      const lng = prop.location?.coordinates?.lng;
      const city = prop.location?.city || prop.city;
      const state = prop.location?.state || prop.state;

      if (!city || lat == null || lng == null) continue;

      const key = city.toLowerCase();
      if (!cityMap.has(key)) {
        cityMap.set(key, { city, state: state || '', prices: [], lat, lng });
      }

      const entry = cityMap.get(key)!;
      // Update lat/lng to the first property's coordinates (representative point)
      const price = prop.price || prop.minPrice;
      if (price) entry.prices.push(Number(price));
    }

    return Array.from(cityMap.values()).map(entry => {
      const prices = entry.prices;
      const min = prices.length ? Math.min(...prices) : 0;
      const max = prices.length ? Math.max(...prices) : 0;
      const avg = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

      return {
        city: entry.city,
        state: entry.state,
        propertyCount: allProperties.filter((p: any) =>
          (p.location?.city || p.city)?.toLowerCase() === entry.city.toLowerCase()
        ).length,
        avgPrice: avg ? `₹${(avg / 100000).toFixed(1)}L` : 'N/A',
        priceRange: { min, max },
        coordinates: {
          coordinates: [entry.lng, entry.lat], // [lng, lat] — matches old backend format
        },
      };
    });
  }, [allProperties]);

  // clusters is computed live from Redux state — always in sync
  const clusters = buildClusters();

  const fetchCityClusters = useCallback(async (_filters?: any) => {
    // No-op: data comes from Redux, no fetch needed
    return buildClusters();
  }, [buildClusters]);

  const clearClusters = useCallback(() => {
    // No-op: clusters are derived, not stored locally
  }, []);

  return {
    clusters,
    loading,
    error,
    fetchCityClusters,
    clearClusters,
  };
};