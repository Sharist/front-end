import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';
import Joi from 'joi';
import styled, { css } from 'styled-components';

import { post } from '../../common/http';
import { useForm } from '../../common/hooks/useForm';
import Button from '../../components/Button';
import Form from '../../components/forms/Form';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import routes from '../../routes';
import TextInput from '../../components/forms/TextInput';

export const AuthWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    height: 26.5rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      align-self: flex-start;
      margin-top: 3rem;
    }
  `}
`;

export const AuthLogo = styled(Logo)`
  height: 2rem;
  margin-bottom: 1rem;
`;

const AuthForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  width: 25rem;
`;

const NextButton = styled(Button)`
  align-self: flex-end;
  margin-top: 3rem;
`;

export const LogoSubtitle = styled.p<{ awaitingServer?: boolean }>`
  ${({ awaitingServer, theme: { palette } }) => css`
    margin-bottom: 3rem;
    text-align: center;
    color: ${awaitingServer ? palette.ash.darker.css : palette.black.css};
  `}
`;

interface AuthFormData {
  email: string;
}

function Auth({ path }: RouteComponentProps) {
  const [awaitingServer, setAwaitingServer] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const { errors, register, handleSubmit } = useForm<AuthFormData>({
    email: Joi.string()
      .label('Email')
      .email({ tlds: { allow: false } })
      .required(),
  });

  async function handleNextClick({ email }: AuthFormData) {
    setAwaitingServer(true);

    const endpoint = path === '/signup' ? 'signup' : 'signin-request';

    await post(endpoint, { email });
    setEmailSubmitted(true);
  }

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <AuthLogo onClick={routes.home.navigator} />

        {emailSubmitted ? (
          <LogoSubtitle>Please check your email for instructions.</LogoSubtitle>
        ) : (
          <>
            <LogoSubtitle awaitingServer={awaitingServer}>Please verify your email.</LogoSubtitle>
            <AuthForm onSubmit={handleSubmit(handleNextClick)}>
              <TextInput
                disabled={awaitingServer}
                errorMessage={errors.email?.message}
                inputRef={register}
                label='Email'
                name='email'
                placeholder='youremail@example.com'
                spellCheck={false}
              ></TextInput>

              <NextButton type='submit' isLoading={awaitingServer} transparent>
                NEXT
                <IoIosArrowRoundForward />
              </NextButton>
            </AuthForm>
          </>
        )}
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default Auth;
