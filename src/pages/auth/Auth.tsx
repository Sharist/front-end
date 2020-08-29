import React, { useState } from 'react';
import { RouteComponentProps, useLocation, navigate } from '@reach/router';
import { IoIosArrowRoundForward } from 'react-icons/io';

import Button from '../../components/Button';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import styled, { css } from 'styled-components';
import TextInput from '../../components/forms/TextInput';

const AuthWrapper = styled.div`
  ${({ theme: { breakpoints, palette } }) => css`
    align-items: center;
    align-self: center;
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.CLOUD};
    box-shadow: 0 0 0.3rem ${palette.CLOUD};
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
  ${({ theme: { palette } }) => css`
    align-self: flex-end;
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    padding-bottom: 0rem;

    &:hover,
    &:focus,
    &:active {
      border-bottom: 0.05rem solid ${palette.CLOUD_DARKER};
      box-shadow: 0 0.15rem 0.15rem -0.15rem ${palette.CLOUD};
    }
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Auth(_: RouteComponentProps) {
  const [email, setEmail] = useState<string>('');

  const location = useLocation();
  function handleNavigationClick(path: string) {
    if (location.pathname !== path) {
      navigate(path);
    }
  }

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <LogoWrapper>
          <Logo onClick={() => handleNavigationClick('/')} />
          <p>Please verify your email</p>
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
          NEXT <IoIosArrowRoundForward />
        </NextButton>
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default Auth;
