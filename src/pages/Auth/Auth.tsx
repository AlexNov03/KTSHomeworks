import BackButton from 'components/BackButton';
import AuthForm from 'pages/Auth/components/Authform';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles['auth-page']}>
      <BackButton className={styles['auth-page__back-button']} />
      <div className={styles['auth-page__content']}>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
