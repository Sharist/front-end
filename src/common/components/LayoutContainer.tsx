import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { mixins } from '../styles/Theme';
import { pxToRem } from '../dimensions';
import { useDimensions } from '../hooks/useDimensions';
import Header, { HEADER_HEIGHT_REM } from './header/Header';

type BaseLayoutProps = {
  adaptiveWidth: boolean;
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
    adaptiveWidth,
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

      ${adaptiveWidth &&
      css`
        width: ${breakpoints.ULTRAWIDE};

        ${mixins.belowUltrawide} {
          width: ${breakpoints.WIDE};
        }

        ${mixins.belowWide} {
          width: ${breakpoints.REGULAR};
        }

        ${mixins.belowRegular} {
          width: ${breakpoints.TABLET};
        }
      `}

      ${mixins.belowTablet} {
        padding: ${noPadding ? '0' : '0 1rem'};
        ${adaptiveWidth &&
        css`
          width: ${breakpoints.MOBILE};
        `}
      }

      ${mixins.belowMobile} {
        padding: ${noPadding ? '0' : '0 1.5rem'};

        ${adaptiveWidth &&
        css`
          width: 100%;
        `}
      }
    `;
  }}
`;

type LayoutContainerProps = {
  /**
   * If true, layout width will set to the previous breakpoint width (or `100%` for mobile.).
   *
   * For example, on mobile, layout width is `100%`. On tablet, width is mobile max.
   * On regular, width is tablet max, and so on.
   *
   * Default is `false`.
   */
  adaptiveWidth?: boolean;
  center?: boolean;
  children: ReactNode;
  floatingHeader?: boolean;
  fullHeight?: boolean;
  isLanding?: boolean;
  noHeader?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
};

function LayoutContainer({
  adaptiveWidth = false,
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
        adaptiveWidth={adaptiveWidth}
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
