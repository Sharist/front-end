import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link } from '@reach/router';
import styled, { css } from 'styled-components';

const MobileMenuShadow = styled.div<{ visible: boolean }>`
  ${({ visible, theme: { palette } }) => css`
    background-color: ${palette.GREY_DARKER};
    bottom: 0;
    left: 0;
    opacity: ${visible ? 0.3 : 0};
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 500ms, z-index 0ms ${visible ? '0ms' : '500ms'};
    z-index: ${visible ? 999 : -1000};
  `}
`;

const MobileMenuPane = styled.div<{ visible: boolean }>`
  ${({ visible, theme: { palette } }) => css`
    background-color: white;
    bottom: 0;
    box-shadow: 0 0 2rem ${visible ? palette.GREY_DARKER : 'transparent'};
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    left: 20%;
    padding: 1rem 2rem;
    position: fixed;
    right: 0;
    top: 0;
    transform: ${visible ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 500ms, box-shadow ease-out 500ms;
    z-index: 1000;
  `}
`;

const MobileMenuSection = styled.div`
  ${({ theme: { palette } }) => css`
    align-items: flex-end;
    border-bottom: 0.05rem solid ${palette.CLOUD_LIGHTER};
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0.75rem;
    padding-bottom: 1rem;

    &:first-child {
      border-bottom: none;
      padding-bottom: 0rem;
      margin-right: 1.25rem;
    }

    &:not(:first-child) > * {
      margin: 0.5rem 0rem;
    }
  `}
`;

const MobileSiteMapLink = styled(Link)`
  ${({ theme: { palette, typography } }) => css`
    border-radius: 0.25rem;
    box-sizing: border-box;
    color: ${palette.GREY_DARKER};
    font-size: ${typography.MEDIUM};
    padding: 0.5rem 1rem;
    text-align: right;
    text-decoration: none;
    transition: background-color 150ms;

    &:active {
      background-color: ${palette.CLOUD_LIGHTER};
    }

    &:visited {
      color: ${palette.GREY_DARKER};
    }
  `}
`;

type Props = {
  onDismiss: (e?: React.MouseEvent<HTMLDivElement | SVGElement>) => void;
  visible: boolean;
};

function MobileMenu({ onDismiss, visible }: Props) {
  return (
    <>
      <MobileMenuShadow onClick={onDismiss} visible={visible}></MobileMenuShadow>

      <MobileMenuPane visible={visible}>
        <MobileMenuSection>
          <IoMdClose onClick={onDismiss}></IoMdClose>
        </MobileMenuSection>

        <MobileMenuSection>
          <MobileSiteMapLink to=''>Sign up</MobileSiteMapLink>
          <MobileSiteMapLink to=''>Log in</MobileSiteMapLink>
        </MobileMenuSection>

        <MobileMenuSection>
          <MobileSiteMapLink to='/'>Home</MobileSiteMapLink>
          <MobileSiteMapLink to='/plan'>Plan</MobileSiteMapLink>
        </MobileMenuSection>

        <MobileMenuSection>
          <MobileSiteMapLink to=''>About</MobileSiteMapLink>
          <MobileSiteMapLink to=''>Product</MobileSiteMapLink>
        </MobileMenuSection>
      </MobileMenuPane>
    </>
  );
}

export default MobileMenu;
