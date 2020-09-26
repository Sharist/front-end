import React from 'react';
import styled, { css } from 'styled-components';

import SearchResultItem, { SearchResult } from './SearchResultItem';

const MAX_RESULTS = 5;

const SuggestionsDropdownWrapper = styled.div`
  ${({ theme: { palette } }) => css`
    border-radius: 1.25rem;
    border: 0.05rem solid ${palette.ASH_DARKER};
    box-shadow: 0 0 0.25rem ${palette.GREY_LIGHTER};
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    padding: 1.25rem 0;
    position: absolute;
    width: 100%;
  `}
`;

type SuggestionsDropdownProps = {
  searchResults: SearchResult[];
};

function SuggestionsDropdown({ searchResults }: SuggestionsDropdownProps) {
  if (searchResults.length === 0) {
    return null;
  }

  return (
    <SuggestionsDropdownWrapper>
      {searchResults.slice(0, MAX_RESULTS).map((searchResult) => (
        <SearchResultItem key={searchResult.text} searchResult={searchResult} />
      ))}
    </SuggestionsDropdownWrapper>
  );
}

export default SuggestionsDropdown;
