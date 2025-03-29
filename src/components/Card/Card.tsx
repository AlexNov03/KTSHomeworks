import classNames from 'classnames';
import React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  const { className, image, captionSlot, title, subtitle, contentSlot, actionSlot, ...restProps } = props;

  return (
    <div className={classNames(className, styles['card'])} {...restProps}>
      <div className={styles['card__image']}>
        <img src={image} alt="card-img" />
      </div>
      <div className={styles['card__content']}>
        <div className={styles['card__description']}>
          {captionSlot ? (
            <Text
              tag="p"
              className={classNames(styles['no-spacing'], 'card__caption-slot')}
              color="secondary"
              weight="medium"
              view="p-14"
            >
              {captionSlot}
            </Text>
          ) : null}
          <Text
            tag="p"
            className={classNames(styles['no-spacing'], styles['card__title'])}
            weight="medium"
            color="primary"
            maxLines={2}
            view="p-20"
          >
            {title}
          </Text>
          <Text
            tag="p"
            className={classNames(styles['no-spacing'], styles['card__subtitle'])}
            color="secondary"
            maxLines={3}
            view="p-16"
          >
            {subtitle}
          </Text>
        </div>
        <div className={styles['card__footer']}>
          {contentSlot && <p className={styles['content-slot']}>{contentSlot}</p>}
          {actionSlot && <Button>{actionSlot}</Button>}
        </div>
      </div>
    </div>
  );
};

export default Card;
