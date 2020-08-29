import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import Button from '../../components/Button';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import routes from '../../routes';
import styled, { css } from 'styled-components';
import TextInput from '../../components/forms/TextInput';

const AuthWrapper = styled.div`
  ${({ theme: { breakpoints, palette } }) => css`
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
      border: none;
      box-shadow: none;
      padding: 2rem;
      margin-top: 3rem;
    }

    & > * {
      margin-bottom: 3rem;
    }
  `}
`;

const NextButton = styled(Button)`
  align-self: flex-end;
  display: flex;
  align-items: center;
  padding-left: 0.3rem;
  padding-bottom: 0rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Auth(_: RouteComponentProps) {
  const [email, setEmail] = useState<string>('');

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <LogoWrapper>
          <Logo onClick={routes.home.navigator} />
          <p>Please verify your email.</p>
        </LogoWrapper>
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
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default Auth;
