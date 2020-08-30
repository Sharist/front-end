import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { randomInputName } from '../../common/forms';

const InputLabel = styled.label<{ isInputFocused: boolean }>`
  ${({ isInputFocused, theme: { palette } }) => css`
    color: ${isInputFocused ? palette.REGULAR : palette.GREY};
    font-size: 0.85rem;
    transition: color 200ms;
  `}
`;

const Input = styled.input`
  ${({ theme: { palette } }) => css`
    border: none;
    border-bottom: 0.05rem solid ${palette.CLOUD};
    padding: 0.5rem 0.25rem;
    transition: border-bottom 200ms, box-shadow 200ms;
    width: 100%;

    &:focus {
      border-bottom: 0.05rem solid ${palette.GREY};
      box-shadow: 0 0.15rem 0.25rem -0.25rem ${palette.GREY};
      outline-width: 0;
    }
  `}
`;

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  & > * {
    margin: 0.25rem 0;
  }
`;

type Props = {
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  spellCheck?: boolean;
  type?: string;
  value?: string;
};

function TextInput({
  disabled = false,
  label,
  onChange,
  onKeyPress,
  placeholder = '',
  spellCheck = true,
  type,
  value,
}: Props) {
  const name = randomInputName();

  const inputRef = useRef<HTMLInputElement | null>(null);
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
        name={name}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        ref={inputRef}
        spellCheck={spellCheck}
        type={type}
        value={value}
      />
    </TextInputWrapper>
  );
}

export default TextInput;
