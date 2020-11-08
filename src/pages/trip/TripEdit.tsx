import React, { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { remToPx } from '../../common/dimensions';
import { SearchResult } from '../../common/components/search/SearchResultItem';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Button, { ButtonRow } from '../../common/components/Button';
import Card, { CardFooter, CardHeader } from '../../common/components/Card';
import IMap from '../../common/components/IMap';
import LayoutContainer from '../../common/components/LayoutContainer';
import MapContext from '../../common/contexts/MapContext';
import Search from '../../common/components/search/Search';

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
  padding: 0.5rem 1.5rem;
  width: 30rem;
  z-index: 1;
`;

const SearchHeader = styled.div`
  padding: 0.75rem 0;
`;

function TripEdit(_: RouteComponentProps) {
  const [pendingPlace, setPendingPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const { signedIn } = useAuthentication();
  const { mapAdaptor, mapInstance, mapSearchDataSource } = useContext(MapContext);

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  async function handleResultSelected(searchResult: SearchResult) {
    if (mapAdaptor && mapInstance && searchResult.key) {
      if (pendingPlace) {
        mapAdaptor.removeMarkers(pendingPlace);
      }

      try {
        const place = await mapAdaptor.getPlaceDetail(searchResult.key);
        if (place.geometry?.location) {
          mapAdaptor.addMarkers(place);
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }

        setPendingPlace(place);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function handleFullSearch(searchResults: SearchResult[]) {
    console.log(searchResults);
  }

  let imageConfig;
  if (pendingPlace?.photos) {
    const cardImageHeight = remToPx(15);
    const { photos } = pendingPlace;
    const firstPhoto =
      photos.find(({ width, height }) => height < width && height > cardImageHeight) || photos[0];

    imageConfig = {
      url: firstPhoto.getUrl({ maxHeight: cardImageHeight }),
      cssHeight: `${cardImageHeight}px`,
    };
  }

  function addPendingPlaceHandler() {
    console.log('added to trip!');
    setPendingPlace(null);
  }

  function cancelPendingPlaceHandler() {
    if (pendingPlace) {
      mapAdaptor?.removeMarkers(pendingPlace);
    }
    setPendingPlace(null);
  }

  return (
    <LayoutContainer fullHeight noHeader noMargin noPadding>
      <Content>
        <PlaceList>
          <SearchHeader>
            <Search
              hasLogo
              placeholder='Search cities, attractions, or keywords'
              dataSource={mapSearchDataSource}
              onSelectAutocompleteResult={handleResultSelected}
              onFullSearchResult={handleFullSearch}
            />
          </SearchHeader>

          {pendingPlace && (
            <Card>
              <CardHeader
                image={imageConfig}
                title={pendingPlace.name}
                subtitle={pendingPlace.vicinity}
              />
              <CardFooter>
                <ButtonRow>
                  <Button onClick={cancelPendingPlaceHandler} transparent>
                    Cancel
                  </Button>
                  <Button onClick={addPendingPlaceHandler} isPrimary>
                    Add to trip
                  </Button>
                </ButtonRow>
              </CardFooter>
            </Card>
          )}
        </PlaceList>

        <IMap />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
