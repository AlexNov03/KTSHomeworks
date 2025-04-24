import React from 'react';
import { IconProps } from 'components/icons/Icon';

const AuthIcon: React.FC<IconProps> = (props) => {
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
      <circle cx="17.5" cy="17.5" r="16.25" stroke="#151411" strokeWidth="1.5" strokeMiterlimit="10" />
      <path
        d="M17.5 12.25C19.2949 12.25 20.75 10.7949 20.75 9C20.75 7.20507 19.2949 5.75 17.5 5.75C15.7051 5.75 14.25 7.20507 14.25 9C14.25 10.7949 15.7051 12.25 17.5 12.25Z"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.125 29.25C9.125 24.8125 12.9375 21.125 17.5 21.125C22.0625 21.125 25.875 24.8125 25.875 29.25"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AuthIcon;
