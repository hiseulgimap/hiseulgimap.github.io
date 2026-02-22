import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import ChevronDownIcon from '../../assets/icons/linear/ChevronDownIcon';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './MyMapFilterSelect.module.css';

function MyMapFilterSelect({ sortOptions, sortType, onSortType, filteredFolders, onFilterChange }) {
  const listRef = useRef(null);
  const buttonRef = useRef(null);

  const [active, setActive] = useState(false);
  const { language, isKorean } = useLanguage();

  const currentLabel = sortOptions.filter(op => op.value === sortType)?.at(0)?.[`label_${language}`];

  useEffect(() => {
    const handleClickOutside = event => {
      if (active && listRef.current && !listRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) setActive(false);
    };

    const handleEscKey = event => {
      if (event.key === 'Escape' && active) setActive(false);
    };

    if (active) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [active]);

  function handleSelectOption(value) {
    setActive(false);
    onSortType(value);
    onFilterChange?.([...filteredFolders]);
  }

  return (
    <div className={styles.filter}>
      <button ref={buttonRef} className={active ? `${styles.btn} ${styles.active}` : styles.btn} onClick={() => setActive(prevState => !prevState)}>
        {currentLabel}
        <ChevronDownIcon />
      </button>
      <AnimatePresence>
        {active && (
          <motion.ul
            ref={listRef}
            className={styles.list}
            variants={{
              visible: { transform: 'translateY(0)', opacity: 1 },
              hidden: { transform: 'translateY(-1rem)', opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
          >
            {sortOptions.map(({ value, label_ko, label_en }) => (
              <button key={value} className={sortType === value ? `${styles.option} ${styles.active}` : styles.option} onClick={() => handleSelectOption(value)}>
                {isKorean ? label_ko : label_en}
              </button>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyMapFilterSelect;
