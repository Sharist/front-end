import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled, { css } from 'styled-components';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import EmptyState from '../../components/EmptyState';
import LayoutContainer from '../../components/LayoutContainer';
import Modal from '../../components/Modal';
import TextInput from '../../components/forms/TextInput';
import TextAreaInput from '../../components/forms/TextArea';

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

const CreateTripWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 30rem;

    & > * {
      margin: 1.5rem 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      width: 100%;
    }
  `};
`;

function TripList(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();
  const [trips, setTrips] = useState<any[]>([]);
  const [createTripModalVisible, setCeateTripModalVisible] = useState(true);
  const [tripTitle, setTripTitle] = useState('');
  const [tripDescription, setTripDescription] = useState('');

  useEffect(() => {
    // Fetch trips
    setTrips([]);
  }, []);

  if (!signedIn) {
    return null;
  }

  function showCreateTripModal() {
    setCeateTripModalVisible(true);
  }

  function hideCreateTripModal() {
    setCeateTripModalVisible(false);
  }

  function createTrip() {
    alert(`Trip title: ${tripTitle}, trip description: ${tripDescription}`);
    hideCreateTripModal();
  }

  return (
    <LayoutContainer center>
      <Wrapper>
        <PageTitle>Your trips</PageTitle>

        {trips.length === 0 && (
          <EmptyState
            title='Well, this is a bit empty 😥'
            subtitle="Let's brighten this page up by planning your next trip!"
            action={{ actionLabel: 'Start planning', actionHandler: showCreateTripModal }}
          />
        )}
      </Wrapper>

      <Modal
        hasCloseButton
        hide={hideCreateTripModal}
        isVisible={createTripModalVisible}
        title='Create trip'
        actions={[
          { label: 'Cancel', onClick: hideCreateTripModal },
          { label: 'Create', isPrimary: true, onClick: createTrip },
        ]}
      >
        <CreateTripWrapper>
          <TextInput
            label='Where are you heading to?'
            onChange={(e) => setTripTitle(e.target.value)}
            placeholder='Family vacation to Venice, Italy'
            required
            spellCheck
            type='text'
            value={tripTitle}
          />
          <TextAreaInput
            label='Tell us more about this trip!'
            onChange={(e) => setTripDescription(e.target.value)}
            placeholder='4-day trip to Venice for Summer 2022 with people I love!'
            spellCheck
            value={tripDescription}
          />
        </CreateTripWrapper>
      </Modal>
    </LayoutContainer>
  );
}

export default TripList;
