import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction, set } from 'mobx';
import ApiProducts, { ProductsQueryParams, ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import { ProductData } from 'models/Products/ProductData';
import PaginatorStore, { ITEMS_PER_PAGE } from 'store/PaginatorStore';
import rootStore from 'store/RootStore/RootStore';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_meta' | '_cardsData' | '_paginatorStore' | '_queryParams';

export default class ProductsStore implements ILocalStore {
  private _paginatorStore: PaginatorStore = new PaginatorStore();
  private _cardsData: ProductData[] = [];
  private _meta: Meta = Meta.initial;
  private _queryParams: ProductsQueryParams = {};

  constructor() {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _meta: observable,
      _cardsData: observable,
      _paginatorStore: observable,
      _queryParams: observable,
      getProductsList: action,
      cardsDataLength: computed,
      cardsData: computed,
      meta: computed,
    });
  }

  get paginatorStore() {
    return this._paginatorStore;
  }

  get cardsData() {
    return this._cardsData;
  }

  get cardsDataLength() {
    return this._cardsData.length;
  }

  get meta() {
    return this._meta;
  }

  async getProductsList() {
    this._meta = Meta.loading;

    const response = await ApiProducts.getProducts(this._queryParams);

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._cardsData = response.data;
        return;
      }

      this._meta = Meta.error;
    });
  }

  destroy() {
    this._cardsData = [];
    this._queryParams = {};
    this._meta = Meta.initial;
    this._reactionQueryDisposer();
  }

  private readonly _reactionQueryDisposer: IReactionDisposer = reaction(
    () => rootStore.query.params,
    () => {
      const title = rootStore.query.getParam(ProductsQueryParamsNames.TITLE);
      set(this._queryParams, ProductsQueryParamsNames.TITLE, title);

      const category = rootStore.query.getParam(ProductsQueryParamsNames.CATEGORY_ID);
      set(this._queryParams, ProductsQueryParamsNames.CATEGORY_ID, category);

      const offset = this._paginatorStore.offset;
      set(this._queryParams, ProductsQueryParamsNames.OFFSET, String(offset));

      let limit = rootStore.query.getParam(ProductsQueryParamsNames.LIMIT);
      if (!limit) {
        limit = String(ITEMS_PER_PAGE);
      }
      set(this._queryParams, ProductsQueryParamsNames.LIMIT, limit as string);

      this.getProductsList();
    },
  );
}
