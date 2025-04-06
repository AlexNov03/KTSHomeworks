import React from 'react';
import { Outlet } from 'react-router';
import Header from 'components/Header';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

import styles from './App.module.scss';

const App = () => {
  useQueryParamsStoreInit();
  return (
    <div className={`app ${styles.app}`}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
