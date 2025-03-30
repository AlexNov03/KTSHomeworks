import React from 'react';
import CheckIcon from 'components/icons/CheckIcon';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <CheckIcon width={120} height={42} />
    </header>
  );
};

export default Header;
