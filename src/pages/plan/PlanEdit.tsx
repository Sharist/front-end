import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import IMap from '../../components/IMap';
import LayoutContainer from '../../components/LayoutContainer';
import Search from '../../components/Search';
import styled from 'styled-components';
import Logo from '../../components/header/Logo';

const PlanContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const PlanList = styled.div`
  box-shadow: 0 0 0.5rem grey;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 30rem;
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
        <PlanList>
          <SearchHeader>
            <Logo noText />
            <Search placeholder='Search cities, attractions, or keywords' />
          </SearchHeader>
        </PlanList>
        <IMap />
      </PlanContent>
    </LayoutContainer>
  );
}

export default Plan;
