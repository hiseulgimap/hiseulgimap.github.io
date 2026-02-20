import { useDispatch, useSelector } from 'react-redux';

import MoonIcon from '../../assets/icons/linear/MoonIcon';
import SunIcon from '../../assets/icons/linear/SunIcon';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { attributeActions } from '../../store/attribute-slice';

import styles from './ThemeSetting.module.css';

function ThemeSetting() {
  const [_, setValue] = useLocalStorage('light', 'theme');

  const currentTheme = useSelector(state => state.attribute.theme);
  const dispatch = useDispatch();

  const handleTheme = theme => setValue(theme);

  function handleThemeBtn() {
    const theme = currentTheme === 'light' ? 'dark' : 'light';

    handleTheme(theme);
    dispatch(attributeActions.changeAttributeValue({ key: 'theme', value: theme }));
  }

  return (
    <button className={styles.btn} aria-label="theme toggle button" onClick={handleThemeBtn}>
      {currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ThemeSetting;
