import styled, { css } from 'styled-components';

const Logo = styled.span.attrs({ className: 'noselect' })`
  ${({ theme: { breakpoints, palette, typography } }) => css`
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: ${typography.X_LARGE};
    font-weight: 300;
    text-transform: uppercase;
    padding: 0.5rem;
    text-shadow: 0 0 0.15rem ${palette.CLOUD_DARKER};
    transition: background-color 0.1s, color 0.1s, text-shadow 0.1s;

    &::after {
      content: 'Sharist';
    }

    @media screen and (max-width: ${breakpoints.MOBILE}) {
      padding: 0.25rem;
    }
  `}
`;

export default Logo;
