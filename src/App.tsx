import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Header from 'components/Header';

import rootStore from 'store/RootStore/RootStore';

import styles from './App.module.scss';

const App = () => {
  const location = useLocation();

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('location search', location.search);
    rootStore.query.setSearch(location.search);
  }, [location.search, location.pathname]);

  React.useEffect(() => {
    rootStore.query.setNavigateCallback((val: string) => {
      navigate(val);
    });
  }, [navigate]);

  return (
    <div className={`app ${styles.app}`}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
