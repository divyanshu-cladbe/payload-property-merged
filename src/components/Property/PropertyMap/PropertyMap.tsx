"use client";
import React from "react";
import { PropertyMapProps } from "./types";
import { PropertyMapMarker } from "./PropertyMapMarker";
import { GoogleMapsWrapper } from "@/components/shared/GoogleMapsWrapper";
import { TrafficLayer } from "@/providers/MapLayerProvider";
import { PropertyAreaHighlight } from "./PropertyAreaHighlight";

const PropertyMap = React.memo(
  ({
    mapApi,
    currentBound,
    properties,
    selectedProperty,
    onPropertyClick,
    areasOfInterest,
    className,
    removeAreaOfInterestRef,
    handlePropertyDeselect,
    setMapBounds,
    userLocation,
    calculateFromLocation,
    hoveredPropertyId,
  }: PropertyMapProps) => {

    return (
      <GoogleMapsWrapper
        apiKey={mapApi}
        className={className}
        defaultCenter={currentBound.INDIA_CENTER}
        restriction={{
          latLngBounds: currentBound.INDIA_BOUNDS as any,
          strictBounds: false,
        }}        
      >
        {/* <TrafficLayer /> */}
        <PropertyMapMarker
          properties={properties}
          selectedProperty={selectedProperty}
          onPropertyClick={onPropertyClick}
          areasOfInterest={areasOfInterest}
          removeAreaOfInterestRef={removeAreaOfInterestRef}
          handlePropertyDeselect={handlePropertyDeselect}
          setMapBounds={setMapBounds}
          userLocation={userLocation}
          calculateFromLocation={calculateFromLocation}
          hoveredPropertyId={hoveredPropertyId}
        />
        <PropertyAreaHighlight properties={properties} />
      </GoogleMapsWrapper>
    );
  }
);

export default PropertyMap;
