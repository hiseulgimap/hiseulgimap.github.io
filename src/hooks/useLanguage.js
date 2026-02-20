import { useSelector } from 'react-redux';

export function useLanguage() {
  const language = useSelector(state => state.attribute.language);

  return { language, isKorean: language === 'ko', isEnglish: language === 'en' };
}
