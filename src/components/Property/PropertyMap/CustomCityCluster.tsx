import React, { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { useCityClusters } from "@/hooks/useCityClusters";

interface CustomCityClusterProps {
  map: google.maps.Map | null;
  onClusterClick?: (city: string, state: string) => void;
}

interface ClusterMarkerProps {
  city: string;
  propertyCount: number;
  onClick: () => void;
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  city,
  propertyCount,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="custom-cluster-marker"
      style={{
        width: "144px",
        height: "56px",
        position: "relative",
        backgroundColor: "#fafafa",
        borderRadius: "16px",
        boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.25)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          left: "43px",
          top: "31px",
          position: "absolute",
          textAlign: "center",
          color: "#737373",
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {propertyCount} Properties
      </div>
      <div
        style={{
          left: "43px",
          top: "9px",
          position: "absolute",
          textAlign: "center",
          color: "#404040",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {city}
      </div>
      <div
        style={{
          width: "32px",
          height: "64px",
          left: "0",
          top: "-5px",
          position: "absolute",
          backgroundColor: "#dc2626",
          boxShadow: "3px 0px 10px 0px rgba(0,0,0,0.15)",
        }}
      />
      <div
        style={{
          width: "12px",
          height: "12px",
          left: "10px",
          top: "23px",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4220_15531)">
            <path
              d="M1.054 4.2l5.108-2.555a.315.315 0 01.281 0L11.551 4.2m-1.05 1.575v4.199a1.05 1.05 0 01-1.05 1.05H3.154a1.05 1.05 0 01-1.05-1.05V5.774"
              stroke="#fff"
              strokeWidth="1.11148"
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
  );
};

export const CustomCityCluster: React.FC<CustomCityClusterProps> = ({
  map,
  onClusterClick,
}) => {
  const { clusters, loading, fetchCityClusters } = useCityClusters();
  const markersRef = useRef<
    { marker: google.maps.marker.AdvancedMarkerElement; root: Root }[]
  >([]);

  // Fetch clusters when component mounts
  useEffect(() => {
    fetchCityClusters();
  }, [fetchCityClusters]);

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(({ marker, root }) => {
      if (marker.map) {
        marker.map = null;
      }
      // Defer unmounting to avoid synchronous unmount during render
      setTimeout(() => {
        root.unmount();
      }, 0);
    });
    markersRef.current = [];
  };

  // Create custom cluster markers with React components
  useEffect(() => {
    if (!map || loading || clusters.length === 0) {
      return;
    }

    clearMarkers();

    clusters.forEach((cluster) => {
      if (!cluster.coordinates?.coordinates) return;

      const [lng, lat] = cluster.coordinates.coordinates;

      // Validate coordinates before creating marker
      if (!lat || !lng || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn(
          `Invalid coordinates for cluster ${cluster.city}: lat=${lat}, lng=${lng}`
        );
        return;
      }

      const position = { lat, lng };

      // Create container div for React component
      const container = document.createElement("div");
      const root = createRoot(container);

      // Handle click with proper city selection and zoom
      const handleClusterClick = () => {
        // console.log(`🎯 Clicking ${cluster.city}, ${cluster.state}`);
        // console.log(`📍 Target coordinates: lat=${lat}, lng=${lng}`);

        if (onClusterClick) {
          onClusterClick(cluster.city, cluster.state);
        }

        const currentZoom = map.getZoom() || 0;
        const targetZoom = 11;
        const targetPosition = { lat, lng };

        // console.log(`🔍 Current zoom: ${currentZoom}, Target zoom: ${targetZoom}`);

        if (!(lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180)) {
          console.warn(
            `❌ Invalid coordinates for ${cluster.city}: lat=${lat}, lng=${lng}`
          );
          return;
        }

        if (currentZoom < 7) {
          // console.log("📉 Low zoom - centering first then smooth zoom");

          // IMPORTANT: Position on target city FIRST, then zoom
          // This ensures zoom happens on the correct location
          map.setCenter(targetPosition);

          // Wait a moment for center to settle, then smooth zoom
          setTimeout(() => {
            // Now zoom smoothly from current position (which is now on target city)
            let currentStep = currentZoom;
            const zoomStep = 1; // Smooth step size
            const intervalTime = 200; // Natural timing

            const smoothZoom = () => {
              if (currentStep < targetZoom) {
                currentStep = Math.min(currentStep + zoomStep, targetZoom);

                // Ensure we stay centered on target while zooming
                map.setCenter(targetPosition);
                map.setZoom(currentStep);

                if (currentStep < targetZoom) {
                  setTimeout(smoothZoom, intervalTime);
                } else {
                  // console.log("🎯 Smooth zoom complete on target city");
                }
              }
            };

            smoothZoom();
          }, 200);

        } else {
          // console.log("📈 High zoom - using direct approach");

          // For higher zoom levels, use smooth panTo then zoom
          map.panTo(targetPosition);

          google.maps.event.addListenerOnce(map, "idle", () => {
            map.setZoom(targetZoom);
            // console.log("🎯 Smooth zoom complete");
          });
        }
      };

      // Render React component
      root.render(
        <ClusterMarker
          city={cluster.city}
          propertyCount={cluster.propertyCount}
          onClick={handleClusterClick}
        />
      );

      // Create the advanced marker
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        content: container,
        title: `${cluster.city}, ${cluster.state} (${cluster.propertyCount} properties)`,
      });

      markersRef.current.push({ marker, root });
    });

    // console.log(`✅ Created ${markersRef.current.length} custom city cluster markers with React`);

    // Cleanup function
    return () => {
      clearMarkers();
    };
  }, [map, clusters, loading, onClusterClick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearMarkers();
    };
  }, []);

  return null; // This component only manages markers, no UI to render
};
