import React from 'react';
import styled, { css } from 'styled-components';

const SearchWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

const SearchBox = styled.input`
  ${({ theme: { palette } }) => css`
    border-radius: 1.25rem;
    border: 0.05rem solid ${palette.ASH_DARKER};
    padding: 0.7rem 1.25rem;
    width: 100%;

    &:focus {
      border: 0.05rem solid ${palette.ASH_DARKER};
      box-shadow: 0 0 0.25rem ${palette.ASH_DARKER};
      outline-width: 0;
    }
  `}
`;

type Props = {
  className?: string;
  placeholder?: string;
};

function Search({ className, placeholder }: Props) {
  return (
    <SearchWrapper className={className}>
      <SearchBox placeholder={placeholder} spellCheck={false} />
    </SearchWrapper>
  );
}

export default Search;
