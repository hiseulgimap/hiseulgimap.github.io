import { useEffect, useRef } from 'react';

function NaverMapView({ place }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!place || !window.naver) return;

    // 주소나 좌표를 기반으로 지도 초기화
    // (실제 서비스에서는 주소를 좌표로 변환하는 Geocoding API가 필요할 수 있습니다)
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.978), // 예시 좌표
      zoom: 16,
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(37.5665, 126.978),
      map: map,
    });
  }, [place]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

export default NaverMapView;
