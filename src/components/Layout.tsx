import styled from 'styled-components';

import breakpoints from '../common/breakpoints';

const Layout = styled.div`
  margin: 1rem auto;
  padding: 0 2rem;
  transition: padding 1s;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

export default Layout;