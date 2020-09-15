import { RouteComponentProps } from '@reach/router';
import { useCallback, useEffect } from 'react';

import { post } from '../../common/http';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import routes from '../../routes';

function SignOut(_: RouteComponentProps) {
  const { refreshSignedInStatus } = useAuthentication({ requestLogin: false });
  const refreshSignedInStatusMemo = useCallback(refreshSignedInStatus, []);

  useEffect(() => {
    async function signOut() {
      try {
        await post('signout');
      } catch (e) {
        // No need to handle
      } finally {
        await refreshSignedInStatusMemo();
        routes.home.navigator();
      }
    }

    signOut();
  }, [refreshSignedInStatusMemo]);

  return null;
}

export default SignOut;
