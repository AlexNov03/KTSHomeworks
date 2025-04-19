import classNames from 'classnames';
import React, { Ref } from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  error?: string;
  caption?: string;
  ref?: Ref<HTMLInputElement | null>;
};

const Input: React.FC<InputProps> = (props) => {
  const { ref, value, className, placeholder, afterSlot, onChange, error, caption, ...restProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const containerClasses = classNames(styles['input-container'], className, {
    [styles['input-container--error']]: error,
  });

  return (
    <div className={styles['input-wrapper']}>
      <div className={containerClasses}>
        <input
          ref={ref}
          {...restProps}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={styles.input}
        />
        {afterSlot && <div className={styles['after-slot']}>{afterSlot}</div>}
      </div>
      {(error || caption) && (
        <div className={classNames(styles['message'], { [styles['message--error']]: error })}>{error || caption}</div>
      )}
    </div>
  );
};

export default Input;
