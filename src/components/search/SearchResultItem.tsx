import React from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  ${({ theme: { palette } }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 1rem 1.5rem;
    transition: background-color 250ms;

    &:hover {
      background-color: ${palette.ASH_LIGHTER};
    }
  `}
`;

const Icon = styled.div`
  ${({ theme: { palette } }) => css`
    color: ${palette.ASPHALT};
    margin-right: 1.25rem;
  `}
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  ${({ theme: { palette } }) => css`
    color: ${palette.ASPHALT_DARKER};
    margin: 0;
  `}
`;

const Annotation = styled.p`
  ${({ theme: { palette } }) => css`
    color: ${palette.ASPHALT_LIGHTER};
    font-size: 0.8rem;
    margin: 0;
  `}
`;

export interface SearchResult {
  annotation?: string;
  icon?: IconType;
  ranking?: number;
  text: string;
}

type SearchResultItemProps = {
  searchResult: SearchResult;
  onSelect?: () => void;
};

function SearchResultItem({ onSelect, searchResult }: SearchResultItemProps) {
  const { text, annotation, icon: IconElement } = searchResult;

  return (
    <Wrapper onClick={onSelect}>
      {IconElement && (
        <Icon>
          <IconElement />
        </Icon>
      )}
      <TextContent>
        <Text>{text}</Text>
        <Annotation>{annotation}</Annotation>
      </TextContent>
    </Wrapper>
  );
}

export default SearchResultItem;
