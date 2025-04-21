import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Text from 'components/Text';
import lStorageStore from 'store/LStorageStore';
import styles from './CartSummary.module.scss';

const CartSummary = () => {
  const discount = lStorageStore.getDiscount();
  return (
    <div className={styles['cart-summary']}>
      <Text tag="h2" className={classNames(styles['underly'], styles['cart-summary__header'])}>
        Order Summary
      </Text>
      <div className={styles['cart-summary__info']}>
        <Text view="p-18">{`Items (${lStorageStore.getProductsAmount()})`}</Text>
        <Text view="p-18">${lStorageStore.getTotalSumm()}</Text>
      </div>
      <div className={styles['cart-summary__info']}>
        <Text view="p-18">Discount</Text>
        <Text className={styles['cart-summary__discount']} view="p-18">
          ${discount}
        </Text>
      </div>
      <div className={classNames(styles['underly'], styles['cart-summary__info'])}>
        <Text view="p-18">Shipping</Text>
        <Text view="p-18">Free</Text>
      </div>
      <div className={styles['cart-summary__info']}>
        <Text tag="h2">Total</Text>
        <Text tag="h2">${lStorageStore.getTotalSumm() - discount}</Text>
      </div>
      <Button>Proceed to Checkout</Button>
    </div>
  );
};

export default observer(CartSummary);
