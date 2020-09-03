import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { AuthWrapper, LogoSubtitle } from './Auth';
import LayoutContainer from '../../components/LayoutContainer';
import Logo from '../../components/header/Logo';
import routes from '../../routes';

type Props = {
  oneTimeToken?: string;
} & RouteComponentProps;

function VerifyEmail({ oneTimeToken }: Props) {
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    // TODO(samling): actually sending `oneTimeToken` to backend
    console.log(`There we go, here's your token: ${oneTimeToken}`);
    setTimeout(() => {
      setIsTokenValid(true);
      setIsVerifyingToken(false);
    }, 1000);
  }, [oneTimeToken]);

  const statusMessage = isTokenValid
    ? 'Thank you, your email was verified!'
    : "We couldn't recognize the link. Please try again.";

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <Logo onClick={routes.home.navigator} />
        {isVerifyingToken ? (
          <LogoSubtitle awaitingServer={true}>Verifying your personal link...</LogoSubtitle>
        ) : (
          <LogoSubtitle awaitingServer={false}>{statusMessage}</LogoSubtitle>
        )}
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default VerifyEmail;
