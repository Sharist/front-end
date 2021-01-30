import React, { useCallback, useEffect, useContext, ReactNode } from 'react';
import styled from 'styled-components';

import MapContext from '../contexts/MapContext';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapOverlayContainer = styled.div`
  position: absolute;
  max-width: 35rem;
  left: 0.75rem;
  right: 0.75rem;
  top: 0.75rem;
`;

type Props = {
  topOverlay: ReactNode;
};

function IMap({ topOverlay: mapOverlay }: Props) {
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

  return (
    <MapContainer ref={initMapCallback}>
      {mapOverlay && <MapOverlayContainer>{mapOverlay}</MapOverlayContainer>}
    </MapContainer>
  );
}

export default IMap;
