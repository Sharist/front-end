import React, { useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';

import MapContext from '../common/contexts/MapContext';

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
    const { mapInstance, extraData } = mapContext;

    if (mapInstance && !extraData.initialized && navigator.geolocation) {
      mapInstance.getDiv().style.display = '';
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        mapInstance.setCenter({ lat: coords.latitude, lng: coords.longitude });
        extraData.initialized = true;
      });
    }
  }, [mapContext]);

  return <MapContainer ref={initMapCallback} />;
}

export default IMap;
