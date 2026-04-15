// map-overlays.tsx
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";
import { PropertyCardInfo } from "./types";

export const useMapOverlays = () => {
  const [hoveredPropertyInfo, setHoveredPropertyInfo] =
    useState<PropertyCardInfo | null>(null);

  // Create cluster overlay
  const createClusterOverlay = useCallback(
    (
      city: string,
      count: number,
      position: google.maps.LatLngLiteral,
      totalValue: number,
      mapRef: google.maps.Map | null,
      onClusterClick: (
        city: string,
        position: google.maps.LatLngLiteral
      ) => void
    ) => {
      if (!mapRef || typeof google === "undefined") return null; // Safety check

      class CityClusterOverlay extends google.maps.OverlayView {
        private div: HTMLDivElement;
        private position: google.maps.LatLng;
        private content: string;
        private onClick?: () => void;

        constructor(
          position: google.maps.LatLngLiteral,
          content: string,
          onClick?: () => void
        ) {
          super();
          this.position = new google.maps.LatLng(position);
          this.content = content;
          this.onClick = onClick;

          this.div = document.createElement("div");
          this.div.className = cn(
            "bg-gradient-to-r from-[#7f1d1d] to-red-950", // Gradient using deep red tones
            "rounded-lg shadow-xl border border-red-800",
            "cursor-pointer transition-all duration-300",
            "hover:scale-110 hover:shadow-2xl hover:border-red-600",
            "p-3 flex items-center gap-3",
            "animate-pulse-slow" // Subtle pulse animation
          );
          this.div.innerHTML = content;

          if (onClick) {
            this.div.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick();
            });
          }
        }

        onAdd() {
          const pane = this.getPanes()!.overlayMouseTarget;
          pane.appendChild(this.div);
        }

        draw() {
          const projection = this.getProjection();
          const position = projection.fromLatLngToDivPixel(this.position)!;
          this.div.style.position = "absolute";
          this.div.style.left = `${position.x - 60}px`; // Adjust based on content width
          this.div.style.top = `${position.y - 25}px`; // Adjust for taller design
        }

        onRemove() {
          if (this.div.parentNode) {
            this.div.parentNode.removeChild(this.div);
          }
        }
      }

      const content = `
        <div class="flex items-center gap-2">
          <div class="text-white font-semibold text-base">${city}</div>
          <div class="bg-white text-blue-700 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
            ${count} ${count === 1 ? "property" : "properties"}
          </div>
          <div class="text-blue-100 text-sm font-medium">₹${(
            totalValue / 10000000
          ).toFixed(1)}Cr</div>
        </div>
      `;

      const overlay = new CityClusterOverlay(position, content, () => {
        onClusterClick(city, position);
      });

      overlay.setMap(mapRef);
      return overlay;
    },
    []
  );

  // Create property marker
  const createPropertyMarker = useCallback(
    (
      property: Property,
      isHighlighted: boolean,
      mapRef: google.maps.Map | null,
      onPropertyClick?: (property: Property) => void
    ) => {
      if (!property.location?.coordinates || !mapRef) return null;

      // Custom SVG for a house-like marker
      const customIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${
            isHighlighted ? "#DC2626" : "#2563EB"
          }" stroke="white" stroke-width="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        `)}`,
        scaledSize: new google.maps.Size(
          isHighlighted ? 40 : 32,
          isHighlighted ? 40 : 32
        ), // Larger when highlighted
        anchor: new google.maps.Point(
          isHighlighted ? 20 : 16,
          isHighlighted ? 40 : 32
        ), // Adjust anchor for bottom center
      };

      const marker = new google.maps.Marker({
        position: property.location.coordinates,
        map: mapRef,
        clickable: true,
        zIndex: isHighlighted ? 1000 : 1,
        optimized: false,
        icon: customIcon,
        label: {
          text: `${property.title}`,
          color: "#FFFFFF",
          fontWeight: "600",
          fontSize: "12px",
          className: cn(
            "px-3 py-1.5 mb-12 whitespace-nowrap select-none map-marker",
            "bg-gradient-to-r",
            isHighlighted
              ? "from-red-600 to-red-800"
              : "from-blue-600 to-blue-800",
            "rounded-full shadow-lg border border-white/30",
            "transition-all duration-300",
            isHighlighted ? "scale-110 shadow-xl" : ""
          ),
        },
        // animation: isHighlighted ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add hover listeners
      // // marker.addListener("mouseover", () => {
      ////   setHoveredPropertyInfo({
      // //     property,
      // //     position: new google.maps.LatLng(property.location.coordinates),
      // //   });
      // // });

      // marker.addListener("mouseout", () => {
      //   setHoveredPropertyInfo(null);
      // });

      if (onPropertyClick) {
        const clickHandler = (e: google.maps.MapMouseEvent) => {
          e.stop();
          if (e.domEvent) {
            e.domEvent.preventDefault();
            e.domEvent.stopPropagation();
          }

          onPropertyClick(property);

          // Optional: If you want to maintain map position
          const currentCenter = mapRef.getCenter();
          const currentZoom = mapRef.getZoom();

          requestAnimationFrame(() => {
            if (mapRef && currentCenter && currentZoom) {
              mapRef.setCenter(currentCenter);
              mapRef.setZoom(currentZoom);
            }
          });
        };

        marker.addListener("click", clickHandler);
      }

      return marker;
    },
    []
  );

  return {
    hoveredPropertyInfo,
    setHoveredPropertyInfo,
    createClusterOverlay,
    createPropertyMarker,
  };
};

// Add custom CSS for pulse animation
// const style = document.createElement("style");
// style.textContent = `
//   .animate-pulse-slow {
//     animation: pulse-slow 3s ease-in-out infinite;
//   }
//   @keyframes pulse-slow {
//     0%, 100% {
//       opacity: 0.9;
//       transform: scale(1);
//     }
//     50% {
//       opacity: 1;
//       transform: scale(1.03);
//     }
//   }
// `;
// document.head.appendChild(style);
