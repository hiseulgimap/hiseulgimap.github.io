import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { useLanguage } from '../hooks/useLanguage';

import styles from './MemoForm.module.css';

function MemoForm({ location, episode, onSetMemo, isLocation }) {
  const location_id = isLocation ? location?.id : null;
  const episode_id = !isLocation ? episode?.id : null;

  const [memo, setMemo] = useState('');
  const [trimError, setTrimError] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isKorean } = useLanguage();

  if (trimError && memo?.trim()) setTrimError(false);

  function onSubmit(data) {
    const obj = { id: uuidv4(), created_at: new Date(), memo: data.memo, location_id, episode_id, updated_at: null };

    if (trimError) return;
    if (!data.memo.trim()) return setTrimError(true);

    reset();
    setMemo('');
    onSetMemo(prevData => [...prevData, obj]);
    toast.success(isKorean ? '메모를 남겼습니다' : 'Note added', { icon: '✏️' });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <textarea
          className={memo.length > 0 ? `${styles.textarea} ${styles.active}` : styles.textarea}
          type="text"
          {...register('memo', { required: true })}
          placeholder={isKorean ? '메모를 남겨보세요' : 'Leave a note'}
          value={memo}
          onChange={event => setMemo(event.target.value)}
        />
        <button className={styles.submit}>{isKorean ? '등록' : 'Add'}</button>
      </div>
      {errors.memo && <p className={styles.onerror}>{isKorean ? '내용을 입력해 주세요' : 'This field is required'}</p>}
      {trimError && <p className={styles.onerror}>{isKorean ? '내용은 공백만 입력할 수 없습니다' : 'Input cannot be whitespace only'}</p>}
    </form>
  );
}

export default MemoForm;
