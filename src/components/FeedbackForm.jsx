import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AnimatePresence, motion } from 'motion/react';

import PageTitle from './PageTitle';

import ChevronDownIcon from '../assets/icons/linear/ChevronDownIcon';

import { useLanguage } from '../hooks/useLanguage';

import styles from './FeedbackForm.module.css';
import toast from 'react-hot-toast';

function FeedbackForm() {
  let typeLabel;

  const { isKorean } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [active, setActive] = useState(false);
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState(false);

  const typeButton = isKorean ? '유형을 선택해 주세요' : 'Please select a type';

  const toggleActive = () => setActive(prevState => !prevState);

  function handleType(selectedType) {
    setType(selectedType);
    setTypeError(false);
    setActive(false);
  }

  function onSubmit(data) {
    const obj = {
      type,
      email: data.email,
      feedback: data.feedback,
    };

    if (!type) setTypeError(true);
    if (type) toast.success('TEST');

    console.log(obj);
  }

  if (type === 'suggestion') typeLabel = isKorean ? '제안' : 'Suggestion';
  if (type === 'bug report') typeLabel = isKorean ? '버그 제보' : 'Bug Report';

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <PageTitle title_ko="피드백" title_en="Feedback" />
      <div className={styles.row}>
        <label>
          {isKorean ? '피드백 유형' : 'Feedback type'} <span className={styles.required}>*</span>
        </label>
        <button
          type="button"
          className={
            active ? `${styles.type} ${styles.active}${!type ? ` ${styles.default}` : ''}${typeError ? ` ${styles['type-error']}` : ''}` : `${styles.type}${!type ? ` ${styles.default}` : ''}${typeError ? ` ${styles['type-error']}` : ''}`
          }
          onClick={toggleActive}
        >
          <span>{type ? typeLabel : typeButton}</span>
          <ChevronDownIcon />
        </button>
        {typeError && <p className={styles['error-msg']}>{isKorean ? '피드백 유형을 선택해 주세요' : 'Please select a type to submit'}</p>}
        <AnimatePresence>
          {active && (
            <motion.ul className={styles.list}>
              <li>
                <button type="button" className={styles.option} onClick={() => handleType('suggestion')}>
                  {isKorean ? '제안' : 'Suggestion'}
                </button>
              </li>
              <li>
                <button type="button" className={styles.option} onClick={() => handleType('bug report')}>
                  {isKorean ? '버그 제보' : 'Bug Report'}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.row}>
        <label htmlFor="email">
          {isKorean ? '이메일' : 'Email address'} <span className={styles.optional}>{isKorean ? '(선택 사항)' : '(optional)'}</span>
        </label>
        <input type="text" id="email" className={errors.email ? styles.error : ''} placeholder="name@email.com" {...register('email', { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g })} />
        {errors.email && <p className={styles['error-msg']}>{isKorean ? '이메일 형식이 올바르지 않습니다' : 'Please check your email address again'}</p>}
      </div>
      <div className={styles.row}>
        <label htmlFor="feedback">
          {isKorean ? '피드백 내용' : 'Your feedback'} <span className={styles.required}>*</span>
        </label>
        <textarea id="feedback" className={errors.feedback ? styles.error : ''} {...register('feedback', { required: true })} placeholder={isKorean ? '의견을 남겨 주세요' : 'Tell us what you think'}></textarea>
        {errors.feedback && <p className={styles['error-msg']}>{isKorean ? '피드백 내용을 작성해 주세요' : 'This field is required'}</p>}
      </div>
      <button type="submit" className={styles.submit}>
        {isKorean ? '피드백 전송하기' : 'Send Feedback'}
      </button>
    </form>
  );
}

export default FeedbackForm;
