import classNames from 'classnames';
import React from 'react';
import Text from 'components/Text';
import defaultImage from '../../assets/image.png';
import styles from './Card.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  image?: string;
  captionSlot?: React.ReactNode;
  title?: string;
  loading?: boolean;
  subtitle?: string;
  contentSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const { className, image, captionSlot, title, loading, subtitle, contentSlot, actionSlot, ...restProps } = props;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    img.src = defaultImage;
    img.onerror = null;
  };

  return (
    <div className={classNames(className, styles.card)} {...restProps}>
      <div className={styles.card__image}>
        {loading ? (
          <div className={classNames(styles.skeleton, styles['skeleton__image'])} />
        ) : (
          <img referrerPolicy="no-referrer" src={image} alt="card-img" onError={handleImageError} />
        )}
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__description}>
          {loading ? (
            <>
              <div className={classNames(styles.skeleton, styles['skeleton__caption'])} />
              <div className={classNames(styles.skeleton, styles['skeleton__title'])} />
              <div className={classNames(styles.skeleton, styles['skeleton__subtitle'])} />
            </>
          ) : (
            <>
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
                className={classNames(styles['no-spacing'], styles.card__title)}
                weight="medium"
                color="primary"
                maxLines={2}
                view="p-20"
              >
                {title}
              </Text>
              <Text
                tag="p"
                className={classNames(styles['no-spacing'], styles.card__subtitle)}
                color="secondary"
                maxLines={3}
                view="p-16"
              >
                {subtitle}
              </Text>
            </>
          )}
        </div>
        <div className={styles.card__footer}>
          {loading ? (
            <div className={styles['skeleton__footer']}>
              <div className={classNames(styles.skeleton, styles['skeleton__price'])} />
              <div className={classNames(styles.skeleton, styles['skeleton__button'])} />
            </div>
          ) : (
            <>
              {contentSlot && <p className={styles['content-slot']}>{contentSlot}</p>}
              {actionSlot}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
