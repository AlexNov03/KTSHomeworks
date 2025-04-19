import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import BasketIcon from 'components/icons/BasketIcon';
import CheckIcon from 'components/icons/CheckIcon';
import lStorageStore from 'store/LStorageStore';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <CheckIcon width={120} height={42} />
      <div className={styles['header__aside-bar']}>
        <BasketIcon width={40} height={40} onClick={() => navigate('cart')} />
        <div className={styles['products-counter']}>
          <div className={styles['products-counter__item']}>{lStorageStore.getProductsAmount()}</div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
