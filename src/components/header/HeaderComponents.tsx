import { Link } from '@reach/router';
import styled, { css } from 'styled-components';

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

export const HeaderActions = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    justify-content: space-around;

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      font-size: 2rem;
      padding: 0.25rem;
      width: unset;
    }
  `}
`;
