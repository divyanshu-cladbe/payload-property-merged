import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Property } from "@/types/property";
import PropertyCard from "../../PropertyCard/PropertyCard";
import ClickAwayListener from "react-click-away-listener";

interface SelectedPropertyMarkerProps {
  variant?: "mobile" | "desktop";
  selectedProperty: Property | null;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  redirectToPropertyPage: (id: string) => void;
  handlePropertyDeselect: () => void;
}

export const SelectedPropertyMarker: React.FC<SelectedPropertyMarkerProps> = ({
  variant,
  selectedProperty,
  mapRef,
  redirectToPropertyPage,
  handlePropertyDeselect,
}) => {
  if (!selectedProperty?.location?.coordinates) {
    return null;
  }

  return (
    <div className="mb-5">
      <AdvancedMarker
        position={selectedProperty.location.coordinates}
        key={`${selectedProperty.id}`}
        zIndex={5}
      >
        {variant !== "mobile" ? (
          <PropertyCard
            {...selectedProperty}
            variant="mapPopUp"
            mapRef={mapRef}
            redirectToPropertyPage={redirectToPropertyPage}
            handlePropertyDeselect={handlePropertyDeselect}
            markerPosition={selectedProperty.location.coordinates}
          />
        ) : (
          <></>
        )}
      </AdvancedMarker>
    </div>
  );
};
