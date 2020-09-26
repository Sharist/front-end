import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import IMap from '../../components/IMap';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import Search from '../../components/search/Search';

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

function Plan(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  return (
    <LayoutContainer fullHeight noHeader noMargin noPadding>
      <PlanContent>
        <Locations>
          <SearchHeader>
            <Logo noText />
            <Search placeholder='Search cities, attractions, or keywords' />
          </SearchHeader>
        </Locations>

        <IMap />
      </PlanContent>
    </LayoutContainer>
  );
}

export default Plan;
