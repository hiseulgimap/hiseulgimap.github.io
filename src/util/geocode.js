export async function geocodePlace(query) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress,places.id',
    },
    body: JSON.stringify({ textQuery: query }),
  });

  const data = await response.json();
  const place = data.places?.[0];

  if (!place) return null;

  return {
    id: place.id,
    name: place.displayName.text,
    address: place.formattedAddress,
    lat: place.location.latitude,
    lng: place.location.longitude,
  };
}
