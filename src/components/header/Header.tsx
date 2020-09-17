import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import styled, { css } from 'styled-components';

import { Breakpoint, Palette } from '../../common/themes';
import { HeaderActions } from './HeaderComponents';
import { useAuthentication } from '../../common/hooks/useAuthentication';
import Button from '../Button';
import HideAbove from '../helpers/HideAbove';
import HideBelow from '../helpers/HideBelow';
import Logo, { LogoType } from './Logo';
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

const HeaderActionButton = styled(Button).attrs((prop: { isLanding: boolean }) => ({
  ...prop,
  transparent: prop.isLanding,
}))`
  ${({ isLanding, theme: { palette } }) => css`
    margin: 0 0.5rem;
    width: ${isLanding ? '4rem' : '6rem'};
    color: ${isLanding ? palette.WHITE : '!unset'};
  `}
`;

const MobileMenuHamburgerIcon = styled(IoIosMenu)<{ color: Palette }>`
  ${({ color }) => css`
    color: ${color};
  `}
`;

type Props = {
  className?: string;
  isLanding?: boolean;
};

function Header({ className, isLanding = false }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signedIn } = useAuthentication({ requestLogin: false });

  const headerActionContents = signedIn ? (
    <>
      <HeaderActionButton isLanding={isLanding} onClick={routes.signOut.navigator}>
        Sign out
      </HeaderActionButton>
      <HeaderActionButton isPrimary isLanding={isLanding} onClick={routes.plan.navigator}>
        Plan
      </HeaderActionButton>
    </>
  ) : (
    <>
      <HeaderActionButton isPrimary isLanding={isLanding} onClick={routes.signUp.navigator}>
        Sign up
      </HeaderActionButton>
      <HeaderActionButton isLanding={isLanding} onClick={routes.logIn.navigator}>
        Log in
      </HeaderActionButton>
    </>
  );

  const logoType = isLanding ? LogoType.MONO_WHITE : LogoType.REGULAR;

  return (
    <HeaderWrapper className={className}>
      <Logo logoType={logoType} onClick={routes.home.navigator} />
      <HeaderActions>
        <HideBelow breakpoint={Breakpoint.MOBILE}>{headerActionContents}</HideBelow>

        <HideAbove breakpoint={Breakpoint.MOBILE}>
          <MobileMenuHamburgerIcon
            color={isLanding ? Palette.WHITE : Palette.REGULAR}
            onClick={() => setMobileMenuOpen(true)}
          />
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
