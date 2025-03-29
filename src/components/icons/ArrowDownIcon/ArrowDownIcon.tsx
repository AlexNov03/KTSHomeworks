import classNames from 'classnames';
import * as React from 'react';
import { IconProps } from 'components/icons/Icon';
import styles from 'components/icons/Icon/Icon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  const color = props.color ?? 'primary';
  const { width, height, className, ...restProps } = props;
  const checkIconClassNames = classNames(className, styles[`color-${color}`]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={checkIconClassNames}
      {...restProps}
      width={width ? width : 24}
      height={height ? height : 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill="none"
      />
    </svg>
  );
};

export default ArrowDownIcon;
