import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { randomInputName } from '../../common/forms';
import ErrorMessage from './ErrorMessage';

const InputLabel = styled.label<{ isInputFocused: boolean }>`
  ${({ isInputFocused, theme: { oldPalette: palette } }) => css`
    color: ${isInputFocused ? palette.REGULAR : palette.GREY};
    font-size: 0.85rem;
    margin-bottom: 0.2rem;
    transition: color 200ms;
  `}
`;

const Input = styled.input<{ hasError: boolean }>`
  ${({ hasError, theme: { oldPalette: palette } }) => css`
    border: none;
    border-bottom: 0.05rem solid ${hasError ? palette.SUN : palette.ASH};
    padding: 0.5rem 0.25rem;
    transition: border-bottom 200ms, box-shadow 200ms;
    width: 100%;

    &:focus {
      border-bottom: 0.05rem solid ${hasError ? palette.SUN : palette.GREY};
      box-shadow: 0 0.15rem 0.25rem -0.25rem ${palette.GREY};
      outline-width: 0;
    }
  `}
`;

const TextInputWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

type Props = {
  disabled?: boolean;
  errorMessage?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  label?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  /** `true` to turn on spellcheck. Default is `true`. */
  spellCheck?: boolean;
  type?: string;
  value?: string;
};

function TextInput({
  disabled = false,
  errorMessage,
  inputRef,
  label,
  name = randomInputName(),
  onChange,
  onKeyPress,
  placeholder = '',
  required,
  spellCheck = true,
  type,
  value,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInputWrapper>
      {label && (
        <InputLabel isInputFocused={focused} htmlFor={name}>
          {label}
        </InputLabel>
      )}

      <Input
        autoFocus
        disabled={disabled}
        hasError={!!errorMessage}
        name={name}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        ref={inputRef}
        required={required}
        spellCheck={spellCheck}
        type={type}
        value={value}
      />

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </TextInputWrapper>
  );
}

export default TextInput;
