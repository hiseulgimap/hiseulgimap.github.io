import styles from './NoResult.module.css';

function NoResult({ emoji, title, content }) {
  return (
    <div className={styles.container}>
      <span className={styles.emoji}>{emoji}</span>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default NoResult;
