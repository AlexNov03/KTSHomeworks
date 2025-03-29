import classNames from 'classnames';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'button';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag, weight, children, color, maxLines }) => {
  tag ??= 'p';

  const classes = classNames(
    className,
    view ? styles[view] : '',
    weight ? styles[weight] : '',
    color ? styles[color] : '',
    `max-lines-${maxLines}`,
  );

  const props = {
    className: classes,
    style: maxLines
      ? {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          '-webkit-line-clamp': `${maxLines}`,
        }
      : {},
  };

  const tagVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'];

  const Elem = tagVariants.find((elem) => elem === tag) ?? 'p';

  const TagElem = Elem as keyof React.JSX.IntrinsicElements;

  return <TagElem {...props}>{children}</TagElem>;
};

export default Text;
