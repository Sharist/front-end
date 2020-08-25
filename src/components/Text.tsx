import React from 'react';
import styled, { css } from 'styled-components';
import { SharistTheme } from '../common/themes';

type TruncatableTextType = Pick<Props, 'maxLine' | 'lineHeight'>;

const TruncatableText = styled.p<TruncatableTextType>`
  ${({ lineHeight, maxLine }) => css`
    max-height: calc(${lineHeight} * ${maxLine});
    overflow: hidden;
  `}
`;

type Props = {
  children?: string;
  className?: string;
  lineHeight?: string;
  maxLine?: number;
};

function Text({ children, className, lineHeight, maxLine = 0 }: Props) {
  if (maxLine === 0) {
    return <p>{children}</p>;
  }

  if (maxLine < 0) {
    console.error(`Invalid 'maxLine' of '${maxLine}'.`);
    return <p>{children}</p>;
  }

  return (
    <TruncatableText
      className={className}
      lineHeight={lineHeight || SharistTheme.typography.REGULAR}
      maxLine={maxLine}
    >
      {children}
    </TruncatableText>
  );
}

export default Text;
