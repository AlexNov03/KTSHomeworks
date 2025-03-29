import React from 'react';
import CheckIcon from 'components/icons/CheckIcon';
import Icon from 'components/icons/Icon';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <Icon width={120} height={42}>
        <CheckIcon />
      </Icon>
    </header>
  );
};

export default Header;
