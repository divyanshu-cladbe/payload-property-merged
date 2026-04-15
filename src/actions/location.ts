"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";

export interface CityCluster {
  city: string;
  state: string;
  propertyCount: number;
  /** Representative lat/lng from the first matching property */
  lat: number;
  lng: number;
}

export interface RegionCluster {
  region: string;
  propertyCount: number;
}

/**
 * Returns one entry per distinct city found in the properties collection,
 * with an aggregated property count and a representative lat/lng.
 *
 * This replaces the old backend call:
 *   GET /properties/clusters
 */
export const getCityClustersAction = async (): Promise<CityCluster[]> => {
  try {
    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
      collection: "properties",
      limit: 1000,
      depth: 0,
      select: {
        // @ts-ignore – select uses dot-notation strings for group fields
        "location.city": true,
        "location.state": true,
        "location.lat": true,
        "location.lng": true,
      },
    });

    // Aggregate by city
    const cityMap = new Map<string, CityCluster>();

    for (const doc of docs) {
      const loc = (doc as any).location || {};
      const city: string = loc.city || "";
      if (!city) continue;

      const normalized = city.trim();
      if (!normalized) continue;

      if (cityMap.has(normalized)) {
        cityMap.get(normalized)!.propertyCount += 1;
      } else {
        cityMap.set(normalized, {
          city: normalized,
          state: loc.state || "",
          propertyCount: 1,
          lat: loc.lat ?? 0,
          lng: loc.lng ?? 0,
        });
      }
    }

    return Array.from(cityMap.values()).sort(
      (a, b) => b.propertyCount - a.propertyCount
    );
  } catch (error) {
    console.error("getCityClustersAction error:", error);
    return [];
  }
};

/**
 * Returns one entry per distinct region within the given city,
 * with an aggregated property count.
 *
 * This replaces the old backend call:
 *   GET /properties/clusters?clusterBy=region&city=<city>
 */
export const getRegionClustersAction = async (
  city: string
): Promise<RegionCluster[]> => {
  try {
    if (!city) return [];

    const payload = await getPayload({ config: configPromise });

    const { docs } = await payload.find({
      collection: "properties",
      where: {
        "location.city": { equals: city },
      },
      limit: 1000,
      depth: 0,
      select: {
        // @ts-ignore
        "location.region": true,
      },
    });

    const regionMap = new Map<string, number>();

    for (const doc of docs) {
      const region: string = ((doc as any).location?.region || "").trim();
      if (!region) continue;
      regionMap.set(region, (regionMap.get(region) ?? 0) + 1);
    }

    return Array.from(regionMap.entries())
      .map(([region, propertyCount]) => ({ region, propertyCount }))
      .sort((a, b) => b.propertyCount - a.propertyCount);
  } catch (error) {
    console.error("getRegionClustersAction error:", error);
    return [];
  }
};
