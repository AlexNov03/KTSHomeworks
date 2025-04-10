import React from 'react';
import { IconProps } from 'components/icons/Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  const { width, height, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
      width={width ? width : 24}
      height={height ? height : 24}
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M22.0062 5.95005L12.4979 15.4584C11.375 16.5813 11.375 18.4188 12.4979 19.5417L22.0062 29.05"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
