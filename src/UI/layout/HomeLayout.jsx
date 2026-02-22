import { Outlet } from 'react-router-dom';

import Header from '../Header';

import styles from './HomeLayout.module.css';

function HomeLayout() {
  return (
    <div id={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
