import GoogleMapView from './GoogleMapView';
import NaverMapView from './NaverMapView';

function MapContainer({ selectedLocation }) {
  if (!selectedLocation) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#f5f5f5' }}>장소를 선택하면 지도가 나타납니다.</div>;
  }

  return <div style={{ width: '100%', height: '100%' }}>{selectedLocation.map_type === 'GOOGLE' ? <GoogleMapView place={selectedLocation} /> : <NaverMapView place={selectedLocation} />}</div>;
}

export default MapContainer;
