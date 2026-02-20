import { Outlet } from 'react-router-dom';

import Header from '../Header';

import Footer from '../../components/Footer';
import TopButton from '../../components/TopButton';

import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <>
      <Header />
      <main id={styles.main}>
        <Outlet />
      </main>
      <TopButton />
      <Footer />
    </>
  );
}

export default AppLayout;
