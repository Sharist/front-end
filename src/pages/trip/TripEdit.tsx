import React, { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { SearchResult } from '../../components/search/SearchResultItem';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import IMap from '../../components/IMap';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import MapContext from '../../common/contexts/MapContext';
import Search from '../../components/search/Search';

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const PlaceList = styled.div`
  box-shadow: 0 0 0.5rem grey;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  position: relative;
  width: 30rem;
  z-index: 1;
`;

const SearchHeader = styled.div`
  align-items: center;
  display: flex;
  padding: 1.5rem;
  width: 100%;
  height: 6rem;

  & > * {
    margin: 0 0.5rem;
  }
`;

function TripEdit(_: RouteComponentProps) {
  const [searchedPlace, setSearchedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const { signedIn } = useAuthentication();
  const { mapApi, mapInstance, mapSearchDataSource } = useContext(MapContext);

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  async function handleResultSelected(searchResult: SearchResult) {
    if (mapApi && mapInstance && searchResult.key) {
      try {
        const place = await mapApi.getPlaceDetail(searchResult.key);
        if (place.geometry?.location) {
          new google.maps.Marker({
            position: place.geometry.location,
            map: mapInstance,
            title: place.name,
          });

          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(15);
        }

        setSearchedPlace(place);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <LayoutContainer fullHeight noHeader noMargin noPadding>
      <Content>
        <PlaceList>
          <SearchHeader>
            <Logo noText />
            <Search
              placeholder='Search cities, attractions, or keywords'
              dataSource={mapSearchDataSource}
              onSelectResult={handleResultSelected}
            />
          </SearchHeader>

          {searchedPlace && searchedPlace.name}
        </PlaceList>

        <IMap />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
