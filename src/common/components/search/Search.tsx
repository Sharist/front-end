import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { debounce } from '../../timing';
import { SearchResult } from './SearchResultItem';
import Logo, { LogoType } from '../header/Logo';
import SuggestionsDropdown from './SuggestionsDropdown';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBox = styled.input<{ hasLogo: boolean }>`
  ${({ hasLogo, theme: { palette } }) => css`
    border-radius: 0.75rem;
    border: 0.05rem solid ${palette.white.darker.css};
    box-shadow: 0 0 0.25rem ${palette.ash.lighter.css};
    padding: 0.65rem 1rem;
    width: 100%;
    transition: box-shadow 200ms;

    &:focus {
      box-shadow: 0 0.05rem 0.3rem ${palette.ash.darker.css};
      outline-width: 0;
    }

    ${hasLogo &&
    css`
      padding: 1rem 1.25rem 1rem 3.5rem;
      border-radius: 1rem;
    `}
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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const searchWrapperRef = useRef<HTMLDivElement | null>(null);

  function handleDocumentClick(e: MouseEvent) {
    if (!searchWrapperRef.current?.contains(e.target as Node)) {
      setIsDropdownVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);

    return function cleanUp() {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function handleResultSelected(searchResult: SearchResult) {
    setHighlightedIndex(-1);
    setIsDropdownVisible(false);
    setSearchQuery(searchResult.text);
    onSelectResult?.(searchResult);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearchQuery(value);

    if (value) {
      handleSearchInputDebounced(value, onAutocompleteSearch, setResults);
    } else {
      cancelAutocompleteSearch();
      setHighlightedIndex(-1);
      setResults(null);
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
      setIsDropdownVisible(false);
    }
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();

      if (results && highlightedIndex !== -1) {
        handleResultSelected(results[highlightedIndex]);
      } else if (onFullSearchResult) {
        cancelAutocompleteSearch();
        setHighlightedIndex(-1);
        setIsDropdownVisible(false);
        onSearch(searchQuery).then(onFullSearchResult);
      }
    }
  }

  return (
    <SearchWrapper className={className} ref={searchWrapperRef}>
      <InputBoxWrapper>
        {hasLogo && (
          <InlineLogo>
            <Logo logoType={LogoType.MONO_WHITE} noText />
          </InlineLogo>
        )}
        <SearchBox
          hasLogo={hasLogo}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownVisible(true)}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          spellCheck={false}
          value={searchQuery}
        />
      </InputBoxWrapper>
      {isDropdownVisible && (
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
