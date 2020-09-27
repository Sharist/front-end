import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

import { pxToRem } from '../common/dimensions';
import { useDimensions } from '../common/hooks/useDimensions';
import Header, { HEADER_HEIGHT_REM } from './header/Header';

type BaseLayoutProps = {
  center: boolean;
  floatingHeader: boolean;
  fullHeight: boolean;
  noHeader: boolean;
  noMargin: boolean;
  noPadding: boolean;
  viewportHeight: number;
};

const BaseLayout = styled.div<BaseLayoutProps>`
  ${({
    center,
    floatingHeader,
    fullHeight,
    noHeader,
    noMargin,
    noPadding,
    viewportHeight,
    theme: { breakpoints },
  }) => {
    const marginVertical = 1;
    const marginOffset = noMargin || floatingHeader ? 0 : 2 * marginVertical;
    const headerOffset = noHeader || floatingHeader ? 0 : HEADER_HEIGHT_REM;
    const heightOffset = headerOffset + marginOffset;
    const height = pxToRem(viewportHeight) - heightOffset;

    return css`
      background: transparent;
      display: flex;
      height: ${fullHeight ? height + 'rem' : 'unset'};
      justify-content: ${center ? 'center' : 'flex-start'};
      margin: ${noMargin ? '0' : `${marginVertical}rem auto`};
      padding: ${noPadding ? '0' : '0 2rem'};
      transition: padding 1s;

      @media screen and (max-width: ${breakpoints.MOBILE}) {
        padding: ${noPadding ? '0' : '0 1rem'};
      }
    `;
  }}
`;

type LayoutContainerProps = {
  center?: boolean;
  children: ReactChild | ReactChild[];
  floatingHeader?: boolean;
  fullHeight?: boolean;
  isLanding?: boolean;
  noHeader?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
};

function LayoutContainer({
  center = false,
  children,
  floatingHeader = false,
  fullHeight = false,
  isLanding = false,
  noHeader = false,
  noMargin = false,
  noPadding = false,
}: LayoutContainerProps) {
  const { height } = useDimensions({ debounceTimeout: 0 });

  return (
    <>
      {!noHeader && <Header isLanding={isLanding} />}
      <BaseLayout
        center={center}
        floatingHeader={floatingHeader}
        fullHeight={fullHeight}
        noHeader={noHeader}
        noMargin={noMargin}
        noPadding={noPadding}
        viewportHeight={height}
      >
        {children}
      </BaseLayout>
    </>
  );
}

export default LayoutContainer;
