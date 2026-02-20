import { AnimatePresence, motion } from 'motion/react';

import styles from './BookmarkModal.module.css';

function BookmarkModal({ active, onClose, children }) {
  return (
    <AnimatePresence>
      {active && (
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
          >
            {children}
          </motion.div>
          <motion.div
            className={styles.overlay}
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

export default BookmarkModal;
