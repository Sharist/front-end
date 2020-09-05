import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { RouteComponentProps } from '@reach/router';

import Button from '../../components/Button';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import routes from '../../routes';
import styled, { css } from 'styled-components';
import TextInput from '../../components/forms/TextInput';

export const AuthWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    height: 26.5rem;
    max-width: 25rem;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      align-self: flex-start;
      margin-top: 3rem;
    }
  `}
`;

const NextButton = styled(Button)`
  align-self: flex-end;
  margin-top: 3rem;
`;

export const LogoSubtitle = styled.p<{ awaitingServer?: boolean }>`
  ${({ awaitingServer, theme: { palette } }) => css`
    margin-bottom: 3rem;
    text-align: center;
    color: ${awaitingServer ? palette.CLOUD_DARKER : palette.BLACK};
  `}
`;

function Auth(_: RouteComponentProps) {
  const [email, setEmail] = useState('');
  const [awaitingServer, setAwaitingServer] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  function handleNextClick() {
    setAwaitingServer(true);

    // TODO(samling): Acutally submit to server and act depending on response.
    setTimeout(() => setEmailSubmitted(true), 1000);
  }

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <Logo onClick={routes.home.navigator} />

        {emailSubmitted ? (
          <LogoSubtitle>Please check your email for instructions.</LogoSubtitle>
        ) : (
          <>
            <LogoSubtitle awaitingServer={awaitingServer}>Please verify your email.</LogoSubtitle>
            <TextInput
              label='Email'
              placeholder='youremail@example.com'
              disabled={awaitingServer}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNextClick();
                }
              }}
              spellCheck={false}
              type='email'
              value={email}
            ></TextInput>

            <NextButton isLoading={awaitingServer} transparent onClick={handleNextClick}>
              NEXT
              <IoIosArrowRoundForward />
            </NextButton>
          </>
        )}
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default Auth;
