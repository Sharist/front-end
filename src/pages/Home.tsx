import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import Button from '../components/Button';
import LayoutContainer from '../components/LayoutContainer';

const Landing = styled.div`
  ${({ theme: { breakpoints, typography } }) => css`
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: space-between;
    width: 100%;

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
    font-weight: ${typography.BOLD};

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

const LandingButton = styled(Button)`
  ${({ theme: { breakpoints, typography } }) => css`
    font-size: ${typography.MEDIUM};
    font-weight: ${typography.BOLD};
    padding: 0.7rem 2rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: ${typography.REGULAR};
    }
  `}
`;

function Home(_: RouteComponentProps) {
  return (
    <LayoutContainer fullHeight>
      <Landing>
        <Slogan>Collaborate. Fun. Grow</Slogan>
        <Greet>Welcome to Sharist!</Greet>
        <Pitch>
          One tool to collaborate with your <br />
          friends for your next travel plan.
        </Pitch>
        <LandingButton onClick={() => navigate('/plan')}>Let's go!</LandingButton>
      </Landing>
    </LayoutContainer>
  );
}

export default Home;
