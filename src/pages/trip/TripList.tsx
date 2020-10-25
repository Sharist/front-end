import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import EmptyState from '../../components/EmptyState';
import LayoutContainer from '../../components/LayoutContainer';

const Wrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0;
    }
    @media screen and (max-width: ${breakpoints.TABLET}) {
      padding: 0.5rem;
    }
  `}
`;

const PageTitle = styled.div`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.XX_LARGE};
    margin-top: 1rem;
    font-weight: 400;
  `}
`;

function TripList(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    // Fetch trips
    setTrips([]);
  }, []);

  if (!signedIn) {
    return null;
  }

  return (
    <LayoutContainer center>
      <Wrapper>
        <PageTitle>Your trips</PageTitle>

        {trips.length === 0 && (
          <EmptyState
            title='Well, this is a bit empty 😥'
            subtitle="Let's brighten this page up by planning your next trip!"
            action={{ actionLabel: 'Start planning', actionHandler: () => alert('yay!') }}
          />
        )}
      </Wrapper>
    </LayoutContainer>
  );
}

export default TripList;
