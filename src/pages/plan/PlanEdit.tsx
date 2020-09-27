import React from 'react';
import { GiBalloons } from 'react-icons/gi';
import { IoIosPin, IoIosRestaurant } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { SearchResult } from '../../components/search/SearchResultItem';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import IMap from '../../components/IMap';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import Search, { SearchDatasource } from '../../components/search/Search';

const PlanContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Locations = styled.div`
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

function PlanEdit(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();

  const searchResults: SearchResult[] = [
    { text: 'Chicago', annotation: 'Illinois, USA', icon: IoIosPin },
    { text: 'Amsterdam', annotation: 'Netherlands', icon: IoIosPin },
    { text: 'The Pink Door', annotation: 'Seattle, WA, USA', icon: IoIosRestaurant },
    {
      text: 'San Francisco Museum of Modern Art',
      annotation: 'San Francisco, CA, USA',
      icon: GiBalloons,
    },
    { text: 'Tokyo', annotation: 'Japan', icon: IoIosPin },
  ];

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  const dataSource: SearchDatasource = {
    initialDataset: searchResults,
    onSearch: (text) => {
      const textLower = text.toLowerCase();
      return Promise.resolve(
        searchResults.filter((item) => {
          return (
            item.text.toLowerCase().includes(textLower) ||
            item.annotation?.toLowerCase().includes(textLower)
          );
        })
      );
    },
  };

  return (
    <LayoutContainer fullHeight noHeader noMargin noPadding>
      <PlanContent>
        <Locations>
          <SearchHeader>
            <Logo noText />
            <Search placeholder='Search cities, attractions, or keywords' dataSource={dataSource} />
          </SearchHeader>
        </Locations>

        <IMap />
      </PlanContent>
    </LayoutContainer>
  );
}

export default PlanEdit;
