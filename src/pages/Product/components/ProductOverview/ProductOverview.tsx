import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';

import styles from './ProductOverview.module.scss';

export type ProductOverviewProps = {
  title: string;
  src: string;
  description: string;
  price: number;
};

const ProductOverview: React.FC<ProductOverviewProps> = (props) => {
  const { title, src, description, price } = props;
  return (
    <div className={styles['product-overview']}>
      <img src={src} />
      <main className={styles['product-overview__content']}>
        <header className={styles['product-overview__title']}>
          <Text view="title" className={styles['no-spacing']}>
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
    </div>
  );
};

export default ProductOverview;
