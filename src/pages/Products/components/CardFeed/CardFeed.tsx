import { observer } from 'mobx-react-lite';
import React from 'react';

import { useNavigate } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';

import { routesMasks } from 'config/routesMasks';
import { ProductData } from 'models/Products/ProductData';
import lStorageStore from 'store/LStorageStore';
import styles from './CardFeed.module.scss';

export type CardFeedProps = {
  cards: ProductData[];
  loading: boolean;
};

const CardFeed: React.FC<CardFeedProps> = ({ cards, loading }) => {
  const navigate = useNavigate();
  return (
    <div className={styles['card-feed']}>
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} loading={true} title="" subtitle="" captionSlot="" contentSlot="" actionSlot={null} />
          ))
        : cards.map((card) => {
            const { id, title, slug, price, description, images } = card;
            return (
              <Card
                key={id}
                image={images[0]}
                title={title}
                subtitle={description}
                captionSlot={slug}
                contentSlot={`$${price}`}
                actionSlot={
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      lStorageStore.addCartProduct({
                        id: id,
                        title: title,
                        slug: slug,
                        price: price,
                        description: description,
                        images: images,
                        amount: 1,
                      });
                      navigate(routesMasks.cart.create());
                    }}
                  >
                    Add to Cart
                  </Button>
                }
                onClick={() => {
                  navigate(routesMasks.product.create(id));
                }}
              />
            );
          })}
    </div>
  );
};

export default observer(CardFeed);
