import React, { ReactChild, useState } from 'react';

type MapContextType = {
  /** Initialize Google Map */
  initMap: () => void;
  /** Google Maps object instance */
  mapInstance?: google.maps.Map<HTMLDivElement>;
  extraData: {
    /** Indicates that the map has been initialized. */
    initialized: boolean;
  };
};

const mapsApiLoader = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&map_ids=815851252755dae4`;

const MapContext = React.createContext<MapContextType>({
  initMap: () => {},
  extraData: { initialized: false },
});

function MapContextProvider({ children }: { children?: ReactChild }) {
  const [mapInstance, setMapInstance] = useState<google.maps.Map<HTMLDivElement>>();

  function initMap() {
    if (!mapInstance) {
      const div = document.createElement('div');
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.display = 'none';

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

export default MapContext;

export { MapContextProvider };
