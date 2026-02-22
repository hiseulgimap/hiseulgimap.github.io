import { formatDate } from '../util/helper';

import ModifyIcon from '../assets/icons/linear/ModifyIcon';
import TrashIcon from '../assets/icons/linear/TrashIcon';

import styles from './MemoItem.module.css';

function MemoItem({ memo, onEdit, onDelete }) {
  const date = memo.updated_at ? formatDate(memo.updated_at) : formatDate(memo.created_at);

  return (
    <li className={styles.item}>
      <div className={styles.content}>{memo.memo}</div>
      <div className={styles.action}>
        <time className={styles.date}>{date}</time>
        <button className={styles.modify} onClick={() => onEdit(memo)}>
          <ModifyIcon />
        </button>
        <button className={styles.danger} onClick={() => onDelete(memo)}>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default MemoItem;
