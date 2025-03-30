import * as React from 'react';
import { IconProps } from 'components/icons/Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  const { width, height, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
