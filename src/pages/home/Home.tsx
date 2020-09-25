import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { useAuthentication } from '../../common/hooks/useAuthentication';
import HowToUse from './HowToUse';
import Landing from './Landing';
import LayoutContainer from '../../components/LayoutContainer';
import ReasonToUse from './ReasonToUse';
import routes from '../../routes';

const MultiSection = styled.div`
  width: 100%;
`;

function Home(_: RouteComponentProps) {
  const { signedIn } = useAuthentication({ requestLogin: false });

  useEffect(() => {
    signedIn && routes.planEdit.navigator();
  }, [signedIn]);

  return (
    <LayoutContainer center floatingHeader fullHeight isLanding noMargin noPadding>
      <MultiSection>
        <Landing />
        <ReasonToUse />
        <HowToUse />
      </MultiSection>
    </LayoutContainer>
  );
}

export default Home;
