import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }) => {
  size ??= 'l';
  return (
    <div className={`loader-container ${styles[`size-${size}`]} ${className}`}>
      <div className={`loader ${styles[`size-${size}`]}`}></div>
    </div>
  );
};

export default Loader;
