import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuthentication } from '../common/hooks/useAuthentication';
import IMap from '../components/IMap';
import LayoutContainer from '../components/LayoutContainer';

function Plan(_: RouteComponentProps) {
  const { signedIn } = useAuthentication();

  // Do not render if not signed in
  if (!signedIn) {
    return null;
  }

  return (
    <LayoutContainer fullHeight noMargin noPadding>
      <IMap />
    </LayoutContainer>
  );
}

export default Plan;
