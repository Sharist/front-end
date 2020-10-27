import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { AuthLogo, AuthWrapper, LogoSubtitle } from './Auth';
import { get, parseQueryString } from '../../common/http';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import LayoutContainer from '../../components/LayoutContainer';
import routes from '../../routes';

function VerifyEmail({ location }: RouteComponentProps) {
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const { refreshSignedInStatus } = useAuthentication({ requestLogin: false });
  const refreshSignedInStatusMemo = useCallback(refreshSignedInStatus, []);

  const { token } = parseQueryString(location?.search);

  useEffect(() => {
    async function verify() {
      try {
        if (!token) {
          throw new Error('Token not provided');
        }

        const response = await get(`signin?token=${token}`);
        setIsVerifyingToken(false);
        setIsTokenValid(response.status === 200);
        await refreshSignedInStatusMemo();

        // Navigate to home on successful signin
        routes.tripList.navigator();
      } catch (err) {
        setIsVerifyingToken(false);
        setIsTokenValid(false);
      }
    }

    verify();
  }, [token, refreshSignedInStatusMemo]);

  const statusMessage = !isTokenValid && "We couldn't recognize the link. Please try again.";

  return (
    <LayoutContainer center fullHeight noHeader noMargin>
      <AuthWrapper>
        <AuthLogo onClick={routes.home.navigator} />
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
