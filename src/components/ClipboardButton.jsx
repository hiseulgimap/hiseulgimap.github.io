import CopyIcon from '../assets/icons/linear/CopyIcon';

import styles from './ClipboardButton.module.css';

function ClipboardButton({ onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      <CopyIcon />
    </button>
  );
}

export default ClipboardButton;
