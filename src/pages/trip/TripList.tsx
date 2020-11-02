import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Joi from 'joi';
import styled, { css } from 'styled-components';

import { createTrip, getTrips } from './api';
import { Trip } from './types';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import { useForm } from '../../common/hooks/useForm';
import Button from '../../common/components/Button';
import EmptyState from '../../common/components/EmptyState';
import Form from '../../common/components/forms/Form';
import LayoutContainer from '../../common/components/LayoutContainer';
import Modal from '../../common/components/Modal';
import TextAreaInput from '../../common/components/forms/TextArea';
import TextInput from '../../common/components/forms/TextInput';
import TripCard from './components/TripCard';

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
      margin: 1.25rem 0;

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

const TripCards = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 3rem;

    & > * {
      height: 10rem;
      width: 18rem;
      margin: 0.5rem;

      @media screen and (max-width: ${breakpoints.MOBILE}) {
        width: 100%;
      }
    }
  `}
`;

interface CreateTripFormData {
  tripName: string;
  tripDescription: string;
}

function TripList(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();

  const [createTripModalVisible, setCeateTripModalVisible] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  const { errors, handleSubmit, register, reset: resetForm } = useForm<CreateTripFormData>({
    tripName: Joi.string().label('Name').required(),
    tripDescription: Joi.optional(),
  });

  const hiddenSubmitRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    getTrips().then(setTrips);
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

  async function onCreateTripClick({ tripName, tripDescription }: CreateTripFormData) {
    try {
      const createdTrip = await createTrip(tripName, tripDescription);
      setTrips([createdTrip, ...trips]);
      hideCreateTripModal();
      resetForm();
    } catch (error) {
      console.error(`Error creating trip: ${error.message}. Please try again later.`);
    }
  }

  return (
    <LayoutContainer center>
      <Wrapper>
        <PageTitle>
          Your trips{' '}
          <Button isPrimary onClick={showCreateTripModal}>
            Create Trip!
          </Button>
        </PageTitle>

        {trips.length === 0 && (
          <EmptyState
            title='Well, this is a bit empty 😥'
            subtitle="Let's brighten this page up by planning your next trip!"
            action={{ actionLabel: 'Start planning', actionHandler: showCreateTripModal }}
          />
        )}

        {trips.length !== 0 && (
          <TripCards>
            {trips.map((trip) => (
              <TripCard trip={trip} />
            ))}
          </TripCards>
        )}
      </Wrapper>

      <Modal
        hasCloseButton
        hide={hideCreateTripModal}
        isVisible={createTripModalVisible}
        title='Create trip'
        actions={[
          { label: 'Cancel', onClick: hideCreateTripModal },
          { label: 'Create', isPrimary: true, onClick: () => hiddenSubmitRef.current?.click() },
        ]}
      >
        <Form onSubmit={handleSubmit(onCreateTripClick)} hiddenSubmitRef={hiddenSubmitRef}>
          <CreateTripWrapper>
            <TextInput
              inputRef={register}
              name='tripName'
              label='Give this trip a name'
              placeholder='Family vacation to Venice, Italy'
              spellCheck
              type='text'
              errorMessage={errors.tripName?.message}
            />
            <TextAreaInput
              label='Tells us a bit more about this trip'
              name='tripDescription'
              placeholder='4-day trip to Venice for Summer 2022 with people I love!'
              spellCheck
              textAreaRef={register}
              errorMessage={errors.tripDescription?.message}
            />
          </CreateTripWrapper>
        </Form>
      </Modal>
    </LayoutContainer>
  );
}

export default TripList;
