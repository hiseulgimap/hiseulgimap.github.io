import MyMap from '../components/MyMap';
import MyMapNotice from '../components/MyMapNotice';
import PageTitle from '../components/PageTitle';

function MyMaps() {
  return (
    <>
      <PageTitle title_ko="마이 지도" title_en="My Map" />
      <MyMap />
      <MyMapNotice />
    </>
  );
}

export default MyMaps;
