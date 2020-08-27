import React, { ReactChild, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { pxToRem } from '../common/dimensions';
import Header, { HEADER_HEIGHT_REM } from './header/Header';

type BaseLayoutProps = {
  fullHeight: boolean;
  noMargin: boolean;
  noPadding: boolean;
  windowHeight?: number;
};

const BaseLayout = styled.div<BaseLayoutProps>`
  ${({
    fullHeight,
    noMargin,
    noPadding,
    windowHeight = window.innerHeight,
    theme: { breakpoints },
  }) => {
    const marginVertical = 1;
    const marginOffset = noMargin ? 0 : 2 * marginVertical;
    const heightOffset = HEADER_HEIGHT_REM + marginOffset;
    const height = pxToRem(windowHeight) - heightOffset;

    return css`
      margin: ${noMargin ? '0' : `${marginVertical}rem auto`};
      padding: ${noPadding ? '0' : '0 2rem'};
      transition: padding 1s;
      display: flex;

      height: ${fullHeight ? height + 'rem' : 'unset'};

      @media screen and (max-width: ${breakpoints.MOBILE}) {
        padding: ${noPadding ? '0' : '0 1rem'};
      }
    `;
  }}
`;

type LayoutContainerProps = {
  children: ReactChild | ReactChild[];
  fullHeight?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
};

function LayoutContainer({
  children,
  fullHeight = false,
  noMargin = false,
  noPadding = false,
}: LayoutContainerProps) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  function handleWindowResize() {
    setWindowHeight(window.innerHeight);
  }

  window.addEventListener('resize', handleWindowResize);
  useEffect(() => {
    return function cleanup() {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowHeight]);

  return (
    <>
      <Header />
      <BaseLayout
        fullHeight={fullHeight}
        noMargin={noMargin}
        noPadding={noPadding}
        windowHeight={windowHeight}
      >
        {children}
      </BaseLayout>
    </>
  );
}

export default LayoutContainer;
