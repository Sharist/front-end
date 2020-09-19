import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import LandingBackground from '../../resources/images/home/landing-background-1.jpg';

const LandingWrapper = styled.div<{ loaded: boolean }>`
  ${({ loaded, theme: { palette } }) => css`
    align-items: center;
    background-color: ${loaded ? '' : palette.CLOUD};
    display: flex;
    height: 100%;
    justify-content: center;
    transition: background-color 750ms;
    width: 100%;
  `}
`;

const Background = styled.img<{ loaded: boolean }>`
  ${({ loaded: imageLoaded }) => css`
    height: 100%;
    object-fit: cover;
    object-position: 50% 75%;
    opacity: ${imageLoaded ? 1 : 0};
    position: absolute;
    transition: opacity 800ms;
    width: 100%;
    z-index: -100;
  `}
`;

const Prompt = styled.div.attrs({ className: 'noselect' })`
  ${({ theme: { palette } }) => css`
    align-items: center;
    color: ${palette.WHITE};
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Slab';
    justify-content: center;
    text-shadow: 0 0 1rem ${palette.BLACK};
    z-index: -10;
  `}
`;

const Title = styled.div<{ loaded: boolean }>`
  ${({ loaded, theme: { breakpoints } }) => css`
    font-size: 2.75rem;
    margin: 0.5rem;
    opacity: ${loaded ? 1 : 0};
    transition: opacity 750ms 400ms;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 2.2rem;
      margin: 0.25rem;
    }
  `}
`;

const Subtitle = styled.div<{ loaded: boolean }>`
  ${({ loaded, theme: { breakpoints } }) => css`
    font-size: 1.5rem;
    margin: 0.5rem;
    opacity: ${loaded ? 1 : 0};
    text-align: center;
    transition: opacity 750ms 800ms;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 1.25rem;
      margin: 0rem;
    }
  `}
`;

function Landing() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <LandingWrapper loaded={imageLoaded}>
      <Prompt>
        <Title loaded={imageLoaded}>Welcome to Sharist</Title>
        <Subtitle loaded={imageLoaded}>Adventurers in collaboration</Subtitle>
      </Prompt>

      <Background
        loaded={imageLoaded}
        onLoad={() => setImageLoaded(true)}
        src={LandingBackground}
      />
    </LandingWrapper>
  );
}

export default Landing;
