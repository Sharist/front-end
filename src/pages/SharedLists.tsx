import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import PeopleCard from '../components/cards/PeopleCard';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Map from '../components/Map';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.div`
  ${({ theme: { breakpoints, spacing } }) => css`
    display: flex;
    flex-direction: column;
    max-width: 1500px;
    padding: ${spacing.large};
    transition: padding 0.5s;

    @media screen and (max-width: ${breakpoints.mobile}) {
      padding: ${spacing.medium};
    }
  `}
`;

const Title = styled.p`
  ${({ theme: { spacing, typography } }) => css`
    font-size: ${typography.giant};
    font-weight: ${typography.light};
    margin: ${spacing.small} 0;
  `}
`;

const List = styled.div`
  ${({ theme: { breakpoints, spacing } }) => css`
    border-radius: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    & > * {
      margin: ${spacing.small};
      max-width: 23rem;

      @media screen and (max-width: ${breakpoints.tablet}) {
        max-width: 100%;
        width: 100%;
      }
    }
  `}
`;

function SharedLists(_: RouteComponentProps) {
  return (
    <>
      <Header />
      <Layout>
        <Wrapper>
          <Map />
          <Section id='people-list'>
            <Title>People</Title>
            <List>
              <PeopleCard
                name='Hermione Granger'
                description='A Muggle-born Gryffindor, who becomes best friends with Harry Potter and Ron Weasley.'
              />
              <PeopleCard name='Katniss Everdeen' description='Katniss from District 12.' />
              <PeopleCard
                imageUrl='https://www.w3schools.com/howto/img_avatar.png'
                name='Harry Potter'
                description='A boy who lives in the fictional town of Little Whinging, Surrey with his aunt, uncle, and cousin.'
              />
              <PeopleCard
                imageUrl='https://www.w3schools.com/howto/img_avatar.png'
                name='Sam Fisher'
                description='Former employee of Third Echelon.'
              />
            </List>
          </Section>
        </Wrapper>
      </Layout>
    </>
  );
}

export default SharedLists;
