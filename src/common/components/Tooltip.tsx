import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ visible: boolean }>`
  ${({ visible, theme: { palette } }) => css`
    background-color: ${palette.white.css};
    border-radius: 0.5rem;
    box-shadow: 0 0.05rem 0.25rem ${palette.grey.css};
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    margin: 0 0.5rem;

    ${!visible && 'display: none;'}
  `}
`;

type Props = {
  text: string;
  anchor: RefObject<HTMLElement>;
};

function Tooltip({ anchor, text }: Props) {
  const [visible, setVisible] = useState(false);

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

    const anchorElement = anchor.current;

    anchorElement?.addEventListener('mouseover', showTooltip);
    anchorElement?.addEventListener('mouseout', hideTooltip);

    return function cleanup() {
      anchorElement?.removeEventListener('mouseover', showTooltip);
      anchorElement?.removeEventListener('mouseout', hideTooltip);
    };
  }, [anchor]);

  return (
    <Wrapper ref={tooltipRef} visible={visible}>
      {text}
    </Wrapper>
  );
}

export default Tooltip;
