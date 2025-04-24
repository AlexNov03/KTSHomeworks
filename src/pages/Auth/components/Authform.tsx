import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import AuthStore, { FormKind } from 'store/AuthStore';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';

import styles from './Authform.module.scss';

const AuthForm: React.FC = () => {
  const authStore = useLocalStore(() => new AuthStore());
  const formKind = authStore.formKind;

  const emailValue = authStore.emailValue;
  const emailError = authStore.emailError;
  const emailPlaceholder = authStore.emailPlaceholder;

  const passwordValue = authStore.passwordValue;
  const passwordError = authStore.passwordError;
  const passwordPlaceholder = authStore.passwordPlaceholder;

  const nameValue = authStore.nameValue;
  const nameError = authStore.nameError;
  const namePlaceholder = authStore.namePlaceholder;

  const handleEmailChange = (emailValue: string) => authStore.setEmailValue(emailValue);
  const handlePasswordChange = (passwordValue: string) => authStore.setPasswordValue(passwordValue);
  const handleNameChange = (passwordValue: string) => authStore.setNameValue(passwordValue);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    authStore.setAvatarFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-container__check-form']}>
        <div
          className={classNames(styles['auth-container__check'], formKind === FormKind.LOGIN && styles['form-checked'])}
          onClick={() => authStore.changeFormKind(FormKind.LOGIN)}
        >
          <Text className={styles['no-spacing']} view="p-16" weight="medium">
            Login
          </Text>
        </div>
        <div
          className={classNames(
            styles['auth-container__check'],
            formKind === FormKind.REGISTER && styles['form-checked'],
          )}
          onClick={() => authStore.changeFormKind(FormKind.REGISTER)}
        >
          <Text className={styles['no-spacing']} view="p-16" weight="medium">
            Register
          </Text>
        </div>
      </div>
      <div className={styles['auth-container__title']}>
        {formKind === FormKind.LOGIN ? <Text tag="h2">Login</Text> : <Text tag="h2">Register</Text>}
      </div>
      <Input
        placeholder={emailPlaceholder}
        value={emailValue}
        onChange={handleEmailChange}
        {...(emailError && { error: emailError })}
      />
      <Input
        type="password"
        placeholder={passwordPlaceholder}
        value={passwordValue}
        onChange={handlePasswordChange}
        {...(passwordError && { error: passwordError })}
      />

      {authStore.formKind === FormKind.REGISTER && (
        <>
          <Input
            placeholder={namePlaceholder}
            value={nameValue}
            onChange={handleNameChange}
            {...(nameError && { error: nameError })}
          />

          <div className={styles['file__upload']}>
            <button type="button" onClick={triggerFileInput} className={styles['file__upload-button']}>
              <Text className={styles['no-spacing']} view="p-16" color="primary">
                Attach Photo
              </Text>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className={styles['file__input']}
            />
            {authStore.avatarFile && (
              <Text className={styles['no-spacing']} view="p-14" color="secondary">
                {authStore.avatarFile.name}
              </Text>
            )}
            {authStore.avatarError && (
              <Text className={styles['no-spacing']} view="p-14" color="error">
                {authStore.avatarError}
              </Text>
            )}
          </div>
        </>
      )}

      {authStore.apiMessage &&
        (authStore.meta === Meta.error ? (
          <Text color="error">{authStore.apiMessage}</Text>
        ) : (
          <Text color="accent">{authStore.apiMessage}</Text>
        ))}

      <Button
        loading={authStore.meta === Meta.loading}
        onClick={() => authStore.validateForm()}
        className={styles['auth-container__enter-btn']}
      >
        <Text>Enter</Text>
      </Button>
    </div>
  );
};

export default observer(AuthForm);
