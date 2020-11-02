import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wheel = styled.div`
  ${({ theme: { palette } }) => css`
    animation: ${spin} 0.75s linear infinite;
    border: 0.175rem solid ${palette.grey.darker.css};
    border-bottom-color: ${palette.transparent.css};
    border-right-color: ${palette.transparent.css};
    border-radius: 50%;
    opacity: 0.9;
    padding: 0.5rem;
  `}
`;

export default Wheel;
