import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import FilterButton from './FilterButton';
import FilterItemButton from './FilterItemButton';

import { useLanguage } from '../hooks/useLanguage';

import { useCountries } from '../service/countries/useCountries';
import { useCities } from '../service/city/useCities';

import styles from './Filter.module.css';

function Filter() {
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { category } = useParams();
  const { countries, isLoading: isLoadingCountries } = useCountries();
  const { cities, isLoading: isLoadingCities } = useCities();

  const currentCountry = !searchParams.get('countries') ? 'all' : searchParams.get('countries');
  const currentCity = !searchParams.getAll('cities').length ? ['all'] : searchParams.getAll('cities')?.at(0).split(',');

  const [countryFilter, setCountryFilter] = useState(currentCountry);
  const [cityFilter, setCityFilter] = useState(currentCity);

  const [active, setActive] = useState(false);
  const { language, isKorean } = useLanguage();

  useEffect(() => {
    const handleClickOutside = event => {
      if (active && filterRef.current && !filterRef.current.contains(event.target) && filterButtonRef.current && !filterButtonRef.current.contains(event.target)) setActive(false);
    };

    const handleEscKey = event => {
      if (event.key === 'Escape' && active) setActive(false);
    };

    if (active) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [active]);

  if (isLoadingCountries || isLoadingCities) return null;

  function handleChangeFilter(param, value, state, fn) {
    let newFilter;

    if (value === 'all') newFilter = 'all';
    if (value !== 'all' && !state.includes(value)) newFilter = [...state.filter(country => country !== 'all'), value].join(',');
    if (value !== 'all' && state.includes(value)) newFilter = state.filter(country => country !== value).join(',');

    fn(newFilter);
    searchParams.set(param, newFilter);
    setSearchParams(searchParams);
  }

  function handleChangeCountryFilter(value) {
    setCityFilter('all');
    setCountryFilter(value);
    searchParams.set('countries', value);
    searchParams.set('cities', 'all');
    setSearchParams(searchParams);
  }

  function handleClearFilter() {
    setCityFilter('all');
    setCountryFilter('all');
    searchParams.set('countries', 'all');
    searchParams.set('cities', 'all');
    setSearchParams(searchParams);
  }

  const filteredCountries = category !== 'korea' && countries.filter(country => country.country_code !== 'KR');
  const filteredCities = cities.filter(city => city.countries.country_code === currentCountry);

  return (
    <>
      <FilterButton active={active} onActive={setActive} ref={filterButtonRef} />
      <AnimatePresence>
        {active && (
          <motion.section
            id={styles.filter}
            ref={filterRef}
            variants={{
              visible: { transform: 'translateY(0)', opacity: 1 },
              hidden: { transform: 'translateY(-2rem)', opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.45 }}
          >
            <div className={styles.wrap}>
              <header className={styles.header}>
                <h2 className={styles['main-title']}>{isKorean ? '검색 필터' : 'Search filter'}</h2>
                <button className={styles.clear} onClick={handleClearFilter}>
                  {isKorean ? '필터 초기화' : 'Clear filter'}
                </button>
              </header>
              <div className={styles.row}>
                <h3 className={styles['list-title']}>{isKorean ? '국가' : 'Country'}</h3>
                <ul className={styles['country-list']}>
                  <li>
                    <FilterItemButton content={isKorean ? '전체' : 'All'} isActive={countryFilter === 'all'} onClick={() => handleChangeCountryFilter('all')} />
                  </li>
                  {filteredCountries.map(country => (
                    <FilterItemButton
                      key={country.id}
                      emoji={country.country_flag}
                      content={country[`country_${language}`]}
                      isActive={countryFilter === country.country_code}
                      onClick={() => handleChangeCountryFilter(country.country_code)}
                    />
                  ))}
                </ul>
              </div>
              <AnimatePresence>
                {countryFilter !== 'all' && (
                  <motion.div
                    className={styles.row}
                    variants={{
                      visible: { transform: 'translateY(0)', opacity: 1 },
                      hidden: { transform: 'translateY(-15%)', opacity: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className={styles['list-title']}>{isKorean ? '도시' : 'Cities'}</h3>
                    <ul className={styles['city-list']}>
                      <FilterItemButton content={isKorean ? '전체' : 'All'} isActive={cityFilter.includes('all')} onClick={() => handleChangeFilter('cities', 'all', currentCity, setCityFilter)} />

                      {filteredCities.map(city => (
                        <FilterItemButton key={city.id} content={city[`city_${language}`]} isActive={cityFilter.includes(city.slug)} onClick={() => handleChangeFilter('cities', city.slug, currentCity, setCityFilter)} />
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

export default Filter;
