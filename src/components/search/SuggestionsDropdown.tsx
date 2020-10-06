import React from 'react';
import styled, { css } from 'styled-components';

import { useDimensions } from '../../common/hooks/useDimensions';
import SearchResultItem, { SearchResult } from './SearchResultItem';

const Wrapper = styled.div<{ maxHeight: number }>`
  ${({ maxHeight, theme: { palette } }) => css`
    border-radius: 1.25rem;
    border: 0.05rem solid ${palette.ASH_DARKER};
    box-shadow: 0 0 0.25rem ${palette.GREY_LIGHTER};
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    max-height: ${maxHeight}px;
    padding: 1.25rem 0;
    position: absolute;
    width: 100%;
  `}
`;

const DropdownPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  width: 100%;
`;

type SuggestionsDropdownProps = {
  clearResultHighlight: () => void;
  highlightedResultKey?: string;
  onSelectResult?: (searchResult: SearchResult) => void;
  searchResults: SearchResult[];
};

function SuggestionsDropdown({
  clearResultHighlight,
  highlightedResultKey,
  onSelectResult,
  searchResults,
}: SuggestionsDropdownProps) {
  const { height: documentHeight } = useDimensions();

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <Wrapper maxHeight={documentHeight - 200} onMouseOver={clearResultHighlight}>
      <DropdownPanel>
        {searchResults.map((searchResult) => (
          <SearchResultItem
            isHighlighted={searchResult.key === highlightedResultKey}
            key={searchResult.key}
            onSelect={() => onSelectResult?.(searchResult)}
            searchResult={searchResult}
          />
        ))}
      </DropdownPanel>
    </Wrapper>
  );
}

export default SuggestionsDropdown;
