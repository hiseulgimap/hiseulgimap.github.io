import CommentForm from './CommentForm';

import styles from './Comment.module.css';

function Comment() {
  return (
    <section className={styles.comment}>
      <CommentForm />
    </section>
  );
}

export default Comment;
