import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import BasketIcon from 'components/icons/BasketIcon';
import CheckIcon from 'components/icons/CheckIcon';
import { routesMasks } from 'config/routesMasks';
import HeaderStore from 'store/HeaderStore';
import lStorageStore from 'store/LStorageStore';

import sStorageStore from 'store/SessionStorage';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const headerStore = useLocalStore(() => new HeaderStore());

  React.useEffect(() => {
    headerStore.getAvatar();
  }, [headerStore]);

  return (
    <header className={styles.header}>
      <CheckIcon width={120} height={42} />
      <div className={styles['header__aside-bar']}>
        <div className={styles.auth}>
          {!headerStore.avatar ? (
            <div onClick={() => navigate(routesMasks.auth.create())}>
              <Text view="p-16" color="accent" weight="medium">
                Login
              </Text>
            </div>
          ) : (
            <>
              <div onClick={() => sStorageStore.removeAuthToken()}>
                <Text view="p-16" color="accent" weight="medium">
                  Logout
                </Text>
              </div>
              <img crossOrigin="anonymous" src={headerStore.avatar} className={styles.auth__image} />
            </>
          )}
        </div>

        <BasketIcon width={40} height={40} onClick={() => navigate('cart')} />
        <div className={styles['products-counter']}>
          <div className={styles['products-counter__item']}>{lStorageStore.getProductsAmount()}</div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
