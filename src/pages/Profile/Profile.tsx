import { observer, useLocalStore } from 'mobx-react-lite';

import React from 'react';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
// import Text from 'components/Text';
import HeaderStore from 'store/HeaderStore';
import styles from './Profile.module.scss';

const Profile = observer(() => {
  const headerStore = useLocalStore(() => new HeaderStore());

  React.useEffect(() => {
    headerStore.getData();
  }, [headerStore]);

  return (
    <div className={styles['profile-page']}>
      <BackButton className={styles['profile-page__back-button']} />

      <div className={styles['profile-page__content']}>
        <h1 className={styles['profile-page__title']}>Profile</h1>

        <div className={styles['profile-card']}>
          {headerStore.name && (
            <>
              <div className={styles['profile-card__avatar-container']}>
                <img
                  crossOrigin="anonymous"
                  src={headerStore.avatar}
                  alt="Аватар"
                  className={styles['profile-card__avatar']}
                />
              </div>

              <div className={styles['profile-card__info']}>
                <h2 className={styles['profile-card__name']}>{headerStore.name}</h2>
                <p className={styles['profile-card__email']}>{headerStore.email}</p>
              </div>

              <Button className={styles['profile-card__logout-button']}>Выйти</Button>
            </>
          )}
          {/* {!headerStore.name && (
            <Text view="p-20" weight="medium" color="error">
              Profile is empty. Please Login.
            </Text>
          )} */}
        </div>
      </div>
    </div>
  );
});

export default Profile;
