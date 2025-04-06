import { action, computed, makeObservable, observable } from 'mobx';
import { parse, ParsedQs, stringify } from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
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
    this._params = { ...this._params };
    this._params[key] = value;
    this._updateHistoryApi();
  }

  deleteParam(key: string) {
    const newParams = { ...this._params };
    delete newParams[key];
    this._params = newParams;
    this._updateHistoryApi();
  }

  private _updateHistoryApi() {
    let flag = false;
    for (const param in this._params) {
      if (this._params[param] !== undefined) {
        flag = true;
      }
    }
    const newState = flag ? '?' + stringify(this._params) : '';
    window.history.pushState({}, '', window.location.pathname + newState);
  }
}
