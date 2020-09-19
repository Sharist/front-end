import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import Landing from './Landing';
import LayoutContainer from '../../components/LayoutContainer';
import routes from '../../routes';

function Home(_: RouteComponentProps) {
  const { signedIn } = useAuthentication({ requestLogin: false });

  useEffect(() => {
    signedIn && routes.plan.navigator();
  }, [signedIn]);

  return (
    <LayoutContainer center fullHeight floatingHeader noPadding noMargin isLanding>
      <Landing />
    </LayoutContainer>
  );
}

export default Home;
