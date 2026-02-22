import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import html2canvas from 'html2canvas';

import PreviewContainer from './PreviewContainer';

import { useLanguage } from '../hooks/useLanguage';

import styles from './Preview.module.css';

function Preview() {
  const { isKorean } = useLanguage();
  // const previewRef = useRef(null);
  const refs = {
    previewRef: useRef(null),
    svgRef: useRef(null),
  };

  const mainRef = useRef(null);
  const modalRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  async function handleCapture() {
    const container = refs.previewRef.current;

    const clipped = [container, ...container.querySelectorAll('*')].filter(el => {
      const { overflow, overflowY } = getComputedStyle(el);
      return ['hidden', 'scroll', 'auto'].includes(overflow) || ['hidden', 'scroll', 'auto'].includes(overflowY);
    });

    mainRef.current.style.height = 'unset';
    refs.svgRef.current.style.display = 'none !important';

    const saved = clipped.map(el => ({
      el,
      border: el.style.border,
      overflow: el.style.overflow,
      overflowY: el.style.overflowY,
      height: el.style.height,
      maxHeight: el.style.maxHeight,
      gridTemplateRows: el.style.gridTemplateRows,
    }));

    clipped.forEach(el => {
      el.style.border = 'none';
      el.style.height = el.scrollHeight + 'px';
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';
      el.style.gridTemplateRows = 'auto';
    });

    const canvas = await html2canvas(container, { useCORS: true, scale: 5 });

    // 일괄 복구
    saved.forEach(({ el, overflow, overflowY, height, maxHeight, gridTemplateRows, border }) => {
      el.style.border = border;
      el.style.overflow = overflow;
      el.style.overflowY = overflowY;
      el.style.height = height;
      el.style.maxHeight = maxHeight;
      el.style.gridTemplateRows = gridTemplateRows;

      mainRef.current.style.height = 'calc(100dvh - var(--header-height) - 3.5rem * 2 - 2px)';
      refs.svgRef.current.style.display = 'flex';
    });

    setImageUrl(canvas.toDataURL('image/png'));
  }

  return (
    <>
      <AnimatePresence>
        {imageUrl && (
          <div id={styles.modal}>
            <div
              ref={modalRef}
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
              <div className={styles.image}>
                <img src={imageUrl} alt="preview" />
              </div>
            </div>

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
              onClick={() => setImageUrl(null)}
            />
          </div>
        )}
      </AnimatePresence>
      <div id={styles.preview} ref={mainRef}>
        <PreviewContainer ref={refs} />
        <button onClick={handleCapture}>{isKorean ? '이미지로 저장' : 'Save as image'}</button>
      </div>
    </>
  );
}

export default Preview;
