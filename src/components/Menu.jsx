import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import MenuButton from './MenuButton';
import MenuItem from './MenuItem';

import EarthIcon from '../assets/icons/bulk/EarthIcon';
import MapIcon from '../assets/icons/bulk/MapIcon';
import SignpostIcon from '../assets/icons/bulk/SignpostIcon';

import { useLanguage } from '../hooks/useLanguage';

import styles from './Menu.module.css';

function Menu() {
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const [active, setActive] = useState(false);
  const { isKorean } = useLanguage();

  useEffect(() => {
    const handleClickOutside = event => {
      if (active && menuRef.current && !menuRef.current.contains(event.target) && menuButtonRef.current && !menuButtonRef.current.contains(event.target)) setActive(false);
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

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.section
            id={styles.menu}
            ref={menuRef}
            variants={{
              visible: { transform: 'translateY(-4.25rem)', opacity: 1 },
              hidden: { transform: 'translateY(-25%)', opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
          >
            <ul className={styles.main}>
              <h4 className={styles.title}>{isKorean ? '장소 찾아보기' : 'Tour lists'}</h4>
              <MenuItem to="/korea" icon={<MapIcon />} content={isKorean ? '국내 지도' : 'Map in Korea'} onActive={setActive} />
              <MenuItem to="/global" icon={<EarthIcon />} content={isKorean ? '해외 지도' : 'Global Map'} onActive={setActive} />
              <MenuItem to="/episode" icon={<SignpostIcon />} content={isKorean ? '에피소드별 지도' : 'Episode Maps'} onActive={setActive} />
            </ul>
            <ul className={styles.sub}>
              <MenuItem to="/my-map" content={isKorean ? '마이 지도' : 'My Map'} onActive={setActive} isSub />
              <MenuItem to="/guide" content={isKorean ? '이용 가이드' : 'Usage Guide'} onActive={setActive} isSub />
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
      <MenuButton active={active} onActive={setActive} ref={menuButtonRef} />
    </>
  );
}

export default Menu;
