import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ChevronLeftIcon from '../assets/icons/linear/ChevronLeftIcon';
import ChevronRightIcon from '../assets/icons/linear/ChevronRightIcon';
import ChevronsLeftIcon from '../assets/icons/linear/ChevronsLeftIcon';
import ChevronsRightIcon from '../assets/icons/linear/ChevronsRightIcon';

import styles from './Pagination.module.css';

function Pagination({ count, size }) {
  const pageNumbers = [];

  const [searchParams, setSearchParams] = useSearchParams();
  const current = !searchParams.get('page') ? 1 : searchParams.get('page');

  const [viewPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(current);

  const pageGroup = Math.ceil(currentPage / viewPage);
  const maxPage = Math.ceil(count / size);

  const lastPage = pageGroup * viewPage > maxPage ? maxPage : pageGroup * viewPage;
  const firstPage = lastPage - (viewPage - 1) <= 0 ? 1 : lastPage - (viewPage - 1);

  for (let i = firstPage; i <= lastPage; i++) pageNumbers.push(i);

  function nextPage() {
    const next = +currentPage === maxPage ? +currentPage : +currentPage + 1;
    setCurrentPage(next);
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = +currentPage === 1 ? +currentPage : +currentPage - 1;
    setCurrentPage(prev);
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  function selectPage(page) {
    setCurrentPage(page);
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  if (!count) return null;

  return (
    <div id={styles.pagination}>
      <div className={styles.arrow}>
        <button className={styles.first} disabled={currentPage === 1} onClick={() => selectPage(1)}>
          <ChevronsLeftIcon />
        </button>
        <button className={styles.prev} disabled={currentPage === 1} onClick={prevPage}>
          <ChevronLeftIcon />
        </button>
      </div>
      <li className={styles.list}>
        {pageNumbers.map(num => (
          <button key={num} className={+currentPage === +num ? `${styles.btn} ${styles.active}` : styles.btn} disabled={+currentPage === +num} onClick={() => selectPage(num)}>
            {num}
          </button>
        ))}
      </li>
      <div className={styles.arrow}>
        <button className={styles.next} disabled={currentPage === maxPage} onClick={nextPage}>
          <ChevronRightIcon />
        </button>
        <button className={styles.last} disabled={currentPage === maxPage} onClick={() => selectPage(maxPage)}>
          <ChevronsRightIcon />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
