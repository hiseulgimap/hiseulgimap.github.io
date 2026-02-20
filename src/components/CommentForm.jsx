import { useForm } from 'react-hook-form';

import { useLanguage } from '../hooks/useLanguage';

import styles from './CommentForm.module.css';

function CommentForm() {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { isKorean } = useLanguage();

  function handleSubmit(data) {}

  return (
    <form className={styles.form}>
      <div className={styles.wrap}>
        <input type="text" {...register('comment', { required: true })} placeholder={isKorean ? '코멘트를 남겨보세요' : 'Leave a comment'} />
        <button></button>
        {errors.comment && <p className={styles.onerror}>{isKorean ? '내용을 입력해 주세요' : 'This field is required'}</p>}
      </div>
    </form>
  );
}

export default CommentForm;
