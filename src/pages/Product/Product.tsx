import { useLocalStore, observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router';
import Loader from 'components/Loader';
import ProductStore from 'store/ProductStore';
import { Meta } from 'utils/meta';
import ProductOverview from './components/ProductOverview';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();

  const productStore = useLocalStore(() => new ProductStore());

  React.useEffect(() => {
    if (id) {
      productStore.getProductInfo(Number(id));
    }
  }, [id, productStore]);

  return (
    <div className={styles['product-page']}>
      {productStore.meta === Meta.loading && (
        <div className={styles['product-page__loader']}>
          <Loader size="l" />
        </div>
      )}
      {productStore.cardData && (
        <ProductOverview
          images={productStore.cardData.images}
          title={productStore.cardData.title}
          description={productStore.cardData.description}
          price={productStore.cardData.price}
          getPrevPhoto={productStore.getPrevPhoto}
          getNextPhoto={productStore.getNextPhoto}
          currentIdx={productStore.currentIdx}
          direction={productStore.direction}
        />
      )}
    </div>
  );
};

export default observer(Product);
