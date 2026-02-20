import { useDispatch } from 'react-redux';

import GlobalIcon from '../../assets/icons/linear/GlobalIcon';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useLanguage } from '../../hooks/useLanguage';

import { attributeActions } from '../../store/attribute-slice';

import styles from './LanguageSetting.module.css';

function LanguageSetting() {
  const [_, setValue] = useLocalStorage('ko', 'language');
  const { isKorean } = useLanguage();

  const dispatch = useDispatch();

  const handleLanguage = lang => setValue(lang);

  function handleLangBtn() {
    const lang = isKorean ? 'en' : 'ko';
    handleLanguage(lang);
    dispatch(attributeActions.changeAttributeValue({ key: 'language', value: lang }));
  }

  return (
    <button className={styles.btn} onClick={handleLangBtn}>
      <GlobalIcon />
      <span>{isKorean ? 'KOR' : 'ENG'}</span>
    </button>
  );
}

export default LanguageSetting;
