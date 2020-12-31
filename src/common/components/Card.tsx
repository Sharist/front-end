import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { mixins } from '../styles/Theme';

/**
 * Card component. This is a composite component.
 *
 * @example
 * <Card>
 *   // Optional image; see ImageConfig interface for the prop
 *   <CardImage imageConfig={config} />
 *
 *   <CardContent>
 *     // Optional heading
 *     <CardHeading title={[REQUIRED]} subtitle={OPTIONAL} />
 *
 *     // Anything here
 *
 *     // Optional footer
 *     <CardFooter>Footer items or card buttons</CardFooter>
 *   </CardContent>
 * </Card>
 */
const RegularCard = styled.div<{ horizontal: boolean }>`
  ${({ horizontal, theme: { palette } }) => css`
    background-color: ${palette.white.css};
    border: 0.05rem solid ${palette.white.darker.css};
    box-shadow: 0 0.05rem 0.1rem ${palette.ash.darker.css};

    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    ${horizontal &&
    css`
      flex-direction: row;

      & ${CardImage} {
        border-radius: 0.5rem 0 0 0.5rem;
        width: 65%;
      }
    `}
  `}
`;

const ClickableCard = styled(RegularCard)`
  ${({ theme: { palette } }) => css`
    transition: background-color 150ms, border 150ms, box-shadow 150ms;

    &:hover,
    &:focus {
      cursor: pointer;
      box-shadow: 0 0.15rem 0.5rem ${palette.ash.darker.css};
    }

    &:active {
      /* background-color: ${palette.white.lighter.lighter.css};
      border: 0.05rem solid ${palette.white.darker.css}; */
      box-shadow: 0 0.25rem 0.65rem ${palette.ash.darker.css};
    }
  `}
`;

type CardProps = {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  /**
   * If `true`, display card image on the left and content and footer on the right.
   * Default is `false`.
   */
  horizontal?: boolean;
};

export default function Card({ className, children, onClick, horizontal = false }: CardProps) {
  const CardComponent = onClick ? ClickableCard : RegularCard;

  return (
    <CardComponent className={className} onClick={onClick} horizontal={horizontal}>
      {children}
    </CardComponent>
  );
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
 * Card content wrapper. Should wrap everything other than <CardImage />.
 *
 * See `<Card />` for example.
 */
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const CardHeadingWrapper = styled.div`
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

export const CardImage = styled.div<{
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
export function CardHeading({ title, subtitle }: CardHeaderProps) {
  return (
    <CardHeadingWrapper>
      <CardTitle>{title}</CardTitle>
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </CardHeadingWrapper>
  );
}
