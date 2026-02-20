import styles from './MiniLoader.module.css';

function MiniLoader() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}

export default MiniLoader;
