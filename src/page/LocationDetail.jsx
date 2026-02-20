import Breadcrumb from '../components/BreadCrumb';
import LocationArticle from '../components/location/LocationArticle';
import LocationResponsiveArticle from '../components/location/LocationResponsiveArticle';

import { useLocation } from '../service/locations/useLocation';
import { useMediaQuery } from '../hooks/useMediaQuery';

function LocationDetail() {
  const { location, isLoading } = useLocation();
  const [isMobile] = useMediaQuery('(max-width: 48rem)');

  if (isLoading) return null;

  return (
    <>
      <Breadcrumb label_ko={location.name_ko} label_en={location.name_en} />
      {isMobile ? <LocationResponsiveArticle location={location} /> : <LocationArticle location={location} />}
    </>
  );
}

export default LocationDetail;
