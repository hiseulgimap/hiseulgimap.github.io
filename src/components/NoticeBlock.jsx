import styles from './NoticeBlock.module.css';

function NoticeBlock({ type, children }) {
  let className;

  if (type === 'notice') className = `${styles.block} ${styles.notice}`;

  return <blockquote className={className}>{children}</blockquote>;
}

export default NoticeBlock;
