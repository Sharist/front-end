import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { AuthWrapper, LogoSubtitle } from './Auth';
import { get } from '../../common/http';
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
    async function verify() {
      try {
        const response = await get(`signin?token=${oneTimeToken}`);
        setIsVerifyingToken(false);
        setIsTokenValid(response.status === 200);

        // Navigate to home on successful signin
        setTimeout(routes.home.navigator, 5000);
      } catch (err) {
        setIsVerifyingToken(false);
        setIsTokenValid(false);
      }
    }

    verify();
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
