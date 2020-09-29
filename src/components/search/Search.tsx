import React, { ChangeEvent, useState } from 'react';
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
  onSearch: (text: string) => Promise<SearchResult[]>;
}

const defaultDataSource: SearchDatasource = {
  initialDataset: [],
  onSearch: (text: string) => Promise.resolve([]),
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
    onSearch: (text: string) => Promise<SearchResult[]>,
    setResults: (value: SearchResult[]) => void
  ) => onSearch(value).then(setResults),
  300
);

function Search({ className, dataSource = defaultDataSource, onSelectResult, placeholder }: Props) {
  const { initialDataset, onSearch } = dataSource;

  const [value, setValue] = useState('');
  const [results, setResults] = useState<SearchResult[]>(initialDataset);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleResultSelected(searchResult: SearchResult) {
    setValue(searchResult.text);
    setDropdownVisible(false);
    onSelectResult?.(searchResult);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setValue(value);
    handleSearchInputDebounced(value, onSearch, setResults);
  }

  return (
    <SearchWrapper className={className}>
      <SearchBox
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(true)}
        placeholder={placeholder}
        spellCheck={false}
        value={value}
      />
      {dropdownVisible && (
        <SuggestionsDropdown onSelectResult={handleResultSelected} searchResults={results} />
      )}
    </SearchWrapper>
  );
}

export default Search;
