import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import styled from 'styled-components';

import { Breakpoint } from '../../common/themes';
import { HeaderActions } from './HeaderComponents';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Button from '../Button';
import HideAbove from '../helpers/HideAbove';
import HideBelow from '../helpers/HideBelow';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import routes from '../../routes';

export const HEADER_HEIGHT_REM = 5;

const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${HEADER_HEIGHT_REM}rem;
  justify-content: space-between;
  margin: auto;
  padding: 0.5rem 1rem;
  transition: padding 1s;
  width: 100%;
`;

const HeaderActionButton = styled(Button)`
  margin: 0 0.5rem;
  width: 6rem;
`;

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signedIn } = useAuthentication();

  const headerActionContents = signedIn ? (
    <>
      <HeaderActionButton onClick={routes.signOut.navigator}>Sign out</HeaderActionButton>
      <HeaderActionButton isPrimary onClick={routes.plan.navigator}>
        Plan
      </HeaderActionButton>
    </>
  ) : (
    <>
      <HeaderActionButton onClick={routes.signUp.navigator} isPrimary>
        Sign up
      </HeaderActionButton>
      <HeaderActionButton onClick={routes.logIn.navigator}>Log in</HeaderActionButton>
    </>
  );

  return (
    <HeaderWrapper>
      <Logo onClick={routes.home.navigator} />
      <HeaderActions>
        <HideBelow breakpoint={Breakpoint.MOBILE}>{headerActionContents}</HideBelow>

        <HideAbove breakpoint={Breakpoint.MOBILE}>
          <IoIosMenu onClick={() => setMobileMenuOpen(true)} />
          <MobileMenu
            onDismiss={() => setMobileMenuOpen(false)}
            visible={mobileMenuOpen}
          ></MobileMenu>
        </HideAbove>
      </HeaderActions>
    </HeaderWrapper>
  );
}

export default Header;
