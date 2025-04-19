import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import ApiCategories from 'api/ApiCategories/ApiCategories';
import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import { CategoriesData, normalizeCategoriesData } from 'models/Categories/CategoriesData';
import rootStore from 'store/RootStore/RootStore';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields =
  | '_inputVal'
  | '_dropdownVal'
  | '_dropdownOptions'
  | '_meta'
  | '_title'
  | '_currentDropdownOptions'
  | '_dropdownInputVal';

export default class SearchBarStore implements ILocalStore {
  private _inputVal: string = '';
  private _dropdownOptions: CategoriesData[] = [];
  private _dropdownVal: CategoriesData[] = [];
  private _meta: Meta = Meta.initial;
  private _title: string = '';
  private _dropdownInputVal: string = '';
  private _currentDropdownOptions: CategoriesData[] = [];
  constructor() {
    makeObservable<SearchBarStore, PrivateFields>(this, {
      _inputVal: observable,
      _dropdownInputVal: observable,
      setDropdownInputVal: action.bound,
      _dropdownVal: observable,
      _dropdownOptions: observable,
      _currentDropdownOptions: observable,
      _meta: observable,
      _title: observable,
      title: computed,
      setDropdownOptions: action,
      setInputVal: action,
      setDropdownVal: action.bound,
      inputVal: computed,
      dropdownVal: computed,
      currentDropdownOptions: computed,
      meta: computed,
      checkOption: action.bound,
      filterOptions: action.bound,
      dropdownInputVal: computed,
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
          this._currentDropdownOptions = this._dropdownOptions;
          const id = rootStore.query.getParam(ProductsQueryParamsNames.CATEGORY_ID);
          this._dropdownVal = this._dropdownOptions.filter((elem) => elem.id === Number(id));
        } catch {
          this._meta = Meta.error;
          this._dropdownOptions = [];
        }
      }

      this._meta = Meta.error;

      const values = this._dropdownVal;
      this._title = values.length === 0 ? 'Filter' : values.map(({ name }) => name).join(', ');
      this._dropdownInputVal = values.length === 0 ? '' : values.map(({ name }) => name).join(', ');
    });
  }

  get title() {
    return this._title;
  }

  get inputVal() {
    return this._inputVal;
  }

  get dropdownVal() {
    return this._dropdownVal;
  }

  get currentDropdownOptions() {
    return this._currentDropdownOptions;
  }

  get meta() {
    return this._meta;
  }

  get dropdownInputVal() {
    return this._dropdownInputVal;
  }

  setInputVal(val: string) {
    this._inputVal = val;
  }

  setDropdownInputVal(val: string) {
    this._dropdownInputVal = val;
  }

  setDropdownVal(val: CategoriesData[]) {
    const newID = val.at(-1)?.id;
    if (newID) {
      rootStore.query.addParam(ProductsQueryParamsNames.CATEGORY_ID, String(newID));
      return;
    }
    rootStore.query.deleteParam(ProductsQueryParamsNames.CATEGORY_ID);
  }

  checkOption(option: CategoriesData) {
    const foundOption = this._dropdownVal.find((elem) => elem.id === option.id);

    if (foundOption) {
      this.setDropdownVal(this._dropdownVal.filter((elem) => elem.id !== option.id));
      this._dropdownInputVal = '';
    } else {
      this.setDropdownVal([...this._dropdownVal, option]);
      this._dropdownInputVal = option.name;
    }
  }

  filterOptions(val: string) {
    this._currentDropdownOptions = this._dropdownOptions.filter((opt) =>
      opt.name.toLowerCase().includes(val.toLowerCase()),
    );
  }

  destroy() {
    this._meta = Meta.initial;
    this._dropdownOptions = [];
    this._inputVal = '';
    this._dropdownVal = [];
    this._reactionTitleDisposer();
    this._reactionCategoryDisposer();
  }

  private readonly _reactionTitleDisposer: IReactionDisposer = reaction(
    () => rootStore.query.getParam(ProductsQueryParamsNames.TITLE),
    (title) => {
      const newTitle = title ? (title as string) : '';
      this._inputVal = newTitle;
    },
  );

  private readonly _reactionCategoryDisposer: IReactionDisposer = reaction(
    () => rootStore.query.getParam(ProductsQueryParamsNames.CATEGORY_ID),
    (id) => {
      this._dropdownVal = this._dropdownOptions?.filter((elem) => elem.id === Number(id));
      const values = this._dropdownVal;
      this._title = values.length === 0 ? 'Filter' : values.map(({ name }) => name).join(', ');
      this._dropdownInputVal = values.length === 0 ? '' : values.map(({ name }) => name).join(', ');
    },
  );
}
