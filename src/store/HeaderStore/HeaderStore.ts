import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import ApiAuth from 'api/ApiAuth/ApiAuth';
import sStorageStore from 'store/SessionStorage';

import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_avatar';

export default class HeaderStore implements ILocalStore {
  private _avatar: string = '';

  constructor() {
    makeObservable<HeaderStore, PrivateFields>(this, {
      _avatar: observable,
      getAvatar: action.bound,
      avatar: computed,
    });
  }

  get avatar() {
    return this._avatar;
  }

  async getAvatar() {
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
        return;
      }
      this._avatar = '';
    });
  }

  destroy() {
    this._avatar = '';
    this._reactionLoginDisposer();
  }

  private readonly _reactionLoginDisposer: IReactionDisposer = reaction(
    () => sStorageStore.authToken,
    () => {
      this.getAvatar();
    },
  );
}
