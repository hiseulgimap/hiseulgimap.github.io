import styles from './MyMapNoResult.module.css';

function MyMapNoResult({ emoji, mainText, subText }) {
  return (
    <div className={styles.noresult}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.main}>{mainText}</h3>
      <p className={styles.sub}>{subText}</p>
    </div>
  );
}

export default MyMapNoResult;
