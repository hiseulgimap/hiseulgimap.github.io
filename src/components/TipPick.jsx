import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import ChevronDownIcon from '../assets/icons/linear/ChevronDownIcon';

import styles from './TipPick.module.css';

function TipPick({ picks }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.accordion}>
      <button className={active ? `${styles.btn} ${styles.active}` : styles.btn} onClick={() => setActive(prevState => !prevState)}>
        SEULGI'S PICK !
        <ChevronDownIcon />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.content}
            variants={{
              visible: { height: 'auto' },
              hidden: { height: '0' },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35 }}
          >
            {picks.at(0).map(pick => (
              <div key={pick.id} className={styles.item}>
                <span>
                  {pick.emoji && pick.emoji} {pick.name}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TipPick;
