import React, { useMemo } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import SuperCluster from "supercluster";
import { Property } from "@/types/property";
import { PropertyMarker } from "./markers/PropertyMarker";

interface PropertyMarkerClustererProps {
  properties: Property[];
  selectedPropertyId?: string;
  onPropertyClick?: (property: Property) => void;
  map: google.maps.Map | null;
  zoom: number;
  bounds: google.maps.LatLngBounds | null;
}

interface ClusterFeature
  extends SuperCluster.PointFeature<{ property: Property }> {}
interface ClusterData
  extends SuperCluster.ClusterFeature<{ property: Property }> {}

export const PropertyMarkerClusterer: React.FC<
  PropertyMarkerClustererProps
> = ({
  properties,
  selectedPropertyId,
  onPropertyClick,
  map,
  zoom,
  bounds,
}) => {
  // Filter valid properties with coordinates
  const validProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        property.location?.coordinates?.lat &&
        property.location?.coordinates?.lng
    );
  }, [properties]);

  // Convert properties to GeoJSON features for supercluster
  const points: ClusterFeature[] = useMemo(() => {
    return validProperties.map((property) => ({
      type: "Feature",
      properties: { property },
      geometry: {
        type: "Point",
        coordinates: [
          property.location!.coordinates!.lng,
          property.location!.coordinates!.lat,
        ],
      },
    }));
  }, [validProperties]);

  // Initialize supercluster
  const supercluster = useMemo(() => {
    const cluster = new SuperCluster({
      radius: 60,
      maxZoom: 20,
      minZoom: 3,
      extent: 256,
      nodeSize: 64,
    });
    cluster.load(points);
    return cluster;
  }, [points]);

  // Get clusters for current bounds and zoom
  const clusters = useMemo(() => {
    if (!bounds) return [];

    const bbox: [number, number, number, number] = [
      bounds.getSouthWest().lng(),
      bounds.getSouthWest().lat(),
      bounds.getNorthEast().lng(),
      bounds.getNorthEast().lat(),
    ];

    const currentZoom = Math.floor(zoom);
    return supercluster.getClusters(bbox, currentZoom);
  }, [supercluster, bounds, zoom]);

  // Handle cluster click
  const handleClusterClick = (cluster: ClusterData) => {
    if (!map) return;

    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.properties.cluster_id!),
      20
    );

    map.setCenter({
      lat: cluster.geometry.coordinates[1],
      lng: cluster.geometry.coordinates[0],
    });
    map.setZoom(expansionZoom);
  };

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties.cluster;

        if (isCluster) {
          // Render cluster marker
          const pointCount = cluster.properties.point_count!;

          return (
            <AdvancedMarker
              key={`cluster-${cluster.properties.cluster_id}`}
              position={{ lat, lng }}
              onClick={() => handleClusterClick(cluster as ClusterData)}
            >
              <div className="w-16 h-7 relative bg-neutral-50 rounded-2xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-110">
                <div className="left-[41px] top-[6px] absolute text-center justify-start text-gray-700 text-xs font-semibold ">
                  {pointCount}
                </div>
                <div className="w-8 h-9 left-0 top-[-3px] absolute bg-red-600 shadow-[3px_0px_10px_0px_rgba(0,0,0,0.15)]" />
                <div className="w-3 h-3 left-[10px] top-[8px] absolute overflow-hidden">
                  <svg
                    width={13}
                    height={13}
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_4220_15531)">
                      <path
                        d="M1.054 4.2l5.108-2.555a.315.315 0 01.281 0L11.551 4.2m-1.05 1.575v4.199a1.05 1.05 0 01-1.05 1.05H3.154a1.05 1.05 0 01-1.05-1.05V5.774"
                        stroke="#fff"
                        strokeWidth={1.11148}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4220_15531">
                        <path fill="#fff" d="M0 0H12.5967V12.5967H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </AdvancedMarker>
          );
        } else {
          // Render individual property marker using original PropertyMarker component
          const property = cluster.properties.property;
          const isSelected = selectedPropertyId === property.id;

          return (
            <AdvancedMarker
              key={`property-${property.id}`}
              position={{ lat, lng }}
              onClick={() => onPropertyClick?.(property)}
              zIndex={isSelected ? 2 : 1}
            >
              <PropertyMarker
                title={property.title}
                propertyType={property.tagsType || ""}
                areasOfInterest={property.areasOfInterest || []}
              />
            </AdvancedMarker>
          );
        }
      })}
    </>
  );
};
