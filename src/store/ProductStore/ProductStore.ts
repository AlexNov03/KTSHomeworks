import ApiProducts from 'api/ApiProducts/ApiProducts';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ProductData } from 'models/Products/ProductData';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_meta' | '_cardData';

export default class ProductStore implements ILocalStore {
  private _cardData: ProductData | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _meta: observable,
      _cardData: observable,
      getProductInfo: action,
      meta: computed,
      cardData: computed,
    });
  }

  get cardData() {
    return this._cardData;
  }

  get meta() {
    return this._meta;
  }

  async getProductInfo(id: number) {
    this._meta = Meta.loading;

    const response = await ApiProducts.getProductByID(id);

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._cardData = response.data;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy() {
    this._cardData = null;
    this._meta = Meta.initial;
  }
}
