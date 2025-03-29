import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  children?: React.ReactNode;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  const { children, ...restProps } = props;
  const elem = children && React.isValidElement(children) ? React.cloneElement(children, restProps) : null;
  return <div className="icon-container">{elem}</div>;
};

export default Icon;
