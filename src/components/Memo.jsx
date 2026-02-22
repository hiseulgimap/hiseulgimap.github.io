import { useState } from 'react';

import DangerModal from './DangerModal';
import MemoEditForm from './MemoEditForm';
import MemoEditModal from './MemoEditModal';
import MemoItem from './MemoItem';
import MemoForm from './MemoForm';

import { useLanguage } from '../hooks/useLanguage';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { MEMO_STORAGE_KEY } from '../util/constants';

import styles from './Memo.module.css';
import toast from 'react-hot-toast';

function Memo({ location, episode }) {
  const isLocation = !!location?.id;
  const currentData = isLocation ? 'location' : 'episode';

  const { isKorean } = useLanguage();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState([]);
  const [savedMemo, setSavedMemo] = useLocalStorage([], MEMO_STORAGE_KEY);

  const memoData = savedMemo?.filter(memo => memo[`${currentData}_id`] === (isLocation ? location?.id : episode?.id));

  function handleEdit(memo) {
    setIsEditMode(true);
    setSelectedMemo(memo);
  }

  function handleCancelEdit() {
    setIsEditMode(false);
    setSelectedMemo([]);
  }

  function handleDelete() {
    setSelectedMemo();
    setIsDeleteMode(false);
    setSavedMemo(prevData => prevData.filter(data => data.id !== selectedMemo.id));
    toast.success(isKorean ? '메모를 삭제했습니다' : 'Note deleted', { icon: '🗑️' });
  }

  return (
    <>
      <DangerModal
        title={isKorean ? '메모 삭제하기' : 'Delete note'}
        content={
          isKorean ? (
            <>
              삭제된 메뉴는 복구가 불가능합니다
              <br />
              진행하시겠습니까?
            </>
          ) : (
            <>
              This action cannot be undone
              <br />
              Do you want to proceed?
            </>
          )
        }
        active={isDeleteMode}
        onProceed={handleDelete}
        onClose={() => setIsDeleteMode(false)}
      />
      <MemoEditModal active={isEditMode} onClose={handleCancelEdit}>
        <MemoEditForm memo={savedMemo} selectedMemo={selectedMemo} onCancel={handleCancelEdit} />
      </MemoEditModal>
      <section className={styles.memo}>
        <MemoForm location={location} episode={episode} onSetMemo={setSavedMemo} isLocation={isLocation} />
        {memoData.length > 0 && (
          <>
            <h5 className={styles.title}>
              <span>📝 {isKorean ? '메모' : 'Notes'}</span>
              <span className={styles.bull}>&bull;</span>
              <span>
                {memoData.length}
                {isKorean ? '개' : memoData.length > 1 ? ' notes' : ' note'}
              </span>
              <span className={styles.divider} />
            </h5>
            <ul className={styles.list}>
              {memoData.map(memo => (
                <MemoItem
                  key={memo.id}
                  memo={memo}
                  onEdit={handleEdit}
                  onDelete={memo => {
                    setIsDeleteMode(true);
                    setSelectedMemo(memo);
                  }}
                />
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}

export default Memo;
