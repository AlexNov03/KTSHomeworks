import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { CardData } from 'pages/Products/Products';
import ProductOverview from './components/ProductOverview';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();

  const [cardData, setCardData] = useState<CardData>();

  React.useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: `https://api.escuelajs.co/api/v1/products/${id}`,
      });

      setCardData(result.data);
    };

    fetch();
  }, [id]);

  return (
    <div className={styles['product-page']}>
      {cardData && (
        <ProductOverview
          src={cardData.images[0]}
          title={cardData.title}
          description={cardData.description}
          price={cardData.price}
        />
      )}
    </div>
  );
};

export default Product;
