import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { geocodePlace } from '../util/geocode';

function Geocode() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [placeId, setPlacedId] = useState(null);
  const [address, setAddress] = useState('');

  const handleGeocode = async address => {
    const result = await geocodePlace(address);

    setLat(result.lat);
    setLng(result.lng);
    setPlacedId(result.id);

    console.log(result);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '1.5rem' }}>
      <form
        style={{ gridColumn: '1 / -1' }}
        onSubmit={e => {
          e.preventDefault();
          handleGeocode(address);
        }}
      >
        <input style={{ border: 'var(--border-solid)', padding: '1rem', marginRight: '1rem' }} type="text" value={address} onChange={event => setAddress(event.target.value)} />
        <button type="submit">submit</button>
      </form>
      <div>
        <span style={{ display: 'inline-block', marginRight: '1rem', fontWeight: 600 }}>{lat !== null && address && `${lat}`}</span>
        <CopyToClipboard text={lat}>
          <button>copy</button>
        </CopyToClipboard>
      </div>
      <div>
        <span style={{ display: 'inline-block', marginRight: '1rem', fontWeight: 600 }}>{lng !== null && address && `${lng}`}</span>
        <CopyToClipboard text={lng}>
          <button>copy</button>
        </CopyToClipboard>
      </div>
      <div style={{ display: 'block', marginTop: '1rem' }}>
        <span style={{ display: 'inline-block', marginRight: '1rem', fontWeight: 600 }}>{placeId !== null && address && `${placeId}`}</span>
        <CopyToClipboard text={placeId}>
          <button>copy</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default Geocode;
