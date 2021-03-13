import React, { useEffect, useRef, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import Joi from 'joi';
import styled, { css } from 'styled-components';

import { CardList } from '../../common/components/Card';
import { createTrip, deleteTrip, replaceTrip, getTrips } from './common/api';
import { mixins } from '../../common/styles/Theme';
import { Trip } from './common/models/Trip';
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

  const [createTripModalSubmitting, setCreateTripModalSubmitting] = useState(false);

  const [trips, setTrips] = useState<Trip[] | undefined>(undefined);

  const { errors, handleSubmit, register, reset: resetForm } = useForm<CreateTripFormData>({
    name: Joi.string().label('Name').required(),
    description: Joi.optional(),
  });

  const hiddenSubmitRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    getTrips()
      .then(setTrips)
      .catch((error) => console.log(error));
  }, []);

  if (!signedIn || !trips) {
    return null;
  }

  function openTripModal(editTrip?: Trip) {
    resetForm(editTrip);
    setCreateTripModalSubmitting(false);
    setTripModalSettings({ editTrip, visible: true });
  }

  function closeCreateTripModal() {
    resetForm({});
    setTripModalSettings({ ...tripModalSettings, visible: false });
  }

  async function onTripModalSubmit({ name, description }: CreateTripFormData) {
    try {
      setCreateTripModalSubmitting(true);
      const result = tripModalSettings.editTrip
        ? await replaceTrip(tripModalSettings.editTrip.clone({ name, description }))
        : await createTrip(new Trip(name, description));

      if (result) {
        const replica = trips ? [...trips] : [];
        const index = replica.findIndex(({ id }) => id === result.id);
        if (index >= 0) {
          replica[index] = result;
          setTrips(replica);
        } else {
          setTrips([result, ...replica]);
        }
      }

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
                onDelete={() => deleteTrip(trip)}
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
        confirmActionLoading={createTripModalSubmitting}
        confirmButtonText={tripModalSettings.editTrip ? 'Update' : 'Create'}
        hasCloseButton
        hide={closeCreateTripModal}
        isVisible={tripModalSettings.visible}
        title='Create trip'
      >
        <Form
          onSubmit={handleSubmit(onTripModalSubmit, () => setCreateTripModalSubmitting(false))}
          hiddenSubmitRef={hiddenSubmitRef}
        >
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
