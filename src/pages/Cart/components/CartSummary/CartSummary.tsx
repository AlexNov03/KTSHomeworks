import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import lStorageStore from 'store/LStorageStore';
import styles from './CartSummary.module.scss';

const CartSummary = () => {
  const discount = lStorageStore.getDiscount();
  const total = lStorageStore.getTotalSumm() - discount;

  return (
    <div className={styles['cart-summary']}>
      <Text tag="h2" className={styles['cart-summary__header']}>
        Order Summary
      </Text>

      <div className={styles['cart-summary__info']}>
        <Text view="p-18">{`Items (${lStorageStore.getProductsAmount()})`}</Text>
        <Text view="p-18">${lStorageStore.getTotalSumm().toFixed(2)}</Text>
      </div>

      <div className={styles['cart-summary__info']}>
        <Text view="p-18">Discount</Text>
        <Text className={styles['cart-summary__discount']} view="p-18">
          ${discount.toFixed(2)}
        </Text>
      </div>

      <div className={styles['cart-summary__info']}>
        <Text view="p-18">Shipping</Text>
        <Text view="p-18" color="accent">
          Free
        </Text>
      </div>

      <div className={classNames(styles['cart-summary__info'], styles['total-row'])}>
        <Text tag="h3">Total</Text>
        <Text tag="h3">${total.toFixed(2)}</Text>
      </div>

      <Button className={styles['checkout-btn']}>Proceed to Checkout</Button>
    </div>
  );
};

export default observer(CartSummary);
