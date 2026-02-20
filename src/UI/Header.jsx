import Settings from './Settings';

import Logo from '../components/Logo';
import Menu from '../components/Menu';
import Navigation from '../components/Navigation';

import styles from './Header.module.css';

function Header() {
  return (
    <header id={styles.header}>
      <div className={styles.wrap}>
        <Logo />
        <Navigation />
        <Settings />
        <Menu />
      </div>
    </header>
  );
}

export default Header;
