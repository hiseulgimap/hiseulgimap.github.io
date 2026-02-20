import ArrowLeftIcon from '../assets/icons/linear/ArrowLeftIcon';

import { useLanguage } from '../hooks/useLanguage';
import { useMoveBack } from '../hooks/useMoveBack';

import styles from './BackButton.module.css';

function BackButton() {
  const { isKorean } = useLanguage();
  const moveBack = useMoveBack();

  return (
    <button className={styles.back} onClick={moveBack}>
      <ArrowLeftIcon />
      <span>{isKorean ? '뒤로가기' : 'Move Back'}</span>
    </button>
  );
}

export default BackButton;
