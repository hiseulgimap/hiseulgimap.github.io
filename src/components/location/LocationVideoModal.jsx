import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowRightIcon from '../../assets/icons/linear/ArrowRightIcon';
import PlusIcon from '../../assets/icons/linear/PlusIcon';

import { useLanguage } from '../../hooks/useLanguage';

import { formatDate } from '../../util/helper';

import styles from './LocationVideoModal.module.css';

function LocationVideoModal({ location, isOpen, onClose }) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const { language, isKorean } = useLanguage();

  const handleAnimationComplete = useCallback(definition => {
    if (definition !== 'visible') return;
    const timer = setTimeout(() => setShouldPlay(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) setShouldPlay(false);
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const embedUrl = shouldPlay ? `https://www.youtube.com/embed/${location.episodes.youtube_id}?start=${location.start_at}&autoplay=1&rel=0` : `https://www.youtube.com/embed/${location.episodes.youtube_id}?start=${location.start_at}&rel=0`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id={styles.modal}>
          <motion.div
            className={styles.container}
            variants={{
              visible: { transform: 'translate(-50%, -50%)', opacity: 1 },
              hidden: { transform: 'translate(-50%, 30%)', opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <header className={styles.header}>
              <div className={styles['badge-wrap']}>
                <span className={styles['badge-primary']}>
                  <span>{location.countries.country_flag}</span>
                  {location.cities[`city_${language}`]}
                </span>
                <span className={styles['badge-secondary']}>
                  <span>{location.categories.emoji}</span> {location.categories[`category_${language}`]}
                </span>
              </div>
              <button className={styles.close} onClick={onClose}>
                <PlusIcon />
              </button>
            </header>
            <main className={styles.main}>
              <iframe className={styles.iframe} src={embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="video" />
            </main>
            <footer className={styles.footer}>
              <div className={styles['title-wrap']}>
                <h4 className={styles.title}>
                  <span className="line-clamp line--2">{location.episodes[`title_${language}`]}</span>
                </h4>
                <time className={styles.date}>📅 {formatDate(location.episodes.published_at)}</time>
              </div>
            </footer>
          </motion.div>
          <motion.div
            className={styles.backdrop}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export default LocationVideoModal;
