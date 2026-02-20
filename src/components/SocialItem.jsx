import ArrowUpRightIcon from '../assets/icons/linear/ArrowUpRightIcon';

import styles from './SocialItem.module.css';

function SocialItem({ emoji, href, title }) {
  return (
    <a className={styles.item} href={href} target="_blank">
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.bottom}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{href}</p>
        <ArrowUpRightIcon />
      </div>
    </a>
  );
}

export default SocialItem;
