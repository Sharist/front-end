import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { randomInputName } from '../../forms';
import ErrorMessage from './ErrorMessage';

const TextAreaLabel = styled.label<{ isInputFocused: boolean }>`
  ${({ isInputFocused, theme: { palette } }) => css`
    color: ${isInputFocused ? palette.regular.css : palette.grey.css};
    font-size: 0.85rem;
    margin-bottom: 0.2rem;
    transition: color 200ms;
  `}
`;

const TextArea = styled.textarea<{ hasError: boolean }>`
  ${({ hasError, theme: { palette } }) => css`
    border: none;
    border-bottom: 0.05rem solid ${hasError ? palette.sun.css : palette.ash.css};
    padding: 0.5rem 0.25rem;
    resize: vertical;
    transition: border-bottom 200ms, box-shadow 200ms;
    width: 100%;
    min-height: 2rem;
    max-height: 20rem;

    &:focus {
      border-bottom: 0.05rem solid ${hasError ? palette.sun.css : palette.grey.css};
      box-shadow: 0 0.15rem 0.25rem -0.25rem ${palette.grey.css};
      outline-width: 0;
    }
  `}
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

type Props = {
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  spellCheck?: boolean;
  textAreaRef?: React.Ref<HTMLTextAreaElement>;
  value?: string;
};

function TextAreaInput({
  disabled = false,
  errorMessage,
  label,
  name = randomInputName(),
  onChange,
  onKeyPress,
  placeholder = '',
  required,
  rows,
  spellCheck = true,
  textAreaRef,
  value,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextAreaWrapper>
      {label && (
        <TextAreaLabel isInputFocused={focused} htmlFor={name}>
          {label}
        </TextAreaLabel>
      )}

      <TextArea
        disabled={disabled}
        hasError={!!errorMessage}
        name={name}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        ref={textAreaRef}
        required={required}
        rows={rows}
        spellCheck={spellCheck}
        value={value}
      />

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </TextAreaWrapper>
  );
}

export default TextAreaInput;
