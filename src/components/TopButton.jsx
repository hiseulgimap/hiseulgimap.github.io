import { useEffect, useRef } from 'react';

import ArrowUpIcon from '../assets/icons/linear/ArrowUpIcon';

import { useScroll } from '../hooks/useScroll';

import styles from './TopButton.module.css';

function TopButton() {
  const btn = useRef();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (scrollY - 50 < 0) btn.current.style.display = 'none';

    if (scrollY - 50 > 100) {
      btn.current.style.display = 'flex';
      btn.current.style.opacity = '100%';
    }

    if ((scrollY - 50) % 3 === 2) {
      btn.current.style.display = 'flex';
      btn.current.style.opacity = `${scrollY - 50}%`;
    }
  }, [scrollY]);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button ref={btn} className={styles.btn} onClick={handleClick}>
      <ArrowUpIcon />
    </button>
  );
}

export default TopButton;
