import { useEffect, useRef, useState } from "react";

type Position = "top" | "bottom" | "left" | "right";

export const usePopupPositioning = (
  variant: string,
  mapRef?: React.MutableRefObject<google.maps.Map | null>,
  markerPosition?: { lat: number; lng: number }
) => {
  const popUpRef = useRef<HTMLDivElement | null>(null);
  const [smartPosition, setSmartPosition] = useState<Position>("top");

  useEffect(() => {
    if (variant !== "mapPopUp" || !mapRef || !markerPosition) return;

    // Card dimensions
    const CARD_WIDTH = 275;
    const CARD_HEIGHT = 262;
    const BUFFER = 30; // Gap between marker and card

    const calculateSmartPosition = () => {
      if (!mapRef?.current || !popUpRef.current || !markerPosition) return;

      const map = mapRef.current;
      const mapDiv = map.getDiv();
      const mapRect = mapDiv.getBoundingClientRect();

      // Convert marker lat/lng to screen coordinates relative to map container
      const bounds = map.getBounds();
      if (!bounds) return;

      const topRight = bounds.getNorthEast();
      const bottomLeft = bounds.getSouthWest();

      // Calculate marker position in screen coordinates
      const latRange = topRight.lat() - bottomLeft.lat();
      const lngRange = topRight.lng() - bottomLeft.lng();

      const markerX =
        ((markerPosition.lng - bottomLeft.lng()) / lngRange) * mapRect.width;
      const markerY =
        ((topRight.lat() - markerPosition.lat) / latRange) * mapRect.height;

      // Calculate available space in each direction
      const spaceTop = markerY;
      const spaceBottom = mapRect.height - markerY;
      const spaceLeft = markerX;
      const spaceRight = mapRect.width - markerX;

      // Check if there's enough space for the card to fit fully in each direction
      // For top/bottom: need vertical space + horizontal centering space
      const canFitTop =
        spaceTop >= CARD_HEIGHT + BUFFER &&
        markerX >= CARD_WIDTH / 2 &&
        mapRect.width - markerX >= CARD_WIDTH / 2;
      const canFitBottom =
        spaceBottom >= CARD_HEIGHT + BUFFER &&
        markerX >= CARD_WIDTH / 2 &&
        mapRect.width - markerX >= CARD_WIDTH / 2;

      // For left/right: need horizontal space + vertical centering space
      const canFitRight =
        spaceRight >= CARD_WIDTH + BUFFER &&
        markerY >= CARD_HEIGHT / 2 &&
        mapRect.height - markerY >= CARD_HEIGHT / 2;
      const canFitLeft =
        spaceLeft >= CARD_WIDTH + BUFFER &&
        markerY >= CARD_HEIGHT / 2 &&
        mapRect.height - markerY >= CARD_HEIGHT / 2;

      // Determine optimal position - prioritize top/bottom, use left/right only when necessary
      let position: Position = "top";

      // First try to fit top or bottom (preferred directions)
      if (canFitTop) {
        position = "top";
      } else if (canFitBottom) {
        position = "bottom";
      } else if (canFitRight) {
        position = "right";
      } else if (canFitLeft) {
        position = "left";
      } else {
        // If nothing fits perfectly, choose the direction with most space
        // But still prioritize top/bottom over left/right
        if (
          spaceTop >= spaceBottom &&
          (spaceTop >= spaceRight || spaceTop >= spaceLeft)
        ) {
          position = "top";
        } else if (
          spaceBottom >= spaceTop &&
          (spaceBottom >= spaceRight || spaceBottom >= spaceLeft)
        ) {
          position = "bottom";
        } else if (spaceRight >= spaceLeft) {
          position = "right";
        } else {
          position = "left";
        }
      }

      setSmartPosition(position);

      // Apply simple relative positioning with boundary adjustments and animations
      if (popUpRef.current) {
        popUpRef.current.style.position = "absolute";

        // Add smooth transition for position changes
        // popUpRef.current.style.transition =
        //   "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

        // Set transform origin based on position for better animation
        // switch (position) {
        //   case "top":
        //     popUpRef.current.style.transformOrigin = "bottom center";
        //     break;
        //   case "bottom":
        //     popUpRef.current.style.transformOrigin = "top center";
        //     break;
        //   case "left":
        //     popUpRef.current.style.transformOrigin = "right center";
        //     break;
        //   case "right":
        //     popUpRef.current.style.transformOrigin = "left center";
        //     break;
        // }

        switch (position) {
          case "top":
            popUpRef.current.style.bottom = `calc(100% + ${BUFFER}px)`;
            popUpRef.current.style.top = "auto";
            // Check if centering would cause overflow, adjust to edges if needed
            if (markerX < CARD_WIDTH / 2) {
              popUpRef.current.style.left = `${BUFFER}px`;
              popUpRef.current.style.right = "auto";
              popUpRef.current.style.transform = "none";
            } else if (mapRect.width - markerX < CARD_WIDTH / 2) {
              popUpRef.current.style.right = `${BUFFER}px`;
              popUpRef.current.style.left = "auto";
              popUpRef.current.style.transform = "none";
            } else {
              popUpRef.current.style.left = "50%";
              popUpRef.current.style.right = "auto";
              popUpRef.current.style.transform = "translateX(-50%)";
            }
            break;
          case "bottom":
            popUpRef.current.style.top = `calc(100% + ${BUFFER}px)`;
            popUpRef.current.style.bottom = "auto";
            // Check if centering would cause overflow, adjust to edges if needed
            if (markerX < CARD_WIDTH / 2) {
              popUpRef.current.style.left = `${BUFFER}px`;
              popUpRef.current.style.right = "auto";
              popUpRef.current.style.transform = "none";
            } else if (mapRect.width - markerX < CARD_WIDTH / 2) {
              popUpRef.current.style.right = `${BUFFER}px`;
              popUpRef.current.style.left = "auto";
              popUpRef.current.style.transform = "none";
            } else {
              popUpRef.current.style.left = "50%";
              popUpRef.current.style.right = "auto";
              popUpRef.current.style.transform = "translateX(-50%)";
            }
            break;
          case "right":
            popUpRef.current.style.left = `calc(100% + ${BUFFER}px)`;
            popUpRef.current.style.right = "auto";
            // Check if centering would cause overflow, adjust to edges if needed
            if (markerY < CARD_HEIGHT / 2) {
              popUpRef.current.style.top = `${BUFFER}px`;
              popUpRef.current.style.bottom = "auto";
              popUpRef.current.style.transform = "none";
            } else if (mapRect.height - markerY < CARD_HEIGHT / 2) {
              popUpRef.current.style.bottom = `${BUFFER}px`;
              popUpRef.current.style.top = "auto";
              popUpRef.current.style.transform = "none";
            } else {
              popUpRef.current.style.top = "50%";
              popUpRef.current.style.bottom = "auto";
              popUpRef.current.style.transform = "translateY(-50%)";
            }
            break;
          case "left":
            popUpRef.current.style.right = `calc(100% + ${BUFFER}px)`;
            popUpRef.current.style.left = "auto";
            // Check if centering would cause overflow, adjust to edges if needed
            if (markerY < CARD_HEIGHT / 2) {
              popUpRef.current.style.top = `${BUFFER}px`;
              popUpRef.current.style.bottom = "auto";
              popUpRef.current.style.transform = "none";
            } else if (mapRect.height - markerY < CARD_HEIGHT / 2) {
              popUpRef.current.style.bottom = `${BUFFER}px`;
              popUpRef.current.style.top = "auto";
              popUpRef.current.style.transform = "none";
            } else {
              popUpRef.current.style.top = "50%";
              popUpRef.current.style.bottom = "auto";
              popUpRef.current.style.transform = "translateY(-50%)";
            }
            break;
        }

        // Add entrance animation with directional slide effect
        // requestAnimationFrame(() => {
        //   if (popUpRef.current) {
        //     // Store current transform for proper animation
        //     const currentTransform = popUpRef.current.style.transform || "";

        //     // Initial state for entrance animation - slide from the direction the card came from
        //     popUpRef.current.style.opacity = "0";

        //     let initialTransform = "";
        //     switch (position) {
        //       case "top":
        //       case "bottom":
        //         // Handle different horizontal positioning states
        //         if (currentTransform.includes("translateX(-50%)")) {
        //           initialTransform = currentTransform + " scale(0.95)";
        //         } else {
        //           initialTransform =
        //             (currentTransform || "none") + " scale(0.95)";
        //         }
        //         break;
        //       case "right":
        //       case "left":
        //         // Handle different vertical positioning states
        //         if (currentTransform.includes("translateY(-50%)")) {
        //           initialTransform = currentTransform + " scale(0.95)";
        //         } else {
        //           initialTransform =
        //             (currentTransform || "none") + " scale(0.95)";
        //         }
        //         break;
        //       default:
        //         initialTransform = currentTransform + " scale(0.95)";
        //     }

        //     popUpRef.current.style.transform = initialTransform;

        //     // Animate to final state
        //     setTimeout(() => {
        //       if (popUpRef.current) {
        //         popUpRef.current.style.opacity = "1";
        //         popUpRef.current.style.transform =
        //           currentTransform + " scale(1)";
        //       }
        //     }, 50);

        //     // Clean up transition after animation completes
        //     setTimeout(() => {
        //       if (popUpRef.current) {
        //         popUpRef.current.style.transition = "";
        //         // Reset to final transform state without scale
        //         popUpRef.current.style.transform = currentTransform;
        //       }
        //     }, 350);
        //   }
        // });
      }

      return { position };
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          calculateSmartPosition();
          observer.disconnect();
        }
      }
    });

    // Also listen for map changes to recalculate position
    const mapListeners: google.maps.MapsEventListener[] = [];

    if (mapRef.current) {
      mapListeners.push(
        google.maps.event.addListener(
          mapRef.current,
          "zoom_changed",
          calculateSmartPosition
        ),
        google.maps.event.addListener(
          mapRef.current,
          "center_changed",
          calculateSmartPosition
        ),
        google.maps.event.addListener(
          mapRef.current,
          "bounds_changed",
          calculateSmartPosition
        )
      );
    }

    if (popUpRef.current) {
      observer.observe(popUpRef.current);

      // Initial setup for entrance animation
      // popUpRef.current.style.willChange = "transform, opacity, top, left";
    }

    return () => {
      observer.disconnect();
      mapListeners.forEach((listener) =>
        google.maps.event.removeListener(listener)
      );
      // if (popUpRef.current) {
      //   popUpRef.current.style.willChange = "auto";
      // }
    };
  }, [variant, mapRef, markerPosition]);

  // Helper function to get pointer styles based on current position
  const getPointerStyles = () => {
    const pointerSize = 12;

    switch (smartPosition) {
      case "top":
        return {
          position: "absolute" as const,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${pointerSize}px solid transparent`,
          borderRight: `${pointerSize}px solid transparent`,
          borderTop: `${pointerSize}px solid white`,
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        };
      case "bottom":
        return {
          position: "absolute" as const,
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${pointerSize}px solid transparent`,
          borderRight: `${pointerSize}px solid transparent`,
          borderBottom: `${pointerSize}px solid white`,
          filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.1))",
        };
      case "left":
        return {
          position: "absolute" as const,
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: `${pointerSize}px solid transparent`,
          borderBottom: `${pointerSize}px solid transparent`,
          borderLeft: `${pointerSize}px solid white`,
          filter: "drop-shadow(2px 0 4px rgba(0,0,0,0.1))",
        };
      case "right":
        return {
          position: "absolute" as const,
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: `${pointerSize}px solid transparent`,
          borderBottom: `${pointerSize}px solid transparent`,
          borderRight: `${pointerSize}px solid white`,
          filter: "drop-shadow(-2px 0 4px rgba(0,0,0,0.1))",
        };
      default:
        return {};
    }
  };

  return { popUpRef, smartPosition, getPointerStyles };
};
