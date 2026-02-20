import LanguageSetting from '../components/settings/LanguageSetting';
import ThemeSetting from '../components/settings/ThemeSetting';

import styles from './Settings.module.css';

function Settings() {
  return (
    <div className={styles.settings}>
      <ThemeSetting />
      <LanguageSetting />
    </div>
  );
}

export default Settings;
