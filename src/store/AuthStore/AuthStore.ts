import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import ApiAuth from 'api/ApiAuth/ApiAuth';
import sStorageStore from 'store/SessionStorage';
import { Meta } from 'utils/meta';
import { ILocalStore } from 'utils/useLocalStore';

export enum FormKind {
  LOGIN = 'login',
  REGISTER = 'register',
}

type PrivateFields = '_formInfo' | '_formKind' | '_avatarFile' | '_avatarError' | '_meta' | '_apiMessage';

export default class AuthStore implements ILocalStore {
  private _formKind: FormKind = FormKind.LOGIN;
  private _formInfo = {
    emailPlaceholder: 'Email',
    emailValue: '',
    emailError: '',

    passwordPlaceholder: 'Password',
    passwordValue: '',
    passwordError: '',

    namePlaceholder: 'FirstName',
    nameValue: '',
    nameError: '',
  };
  private _avatarFile: File | null = null;
  private _avatarError: string = '';
  private _meta = Meta.initial;
  private _apiMessage: string = '';

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _meta: observable,
      _formInfo: observable,
      _formKind: observable,
      _avatarFile: observable,
      _avatarError: observable,
      _apiMessage: observable,

      emailValue: computed,
      passwordValue: computed,
      nameValue: computed,
      emailError: computed,
      passwordError: computed,
      nameError: computed,
      avatarFile: computed,
      avatarError: computed,
      emailPlaceholder: computed,
      passwordPlaceholder: computed,
      namePlaceholder: computed,
      formKind: computed,
      meta: computed,
      apiMessage: computed,

      setEmailValue: action,
      setPasswordValue: action,
      setNameValue: action,
      setEmailError: action,
      setPasswordError: action,
      setNameError: action,
      setAvatarFile: action,
      setAvatarError: action,
      changeFormKind: action,
      validateForm: action,
    });
  }

  async sendRegisterData(avatarUrl: string) {
    let response;

    try {
      response = await ApiAuth.register({
        name: this._formInfo.nameValue,
        password: this._formInfo.passwordValue,
        avatar: avatarUrl,
        email: this._formInfo.emailValue,
      });
    } catch {
      runInAction(() => {
        this._apiMessage = 'Problem while authorizing';
        this._meta = Meta.error;
      });
      return;
    }

    runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        this._apiMessage = 'Success!';
        return;
      }

      this._meta = Meta.error;
    });
  }

  async register() {
    this._meta = Meta.loading;

    let response;

    try {
      response = await ApiAuth.uploadFile({
        file: this._avatarFile as File,
      });
    } catch {
      runInAction(() => {
        this._apiMessage = 'Problem while uploading photo';
        this._meta = Meta.error;
      });
      return;
    }

    runInAction(() => {
      if (response.success) {
        this.sendRegisterData(response.data.location);
        return;
      }

      this._meta = Meta.error;
    });
  }

  async login() {
    this._meta = Meta.loading;
    let response;

    try {
      response = await ApiAuth.login({
        password: this._formInfo.passwordValue,
        email: this._formInfo.emailValue,
      });
    } catch {
      runInAction(() => {
        this._apiMessage = 'Sorry, no user found with this login and password';
        this._meta = Meta.error;
      });
      return;
    }

    return runInAction(() => {
      if (response.success) {
        this._meta = Meta.success;
        sStorageStore.setAuthToken(response.data.access_token);
        this._apiMessage = 'Success!';
        return true;
      }

      this._meta = Meta.error;
      return;
    });
  }

  validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validateForm() {
    this.setEmailError('');
    this.setPasswordError('');
    let isValid = true;

    if (!this.emailValue) {
      this.setEmailError('Email is required');
      isValid = false;
    } else if (!this.validateEmail(this.emailValue)) {
      this.setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!this.passwordValue) {
      this.setPasswordError('Password is required');
      isValid = false;
    } else if (this.passwordValue.length < 6) {
      this.setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (this._formKind === FormKind.REGISTER) {
      if (!this.nameValue) {
        this.setNameError('FirstName is required');
        isValid = false;
      } else if (this.nameValue.length < 8) {
        this.setNameError('FirstName must be at least 8 characters');
        isValid = false;
      }

      if (this._avatarFile) {
        if (this._avatarFile.size > 5 * 1024 * 1024) {
          this.setAvatarError('File size should be less than 5MB');
          isValid = false;
        }
      } else {
        this.setAvatarError('File must be uploaded');
        isValid = false;
      }
    }

    if (isValid && this._formKind === FormKind.LOGIN) {
      this.login();
    } else if (isValid) {
      this.register();
    }
  }

  setEmailValue(val: string) {
    this._formInfo.emailValue = val;
  }

  setPasswordValue(val: string) {
    this._formInfo.passwordValue = val;
  }

  setNameValue(val: string) {
    this._formInfo.nameValue = val;
  }

  setAvatarFile(file: File | null) {
    this._avatarFile = file;
    this._avatarError = '';
  }

  get emailValue() {
    return this._formInfo.emailValue;
  }

  get passwordValue() {
    return this._formInfo.passwordValue;
  }

  get meta() {
    return this._meta;
  }

  get nameValue() {
    return this._formInfo.nameValue;
  }

  get avatarFile() {
    return this._avatarFile;
  }

  get emailPlaceholder() {
    return this._formInfo.emailPlaceholder;
  }

  get passwordPlaceholder() {
    return this._formInfo.passwordPlaceholder;
  }

  get namePlaceholder() {
    return this._formInfo.namePlaceholder;
  }

  get emailError() {
    return this._formInfo.emailError;
  }

  get passwordError() {
    return this._formInfo.passwordError;
  }

  get nameError() {
    return this._formInfo.nameError;
  }

  get avatarError() {
    return this._avatarError;
  }

  get apiMessage() {
    return this._apiMessage;
  }

  setEmailError(val: string) {
    this._formInfo.emailError = val;
  }

  setPasswordError(val: string) {
    this._formInfo.passwordError = val;
  }

  setNameError(val: string) {
    this._formInfo.nameError = val;
  }

  setAvatarError(error: string) {
    this._avatarError = error;
  }

  get formKind() {
    return this._formKind;
  }

  changeFormKind(val: FormKind) {
    this.clearFormInfo();
    this._avatarError = '';
    this._formKind = val;
    this._apiMessage = '';
  }

  clearFormInfo() {
    this._formInfo = {
      emailPlaceholder: 'Email',
      emailValue: '',
      emailError: '',

      passwordPlaceholder: 'Password',
      passwordValue: '',
      passwordError: '',

      namePlaceholder: 'FirstName',
      nameValue: '',
      nameError: '',
    };
  }

  destroy() {
    this.clearFormInfo();
    this._formKind = FormKind.LOGIN;
    this._avatarFile = null;
    this._avatarError = '';
    this._meta = Meta.initial;
    this._apiMessage = '';
  }
}
