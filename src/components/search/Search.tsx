import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled, { css } from 'styled-components';

import { debounce } from '../../common/timing';
import { SearchResult } from './SearchResultItem';
import SuggestionsDropdown from './SuggestionsDropdown';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBox = styled.input`
  ${({ theme: { palette } }) => css`
    border-radius: 1.25rem;
    border: 0.05rem solid ${palette.ASH_DARKER};
    box-shadow: 0 0 0.25rem ${palette.ASH};
    padding: 0.8rem 1.25rem;
    width: 100%;

    &:focus {
      box-shadow: 0 0 0.25rem ${palette.GREY_LIGHTER};
      outline-width: 0;
    }
  `}
`;

export interface SearchDatasource {
  initialDataset: SearchResult[];
  onAutocompleteSearch: (text: string) => Promise<SearchResult[]>;
}

const defaultDataSource: SearchDatasource = {
  initialDataset: [],
  onAutocompleteSearch: (text: string) => Promise.resolve([]),
};

type Props = {
  className?: string;
  dataSource?: SearchDatasource;
  placeholder?: string;
  onSelectResult?: (searchResult: SearchResult) => void;
};

const handleSearchInputDebounced = debounce(
  (
    value: string,
    onAutocompleteSearch: (text: string) => Promise<SearchResult[]>,
    setResults: (value: SearchResult[]) => void
  ) => onAutocompleteSearch(value).then(setResults),
  300
);

function Search({ className, dataSource = defaultDataSource, onSelectResult, placeholder }: Props) {
  const { initialDataset, onAutocompleteSearch } = dataSource;

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [results, setResults] = useState<SearchResult[]>(initialDataset);
  const [value, setValue] = useState('');

  function handleResultSelected(searchResult: SearchResult) {
    setValue(searchResult.text);
    setDropdownVisible(false);
    setHighlightedIndex(-1);
    onSelectResult?.(searchResult);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setValue(value);
    setDropdownVisible(true);
    handleSearchInputDebounced(value, onAutocompleteSearch, setResults);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Prevent input cursor from moving
      e.preventDefault();
      if (e.key === 'ArrowDown' && highlightedIndex < results.length - 1) {
        setHighlightedIndex(highlightedIndex + 1);
      } else if (e.key === 'ArrowUp' && highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      }
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
      setDropdownVisible(false);
    }
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && highlightedIndex !== -1) {
      handleResultSelected(results[highlightedIndex]);
    }
  }

  return (
    <SearchWrapper className={className}>
      <SearchBox
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
        placeholder={placeholder}
        spellCheck={false}
        value={value}
      />
      {dropdownVisible && (
        <SuggestionsDropdown
          clearResultHighlight={() => setHighlightedIndex(-1)}
          highlightedResultKey={results[highlightedIndex]?.key}
          onSelectResult={handleResultSelected}
          searchResults={results}
        />
      )}
    </SearchWrapper>
  );
}

export default Search;
