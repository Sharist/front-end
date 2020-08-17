import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import PeopleCard from '../components/cards/PeopleCard';
import Header from '../components/Header';
import Layout from '../components/Layout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MapFrame = styled.iframe.attrs({
  title: 'Map of shared locations',
  src:
    'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d43038.38783249317!2d-122.33261266137696!3d47.608648892571665!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1597302855325!5m2!1sen!2sus',
  scrolling: 'no',
})`
  ${({ theme: { breakpoints, palette } }) => css`
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.cloudDarker};
    box-shadow: 0 0 0.2rem ${palette.cloudDarker};
    height: 35rem;
    transition: height 1s;
    width: 100%;

    @media screen and (max-width: ${breakpoints.tablet}) {
      height: 25rem;
    }
    @media screen and (max-width: ${breakpoints.mobile}) {
      height: 20rem;
    }
  `}
`;

const People = styled.div`
  ${({ theme: { spacing } }) => css`
    display: flex;
    flex-direction: column;
    padding: ${spacing.medium};
  `}
`;

const Title = styled.p`
  ${({ theme: { spacing, typography } }) => css`
    font-size: ${typography.giant};
    font-weight: ${typography.light};
    margin-bottom: ${spacing.small};
  `}
`;

const PeopleList = styled.div`
  ${({ theme: { breakpoints, spacing } }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > * {
      margin: ${spacing.small};
      width: calc(33% - ${spacing.small} * 2);

      @media screen and (max-width: ${breakpoints.regular}) {
        width: calc(50% - ${spacing.small} * 2);
      }

      @media screen and (max-width: ${breakpoints.tablet}) {
        width: calc(100% - ${spacing.small} * 2);
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
          <MapFrame />
          <People>
            <Title>People</Title>
            <PeopleList>
              <PeopleCard
                name='Hermione Granger'
                description='A Muggle-born Gryffindor, who becomes best friends with Harry Potter and Ron Weasley. After Harry and Ron save her from a mountain troll in the girls restroom, she becomes best friends with them'
              />
              <PeopleCard
                name='Katniss Everdeen'
                description='Katniss and her family come from District 12, a coal-mining district that is the poorest and least populated district in the dystopian fictional autocratic nation of Panem.'
              />
              <PeopleCard
                imageUrl='https://www.w3schools.com/howto/img_avatar.png'
                name='Harry Potter'
                description='A boy who lives in the fictional town of Little Whinging, Surrey with his aunt, uncle, and cousin – the Dursleys – and discovers at the age of eleven that he is a wizard, though he lives in the ordinary world of non-magical people known as Muggles.'
              />
              <PeopleCard
                imageUrl='https://www.w3schools.com/howto/img_avatar.png'
                name='Sam Fisher'
                description='Former employee of Third Echelon, a top-secret black bag operation sub-branch within the National Security Agency (NSA) and a former member of its subsequent "Splinter Cell" program.'
              />
            </PeopleList>
          </People>
        </Wrapper>
      </Layout>
    </>
  );
}

export default SharedLists;
