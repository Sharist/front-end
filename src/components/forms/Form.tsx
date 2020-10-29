import React, { ReactChild } from 'react';

type Props = {
  children?: ReactChild | ReactChild[];

  /**
   * If specified, generates a hidden `<button type="submit"></button>`
   * and assign this prop to the `button`'s ref.
   */
  hiddenSubmitRef?: React.Ref<HTMLButtonElement>;

  /**
   * Submit handler for form submit.
   */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function Form({ children, hiddenSubmitRef, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      {children}

      {hiddenSubmitRef && (
        <button hidden name='form_hidden_submit' ref={hiddenSubmitRef} type='submit' />
      )}
    </form>
  );
}

export default Form;
