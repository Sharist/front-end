import React from 'react';
import { RouteComponentProps } from '@reach/router';

import LayoutContainer from '../components/LayoutContainer';
import IMap from '../components/IMap';

function Plan(_: RouteComponentProps) {
  return (
    <LayoutContainer fullHeight noMargin noPadding>
      <IMap />
    </LayoutContainer>
  );
}

export default Plan;
