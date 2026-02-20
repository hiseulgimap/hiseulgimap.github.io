import styles from './SmallLayout.module.css';

function SmallLayout({ children }) {
  return <article id={styles.episode}>{children}</article>;
}

export default SmallLayout;
