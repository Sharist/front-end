import React from 'react';
import styled, { css } from 'styled-components';

import { useDimensions } from '../../common/hooks/useDimensions';
import SearchResultItem, { SearchResult } from './SearchResultItem';

const Wrapper = styled.div<{ maxHeight: number }>`
  ${({ maxHeight, theme: { oldPalette: palette } }) => css`
    background-color: white;
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

const NoResult = styled.span`
  ${({ theme: { oldPalette: palette } }) => css`
    align-items: center;
    color: ${palette.ASPHALT_LIGHTER};
    display: flex;
    font-style: italics;
    padding: 0 1.5rem;

    &:before {
      content: 'No result matching query';
    }
  `}
`;

type SuggestionsDropdownProps = {
  clearResultHighlight: () => void;
  highlightedResultKey?: string;
  onSelectResult?: (searchResult: SearchResult) => void;
  searchResults: SearchResult[] | null;
};

function SuggestionsDropdown({
  clearResultHighlight,
  highlightedResultKey,
  onSelectResult,
  searchResults,
}: SuggestionsDropdownProps) {
  const { height: documentHeight } = useDimensions();

  if (!searchResults) {
    return null;
  }

  const dropdownContent =
    searchResults.length === 0 ? (
      <NoResult />
    ) : (
      searchResults.map((searchResult) => (
        <SearchResultItem
          isHighlighted={searchResult.key === highlightedResultKey}
          key={searchResult.key}
          onSelect={() => onSelectResult?.(searchResult)}
          searchResult={searchResult}
        />
      ))
    );

  return (
    <Wrapper maxHeight={documentHeight - 200} onMouseOver={clearResultHighlight}>
      <DropdownPanel>{dropdownContent}</DropdownPanel>
    </Wrapper>
  );
}

export default SuggestionsDropdown;
