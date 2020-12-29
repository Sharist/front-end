import React, { useRef } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import styled, { css } from 'styled-components';

import { RouteNavigator } from '../../routes';
import Tooltip from './Tooltip';

const BackArrow = styled(IoChevronBackSharp)`
  ${({ theme: { palette } }) => css`
    border-radius: 50%;
    color: ${palette.asphalt.lighter.css};
    cursor: pointer;
    margin-left: -0.685rem;
    padding: 0.25rem;

    &:hover {
      background-color: ${palette.ash.css};
    }
  `}
`;

type Props = {
  routeLink: RouteNavigator;
  tooltipLabel?: string;
};

function BackLink({ routeLink, tooltipLabel }: Props) {
  const backIconRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={backIconRef} onClick={routeLink}>
      {tooltipLabel && <Tooltip anchor={backIconRef} text={tooltipLabel} />}
      <BackArrow size='2rem' />
    </div>
  );
}

export default BackLink;
