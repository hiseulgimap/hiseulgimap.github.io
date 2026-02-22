import { AnimatePresence, motion } from 'motion/react';

import DangerIcon from '../assets/icons/bulk/DangerIcon';

import { useLanguage } from '../hooks/useLanguage';

import styles from './DangerModal.module.css';

function DangerModal({ title, content, active, onProceed, onClose }) {
  const { isKorean } = useLanguage();

  return (
    <AnimatePresence>
      {active && (
        <div id={styles.danger}>
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
          >
            <span className={styles.icon}>
              <DangerIcon />
            </span>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.content}>{content}</p>
            <div className={styles.actions}>
              <button className={styles['btn-danger']} onClick={onProceed}>
                {isKorean ? '진행하기' : 'Proceed'}
              </button>
              <button className={styles['btn-cancel']} onClick={onClose}>
                {isKorean ? '취소' : 'Cancel'}
              </button>
            </div>
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

export default DangerModal;
