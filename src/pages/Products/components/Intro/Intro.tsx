import React from 'react';

import Text from 'components/Text';

import styles from './Intro.module.scss';

const Intro = () => {
  return (
    <div className={styles['intro']}>
      <div className={styles['intro__content']}>
        <Text className={styles['intro-content__text']} view="title">
          Products
        </Text>
        <Text className={styles['intro-content__text']} view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
    </div>
  );
};

export default Intro;
