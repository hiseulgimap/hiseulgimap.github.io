import { AnimatePresence, motion } from 'motion/react';

import { useLanguage } from '../hooks/useLanguage';

import styles from './DangerModal.module.css';

function DangerModal({ title, content, active, onProceed, onClose }) {
  const { isKorean } = useLanguage();

  return (
    <AnimatePresence>
      {active && (
        <div id={styles.danger}>
          <motion.div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.content}>{content}</p>
            <div className={styles.action}>
              <button className={styles['btn-danger']} onClick={onProceed}>
                {isKorean ? '진행하기' : 'Proceed'}
              </button>
              <button className={styles['btn-cancel']} onClick={onClose}>
                {isKorean ? '취소' : 'Cancel'}
              </button>
            </div>
          </motion.div>
          <motion.div className={styles.backdrop} onClick={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}

export default DangerModal;
