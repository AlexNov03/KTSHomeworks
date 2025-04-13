import React from 'react';
import { IconProps } from 'components/icons/Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
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
        d="M12.9938 29.05L22.5021 19.5416C23.625 18.4187 23.625 16.5812 22.5021 15.4583L12.9938 5.94995"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
