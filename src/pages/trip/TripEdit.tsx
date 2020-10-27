import React, { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { remToPx } from '../../common/dimensions';
import { SearchResult } from '../../components/search/SearchResultItem';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Card, { CardAction } from '../../components/Card';
import IMap from '../../components/IMap';
import LayoutContainer from '../../components/LayoutContainer';
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

  const pendingPlaceActions: CardAction[] = [
    {
      actionText: 'Cancel',
      handler: () => {
        if (pendingPlace) {
          mapAdaptor?.removeMarkers(pendingPlace);
        }
        setPendingPlace(null);
      },
    },
    {
      actionText: 'Add to trip',
      isPrimary: true,
      handler: () => {
        console.log('added to trip!');
        setPendingPlace(null);
      },
    },
  ];

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
            <Card
              image={imageConfig}
              subtitle={pendingPlace.vicinity}
              title={pendingPlace.name}
              actions={pendingPlaceActions}
            ></Card>
          )}
        </PlaceList>

        <IMap />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
