import { action, IReactionDisposer, makeObservable, observable, reaction } from 'mobx';
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
  }

  get offset() {
    return this._offset;
  }

  increment() {
    rootStore.query.addParam(ProductsQueryParamsNames.OFFSET, String(this._offset + 1));
  }

  decrement() {
    if (this._offset > 0) {
      rootStore.query.addParam(ProductsQueryParamsNames.OFFSET, String(this._offset - 1));
    }
  }

  destroy() {
    this._offset = 0;
    this._reactionOffsetDisposer();
  }

  private readonly _reactionOffsetDisposer: IReactionDisposer = reaction(
    () => rootStore.query.getParam(ProductsQueryParamsNames.OFFSET),
    (offset) => {
      this._offset = offset ? Number(offset) : 0;
    },
  );
}
