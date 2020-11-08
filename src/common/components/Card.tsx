import React, { ReactChild } from 'react';
import styled, { css } from 'styled-components';

import Button, { ButtonRow } from './Button';

const CardWrapper = styled.div`
  ${({ theme: { palette } }) => css`
    background-color: white;
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.ash.darker.css};
    box-shadow: 0 0.1rem 0.35rem ${palette.ash.darker.css};
    display: flex;
    flex-direction: column;
  `}
`;

const CardImage = styled.div<{
  imageConfig: {
    url: string;
    cssHeight?: string;
  };
}>`
  ${({ imageConfig }) => css`
    background-image: url('${imageConfig.url}');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.5rem 0.5rem 0 0;
    height: ${imageConfig.cssHeight ? imageConfig.cssHeight : '15rem'};
    width: 100%;
  `}
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
`;

const CardActionsWrapper = styled.div`
  ${({ theme: { palette } }) => css`
    border-top: 0.05rem solid ${palette.ash.css};
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
    padding: 1.25rem 0.5rem 0;
  `}
`;

const CardTitle = styled.div`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.MEDIUM};
  `}
`;

const CardSubtitle = styled.div`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.SMALL};
  `}
`;

export type CardAction = {
  actionText: string;
  isPrimary?: boolean;
  handler: () => void;
};

type Props = {
  actions?: CardAction[];
  className?: string;
  children?: ReactChild | ReactChild[];
  image?: {
    url: string;
    cssHeight?: string;
  };
  subtitle?: string;
  title: string;
};

function Card({ actions, className, children, image, subtitle, title }: Props) {
  return (
    <CardWrapper className={className}>
      {image && <CardImage imageConfig={image} />}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {children}
        {actions && (
          <CardActionsWrapper>
            <ButtonRow>
              {actions.map(({ actionText, isPrimary, handler }) => (
                <Button
                  key={actionText}
                  isPrimary={isPrimary}
                  onClick={handler}
                  transparent={!isPrimary}
                >
                  {actionText}
                </Button>
              ))}
            </ButtonRow>
          </CardActionsWrapper>
        )}
      </CardContent>
    </CardWrapper>
  );
}

export default Card;
