import { useParams } from 'react-router-dom';

import Location from '../components/location/Location';
import LoaderFullLayout from '../components/LoaderFullLayout';
import LocationCategory from '../components/location/LocationCategory';
import MiniLoader from '../components/MiniLoader';
import Pagination from '../components/Pagination';

import LocationHeaderLayout from '../UI/layout/LocationHeaderLayout';

import { useLocationsByCategory } from '../service/locations/useLocationsByCategory';

import { LOCATION_PAGE_SIZE } from '../util/constants';

function Locations() {
  const { category } = useParams();
  const { locations, isLoading, count } = useLocationsByCategory();

  const isDomesticCategory = category === 'korea';

  if (isLoading)
    return (
      <LoaderFullLayout>
        <MiniLoader />
      </LoaderFullLayout>
    );

  const title_ko = isDomesticCategory ? '국내 장소별 지도' : '해외 장소별 지도';
  const title_en = isDomesticCategory ? 'Tour locations in Korea' : 'Global tour locations';

  return (
    <>
      <LocationHeaderLayout title_ko={title_ko} title_en={title_en} />
      <LocationCategory />
      <Location locations={locations} />
      <Pagination count={count} size={LOCATION_PAGE_SIZE} />
    </>
  );
}

export default Locations;
