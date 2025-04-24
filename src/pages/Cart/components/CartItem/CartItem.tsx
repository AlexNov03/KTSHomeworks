import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ProductCounter from 'components/ProductCounter';
import Text from 'components/Text';
import GarbageIcon from 'components/icons/GarbageIcon';
import HeartIcon from 'components/icons/HeartIcon';
import Icon from 'components/icons/Icon';
import lStorageStore, { LStorageProductData } from 'store/LStorageStore';

import defaultImage from '../../../../assets/image.png';

import styles from './CartItem.module.scss';

export type CartItemProps = {
  data: LStorageProductData;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const id = data.id;
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultImage;
    img.onerror = null;
  };
  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__image']}>
        <img referrerPolicy="no-referrer" src={data.images[0]} alt="card-img" onError={handleImageError} />
      </div>
      <main className={styles['cart-item__content']}>
        <div className={styles['cart-item__header']}>
          <Text className={styles['no-spacing']} view="p-20" weight="medium" maxLines={2}>
            {data.title}
          </Text>
          <Text className={styles['no-spacing']} view="p-16" weight="bold">
            ${data.price}
          </Text>
        </div>
        <Text view="p-16" color="secondary" maxLines={3}>
          {data.description}
        </Text>
        <div className={styles['cart-item__action']}>
          <div className={styles['cart-item__action-button']}>
            <Icon width={30} height={30} color="secondary">
              <HeartIcon />
            </Icon>
            <Text color="secondary" view="p-18" className={classNames(styles['no-spacing'], styles['text-vertical'])}>
              Wishlist
            </Text>
          </div>
          <div onClick={() => lStorageStore.removeCartProduct(id)} className={styles['cart-item__action-button']}>
            <Icon width={30} height={30} color="secondary">
              <GarbageIcon />
            </Icon>
            <Text color="secondary" view="p-18" className={classNames(styles['no-spacing'], styles['text-vertical'])}>
              Remove
            </Text>
          </div>
        </div>
        <ProductCounter data={data} />
        <footer className={styles['cart-item__content-footer']}>{data.slug}</footer>
      </main>
    </div>
  );
};

export default observer(CartItem);
