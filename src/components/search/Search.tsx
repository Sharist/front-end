import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled, { css } from 'styled-components';

import { debounce } from '../../common/timing';
import Logo, { LogoType } from '../header/Logo';
import { SearchResult } from './SearchResultItem';
import SuggestionsDropdown from './SuggestionsDropdown';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBox = styled.input<{ hasLogo: boolean }>`
  ${({ hasLogo, theme: { palette } }) => css`
    border-radius: 1rem;
    border: 0.05rem solid ${palette.ASH_DARKER};
    box-shadow: 0 0 0.25rem ${palette.ASH_LIGHTER};
    padding: 1rem 1.25rem;
    padding-left: ${hasLogo ? '3.5rem' : ''};
    width: 100%;
    transition: box-shadow 200ms;

    &:focus {
      box-shadow: 0 0.05rem 0.3rem ${palette.ASH_DARKER};
      outline-width: 0;
    }
  `}
`;

const InputBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InlineLogo = styled.div`
  left: 1rem;
  position: absolute;
`;

export interface SearchDatasource {
  onAutocompleteSearch: (text: string) => Promise<SearchResult[]>;
  onSearch: (query: string) => Promise<SearchResult[]>;
}

const defaultDataSource: SearchDatasource = {
  onAutocompleteSearch: (text: string) => Promise.resolve([]),
  onSearch: (query: string) => Promise.resolve([]),
};

type Props = {
  className?: string;
  dataSource?: SearchDatasource;
  hasLogo?: boolean;
  placeholder?: string;
  onSelectAutocompleteResult?: (searchResult: SearchResult) => void;
  onFullSearchResult?: (searchResults: SearchResult[]) => void;
};

const { cancel: cancelAutocompleteSearch, debounced: handleSearchInputDebounced } = debounce(
  (
    value: string,
    onAutocompleteSearch: (text: string) => Promise<SearchResult[]>,
    setResults: (value: SearchResult[]) => void
  ) => onAutocompleteSearch(value).then(setResults),
  650
);

function Search({
  className,
  dataSource = defaultDataSource,
  hasLogo = false,
  onFullSearchResult,
  onSelectAutocompleteResult: onSelectResult,
  placeholder,
}: Props) {
  const { onAutocompleteSearch, onSearch } = dataSource;

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  function clearDropdown() {
    setHighlightedIndex(-1);
    setResults(null);
  }

  function handleResultSelected(searchResult: SearchResult) {
    clearDropdown();
    setSearchQuery(searchResult.text);
    onSelectResult?.(searchResult);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchQuery(value);

    if (value) {
      handleSearchInputDebounced(value, onAutocompleteSearch, setResults);
    } else {
      clearDropdown();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (results && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      // Prevent input cursor from moving
      e.preventDefault();
      if (e.key === 'ArrowDown' && highlightedIndex < results.length - 1) {
        setHighlightedIndex(highlightedIndex + 1);
      } else if (e.key === 'ArrowUp' && highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      }
    } else if (e.key === 'Escape') {
      clearDropdown();
    }
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (results && highlightedIndex !== -1) {
        handleResultSelected(results[highlightedIndex]);
      } else if (onFullSearchResult) {
        clearDropdown();
        cancelAutocompleteSearch();
        onSearch(searchQuery).then(onFullSearchResult);
      }
    }
  }

  return (
    <SearchWrapper className={className}>
      <InputBoxWrapper>
        {hasLogo && (
          <InlineLogo>
            <Logo logoType={LogoType.MONO_WHITE} noText />
          </InlineLogo>
        )}
        <SearchBox
          hasLogo={hasLogo}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          onChange={handleInputChange}
          placeholder={placeholder}
          spellCheck={false}
          value={searchQuery}
        />
      </InputBoxWrapper>
      {searchQuery && (
        <SuggestionsDropdown
          clearResultHighlight={() => setHighlightedIndex(-1)}
          highlightedResultKey={results?.[highlightedIndex]?.key}
          onSelectResult={handleResultSelected}
          searchResults={results}
        />
      )}
    </SearchWrapper>
  );
}

export default Search;
