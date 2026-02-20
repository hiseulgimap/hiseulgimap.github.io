import { useSelector } from 'react-redux';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

function GoogleMapView({ place }) {
  const currentLanguage = useSelector(state => state.attribute.language);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });

  const center = {
    lat: place.latitude,
    lng: place.longitude,
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <MarkerF position={center} title={place[`name_${currentLanguage}`]} />{' '}
    </GoogleMap>
  ) : (
    <p>Loading Google Maps...</p>
  );
}

export default GoogleMapView;
