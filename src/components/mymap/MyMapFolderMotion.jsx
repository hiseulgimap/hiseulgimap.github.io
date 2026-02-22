import { AnimatePresence, motion } from 'motion/react';

import styles from './MyMapFolderMotion.module.css';

function MyMapFolderMotion({ active, children }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={styles.sb}
          variants={{
            visible: { transform: 'translateX(0)', opacity: 1 },
            hidden: { transform: 'translateX(-100%)', opacity: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.45 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MyMapFolderMotion;
