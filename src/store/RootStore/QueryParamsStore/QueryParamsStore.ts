import { action, computed, makeObservable, observable } from 'mobx';
import { parse, ParsedQs, stringify } from 'qs';

type PrivateFields = '_params' | '_navigateCallback';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _navigateCallback: ((val: string) => void) | null = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _navigateCallback: observable,
      _params: observable.ref,
      addParam: action,
      deleteParam: action,
      setSearch: action,
      params: computed,
    });
  }

  getParam(key: string): string | ParsedQs | (string | ParsedQs)[] | undefined {
    return this._params[key];
  }

  get params() {
    return this._params;
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = parse(search);
    }
  }

  addParam(key: string, value: string) {
    const newParams = { ...this._params };
    newParams[key] = value;
    if (this._navigateCallback) {
      this._navigateCallback('?' + stringify(newParams));
    }
  }

  deleteParam(key: string) {
    const newParams = { ...this._params };
    delete newParams[key];
    if (this._navigateCallback) {
      this._navigateCallback('?' + stringify(newParams));
    }
  }

  setNavigateCallback(func: (val: string) => void) {
    this._navigateCallback = func;
  }
}
