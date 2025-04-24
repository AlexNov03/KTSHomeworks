import { observer } from 'mobx-react-lite';
import BackButton from 'components/BackButton';
import Text from 'components/Text';
import CartItem from 'pages/Cart/components/CartItem/CartItem';

import CartSummary from 'pages/Cart/components/CartSummary';
import lStorageStore from 'store/LStorageStore';
import styles from './Cart.module.scss';

const Cart = () => {
  const cartElems = lStorageStore.cartProducts.map((elem) => <CartItem key={elem.id} data={elem} />);
  return (
    <div className={styles['cart-page']}>
      <BackButton className={styles['cart-page__back-button']} />
      <Text className={styles['cart-page__title']} view="title">
        Your Shopping Cart
      </Text>
      {lStorageStore.getProductsAmount() > 0 && <div className={styles['cart-page__items']}>{cartElems}</div>}
      <CartSummary />
    </div>
  );
};

export default observer(Cart);
