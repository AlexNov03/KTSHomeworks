import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router';
import Text from 'components/Text';
import AuthIcon from 'components/icons/AuthIcon';
import BasketIcon from 'components/icons/BasketIcon';
import CheckIcon from 'components/icons/CheckIcon';
import Icon from 'components/icons/Icon';
import LoginIcon from 'components/icons/LoginIcon';
import { routesMasks } from 'config/routesMasks';
import HeaderStore from 'store/HeaderStore';
import lStorageStore from 'store/LStorageStore';

import sStorageStore from 'store/SessionStorage';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const headerStore = useLocalStore(() => new HeaderStore());
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    headerStore.getData();
  }, [headerStore]);

  return (
    <>
      <header className={`${styles.header} ${styles.sticky}`}>
        <CheckIcon width={120} height={42} />
        <div className={styles['header__aside-bar']}>
          <div className={styles.auth}>
            {headerStore.avatar && (
              <img crossOrigin="anonymous" src={headerStore.avatar} className={styles.auth__image} alt="User avatar" />
            )}

            <div
              className={styles['menu-trigger']}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <Text view="p-16" color="accent" weight="medium">
                Menu
              </Text>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <div className={styles['menu-overlay']} onClick={() => setIsMenuOpen(false)} />
          <div className={styles['dropdown-menu']}>
            <div className={styles['auth__dropdown']}>
              {!headerStore.avatar ? (
                <div
                  className={styles['dropdown-item']}
                  onClick={() => {
                    navigate(routesMasks.auth.create());
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon height={30} width={30}>
                    <LoginIcon />
                  </Icon>
                  <span>Login</span>
                </div>
              ) : (
                <div
                  className={styles['dropdown-item']}
                  onClick={() => {
                    sStorageStore.removeAuthToken();
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon height={30} width={30}>
                    <LoginIcon />
                  </Icon>
                  <span>Logout</span>
                </div>
              )}
              <div
                className={styles['dropdown-item']}
                onClick={() => {
                  navigate(routesMasks.cart.create());
                  setIsMenuOpen(false);
                }}
              >
                <div className={styles['cart-wrapper']}>
                  <BasketIcon width={35} height={35} />
                  {lStorageStore.getProductsAmount() > 0 && (
                    <div className={styles['products-counter__item']}>{lStorageStore.getProductsAmount()}</div>
                  )}
                </div>
                <span>Cart</span>
              </div>
              <div
                className={styles['dropdown-item']}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (headerStore.name) {
                    navigate(routesMasks.profile.create());
                  } else {
                    navigate(routesMasks.auth.create());
                  }
                }}
              >
                <div className={styles['cart-wrapper']}>
                  <AuthIcon width={30} height={30} />
                </div>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default observer(Header);
