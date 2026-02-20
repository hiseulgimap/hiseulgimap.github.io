import styles from './FilterItemButton.module.css';

function FilterItemButton({ emoji, content, isActive, onClick }) {
  const className = isActive ? `${styles.item} ${styles.active}` : styles.item;

  return (
    <li className={styles['list-item']}>
      <button className={className} onClick={onClick}>
        {emoji && <span>{emoji}</span>}
        <span>{content}</span>
      </button>
    </li>
  );
}

export default FilterItemButton;
