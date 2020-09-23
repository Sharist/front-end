import React from 'react';
import styled, { css } from 'styled-components';
import { Breakpoint } from '../../common/themes';
import HideAbove from '../../components/helpers/HideAbove';
import HideBelow from '../../components/helpers/HideBelow';

import Pikachu from '../../resources/images/to-delete/pikachu-for-no-reason.png';

const ReasonToUseWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    font-family: 'Roboto slab';
    margin: 20rem auto;
    max-height: 100%;
    padding: 1rem;
    width: 80%;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      align-items: flex-start;
      flex-direction: column;
      margin: 5rem 1.5rem;
      width: 100%;
    }
  `}
`;

const DescriptionSection = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    flex-shrink: 200;
    justify-content: space-between;
    margin: 1.5rem;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      align-items: center;
      justify-content: center;
      width: 80%;
    }
  `}
`;

const DescriptionTitle = styled.h1`
  ${({ theme: { breakpoints } }) => css`
    font-size: 2.5rem;
    line-height: 1.2;
    margin-top: 0;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      font-size: 2rem;
    }
  `}
`;

const DescriptionText = styled.div`
  ${({ theme: { breakpoints } }) => css`
    font-size: 1.3rem;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      font-size: 1.1rem;
    }
  `}
`;

const Image = styled.img`
  display: block;
  height: auto;
  margin: 1rem;
  max-width: 20rem;
  width: 80%;
`;

function ReasonToUse() {
  return (
    <ReasonToUseWrapper>
      <HideAbove breakpoint={Breakpoint.TABLET}>
        <DescriptionTitle>Reasons to use Sharist</DescriptionTitle>
      </HideAbove>

      {/* TODO (thling) This is really nasty, check with Isabella for mobile view options */}
      <DescriptionSection>
        <HideBelow breakpoint={Breakpoint.TABLET}>
          <DescriptionTitle>Reasons to use Sharist</DescriptionTitle>
        </HideBelow>

        <HideAbove breakpoint={Breakpoint.TABLET}>
          <Image src={Pikachu} />
        </HideAbove>

        <DescriptionText>
          Sharist allows you to collaborate with your friends and plan your upcoming trip together.
        </DescriptionText>
      </DescriptionSection>

      <HideBelow breakpoint={Breakpoint.TABLET}>
        <Image src={Pikachu} />
      </HideBelow>
    </ReasonToUseWrapper>
  );
}

export default ReasonToUse;
