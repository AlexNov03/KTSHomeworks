import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router';
import Card from 'components/Card';

import { routesMasks } from 'config/routesMasks';

import { ProductData } from 'models/Products/ProductData';
import styles from './CardFeed.module.scss';

export type CardFeedProps = {
  cards: ProductData[];
};

const CardFeed: React.FC<CardFeedProps> = ({ cards }) => {
  const navigate = useNavigate();
  return (
    <div className={styles['card-feed']}>
      {cards.map((card) => {
        const { id, title, slug, price, description, images } = card;
        return (
          <Card
            key={id}
            image={images[0]}
            title={title}
            subtitle={description}
            captionSlot={slug}
            contentSlot={`$${price}`}
            actionSlot="Add to Cart"
            onClick={() => {
              navigate(`${routesMasks.product.create(id)}`);
            }}
          />
        );
      })}
    </div>
  );
};

export default observer(CardFeed);
