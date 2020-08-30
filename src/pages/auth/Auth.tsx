import React, { useState, Dispatch, SetStateAction } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import Button from '../../components/Button';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import routes from '../../routes';
import styled, { css } from 'styled-components';
import TextInput from '../../components/forms/TextInput';

const AuthWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    align-self: center;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 35rem;
    padding: 3.5rem 5rem;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      align-self: flex-start;
      box-shadow: none;
      margin-top: 3rem;
      padding: 2rem;
    }
  `}
`;

const NextButton = styled(Button)`
  align-items: center;
  align-self: flex-end;
  display: flex;
  margin-top: 3rem;
  padding-bottom: 0rem;
  padding-left: 0.3rem;
`;

const LogoSubtitle = styled.p`
  margin-bottom: 3rem;
`;

type VerifyEmailProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

function VeirfyEmailPrompt({ email, setEmail }: VerifyEmailProps) {
  return (
    <>
      <LogoSubtitle>Please verify your email.</LogoSubtitle>
      <TextInput
        label='Email'
        placeholder='youremail@example.com'
        onChange={(e) => setEmail(e.target.value)}
        spellCheck={false}
        type='email'
        value={email}
      ></TextInput>

      <NextButton transparent>
        NEXT
        <IoIosArrowRoundForward />
      </NextButton>
    </>
  );
}

function Auth(_: RouteComponentProps) {
  const [email, setEmail] = useState('');

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <Logo onClick={routes.home.navigator} />

        <VeirfyEmailPrompt email={email} setEmail={setEmail} />
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default Auth;
