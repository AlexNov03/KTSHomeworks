import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import ApiCategories from 'api/ApiCategories/ApiCategories';
import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import { CategoriesData, normalizeCategoriesData } from 'models/Categories/CategoriesData';
import rootStore from 'store/RootStore/RootStore';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_inputVal' | '_dropdownVal' | '_dropdownOptions' | '_meta';

export default class SearchBarStore implements ILocalStore {
  private _inputVal: string = '';
  private _dropdownOptions: CategoriesData[] = [];
  private _dropdownVal: CategoriesData[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<SearchBarStore, PrivateFields>(this, {
      _inputVal: observable,
      _dropdownVal: observable,
      _dropdownOptions: observable,
      _meta: observable,
      setDropdownOptions: action,
      setInputVal: action,
      setDropdownVal: action.bound,
      inputVal: computed,
      dropdownVal: computed,
      dropdownOptions: computed,
      meta: computed,
    });
  }

  async setDropdownOptions() {
    this._meta = Meta.loading;

    const response = await ApiCategories.getCategoriesList();

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;
          this._dropdownOptions = response.data.map(normalizeCategoriesData);
        } catch {
          this._meta = Meta.error;
          this._dropdownOptions = [];
        }
      }

      this._meta = Meta.error;
    });
  }

  get inputVal() {
    return this._inputVal;
  }

  get dropdownVal() {
    return this._dropdownVal;
  }

  get dropdownOptions() {
    return this._dropdownOptions;
  }

  get meta() {
    return this._meta;
  }

  setInputVal(val: string) {
    this._inputVal = val;
    if (val) {
      rootStore.query.addParam(ProductsQueryParamsNames.TITLE, val);
      return;
    }
    rootStore.query.deleteParam(ProductsQueryParamsNames.TITLE);
  }

  setDropdownVal(val: CategoriesData[]) {
    this._dropdownVal = val;
    const newID = val.at(-1)?.id;
    if (newID) {
      rootStore.query.addParam(ProductsQueryParamsNames.CATEGORY_ID, String(newID));
      return;
    }
    rootStore.query.deleteParam(ProductsQueryParamsNames.CATEGORY_ID);
  }

  destroy() {
    this._meta = Meta.initial;
    this._dropdownOptions = [];
    this._inputVal = '';
    this._dropdownVal = [];
  }
}
