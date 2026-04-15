"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Property, PropertyFilters } from "@/types/property";

/**
 * Transform a raw Payload property document into the frontend Property shape.
 *
 * Key differences between Payload schema and the frontend type:
 *  - Payload stores coordinates as: property.location.lat / property.location.lng (flat)
 *  - Frontend expects:             property.location.coordinates.{lat, lng}
 *  - Frontend also expects top-level city/state/region/address fields (from the old API)
 */
function mapPayloadPropertyToFrontend(doc: any): Property {
  const loc = doc.location || {};
  const lat = loc.lat ?? null;
  const lng = loc.lng ?? null;

  return {
    ...doc,
    // Promote flattened location fields to top-level for PropertyCard/UnitDetails
    city: loc.city || doc.city || "",
    state: loc.state || doc.state || "",
    region: loc.region || doc.region || "",
    address: loc.address || doc.address || "",
    pincode: loc.pincode || doc.pincode || "",
    // Rebuild the nested coordinates object the map expects
    location: {
      ...loc,
      coordinates: lat != null && lng != null ? { lat, lng } : undefined,
    },
    // Builder may come back as a populated object or just an ID string
    builder: doc.builder || null,
  } as unknown as Property;
}

export const getPropertiesAction = async (filters?: Partial<PropertyFilters>): Promise<Property[]> => {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const where: any = {};

    if (filters?.city) {
      where["location.city"] = { equals: filters.city };
    }
    
    if (filters?.propertyType && filters.propertyType.length > 0) {
      where["tagsType"] = { in: filters.propertyType };
    }

    if (filters?.bedrooms) {
      where["units.noOfRooms"] = { equals: filters.bedrooms };
    }

    if (filters?.priceRange) {
      where["minPrice"] = { greater_than_equal: filters.priceRange[0] };
      where["maxPrice"] = { less_than_equal: filters.priceRange[1] };
    }

    const { docs } = await payload.find({
      collection: "properties",
      where: Object.keys(where).length > 0 ? where : undefined,
      depth: 2,
      limit: 100,
    });

    return docs.map(mapPayloadPropertyToFrontend);
  } catch (error) {
    console.error("Failed to fetch properties from Payload", error);
    return [];
  }
};

export const getPropertyByIdAction = async (id: string): Promise<Property | null> => {
  try {
    const payload = await getPayload({ config: configPromise });
    const doc = await payload.findByID({
      collection: "properties",
      id,
      depth: 2,
    });
    return mapPayloadPropertyToFrontend(doc);
  } catch (error) {
    console.error(`Failed to fetch property ${id} from Payload`, error);
    return null;
  }
};

