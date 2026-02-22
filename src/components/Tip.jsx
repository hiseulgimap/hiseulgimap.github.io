import { useLanguage } from '../hooks/useLanguage';
import { useTips } from '../service/tips/useTips';

import TipPick from './TipPick';
import TipTotalComment from './TipTotalComment';

import styles from './Tip.module.css';

function Tip({ id }) {
  const { tips, isLoading } = useTips(id);
  const { language, isKorean } = useLanguage();

  if (isLoading || !tips?.length) return null;

  const totalComment = tips.filter(tip => !!tip.total_comment_ko)?.map(tip => ({ total_comment_ko: tip.total_comment_ko, total_comment_en: tip.total_comment_en }));

  const placeNote = tips.filter(tip => !!tip.place_note_ko);

  const picks = tips.filter(tip => Boolean(tip.seulgi_pick_ko)).map(tip => tip[`seulgi_pick_${language}`]);

  return (
    <div id={styles.tip}>
      <div className={styles.row}>
        <h3 className={styles.title}>💡 Tip</h3>
      </div>
      {picks.length > 0 && <TipPick picks={picks} />}
      {totalComment.length > 0 && <TipTotalComment comment={totalComment.at(0)[`total_comment_${language}`]} />}
    </div>
  );
}

export default Tip;
