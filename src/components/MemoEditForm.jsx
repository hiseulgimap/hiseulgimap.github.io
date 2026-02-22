import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLanguage } from '../hooks/useLanguage';

import styles from './MemoEditForm.module.css';

function MemoEditForm({ memo, selectedMemo, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { memo: selectedMemo?.memo ?? '' } });

  const { isKorean } = useLanguage();
  const [value, setValue] = useState('');
  const [onError, setOnError] = useState('');

  if (onError && value?.trim()) setOnError(false);

  function onSubmit(data) {
    const updatedData = {
      ...selectedMemo,
      updated_at: new Date(),
      memo: data.memo,
    };

    if (!data.memo.trim()) return setOnError(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('memo', { required: true })} />
      {errors.memo && <p className={styles.onerror}>{isKorean ? '내용을 입력해 주세요' : 'This field is required'}</p>}
      {onError && <p className={styles.onerror}>{isKorean ? '내용은 공백만 입력할 수 없습니다' : 'Input cannot be whitespace only'}</p>}
      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>
          {isKorean ? '수정하기' : 'Edit'}
        </button>
        <button type="button" className={styles.secondary} onClick={onCancel}>
          {isKorean ? '취소' : 'Cancel'}
        </button>
      </div>
    </form>
  );
}

export default MemoEditForm;
