import classNames from 'classnames';
import React from 'react';
import Loader from 'components/Loader';
import 'styles/Roboto/fonts.css';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  className?: string;

  onClick?: React.MouseEvent;

  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, loading, children, onClick, ...restProps } = props;
  const btnClassName = classNames(
    className,
    styles['button-component'],
    className ? className : '',
    disabled ? styles['disabled'] : styles['default'],
    loading ? styles['loading'] : '',
  );

  return (
    <button
      className={btnClassName}
      disabled={loading ? true : disabled}
      onClick={loading || disabled ? undefined : onClick}
      {...restProps}
    >
      {loading && <Loader size="s" />}
      {children}
    </button>
  );
};

export default Button;
