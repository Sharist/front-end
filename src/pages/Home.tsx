import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import Button from '../components/Button';
import LayoutContainer from '../components/LayoutContainer';

const Hero = styled.div<{ large: boolean }>`
  ${({ large, theme: { palette, spacing } }) => css`
    align-items: center;
    background-color: ${palette.TEAL};
    border-radius: 0.3rem;
    color: ${palette.CLOUD_LIGHTER};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${spacing.X_LARGE};
    text-shadow: 0 0 0.2rem ${palette.CLOUD_LIGHTER};
    width: 100%;

    & > :first-child {
      margin-top: ${large ? '12rem' : '5rem'};
    }

    & > :last-child {
      margin-bottom: ${large ? '12rem' : '5rem'};
    }
  `}
`;

const HeroTitle = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    font-size: calc(${typography.LARGE} * 2);
    font-weight: 300;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: calc(${typography.LARGE} * 1.5);
    }
  `}
`;

function Home(_: RouteComponentProps) {
  return (
    <>
      <LayoutContainer>
        <Hero large>
          <HeroTitle>Welcome to Sharist!</HeroTitle>
          <p>Share your locations with your friends</p>
          <Button onClick={() => navigate('plan')}>Go to Shared Map</Button>
        </Hero>
      </LayoutContainer>
    </>
  );
}

export default Home;
