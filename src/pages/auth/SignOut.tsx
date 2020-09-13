import { RouteComponentProps } from '@reach/router';
import { useContext, useEffect } from 'react';

import { post } from '../../common/http';
import ApplicationContext from '../../components/contexts/ApplicationContext';
import routes from '../../routes';

function SignOut(_: RouteComponentProps) {
  const { refreshStates } = useContext(ApplicationContext);
  useEffect(() => {
    async function signOut() {
      try {
        await post('signout');
        await refreshStates('isSignedIn');
      } catch (e) {
      } finally {
        routes.home.navigator();
      }
    }

    signOut();
  });

  return null;
}

export default SignOut;
