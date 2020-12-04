import React, { ReactNode } from 'react';

import styled, { css } from 'styled-components';
import { mixins } from '../styles/Theme';

/**
 * Card component. This is a composite component.
 *
 * @example
 * <Card>
 *   // Optional header
 *   <CardHeader title={[REQUIRED]} subtitle={OPTIONAL} image={OPTIONAL} />
 *
 *   // Optional content
 *   <CardContent>
 *     Whatever content this card has
 *   </CardContent>
 *
 *   // Optional footer
 *   <CardFooter>
 *     Footer items or card buttons
 *   </CardFooter>
 * </Card>
 */
const RegularCard = styled.div`
  ${({ theme: { palette } }) => css`
    background-color: ${palette.white.css};
    border-radius: 0.5rem;
    border: 0.05rem solid ${palette.ash.darker.css};
    box-shadow: 0 0.1rem 0.25rem ${palette.ash.css};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  `}
`;

const ClickableCard = styled(RegularCard)`
  ${({ theme: { palette } }) => css`
    transition: background-color 150ms, border 150ms, box-shadow 150ms;

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: ${palette.white.lighter.css};
      border: 0.05rem solid ${palette.ash.darker.css};
      box-shadow: 0 0.2rem 0.5rem ${palette.ash.darker.css};
    }

    &:active {
      background-color: ${palette.white.css};
      border: 0.05rem solid ${palette.ash.darker.css};
      box-shadow: 0 0.35rem 0.8rem ${palette.ash.darker.css};
    }
  `}
`;

type CardProps = {
  onClick?: () => void;
  children: ReactNode;
};

export default function Card({ children, onClick }: CardProps) {
  const CardComponent = onClick ? ClickableCard : RegularCard;

  return <CardComponent onClick={onClick}>{children}</CardComponent>;
}

type CardListProps = {
  /** Gap width between columns and rows. Defaults to `'1.5rem'`. */
  gap?: string;
  /** Minimum width for the column contents. Defaults to `'18rem'`. */
  contentMinWidth?: string;
};

/**
 * Provides a grid view of a list of cards.
 *
 * Columns are automatically created based on container and content width.
 */
export const CardList = styled.div<CardListProps>`
  ${({ contentMinWidth = '15rem', gap = '1.5rem' }) => css`
    display: grid;
    gap: ${gap};
    grid-template-columns: repeat(auto-fill, minmax(${contentMinWidth}, 1fr));
    justify-content: stretch;
    margin: 0;
    padding: 0;

    ${mixins.belowMobile} {
      grid-template-columns: 95%;
      justify-content: center;
    }
  `}
`;

/**
 * Optional content for the card.
 *
 * Should be placed between `<CardHeader />` and `<CardFooter />` (if either exists).
 *
 * See `<Card />` for example.
 */
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  width: 100%;
`;

/**
 * Optional footer for the card.
 *
 * Should be placed as the last child of the `<Card />` component.
 *
 * See `<Card />` for example.
 */
export const CardFooter = styled.div<{ noSeparator?: boolean }>`
  ${({ noSeparator = false, theme: { palette } }) => css`
    display: flex;
    justify-content: flex-end;
    margin: auto 1.25rem 0;
    padding: 1.25rem 0;
    width: calc(100% - 2.5rem);

    ${!noSeparator &&
    css`
      border-top: 0.05rem solid ${palette.ash.css};
    `};
  `}
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
`;

export interface CardImageConfig {
  url: string;
  /** Height for the image. Defaults to `'15rem'`. */
  cssHeight?: string;
}

const CardImage = styled.div<{
  imageConfig: CardImageConfig;
}>`
  ${({ imageConfig = { cssHeight: '15rem' } }) => css`
    background-image: url('${imageConfig.url}');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.5rem 0.5rem 0 0;
    height: ${imageConfig.cssHeight};
    width: 100%;
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

type CardHeaderProps = {
  image?: CardImageConfig;
  title: string;
  subtitle?: string;
};

/**
 * Optional header for the card.
 *
 * Should be placed as the first child of the `<Card />` component.
 *
 * See `<Card />` for example.
 */
export function CardHeader({ image, title, subtitle }: CardHeaderProps) {
  return (
    <>
      {image && <CardImage imageConfig={image} />}
      <CardHeaderWrapper>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      </CardHeaderWrapper>
    </>
  );
}
