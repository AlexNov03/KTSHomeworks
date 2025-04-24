import React from 'react';
import { IconProps } from 'components/icons/Icon';

const LoginIcon: React.FC<IconProps> = (props) => {
  const { width = 24, height = 24, ...rest } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M9 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H9"
        stroke="#151411"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M16 17L20 12L16 7" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H9" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default LoginIcon;
