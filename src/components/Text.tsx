import React from 'react';
import styled, { css } from 'styled-components';

type TruncatableTextType = Pick<Props, 'maxLine' | 'lineHeight'>;

const TruncatableText = styled.p<TruncatableTextType>`
  ${({ lineHeight, maxLine, theme: { typography } }) => css`
    max-height: calc(${lineHeight || typography.REGULAR} * ${maxLine});
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
    <TruncatableText className={className} lineHeight={lineHeight} maxLine={maxLine}>
      {children}
    </TruncatableText>
  );
}

export default Text;
