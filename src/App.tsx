import React from 'react';
import { Outlet } from 'react-router';
import Header from 'components/Header';

import styles from './App.module.scss';

const App = () => {
  return (
    <div className={`app ${styles.app}`}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
