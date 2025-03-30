import classNames from 'classnames';
import React, { Ref } from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;

  ref: Ref<HTMLInputElement | null>;
};

const Input: React.FC<InputProps> = (props) => {
  const { ref, value, className, placeholder, afterSlot, onChange, ...restProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const inputClassName = classNames(styles['input-container'], className);

  return (
    <div className={inputClassName}>
      <input
        ref={ref}
        {...restProps}
        type="text"
        {...(value ? { value } : null)}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {afterSlot}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
