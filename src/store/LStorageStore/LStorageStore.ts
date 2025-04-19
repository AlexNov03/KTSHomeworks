import { action, computed, makeObservable, observable } from 'mobx';

export type LStorageProductData = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  amount: number;
};

type PrivateFields = '_cartProducts';

export default class LStorageStore {
  private _cartProducts: LStorageProductData[] = [];

  constructor() {
    makeObservable<LStorageStore, PrivateFields>(this, {
      _cartProducts: observable,
      cartProducts: computed,
      increaseCartProductAmount: action,
      decreaseCartProductAmount: action,
      addCartProduct: action,
    });
    const startProducts = localStorage.getItem('cartProducts');
    this._cartProducts = startProducts ? JSON.parse(startProducts) : [];
  }

  getProductsAmount() {
    return this._cartProducts.reduce((acc, elem) => {
      acc += elem.amount;
      return acc;
    }, 0);
  }

  getTotalSumm() {
    return this._cartProducts.reduce((acc, elem) => {
      acc += elem.amount * elem.price;
      return acc;
    }, 0);
  }

  getDiscount() {
    const max = this.getTotalSumm();
    return Math.floor(Math.random() * (max / 2 + 1));
  }

  addCartProduct(item: LStorageProductData) {
    this._cartProducts = this._cartProducts.filter((elem) => elem.id !== item.id);
    this._cartProducts.push(item);
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }

  increaseCartProductAmount(productID: number) {
    this._cartProducts = this._cartProducts.map((elem) =>
      elem.id === productID ? { ...elem, amount: elem.amount + 1 } : elem,
    );
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }

  decreaseCartProductAmount(productID: number) {
    this._cartProducts = this._cartProducts.map((elem) =>
      elem.id === productID ? { ...elem, amount: elem.amount > 1 ? elem.amount - 1 : 1 } : elem,
    );
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }

  get cartProducts(): LStorageProductData[] {
    return this._cartProducts;
  }

  removeCartProduct(productID: number) {
    this._cartProducts = this._cartProducts.filter((elem) => elem.id !== productID);
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }

  clearCartProduct() {
    this._cartProducts = [];
    localStorage.setItem('cartProducts', JSON.stringify(this._cartProducts));
  }
}
