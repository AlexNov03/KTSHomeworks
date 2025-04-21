import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_authToken';

export default class SessionStorageStore {
  private _authToken: string = sessionStorage.getItem('auth-token') ?? '';

  constructor() {
    makeObservable<SessionStorageStore, PrivateFields>(this, {
      _authToken: observable,

      authToken: computed,

      setAuthToken: action,

      removeAuthToken: action,
    });
  }

  get authToken() {
    return this._authToken;
  }

  setAuthToken(token: string) {
    this._authToken = token;
    sessionStorage.setItem('auth-token', this._authToken);
  }

  removeAuthToken() {
    this._authToken = '';
    sessionStorage.setItem('auth-token', this._authToken);
  }
}
