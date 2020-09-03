import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import { HEADER_HEIGHT_REM } from '../components/header/Header';
import Button from '../components/Button';
import LayoutContainer from '../components/LayoutContainer';
import routes from '../routes';

const Landing = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    height: 20rem;
    margin-top: -${HEADER_HEIGHT_REM}rem;
    justify-content: space-between;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      height: 13rem;
    }
  `}
`;

const Slogan = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    font-size: ${typography.LARGE};
    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.REGULAR};
    }
  `}
`;

const Greet = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    font-family: 'Roboto Slab';
    font-size: ${typography.GIANT};
    font-weight: bold;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.X_LARGE};
    }
  `}
`;

const Pitch = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    font-size: ${typography.LARGE};
    text-align: center;
    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.REGULAR};
    }
  `}
`;

const LandingButton = styled(Button).attrs({ isPrimary: true })`
  ${({ theme: { breakpoints, typography } }) => css`
    font-size: ${typography.MEDIUM};
    font-weight: bold;
    padding: 0.7rem 2rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.REGULAR};
    }
  `}
`;

function Home(_: RouteComponentProps) {
  return (
    <LayoutContainer center fullHeight>
      <Landing>
        <Slogan>Collaborate. Fun. Grow</Slogan>
        <Greet>Welcome to Sharist!</Greet>
        <Pitch>
          One tool to collaborate with your <br />
          friends for your next travel plan.
        </Pitch>
        <LandingButton onClick={routes.plan.navigator}>Let's go!</LandingButton>
      </Landing>
    </LayoutContainer>
  );
}

export default Home;
