import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import Header from '../components/Header';
import Layout from '../components/Layout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MapView = styled.div`
  ${({ theme: { breakpoints, palette } }) => css`
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.cloudDarker};
    box-shadow: 0 0 0.2rem ${palette.cloudDarker};
    height: 35rem;
    width: 100%;
    transition: height 1s;

    @media screen and (max-width: ${breakpoints.tablet}) {
      height: 25rem;
    }
    @media screen and (max-width: ${breakpoints.mobile}) {
      height: 20rem;
    }
  `}
`;

const MapFrame = styled.iframe`
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;

function SharedLists(props: RouteComponentProps) {
  return (
    <>
      <Header />
      <Layout>
        <Wrapper>
          <MapView>
            <MapFrame
              title='Map of shared locations'
              width='100%'
              height='100%'
              src='https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d43038.38783249317!2d-122.33261266137696!3d47.608648892571665!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1597302855325!5m2!1sen!2sus'
              frameBorder='0'
              scrolling='no'
            ></MapFrame>
          </MapView>
        </Wrapper>
      </Layout>
    </>
  );
}

export default SharedLists;
