import React from 'react';
import { IconProps } from 'components/icons/Icon';

const GarbageIcon: React.FC<IconProps> = (props) => {
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
        d="M26.25 8.75H30.625V11.6667H28.4375V28.4375C28.4375 29.3394 27.6839 30.625 26.25 30.625H8.75C7.31615 30.625 6.5625 29.3394 6.5625 28.4375V11.6667H4.375V8.75H8.75H12.25H22.75H26.25ZM11.6667 11.6667H23.3333V27.7083H11.6667V11.6667ZM13.125 5.83333H21.875V8.75H13.125V5.83333Z"
        // stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GarbageIcon;
