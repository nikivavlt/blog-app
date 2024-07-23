import React from 'react';
import './styles.scss';

interface IProps {
  value: string | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error: string | undefined
  id: string
  name: string
  type: string
  placeholder: string
  errorMessage: string
  label: string
  pattern: string
  validateValue: (eventTarget: HTMLInputElement) => void
}

const Input = ({
  label,
  errorMessage,
  error,
  validateValue,
  onChange,
  pattern,
  ...restData
}: IProps): JSX.Element => {
  return (
    <div className='form-input'>
      <label htmlFor={restData.id}>{label}</label>
      <input
        className={(error !== null) ? 'invalid' : ''}
        {...restData}
        onChange={onChange}
        onBlur={(event) => { validateValue(event.target); }}
      />
      {(error !== null) && <span>{error}</span>}
    </div>
  );
};

export default Input;
