import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const MapContainer = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
  `}
`;

function setUpGoogleMapsAPI(div: HTMLDivElement, onScriptLoaded: () => void) {
  const script = document.createElement('script');
  script.setAttribute('async', 'true');
  script.setAttribute('defer', 'true');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&v=beta&map_ids=815851252755dae4`
  );
  script.onload = onScriptLoaded;

  div.appendChild(script);
}

function IMap() {
  const [mapCentre, setMapCentre] = useState<google.maps.LatLngLiteral>({
    lat: 41.8781,
    lng: -87.6298,
  });

  const [mapElement, setMapElement] = useState<google.maps.Map<HTMLDivElement> | null>(null);

  // Get user geolocation on monut
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setMapCentre({ lat: coords.latitude, lng: coords.longitude })
      );
    }
  }, []);

  useEffect(() => mapElement?.setCenter(mapCentre), [mapCentre, mapElement]);

  // Setup Maps
  const initMapCallback = useCallback((div: HTMLDivElement | null) => {
    if (div !== null) {
      setUpGoogleMapsAPI(div, () =>
        setMapElement(
          new google.maps.Map(div, {
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapId: '815851252755dae4',
          })
        )
      );
    }
  }, []);

  return <MapContainer ref={initMapCallback} />;
}

export default IMap;
