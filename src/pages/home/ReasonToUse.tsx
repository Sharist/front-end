import React from 'react';
import styled, { css } from 'styled-components';

import { mixins } from '../../common/styles/Theme';
import Pikachu from '../../resources/images/to-delete/pikachu-for-no-reason.png';

const ReasonToUseWrapper = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Roboto slab';
  justify-content: center;
  margin: 20rem auto;
  max-height: 100%;
  padding: 1rem;
  width: 80%;

  ${mixins.belowTablet} {
    align-items: center;
    flex-direction: column;
    margin: 5rem auto;
    width: 100%;
  }
`;

const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 200;
  justify-content: space-between;
  margin: 1.5rem;

  ${mixins.belowTablet} {
    align-items: center;
    justify-content: center;
    width: 80%;
  }
`;

const DescriptionTitle = styled.h1<{ forTablet?: boolean }>`
  ${({ forTablet }) => css`
    font-size: 2.5rem;
    margin: 0 0 3rem 0;

    ${mixins.belowTablet} {
      font-size: 1.8rem;
      margin: 0;
      ${!forTablet && 'display: none;'}
    }
    ${mixins.aboveTablet} {
      ${forTablet && 'display: none;'}
    }
  `}
`;

const DescriptionText = styled.div`
  font-size: 1.1rem;
  text-align: justify;

  ${mixins.belowTablet} {
    font-size: 1.1rem;
  }
`;

const Image = styled.img<{ forTablet?: boolean }>`
  ${({ forTablet }) => css`
    height: auto;
    margin: 1rem;
    max-width: 20rem;
    width: 80%;

    ${mixins.belowTablet} {
      ${!forTablet && 'display: none;'}
    }
    ${mixins.aboveTablet} {
      ${forTablet && 'display: none;'}
    }
  `}
`;

function ReasonToUse() {
  return (
    <ReasonToUseWrapper>
      <DescriptionTitle forTablet>Reasons to use Sharist</DescriptionTitle>

      {/* TODO (thling) This is really nasty, check with Isabella for mobile view options */}
      <DescriptionSection>
        <DescriptionTitle>Reasons to use Sharist</DescriptionTitle>
        <Image forTablet src={Pikachu} />

        <DescriptionText>
          Sharist allows you to collaborate with your friends and plan your upcoming trip together.
        </DescriptionText>
      </DescriptionSection>

      <Image src={Pikachu} />
    </ReasonToUseWrapper>
  );
}

export default ReasonToUse;
