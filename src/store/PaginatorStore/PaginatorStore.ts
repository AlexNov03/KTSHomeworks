import { action, makeObservable, observable } from 'mobx';
import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import rootStore from 'store/RootStore/RootStore';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_offset';

export const ITEMS_PER_PAGE = 9;

export default class PaginatorStore implements ILocalStore {
  private _offset: number = 0;

  constructor() {
    makeObservable<PaginatorStore, PrivateFields>(this, {
      _offset: observable,
      increment: action,
      decrement: action,
    });

    const value = rootStore.query.getParam(ProductsQueryParamsNames.OFFSET);
    if (value) {
      this._offset = Number(value);
    }
  }

  get offset() {
    return this._offset;
  }

  increment() {
    this._offset++;
  }

  decrement() {
    if (this._offset > 0) {
      this._offset--;
    }
  }

  destroy() {
    this._offset = 0;
  }
}
