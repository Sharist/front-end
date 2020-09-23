import React from 'react';
import styled, { css } from 'styled-components';
import { Breakpoint } from '../../common/themes';

import Pikachu from '../../resources/images/to-delete/pikachu-for-no-reason.png';

const ReasonToUseWrapper = styled.div`
  ${({ /*loaded,*/ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    padding: 1rem;
    height: 75%;
    max-height: 100%;
    width: 100%;
    justify-content: center;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      flex-direction: column-reverse;
    }
  `}
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 200;
  font-family: 'Roboto slab';
  max-width: 30rem;
  margin: 1.5rem;
  justify-content: space-between;
`;

const DescriptionTitle = styled.h1`
  ${({ /*loaded,*/ theme: { breakpoints } }) => css`
    font-size: 2.5rem;
    line-height: 1.2;
    margin-top: 0;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      font-size: 2rem;
    }
  `}
`;

const DescriptionText = styled.div`
  ${({ /*loaded,*/ theme: { breakpoints } }) => css`
    font-size: 1.3rem;
    @media screen and (max-width: ${breakpoints.TABLET}) {
      font-size: 1.1rem;
    }
  `}
`;

const Image = styled.img`
  ${({ /*loaded,*/ theme: { breakpoints } }) => css`
    display: block;
    height: auto;
    margin: 1rem;
    max-width: 20rem;
    width: 80%;
  `}
`;

function ReasonToUse() {
  return (
    <ReasonToUseWrapper>
      <DescriptionSection>
        <DescriptionTitle>Reasons to use Sharist</DescriptionTitle>
        <DescriptionText>
          Sharist allows you to collaborate with your friends and plan your upcoming trip together.{' '}
        </DescriptionText>
      </DescriptionSection>

      <Image src={Pikachu} />
    </ReasonToUseWrapper>
  );
}

export default ReasonToUse;
