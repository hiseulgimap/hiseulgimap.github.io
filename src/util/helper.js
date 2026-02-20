export function formatDate(data) {
  const originalDate = new Date(data);

  const year = originalDate.getFullYear();
  const month = (+originalDate.getMonth() + 1).toString().padStart(2, '0');
  const date = originalDate.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${date}`;
}

export function formatTimestamp(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function getGoogleDestinationLink(address) {
  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
}

export function formatTel(tel) {
  return tel.split(' ').join('').split('-').join('');
}
