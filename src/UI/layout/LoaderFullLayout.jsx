import styles from './LoaderFullLayout.module.css';

function LoaderFullLayout({ children }) {
  return <div id={styles.loader}>{children}</div>;
}

export default LoaderFullLayout;
