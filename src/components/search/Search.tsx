import React, { useState } from 'react';
import { GiBalloons } from 'react-icons/gi';
import { IoIosPin, IoIosRestaurant } from 'react-icons/io';
import styled, { css } from 'styled-components';

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
  onSearch: (text: string) => Promise<SearchResult[]>;
}

type Props = {
  className?: string;
  dataSource?: SearchDatasource;
  placeholder?: string;
  shouldDebounce?: boolean;
};

function Search({ className, dataSource, placeholder, shouldDebounce = true }: Props) {
  const [results, setResults] = useState<SearchResult[]>([]);

  function handleSearchBoxFocus() {
    setResults([
      { text: 'Chicago', annotation: 'Illinois, USA', icon: IoIosPin },
      { text: 'Amsterdam', annotation: 'Netherlands', icon: IoIosPin },
      { text: 'The Pink Door', annotation: 'Seattle, WA, USA', icon: IoIosRestaurant },
      {
        text: 'San Francisco Museum of Modern Art',
        annotation: 'San Francisco, CA, USA',
        icon: GiBalloons,
      },
      { text: 'Tokyo', annotation: 'Japan', icon: IoIosPin },
    ]);
  }

  return (
    <SearchWrapper className={className}>
      <SearchBox
        onFocus={handleSearchBoxFocus}
        onBlur={() => setResults([])}
        placeholder={placeholder}
        spellCheck={false}
      />
      <SuggestionsDropdown searchResults={results} />
    </SearchWrapper>
  );
}

export default Search;
