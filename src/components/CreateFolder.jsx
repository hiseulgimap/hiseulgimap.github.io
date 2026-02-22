import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';

import CircleIcon from '../assets/icons/linear/CircleIcon';
import CheckCircleIcon from '../assets/icons/bold/CheckCircleIcon';
import FolderIcon from '../assets/icons/bold/FolderIcon';
import FolderStarIcon from '../assets/icons/bold/FolderStarIcon';

import { useLanguage } from '../hooks/useLanguage';

import { FOLDER_COLORS, MAP_STORAGE_KEY } from '../util/constants';

import styles from './CreateFolder.module.css';

function ColorPalette({ active, onActive, color, onColor, onClose }) {
  const paletteRef = useRef(null);
  const paletteButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (active && paletteRef.current && !paletteRef.current.contains(event.target) && paletteButtonRef.current && !paletteButtonRef.current.contains(event.target)) onActive(false);
    };

    if (active) {
      const timer = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [active, onActive]);

  return (
    <AnimatePresence>
      {active && (
        <motion.ul
          ref={paletteRef}
          className={styles['palette-list']}
          variants={{
            visible: { transform: 'translateY(0)', opacity: 1 },
            hidden: { transform: 'translateY(-1rem)', opacity: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.35 }}
        >
          {FOLDER_COLORS.map(colorCode => (
            <li key={colorCode}>
              <button className={colorCode === color ? `${styles.color} ${styles.active}` : styles.color} style={{ backgroundColor: `var(--color-folder-${colorCode}-base)` }} onClick={() => onColor(colorCode)} />
            </li>
          ))}
          <li></li>
          <li>
            <button ref={paletteButtonRef} className={styles['close-palette']} onClick={onClose}>
              &times;
            </button>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function CreateFolder({ folders = [], onClose, onFolderCreated, isInitialCreation = false, editFolder }) {
  const isEditMode = !!editFolder;

  const { isKorean } = useLanguage();

  const [favorite, setFavorite] = useState(editFolder?.isFavorite ?? false);
  const [colorActive, setColorActive] = useState(false);
  const [color, setColor] = useState(editFolder?.color ?? FOLDER_COLORS[0]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      folder: editFolder?.folderName ?? '',
    },
  });

  function handleCancel(event) {
    event.stopPropagation();
    reset();
    setFavorite(false);
    setColorActive(false);
    setColor(FOLDER_COLORS[0]);
    onClose();
  }

  function onSubmit(data) {
    let newMapData;

    if (isEditMode) {
      const updatedFolder = {
        ...editFolder,
        folderName: data.folder,
        isFavorite: favorite,
        color,
        updated_at: new Date(),
      };
      newMapData = folders.map(f => (f.id === editFolder.id ? updatedFolder : f));
      toast.success(isKorean ? '폴더가 수정되었습니다' : 'Folder has been updated');
    } else {
      const obj = {
        id: uuidv4(),
        created_at: new Date(),
        folderName: data.folder,
        isFavorite: favorite,
        location_id: [],
        color,
        updated_at: null,
      };
      newMapData = [...folders, obj];
      toast.success(isKorean ? '폴더가 생성되었습니다' : 'Folder has been created');
    }

    localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(newMapData));
    reset();
    setFavorite(false);
    setColor(FOLDER_COLORS[0]);
    onFolderCreated(newMapData);
  }

  return (
    <>
      <h1 className={styles.title}>{isEditMode ? (isKorean ? '폴더 수정하기' : 'Edit folder') : isKorean ? '폴더 생성하기' : 'Create a folder'}</h1>
      {isEditMode && <p className={styles.text}>{isKorean ? '폴더 이름과 색상을 변경할 수 있어요' : 'Update your folder name and color'}</p>}
      {!isEditMode && isInitialCreation && <p className={styles.text}>{isKorean ? '장소를 저장하려면 먼저 폴더를 만들어야 해요' : 'Create a folder to start saving places'}</p>}
      {!isEditMode && !isInitialCreation && <p className={styles.text}>{isKorean ? '새로운 폴더를 만들어 장소를 정리해 보세요' : 'Organize your saved places with a new folder'}</p>}
      <div className={styles['col--1']}>
        <div className={styles['icon-wrap']}>
          <span className={styles.icon}>{favorite ? <FolderStarIcon color={`var(--color-folder-${color}-base)`} /> : <FolderIcon color={`var(--color-folder-${color}-base)`} />}</span>
          <button className={styles.paletteBtn} onClick={() => setColorActive(prevState => !prevState)}>
            {isKorean ? '색상' : 'color'}
          </button>
          {colorActive && <ColorPalette active={colorActive} onActive={setColorActive} color={color} onColor={setColor} onClose={() => setColorActive(false)} />}
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['input-row']}>
            <label htmlFor="folder">{isKorean ? '폴더명' : 'Folder title'}</label>
            <input type="text" id="folder" autoComplete="off" {...register('folder', { required: true })} />
          </div>
          <div className={styles['input-row']}>
            <button type="button" className={favorite ? `${styles.favorite} ${styles.active}` : styles.favorite} onClick={() => setFavorite(prevState => !prevState)}>
              {favorite ? <CheckCircleIcon /> : <CircleIcon />}
              <span>{isKorean ? '즐겨찾기로 설정하기' : 'Save as Favorite'}</span>
            </button>
          </div>
          <div className={styles.action}>
            <button type="submit" className={styles['primary-btn']}>
              {isEditMode ? (isKorean ? '수정하기' : 'Update') : isKorean ? '저장하기' : 'Save'}
            </button>
            <button type="button" className={styles['secondary-btn']} onClick={handleCancel}>
              {isKorean ? '닫기' : 'Close'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateFolder;
