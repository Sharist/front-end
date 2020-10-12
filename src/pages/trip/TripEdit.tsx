import React, { useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { remToPx } from '../../common/dimensions';
import { SearchResult } from '../../components/search/SearchResultItem';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Card, { CardAction } from '../../components/Card';
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
  padding: 0.5rem 1.5rem;
  width: 30rem;
  z-index: 1;
`;

const PendingCard = styled.div``;

const SearchHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 6rem;
  justify-content: space-between;

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

/**
 * A place that a user searched for and clicked onto the search result,
 * yet has not decided whether to add the place to the trip or not.
 *
 * Groups together Google Maps object instances for easier manpulation
 * through handlers.
 */
interface PendingPlace {
  /** The selected place from search */
  place: google.maps.places.PlaceResult;
  /** The associated marker on Map created with the selection */
  marker?: google.maps.Marker;
}

function TripEdit(_: RouteComponentProps) {
  const [pendingPlace, setPendingPlace] = useState<PendingPlace | null>(null);

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

        let marker: google.maps.Marker | undefined = undefined;
        if (place.geometry?.location) {
          marker = new google.maps.Marker({
            position: place.geometry.location,
            map: mapInstance,
            title: place.name,
          });

          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }

        setPendingPlace({ place, marker });
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  let imageConfig;
  if (pendingPlace?.place?.photos) {
    const cardImageHeight = remToPx(15);
    const { photos } = pendingPlace.place;
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
        pendingPlace?.marker?.setMap(null);
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
            <Logo noText />
            <Search
              placeholder='Search cities, attractions, or keywords'
              dataSource={mapSearchDataSource}
              onSelectResult={handleResultSelected}
            />
          </SearchHeader>

          {pendingPlace?.place && (
            <PendingCard>
              <Card
                image={imageConfig}
                subtitle={pendingPlace.place.vicinity}
                title={pendingPlace.place.name}
                actions={pendingPlaceActions}
              ></Card>
            </PendingCard>
          )}
        </PlaceList>

        <IMap />
      </Content>
    </LayoutContainer>
  );
}

export default TripEdit;
