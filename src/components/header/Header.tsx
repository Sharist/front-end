import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { navigate, useLocation } from '@reach/router';
import styled from 'styled-components';

import { Breakpoint } from '../../common/themes';
import { HeaderTitle, HeaderActions, SiteMapLink } from './HeaderComponents';
import Button from '../Button';
import HideAbove from '../helpers/HideAbove';
import HideBelow from '../helpers/HideBelow';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

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

function Header() {
  const location = useLocation();

  function handleNavigationClick(path: string) {
    if (location.pathname !== path) {
      navigate(path);
    }
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <HeaderTitle>
        <Logo onClick={() => handleNavigationClick('/')} />
        <HideBelow breakpoint={Breakpoint.MOBILE}>
          <SiteMapLink to=''>About</SiteMapLink>
          <SiteMapLink to=''>Product</SiteMapLink>
        </HideBelow>
      </HeaderTitle>

      <HeaderActions>
        <HideBelow breakpoint={Breakpoint.MOBILE}>
          <Button onClick={() => handleNavigationClick('/auth')} isPrimary>
            Sign up
          </Button>
          <Button onClick={() => handleNavigationClick('/auth')}>Log in</Button>
        </HideBelow>

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
