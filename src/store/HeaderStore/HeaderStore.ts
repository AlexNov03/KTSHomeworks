import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import ApiAuth from 'api/ApiAuth/ApiAuth';
import sStorageStore from 'store/SessionStorage';

import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_avatar' | '_name' | '_email';

export default class HeaderStore implements ILocalStore {
  private _avatar: string = '';
  private _name: string = '';
  private _email: string = '';

  constructor() {
    makeObservable<HeaderStore, PrivateFields>(this, {
      _avatar: observable,
      _name: observable,
      _email: observable,
      getData: action.bound,
      avatar: computed,
      name: computed,
      email: computed,
    });
  }

  get avatar() {
    return this._avatar;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  async getData() {
    let response;

    try {
      response = await ApiAuth.getUserData({
        token: sStorageStore.authToken,
      });
    } catch {
      runInAction(() => {
        this._avatar = '';
      });
      return;
    }

    runInAction(() => {
      if (response.success) {
        this._avatar = response.data.avatar;
        this._name = response.data.name;
        this._email = response.data.email;
        return;
      }
      this._avatar = '';
    });
  }

  clearData() {
    this._avatar = '';
    this._email = '';
    this._name = '';
  }

  destroy() {
    this.clearData();
    this._reactionLoginDisposer();
  }

  private readonly _reactionLoginDisposer: IReactionDisposer = reaction(
    () => sStorageStore.authToken,
    () => {
      this.clearData();
      this.getData();
    },
  );
}
