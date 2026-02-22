import NoticeBlock from '../NoticeBlock';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './MyMapNotice.module.css';

const contents = [
  { id: 1, content_ko: '모든 데이터는 서버로 전송되지 않습니다.', content_en: 'All data is not transmitted to any server.' },
  { id: 2, content_ko: '데이터는 현재 사용 중인 브라우저에만 저장됩니다.', content_en: 'Data is stored only in your current browser.' },
  { id: 3, content_ko: '다른 기기에서 접속할 경우 저장된 데이터를 확인할 수 없습니다.', content_en: 'Saved data will not be accessible when accessed from other devices.' },
  { id: 4, content_ko: '다른 브라우저를 사용할 경우에도 데이터가 조회되지 않습니다.', content_en: 'Data will not be available when using different browsers.' },
];

function MyMapNotice() {
  const { language } = useLanguage();

  return (
    <NoticeBlock type="notice">
      <ul className={styles.list}>
        {contents.map(content => (
          <li key={content.id}>{content[`content_${language}`]}</li>
        ))}
      </ul>
    </NoticeBlock>
  );
}

export default MyMapNotice;
