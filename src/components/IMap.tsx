import React, { useCallback, useEffect, useState, useContext, ReactChild } from 'react';
import styled from 'styled-components';

/**
 * ---------------------------------
 * Context setup.
 *
 * Skip this section unless you are modifying `mapInstance` config, or your are modifying
 * how we inject script and map container.
 * ---------------------------------
 *
 * We keep `MapContext` inaccessible to other components.
 *
 * The intention is to force the use of `IMap` component directly instead of accessing
 * the context directly thus making it difficult to keep track of where the `mapInstance`
 * was modified throughout the codebase.
 *
 * This may change in the future.
 */
interface MapContextType {
  initMap: () => void;
  mapInstance?: google.maps.Map<HTMLDivElement>;
  extraData: {
    initialized: boolean;
  };
}

const mapsApiLoader = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&map_ids=815851252755dae4`;

const MapContext = React.createContext<MapContextType>({
  initMap: () => {},
  extraData: { initialized: false },
});

function MapContextProvider({ children }: { children: ReactChild }) {
  const [mapInstance, setMapInstance] = useState<google.maps.Map<HTMLDivElement>>();

  function initMap() {
    if (!mapInstance) {
      const div = document.createElement('div');
      div.style.width = '100%';
      div.style.height = '100%';

      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', mapsApiLoader);
      script.onload = () =>
        setMapInstance(
          new google.maps.Map(div, {
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapId: '815851252755dae4',
            center: { lat: 41.8781, lng: -87.6298 },
          })
        );

      div.append(script);
      document.documentElement.append(div);
    }
  }

  return (
    <MapContext.Provider value={{ mapInstance, initMap, extraData: { initialized: false } }}>
      {children}
    </MapContext.Provider>
  );
}

export { MapContextProvider };

/**
 * ----- End of context setup -----
 */

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
