import { RouteComponentProps } from '@reach/router';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import { useCallback, useEffect } from 'react';

import { post } from '../../common/http';
import routes from '../../routes';

function SignOut(_: RouteComponentProps) {
  const { refreshSignedInStatus } = useAuthentication();
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
