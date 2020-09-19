import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import Landing from './Landing';
import LayoutContainer from '../../components/LayoutContainer';
import routes from '../../routes';
import styled from 'styled-components';

const MultiSection = styled.div`
  height: 100%;
  width: 100%;
`;

function Home(_: RouteComponentProps) {
  const { signedIn } = useAuthentication({ requestLogin: false });

  useEffect(() => {
    signedIn && routes.plan.navigator();
  }, [signedIn]);

  return (
    <LayoutContainer center floatingHeader fullHeight isLanding noMargin noPadding>
      <MultiSection>
        <Landing />
      </MultiSection>
    </LayoutContainer>
  );
}

export default Home;
