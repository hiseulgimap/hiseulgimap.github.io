import { useDispatch } from 'react-redux';

import GridIcon from '../../assets/icons/linear/GridIcon';
import ListIcon from '../../assets/icons/linear/ListIcon';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { attributeActions } from '../../store/attribute-slice';

import styles from './ListTypeSetting.module.css';

function ListTypeSetting({ selectedType, onSelectType }) {
  const [_, setValue] = useLocalStorage('grid', 'list');

  const dispatch = useDispatch();

  const handleList = type => setValue(type);

  function handleListBtn(type) {
    handleList(type);
    onSelectType(type);
    dispatch(attributeActions.changeAttributeValue({ key: 'list', value: type }));
  }

  const isGrid = selectedType === 'grid';

  return (
    <div className={styles.settings}>
      <button className={isGrid ? `${styles.btn} ${styles.active}` : styles.btn} onClick={() => handleListBtn('grid')}>
        <GridIcon />
      </button>
      <button className={!isGrid ? `${styles.btn} ${styles.active}` : styles.btn} onClick={() => handleListBtn('list')}>
        <ListIcon />
      </button>
    </div>
  );
}

export default ListTypeSetting;
