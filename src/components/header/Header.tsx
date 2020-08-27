import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { navigate, useLocation } from '@reach/router';

import { Breakpoint } from '../../common/themes';
import Button from '../Button';
import HideAbove from '../helpers/HideAbove';
import HideBelow from '../helpers/HideBelow';
import MobileMenu from './MobileMenu';

import { HeaderWrapper, HeaderTitle, HeaderActions, SiteMapLink, Logo } from './HeaderComponents';

export const HEADER_HEIGHT_REM = 5;

function Header() {
  const location = useLocation();

  function handleLogoClick() {
    location.pathname !== '/' && navigate('/');
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          <Logo onClick={handleLogoClick}>SHARIST</Logo>
          <HideBelow breakpoint={Breakpoint.MOBILE}>
            <SiteMapLink to=''>About</SiteMapLink>
            <SiteMapLink to=''>Product</SiteMapLink>
          </HideBelow>
        </HeaderTitle>

        <HeaderActions>
          <HideBelow breakpoint={Breakpoint.MOBILE}>
            <Button isPrimary>Sign up</Button>
            <Button>Log in</Button>
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
    </>
  );
}

export default Header;
