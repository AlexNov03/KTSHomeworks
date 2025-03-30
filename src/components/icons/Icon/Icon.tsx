import classNames from 'classnames';
import * as React from 'react';

import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  children?: React.ReactNode;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  const { children, className, color = 'primary', ...restProps } = props;
  const childrenClassNames = classNames(className, styles[`color-${color}`]);
  const childrenProps = { ...restProps, ...{ className: childrenClassNames } };
  const elem = children && React.isValidElement(children) ? React.cloneElement(children, childrenProps) : null;
  return <div className="icon-container">{elem}</div>;
};

export default Icon;
