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

  div.appendChild(script);

  script.onload = onScriptLoaded;
}

function IMap() {
  const [mapCentre, setMapCentre] = useState<number[]>([47.6062, -122.3321]);

  // Get user geolocation on monut
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setMapCentre([latitude, longitude]);
      });
    }
  }, []);

  // Setup Maps
  const initMapCallback = useCallback(
    (div: HTMLDivElement | null) => {
      if (div !== null) {
        setUpGoogleMapsAPI(div, () => {
          const mapElement = new google.maps.Map(div, {
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            mapId: '815851252755dae4',
          });

          mapElement.setCenter(new google.maps.LatLng(mapCentre[0], mapCentre[1]));
        });
      }
    },
    [mapCentre]
  );

  return <MapContainer ref={initMapCallback} />;
}

export default IMap;
