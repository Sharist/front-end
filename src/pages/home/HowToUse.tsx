import React from 'react';
import styled from 'styled-components';
import { mixins } from '../../common/styles/Theme';

import Ipman from '../../resources/images/to-delete/ip-man-for-no-reason.png';
import SailorMoon from '../../resources/images/to-delete/sailor-moon-for-no-reason.png';
import Ultraman from '../../resources/images/to-delete/ultraman-for-no-reason.png';

const HowToUseWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Slab';
  justify-content: center;
  margin: 20rem auto;
  padding: 1rem;
  width: 80%;

  ${mixins.belowTablet} {
    margin: 5rem auto;
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 3rem 1.5rem;

  ${mixins.belowTablet} {
    font-size: 1.8rem;
  }
`;

const CardSection = styled.div`
  display: flex;
  flex-wrap: no-wrap;

  ${mixins.belowTablet} {
    align-items: center;
    flex-direction: column;
  }
`;

const Card = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 1;
  margin: 2rem;

  ${mixins.belowTablet} {
    align-items: center;
    justify-content: center;
    margin: 2rem;
    width: 80%;
  }
`;

const CardImage = styled.img`
  width: 90%;
`;

const CardText = styled.p`
  font-size: 1.1rem;
  margin-top: 2rem;
  text-align: justify;
`;

function HowToUse() {
  return (
    <HowToUseWrapper>
      <Title>How to Use Sharist?</Title>

      <CardSection>
        <Card>
          <CardImage src={Ipman} />
          <CardText>
            Sharist allows you to collaborate with your friends and fight 10 opponents at the same
            time without even getting touched.
          </CardText>
        </Card>

        <Card>
          <CardImage src={SailorMoon} />
          <CardText>
            At night, Sharist will allow you to find villains that destroy humanity and lets you
            punish the villain in the Moon's place.
          </CardText>
        </Card>

        <Card>
          <CardImage src={Ultraman} />
          <CardText>
            If you ever lost energy for whatever reason, Sharist gathers light sources from your
            comrades and beam them to the gem embedded in your chest to recharge you.
          </CardText>
        </Card>
      </CardSection>
    </HowToUseWrapper>
  );
}

export default HowToUse;
