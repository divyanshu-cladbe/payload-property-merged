import { useState, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLocation } from "@/store/slices/locationSlice";
import { getRegionClustersAction } from "@/actions/location";

// Types
interface Region {
  name: string;
  propertyCount: number;
}

// Simple cache to avoid repeated server-action calls for the same city
const regionsCache = new Map<string, { regions: Region[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useRegions = () => {
  const { currentLocation } = useAppSelector(selectLocation);
  const [regions, setRegions] = useState<Region[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!currentLocation?.city) {
        setRegions([]);
        return;
      }

      const cityKey = currentLocation.city.toLowerCase();

      // Check cache first
      const cached = regionsCache.get(cityKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setRegions(cached.regions);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const clusters = await getRegionClustersAction(currentLocation.city);

        const extractedRegions = clusters
          .filter((c) => c.region && c.region.trim())
          .map((c) => ({ name: c.region.trim(), propertyCount: c.propertyCount }));

        if (extractedRegions.length > 0) {
          regionsCache.set(cityKey, {
            regions: extractedRegions,
            timestamp: Date.now(),
          });
          setRegions(extractedRegions);
        } else {
          setRegions([]);
        }
      } catch (err) {
        console.error("Error fetching regions:", err);
        setError("Failed to load regions");
        setRegions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, [currentLocation?.city]);

  return {
    regions,
    isLoading,
    error,
  };
};