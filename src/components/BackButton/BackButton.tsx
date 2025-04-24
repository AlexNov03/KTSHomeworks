import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import Icon from 'components/icons/Icon';

import styles from './BackButton.module.scss';

export type BackButtonProps = {
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className={classNames(styles['backbutton-container'], className)}>
      <Icon width={30} height={30} color="primary">
        <ArrowLeftIcon />
      </Icon>
      Back
    </div>
  );
};

export default BackButton;
