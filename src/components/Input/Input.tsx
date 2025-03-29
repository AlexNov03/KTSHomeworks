import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, disabled, className, placeholder, afterSlot, onChange, ...restProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const inputClassName = classNames(styles['input-container'], disabled ? 'disabled' : '', className ? className : '');

  return (
    <div className={inputClassName}>
      <input
        ref={ref}
        {...restProps}
        type="text"
        disabled={disabled ? true : false}
        {...(value ? { value } : null)}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {afterSlot}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
