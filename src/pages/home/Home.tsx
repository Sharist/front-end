import React from 'react';

import Header from '../../components/Header';
import Layout from '../../components/Layout';
import styled from 'styled-components';
import breakpoints from '../../common/breakpoints';


const Hero = styled.div<{ large: boolean }>`
  ${({ theme: { palette, spacing }, large }) => `
    align-items: center;
    background-color: ${palette.teal};
    border-radius: 0.3rem;
    box-sizing: border-box;
    color: ${palette.cloudLighter};
    text-shadow: 0 0 0.2rem ${palette.cloudLighter};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${spacing.xlarge};
    width: 100%;

    & > :first-child {
      margin-top: ${large ? '12rem' : '5rem'};
    }
    
    & > :last-child {
      margin-bottom: ${large ? '12rem' : '5rem'};
    }
`}`;

const HeroTitle = styled.div`
  ${({ theme: { typography } }) => `
    font-size: calc(${typography.large} * 2);
    font-weight: 300;
    @media screen and (max-width: ${breakpoints.mobile}) {
      font-size: calc(${typography.large} * 1.5);
    }
  `}`;

function Home() {
  return (
    <>
      <Header />
      <Layout>
        <Hero large>
          <HeroTitle>Welcome to Sharist!</HeroTitle>
          <p>Share your locations with your friends</p>
        </Hero>
      </Layout>
    </>
  );
}

export default Home;