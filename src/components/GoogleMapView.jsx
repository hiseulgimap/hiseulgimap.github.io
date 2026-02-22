import { useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

import MiniLoader from './MiniLoader';

import { useLanguage } from '../hooks/useLanguage';

import styles from './GoogleMapView.module.css';

const containerStyle = { width: '100%', height: '100%' };

function GoogleMapView({ location }) {
  let markers;
  const mapRef = useRef(null);

  const { language } = useLanguage();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (Array.isArray(location) && location.length > 1) markers = location.map(loca => ({ ...loca }));
  else if (Array.isArray(location) && location.length === 1) markers = location;
  else markers = [location];

  const center = {
    lat: markers.reduce((sum, c) => sum + parseFloat(c.latitude), 0) / markers.length,
    lng: markers.reduce((sum, c) => sum + parseFloat(c.longitude), 0) / markers.length,
  };

  const onLoad = useCallback(
    map => {
      mapRef.current = map;
      if (markers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(c => bounds.extend({ lat: parseFloat(c.latitude), lng: parseFloat(c.longitude) }));
        map.fitBounds(bounds);
      }
    },
    [markers],
  );

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={markers.length === 1 ? 14 : undefined} onLoad={onLoad}>
      {markers.map(c => (
        <MarkerF key={c.latitude} position={{ lat: parseFloat(c.latitude), lng: parseFloat(c.longitude) }} title={c[`name_${language}`]} />
      ))}
    </GoogleMap>
  ) : (
    <div className={styles.loader}>
      <MiniLoader />
    </div>
  );
}

export default GoogleMapView;
