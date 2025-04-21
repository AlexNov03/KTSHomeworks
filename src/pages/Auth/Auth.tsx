import AuthForm from 'pages/Auth/components/Authform';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles['auth-page']}>
      <AuthForm />
    </div>
  );
};

export default Auth;
