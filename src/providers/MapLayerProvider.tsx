import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

export const TrafficLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // Cleanup: remove the layer when component unmounts
    return () => trafficLayer.setMap(null);
  }, [map]);

  return null;
};