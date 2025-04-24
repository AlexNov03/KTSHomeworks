import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { useNavigate } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import ProductCounter from 'components/ProductCounter';

import { routesMasks } from 'config/routesMasks';
import { ProductData } from 'models/Products/ProductData';
import styles from './CardFeed.module.scss';

export type CardFeedProps = {
  cards: ProductData[];
  loading: boolean;
};

const CardFeed: React.FC<CardFeedProps> = ({ cards, loading }) => {
  const navigate = useNavigate();
  const [showCounters, setShowCounters] = useState<Record<number, boolean>>({});

  const toggleCounter = (id: number) => {
    setShowCounters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles['card-feed']}>
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} loading={true} title="" subtitle="" captionSlot="" contentSlot="" actionSlot={null} />
          ))
        : cards.map((card) => {
            const { id, title, slug, price, description, images } = card;
            const showCounter = showCounters[id];
            return (
              <Card
                key={id}
                image={images[0]}
                title={title}
                subtitle={description}
                captionSlot={slug}
                contentSlot={`$${price}`}
                actionSlot={
                  <div
                    className={styles['card-action-slot']}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Button
                      onClick={() => {
                        toggleCounter(id);
                      }}
                    >
                      {showCounter ? 'Hide' : 'Add to Cart'}
                    </Button>
                    {showCounter && (
                      <ProductCounter
                        data={{
                          id,
                          title,
                          slug,
                          price,
                          description,
                          images,
                          amount: 1,
                        }}
                      />
                    )}
                  </div>
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
