import React from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  ${({ theme: { palette } }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 1rem 1.5rem;

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
  text: string;
  annotation?: string;
  icon?: IconType;
  onSelect?: () => void;
  ranking?: number;
}

type SearchResultItemProps = {
  searchResult: SearchResult;
};

function SearchResultItem({ searchResult }: SearchResultItemProps) {
  const { text, annotation, icon, onSelect } = searchResult;
  const IconElement = icon;

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
