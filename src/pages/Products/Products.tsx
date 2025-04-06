import { observer } from 'mobx-react-lite';
import React from 'react';
import Loader from 'components/Loader';
import Paginator from 'components/Paginator';
import ProductsStore from 'store/ProductsStore';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import CardFeed from './components/CardFeed';
import Intro from './components/Intro';
import SearchBar from './components/SearchBar';
import SearchResultsInfo from './components/SearchResultsInfo';
import styles from './Products.module.scss';

const Products = () => {
  const productsStore = useLocalStore<ProductsStore>(() => new ProductsStore());

  React.useEffect(() => {
    productsStore.getProductsList();
  }, [productsStore]);

  return (
    <div className={styles['products-page']}>
      <Intro />
      <SearchBar onClick={() => productsStore.searchByTitle()} />
      <SearchResultsInfo numProducts={productsStore.cardsDataLength} />
      {productsStore.meta === Meta.loading && (
        <div className={styles['products-page__loader']}>
          <Loader size="l" />
        </div>
      )}
      {productsStore.meta === Meta.success && <CardFeed cards={productsStore.cardsData} />}
      <Paginator paginatorStore={productsStore.paginatorStore} />
    </div>
  );
};

export default observer(Products);
