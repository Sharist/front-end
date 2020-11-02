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

  useEffect(() => {
    anchor.current?.addEventListener('mouseover', showTooltip);
    anchor.current?.addEventListener('mouseout', hideTooltip);

    return function cleanup() {
      anchor.current?.removeEventListener('mouseover', showTooltip);
      anchor.current?.removeEventListener('mouseout', hideTooltip);
    };
  }, [anchor]);

  return (
    <Wrapper ref={tooltipRef} visible={visible}>
      {text}
    </Wrapper>
  );
}

export default Tooltip;
