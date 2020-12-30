import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { pxToRem } from '../dimensions';
import { useDimensions } from '../hooks/useDimensions';

interface TooltipWrapperProps {
  visible: boolean;
  top?: number;
  left?: number;
}

const Wrapper = styled.div<TooltipWrapperProps>`
  ${({ visible, top, left, theme: { palette, typography } }) => css`
    background-color: ${palette.white.css};
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.ash.darker.css};
    box-shadow: 0 0.05rem 0.25rem ${palette.ash.darker.css};
    font-size: ${typography.SMALL};
    padding: 0.3rem 0.5rem;
    position: fixed;
    z-index: 100;

    ${top && `top: ${top}rem;`}
    ${left && `left: ${left}rem;`}

    ${!visible && 'visibility: hidden;'}
  `}
`;

// Gap with anchor in pixels
const gapWithAnchor = 10;

type Props = {
  text: string;
  anchor: RefObject<HTMLElement>;
  /** Default to 'bottom' */
  position?: 'top' | 'right' | 'bottom' | 'left';
};

function Tooltip({ anchor, text, position = 'bottom' }: Props) {
  const [visible, setVisible] = useState(false);

  const [top, setTop] = useState<number | undefined>(undefined);
  const [left, setLeft] = useState<number | undefined>(undefined);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const windowDimensions = useDimensions();

  useEffect(() => {
    function showTooltip() {
      if (tooltipRef.current && anchor.current) {
        setVisible(true);
      }
    }

    function hideTooltip() {
      if (tooltipRef.current && anchor.current) {
        setVisible(false);
      }
    }

    function handleWindowResize() {
      if (anchorElement && tooltipRef.current) {
        const anchorRect = anchorElement.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        if (position === 'left' || position === 'right') {
          top = anchorRect.y + (anchorRect.height - tooltipRect.height) / 2;
        } else {
          left = anchorRect.x + (anchorRect.width / 2 - tooltipRect.width / 2);
        }

        switch (position) {
          case 'left':
            left = anchorRect.x - tooltipRect.width - gapWithAnchor;
            break;
          case 'bottom':
            top = anchorRect.y + anchorRect.height + gapWithAnchor;
            break;
          case 'top':
            top = anchorRect.y - tooltipRect.height - gapWithAnchor;
            break;
          case 'right':
            left = anchorRect.x + anchorRect.width + gapWithAnchor;
            break;
        }

        // Now, correct tooltip to make sure it's within window.
        const { height: winHeight, width: winWidth } = windowDimensions;

        left = Math.max(gapWithAnchor, left);
        left = Math.min(winWidth - gapWithAnchor - tooltipRect.width, left);
        top = Math.max(gapWithAnchor, top);
        top = Math.min(winHeight - gapWithAnchor - tooltipRect.height, top);

        setTop(pxToRem(top));
        setLeft(pxToRem(left));
      }
    }

    const anchorElement = anchor.current;

    anchorElement?.addEventListener('mouseover', showTooltip);
    anchorElement?.addEventListener('mouseout', hideTooltip);

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return function cleanup() {
      anchorElement?.removeEventListener('mouseover', showTooltip);
      anchorElement?.removeEventListener('mouseout', hideTooltip);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [anchor, position, windowDimensions]);

  return (
    <Wrapper ref={tooltipRef} visible={visible} top={top} left={left}>
      {text}
    </Wrapper>
  );
}

export default Tooltip;
