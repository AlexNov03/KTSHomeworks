import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Icon from 'components/icons/Icon';

import styles from './ProductOverview.module.scss';

export type ProductOverviewProps = {
  title: string;
  currentIdx: number;
  images: string[];
  description: string;
  price: number;
  getPrevPhoto: () => void;
  getNextPhoto: () => void;
};

const ProductOverview: React.FC<ProductOverviewProps> = (props) => {
  const { title, images, description, price, currentIdx, getPrevPhoto, getNextPhoto } = props;

  const imageElements: JSX.Element[] = images.map((image) => (
    <img key={image} referrerPolicy="no-referrer" src={image} />
  ));

  return (
    <div className={styles['product-overview']}>
      <div className={styles['product-overview__image-container']}>
        <div
          style={{
            transform: `translateX(${-currentIdx * 100}%)`,
            transition: `transform 0.5s`,
          }}
          className={styles['product-overview__image-ribbon']}
        >
          {imageElements}
        </div>
      </div>

      <main className={styles['product-overview__content']}>
        <header className={styles['product-overview__header']}>
          <Text view="title" className={styles['product-overview__title']}>
            {title}
          </Text>
          <Text view="p-20" color="secondary" className={styles['no-spacing']}>
            {description}
          </Text>
        </header>
        <div className={styles['product-overview__action']}>
          <Text view="title" className={styles['product-overview__action-text']}>{`$${price}`}</Text>
          <footer className={styles['product-overview__footer']}>
            <Button>Buy Now</Button>
            <Button>Add to Card</Button>
          </footer>
        </div>
      </main>

      <div className={styles['slider__button-container']}>
        <div className={classNames(styles['slider__button'], styles['slider__button-left'])} onClick={getPrevPhoto}>
          <Icon color="primary" width={35} height={35}>
            <ArrowLeftIcon />
          </Icon>
        </div>

        <div className={classNames(styles['slider__button'], styles['slider__button-right'])} onClick={getNextPhoto}>
          <Icon width={35} height={35}>
            <ArrowRightIcon />
          </Icon>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductOverview);
