import React, { ReactNode, useState } from 'react';

import { MapAdaptor } from '../apis/MapAdaptor';
import { MapSearchDataSource } from '../MapSearchDataSource';

type MapContextType = {
  /** Initialize Google Map */
  initMap: () => void;
  /** Google Maps object instance */
  mapAdaptor?: MapAdaptor;
  mapInstance?: google.maps.Map<HTMLDivElement>;
  mapSearchDataSource?: MapSearchDataSource;
  extraData: {
    /** Indicates that the map has been initialized. */
    initialized: boolean;
  };
};

const mapsApiLoader =
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}` +
  '&map_ids=815851252755dae4' +
  '&libraries=places';

const MapContext = React.createContext<MapContextType>({
  initMap: () => {},
  extraData: { initialized: false },
});

function MapContextProvider({ children }: { children: ReactNode }) {
  const [mapInstanceData, setMapInstanceData] = useState<{
    mapAdaptor?: MapAdaptor;
    mapInstance?: google.maps.Map<HTMLDivElement>;
    mapSearchDataSource?: MapSearchDataSource;
  }>({});

  function initMap() {
    if (!mapInstanceData.mapInstance) {
      const div = document.createElement('div');
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.display = 'none';

      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', mapsApiLoader);
      script.onload = () => {
        const mapInstance = new google.maps.Map(div, {
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapId: '815851252755dae4',
          center: { lat: 41.8781, lng: -87.6298 },
        });

        const mapAdaptor = new MapAdaptor(mapInstance);
        const mapSearchDataSource = new MapSearchDataSource(mapAdaptor);
        setMapInstanceData({
          mapAdaptor,
          mapInstance,
          mapSearchDataSource,
        });
      };

      div.append(script);
      document.documentElement.append(div);
    }
  }

  return (
    <MapContext.Provider
      value={{
        ...mapInstanceData,
        initMap,
        extraData: { initialized: false },
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export default MapContext;

export { MapContextProvider };
