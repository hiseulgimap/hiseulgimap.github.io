import { forwardRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import Logo from './Logo';
import PreviewLocationItem from './PreviewLocationItem';

import FolderIcon from '../assets/icons/bold/FolderIcon';
import FolderStarIcon from '../assets/icons/bold/FolderStarIcon';

import { useLanguage } from '../hooks/useLanguage';
import { useLocationsByIds } from '../service/locations/useLocationsByIds';
import { formatDate } from '../util/helper';
import { MAP_STORAGE_KEY } from '../util/constants';

import styles from './PreviewContainer.module.css';

const PreviewContainer = forwardRef((_, refs) => {
  const { previewRef, svgRef } = refs;
  const { folderId } = useParams();
  const { language, isKorean } = useLanguage();

  const [maps] = useLocalStorage([], MAP_STORAGE_KEY);
  const [selectedFolder] = useState(() => maps?.filter(map => map.id === folderId) ?? []);

  const { locations, isLoading } = useLocationsByIds(selectedFolder.at(0)?.location_id);

  const [orderedLocations, setOrderedLocations] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (locations?.length && !initialized.current) {
      setOrderedLocations(locations);
      initialized.current = true;
    }
  }, [locations]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 길게 누르면 드래그 시작
        tolerance: 5, // 5px 이상 움직여야 드래그로 인식 (스크롤과 구분)
      },
    }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = orderedLocations.findIndex(l => l.id === active.id);
    const newIndex = orderedLocations.findIndex(l => l.id === over.id);
    const newList = arrayMove(orderedLocations, oldIndex, newIndex);

    setOrderedLocations(newList);

    // 로컬스토리지에 직접 write (리렌더링 방지)
    const newMaps = maps.map(data => (data.id === selectedFolder[0].id ? { ...data, location_id: newList.map(l => l.id) } : data));
    localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(newMaps));
  };

  if (!selectedFolder?.length) return null;
  if (!selectedFolder.at(0)?.location_id?.length) return null;
  if (isLoading) return null;

  const [folder] = selectedFolder;
  const color = `var(--color-folder-${folder.color}-base)`;
  const count = folder.location_id.length;

  return (
    <div id={styles.image} ref={previewRef}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logo />
        </header>
        <main className={styles.main}>
          <div className={styles['title-section']}>
            <span className={styles.icon}>{folder.isFavorite ? <FolderStarIcon color={color} /> : <FolderIcon color={color} />}</span>
            <div className={styles['title-wrap']}>
              <h2 className={styles.title}>
                <span className="line-clamp line--1">{folder.folderName}</span>
              </h2>
              <div className={styles['title-bottom']}>
                <time className={styles.date}>{formatDate(folder.created_at)}</time>
                <span className={styles.bull}>&bull;</span>
                <p className={styles.count}>
                  {count}
                  {isKorean ? '곳' : count === 1 ? ' place' : ' places'}
                </p>
              </div>
            </div>
          </div>
          <div className={styles['location-section']}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={orderedLocations.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <ul className={styles.locations}>
                  {orderedLocations.map((location, index) => (
                    <PreviewLocationItem key={location.id} ref={svgRef} index={index} location={location} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        </main>
        <footer className={styles.footer}>
          <a className={styles.copyright} href="https://x.com/ovxbjh" target="_blank">
            ⓒ {new Date().getFullYear()} <strong>ov.</strong> All rights reserved
          </a>
          <a className={styles.hiseulgimap} href="https://hiseulgi-map.com">
            https://hiseulgi-map.com
          </a>
        </footer>
      </div>
    </div>
  );
});

export default PreviewContainer;
