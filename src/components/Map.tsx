import styled, { css } from 'styled-components';

const MapFrame = styled.iframe.attrs({
  title: 'Map of shared locations',
  src:
    'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d43038.38783249317!2d-122.33261266137696!3d47.608648892571665!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1597302855325!5m2!1sen!2sus',
  scrolling: 'no',
})`
  ${({ theme: { breakpoints, palette } }) => css`
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.cloudDarker};
    box-shadow: 0 0 0.2rem ${palette.cloudDarker};
    height: 40rem;
    transition: height 1s;
    width: 100%;
    margin: 0 -10rem;

    @media screen and (max-width: ${breakpoints.tablet}) {
      height: 30rem;
    }
    @media screen and (max-width: ${breakpoints.mobile}) {
      height: 20rem;
    }
  `}
`;

export default MapFrame;
