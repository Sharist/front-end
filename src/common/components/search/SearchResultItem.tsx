import React from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ isHighlighted: boolean }>`
  ${({ isHighlighted, theme: { palette } }) => css`
    align-items: center;
    background-color: ${isHighlighted ? palette.ash.lighter.css : ''};
    cursor: pointer;
    display: flex;
    padding: 1rem 1.5rem;
    transition: background-color 250ms;

    &:hover {
      background-color: ${palette.ash.lighter.css};
    }
  `}
`;

const Icon = styled.div`
  ${({ theme: { palette } }) => css`
    color: ${palette.asphalt.css};
    margin-right: 1.25rem;
  `}
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  ${({ theme: { palette } }) => css`
    color: ${palette.asphalt.darker.css};
    margin: 0;
  `}
`;

const Annotation = styled.p`
  ${({ theme: { palette } }) => css`
    color: ${palette.asphalt.lighter.css};
    font-size: 0.8rem;
    margin: 0;
  `}
`;

export interface SearchResult {
  annotation?: string;
  icon?: IconType;
  key?: string;
  ranking?: number;
  text: string;
  extraData?: any;
}

type SearchResultItemProps = {
  isHighlighted: boolean;
  searchResult: SearchResult;
  onSelect?: () => void;
};

function SearchResultItem({ isHighlighted, onSelect, searchResult }: SearchResultItemProps) {
  const { text, annotation, icon: IconElement } = searchResult;

  return (
    <Wrapper isHighlighted={isHighlighted} onClick={onSelect}>
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
