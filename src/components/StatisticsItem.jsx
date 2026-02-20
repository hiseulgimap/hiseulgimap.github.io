import { Link } from 'react-router-dom';

import styles from './StatisticsItem.module.css';
import CountUp from 'react-countup';

function StatisticsItem({ emoji, title, count, to }) {
  return (
    <Link className={styles['grid-item']} to={to}>
      <span className={styles['grid-emoji']}>{emoji}</span>
      <p className={styles['grid-text']}>{title}</p>
      <span className={styles['grid-count']}>
        <CountUp end={count} duration={2} delay={0.55} />
      </span>
    </Link>
  );
}

export default StatisticsItem;
