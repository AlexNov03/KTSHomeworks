import axios from 'axios';
import React, { useState } from 'react';
import CardFeed from './components/CardFeed';
import Intro from './components/Intro';
import SearchBar from './components/SearchBar';
import SearchResultsInfo from './components/SearchResultsInfo';

import styles from './Products.module.scss';

export type CardData = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
};

const Products = () => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products',
      });

      setCardsData(result.data);
    };

    fetch();
  }, []);

  return (
    <div className={styles['products-page']}>
      <Intro />
      <SearchBar />
      <SearchResultsInfo numProducts={cardsData.length} />
      <CardFeed cards={cardsData} />
    </div>
  );
};

export default Products;
