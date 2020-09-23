import React from 'react';
import styled, { css } from 'styled-components';
import { Breakpoint } from '../../common/themes';
import HideAbove from '../../components/helpers/HideAbove';
import HideBelow from '../../components/helpers/HideBelow';

const ReasonToUseWrapper = styled.div`
  ${({ /*loaded,*/ theme: { breakpoints } }) => css`
    align-items: center;
    display: flex;
    padding: 1rem;
    height: 75%;
    max-height: 100%;
    width: 100%;
    justify-content: center;
    & > * {
      margin: 3rem;
    }

    @media screen and (max-width: ${breakpoints.TABLET}) {
      & > * {
        margin: 1rem;
      }
      flex-direction: column;
    }
  `}
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 200;
  font-family: 'Roboto slab';
  max-width: 30rem;
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
    background-color: grey;

    width: 20rem;
    height: 20rem;
    max-height: 20rem;
    max-width: 20rem;

    @media screen and (max-width: ${breakpoints.TABLET}) {
      max-width: 100%;
    }
  `}
`;

function ReasonToUse() {
  return (
    <ReasonToUseWrapper>
      <HideAbove breakpoint={Breakpoint.TABLET}>
        <Image />
      </HideAbove>
      <DescriptionSection>
        <DescriptionTitle>Reasons to use Sharist</DescriptionTitle>
        <DescriptionText>
          Sharist allows you to collaborate with your friends and plan your upcoming trip together.{' '}
        </DescriptionText>
      </DescriptionSection>
      <HideBelow breakpoint={Breakpoint.TABLET}>
        <Image />
      </HideBelow>
    </ReasonToUseWrapper>
  );
}

export default ReasonToUse;
