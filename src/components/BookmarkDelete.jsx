import DangerModal from './DangerModal';

import { useLanguage } from '../hooks/useLanguage';

function BookmarkDelete({ deleteFolder, onDeleteFolder, onProceed }) {
  const { isKorean } = useLanguage();

  return (
    <div>
      <DangerModal
        active={deleteFolder}
        onClose={() => onDeleteFolder(false)}
        title={isKorean ? '폴더 삭제하기' : 'Delete folder'}
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
        onProceed={onProceed}
      />
    </div>
  );
}

export default BookmarkDelete;
