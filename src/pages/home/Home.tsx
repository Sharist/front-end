import React from 'react';
import { RouteComponentProps } from '@reach/router';

import LayoutContainer from '../../components/LayoutContainer';
import Landing from './Landing';

function Home(_: RouteComponentProps) {
  return (
    <LayoutContainer center fullHeight floatingHeader noPadding noMargin isLanding>
      <Landing />
    </LayoutContainer>
  );
}

export default Home;
