import { Link } from '@reach/router';
import styled, { css } from 'styled-components';

import { HEADER_HEIGHT_REM } from './Header';

export const HeaderWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    height: ${HEADER_HEIGHT_REM}rem;
    justify-content: space-between;
    margin: auto;
    padding: 0.5rem 1rem;
    transition: padding 1s;
    width: 100%;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0.5rem;
    }
  `}
`;

export const HeaderTitle = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 20rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      width: unset;
    }
  `}
`;

export const SiteMapLink = styled(Link)`
  ${({ theme: { palette, typography } }) => css`
    border-bottom: 0.05rem solid transparent;
    color: ${palette.GREY_DARKER};
    font-size: ${typography.MEDIUM};
    margin: 0.5rem;
    text-decoration: none;
    transition: border-bottom 200ms, color 200ms;

    &:visited {
      color: !unset;
    }

    &:hover {
      border-bottom: 0.05rem solid ${palette.GREY_DARKER};
      color: ${palette.BLACK};
    }
  `}
`;

export const Logo = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { breakpoints, palette, typography } }) => css`
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: ${typography.X_LARGE};
    font-weight: 300;
    padding: 0.5rem;
    text-shadow: 0 0 0.15rem ${palette.CLOUD_DARKER};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0.25rem;
    }
  `}
`;

export const HeaderActions = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 12.5rem;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 2rem;
      padding: 0.25rem;
      width: unset;
    }
  `}
`;
