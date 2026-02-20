import { Link } from 'react-router-dom';

import locationPin from '../assets/location.png';

import styles from './Logo.module.css';

function Logo() {
  return (
    <Link id={styles.logo} to="/">
      <img src={locationPin} alt="3D location pin" />
      <span className={styles.hiseulgi}>HISEULGI</span>
      <span className={styles.map}>MAP</span>
    </Link>
  );
}

export default Logo;
