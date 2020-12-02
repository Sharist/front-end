import React, { useEffect, useRef, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import Joi from 'joi';
import styled, { css } from 'styled-components';

import { CardList } from '../../common/components/Card';
import { createTrip, deleteTrip, replaceTrip, getTrips } from './common/api';
import { mixins } from '../../common/styles/Theme';
import { Trip } from './common/types';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import { useForm } from '../../common/hooks/useForm';
import EmptyState from '../../common/components/EmptyState';
import FloatingActionButton from '../../common/components/FloatingActionButton';
import Form from '../../common/components/forms/Form';
import LayoutContainer from '../../common/components/LayoutContainer';
import Modal from '../../common/components/Modal';
import TextAreaInput from '../../common/components/forms/TextArea';
import TextInput from '../../common/components/forms/TextInput';
import TripCard from './components/TripCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  width: 100%;

  ${mixins.belowTablet} {
    padding: 0.5rem;
  }

  ${mixins.belowMobile} {
    padding: 0;
  }
`;

const PageTitle = styled.div`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.XX_LARGE};
    margin-top: 1rem;
    font-weight: 400;
  `}
`;

const CreateTripWrapper = styled.div`
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

  ${mixins.belowMobile} {
    width: 100%;
  }
`;

const TripCardList = styled(CardList)`
  margin: 2rem 0;
`;

interface CreateTripFormData {
  name: string;
  description: string;
}

function TripList(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();

  const [tripModalSettings, setTripModalSettings] = useState<{ visible: boolean; editTrip?: Trip }>(
    { visible: false }
  );

  const [trips, setTrips] = useState<Trip[]>([]);

  const { errors, handleSubmit, register, reset: resetForm } = useForm<CreateTripFormData>({
    name: Joi.string().label('Name').required(),
    description: Joi.optional(),
  });

  const hiddenSubmitRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    refreshTrips();
  }, []);

  if (!signedIn) {
    return null;
  }

  async function refreshTrips() {
    setTrips(await getTrips());
  }

  function openTripModal(editTrip?: Trip) {
    resetForm(editTrip);
    setTripModalSettings({ editTrip, visible: true });
  }

  function closeCreateTripModal() {
    resetForm({});
    setTripModalSettings({ ...tripModalSettings, visible: false });
  }

  async function onTripModalSubmit({ name, description }: CreateTripFormData) {
    try {
      const tripId = tripModalSettings.editTrip?.id;

      tripId
        ? await replaceTrip(tripId, { name, description })
        : await createTrip({ name, description });

      await refreshTrips();
      closeCreateTripModal();
    } catch (error) {
      console.error(`Error creating trip: ${error.message}. Please try again later.`);
    }
  }

  return (
    <LayoutContainer adaptiveWidth center>
      <Wrapper>
        <PageTitle>Your trips</PageTitle>

        {trips.length === 0 && (
          <EmptyState
            title='Well, this is a bit empty 😥'
            subtitle="Let's brighten this page up by planning your next trip!"
            action={{ actionLabel: 'Start planning', actionHandler: openTripModal }}
          />
        )}

        {trips.length !== 0 && (
          <TripCardList>
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={async () => {
                  deleteTrip(trip);
                  await refreshTrips();
                }}
                onEdit={() => openTripModal(trip)}
              />
            ))}
          </TripCardList>
        )}

        <FloatingActionButton
          isPrimary
          icon={IoIosAdd}
          label='Create trip'
          onClick={openTripModal}
        />
      </Wrapper>

      <Modal
        cancelAction={closeCreateTripModal}
        confirmAction={() => hiddenSubmitRef.current?.click()}
        confirmButtonText={tripModalSettings.editTrip ? 'Update' : 'Create'}
        hasCloseButton
        hide={closeCreateTripModal}
        isVisible={tripModalSettings.visible}
        title='Create trip'
      >
        <Form onSubmit={handleSubmit(onTripModalSubmit)} hiddenSubmitRef={hiddenSubmitRef}>
          <CreateTripWrapper>
            <TextInput
              inputRef={register}
              name='name'
              label='Give this trip a name'
              placeholder='Family vacation to Venice, Italy'
              spellCheck
              type='text'
              errorMessage={errors.name?.message}
            />
            <TextAreaInput
              label='Tells us a bit more about this trip'
              name='description'
              placeholder='4-day trip to Venice for Summer 2022 with people I love!'
              spellCheck
              textAreaRef={register}
              errorMessage={errors.description?.message}
            />
          </CreateTripWrapper>
        </Form>
      </Modal>
    </LayoutContainer>
  );
}

export default TripList;
