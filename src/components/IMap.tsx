import React, { useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';

import MapContext from './contexts/MapContext';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function IMap() {
  const mapContext = useContext(MapContext);

  const initMapCallback = useCallback(
    (mapContainer: HTMLDivElement | null) => {
      if (mapContainer) {
        if (mapContext.mapInstance) {
          mapContainer.append(mapContext.mapInstance.getDiv());
        } else {
          mapContext.initMap();
        }
      }
    },
    [mapContext]
  );

  // Get user geolocation on mount
  useEffect(() => {
    if (mapContext.mapInstance && !mapContext.extraData.initialized && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        mapContext.mapInstance?.setCenter({ lat: coords.latitude, lng: coords.longitude });
        mapContext.extraData.initialized = true;
      });
    }
  }, [mapContext]);

  return <MapContainer ref={initMapCallback} />;
}

export default IMap;
