import styles from './TipTotalComment.module.css';

function TipTotalComment({ comment }) {
  return (
    <blockquote className={styles.comment}>
      <h5 className={styles.title}>SEULGI'S COMMENT</h5>
      <p className={styles.content}>{comment}</p>
    </blockquote>
  );
}

export default TipTotalComment;
