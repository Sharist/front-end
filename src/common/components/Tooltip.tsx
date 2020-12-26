import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { pxToRem } from '../dimensions';

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
        if (position === 'left' || position === 'right') {
          setTop(pxToRem(anchorRect.y + (anchorRect.height - tooltipRect.height) / 2));
        } else {
          setLeft(pxToRem(anchorRect.x + (anchorRect.width / 2 - tooltipRect.width / 2)));
        }

        switch (position) {
          case 'left':
            setLeft(pxToRem(anchorRect.x - tooltipRect.width - gapWithAnchor));
            break;
          case 'bottom':
            setTop(pxToRem(anchorRect.y + anchorRect.height + gapWithAnchor));
            break;
          case 'top':
            setTop(pxToRem(anchorRect.y - tooltipRect.height - gapWithAnchor));
            break;
          case 'right':
            setLeft(pxToRem(anchorRect.x + anchorRect.width + gapWithAnchor));
            break;
        }
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
  }, [anchor, position]);

  return (
    <Wrapper ref={tooltipRef} visible={visible} top={top} left={left}>
      {text}
    </Wrapper>
  );
}

export default Tooltip;
