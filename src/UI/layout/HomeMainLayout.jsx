import styles from './HomeMainLayout.module.css';

function HomeMainLayout({ children }) {
  return <main id={styles.main}>{children}</main>;
}

export default HomeMainLayout;
