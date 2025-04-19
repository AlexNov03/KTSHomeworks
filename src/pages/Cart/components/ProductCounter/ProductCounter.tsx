import { observer } from 'mobx-react-lite';
import React from 'react';
import lStorageStore, { LStorageProductData } from 'store/LStorageStore';
import styles from './ProductCounter.module.scss';

export type ProductCounterProps = {
  data: LStorageProductData;
};

const ProductCounter: React.FC<ProductCounterProps> = ({ data }) => {
  const id = data.id;
  return (
    <div className={styles['counter__container']}>
      <div onClick={() => lStorageStore.increaseCartProductAmount(id)} className={styles['counter__button-plus']}>
        +
      </div>
      <div className={styles['counter__window']}>{data.amount}</div>
      <div onClick={() => lStorageStore.decreaseCartProductAmount(id)} className={styles['counter__button-minus']}>
        -
      </div>
    </div>
  );
};

export default observer(ProductCounter);
