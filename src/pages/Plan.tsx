import React from 'react';
import { RouteComponentProps } from '@reach/router';

import LayoutContainer from '../components/LayoutContainer';
import IMap from '../components/IMap';

type Props = RouteComponentProps;

function Plan(_: Props) {
  return (
    <LayoutContainer fullHeight noMargin noPadding>
      <IMap />
    </LayoutContainer>
  );
}

export default Plan;
