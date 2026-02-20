import supabase from '../service/supabase';

import { LOCATION_PAGE_SIZE } from '../util/constants';

// export async function fetchLocations({ mapType, page = 0, currentCategory, country, cities }) {
//   const from = (page - 1) * LOCATION_PAGE_SIZE;
//   const to = from + LOCATION_PAGE_SIZE - 1;

//   const categoryJoin = currentCategory && currentCategory !== 'all' ? 'categories!inner (name_ko, name_en, emoji, slug)' : 'categories (name_ko, name_en, emoji, slug)';

//   let query = supabase.from('locations').select(`*, cities (city_ko, city_en), countries (name_ko, name_en, country_flag), ${categoryJoin}`, { count: 'exact' }).order('id', { ascending: false });

//   // if (mapType === 'KR') query = query.eq('country_code', 'KR');
//   // else query = query.neq('country_code', 'KR');

//   if (country) query = query.eq('country_code', country);
//   else {
//     if (mapType === 'KR') query = query.eq('country_code', 'KR');
//     else query = query.neq('country_code', 'KR');
//   }

//   if (currentCategory && currentCategory !== 'all') query = query.eq('categories.slug', currentCategory);
//   if (cities && cities.length > 0) query = query.in('city_id', cities);

//   const { data, error, count } = await query.range(from, to);

//   if (error) throw new Error(error.message);

//   return { locations: data, count };
// }

export async function fetchLocations() {
  const { data, error } = await supabase.from('locations').select('*, countries (country_code)');

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchLocation(id) {
  const { data, error } = await supabase
    .from('locations')
    .select('*, countries (country_ko, country_en, country_flag), cities (city_ko, city_en), categories (category_ko, category_en, emoji), episodes (id, title_ko, title_en, thumbnail_url, published_at, youtube_id)')
    .eq('id', id);
  if (error) throw new Error(error.message);
  return data?.at(0);
}

export async function fetchLocationByIds(id) {
  if (!id) return;
  if (!id.length) return;

  const { data, error } = await supabase.from('locations').select('*').in('id', id).order('id', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

function buildBaseQuery(currentCategory, citiesFilter) {
  const categoryJoin = currentCategory && currentCategory !== 'all' ? 'categories!inner (category_ko, category_en, emoji, slug)' : 'categories (category_ko, category_en, emoji, slug)';
  const citiesJoin = citiesFilter ? 'cities!inner (city_ko, city_en, slug)' : 'cities (city_ko, city_en)';

  return supabase.from('locations').select(`*, countries (country_ko, country_en, country_flag), ${categoryJoin}, ${citiesJoin}`, { count: 'exact' }).order('id', { ascending: false });
}

export async function fetchDomesticLocations({ page = 1, currentCategory, cities }) {
  const from = (page - 1) * LOCATION_PAGE_SIZE;
  const to = from + LOCATION_PAGE_SIZE - 1;

  const citiesFilter = cities?.length > 0 && cities?.at(0) !== 'all';

  let query = buildBaseQuery(currentCategory, citiesFilter).eq('country_code', 'KR');

  if (currentCategory && currentCategory !== 'all') query = query.eq('categories.slug', currentCategory);
  if (citiesFilter) query = query.in('cities.slug', cities);

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);
  return { locations: data, count };
}

export async function fetchGlobalLocations({ page = 1, currentCategory, country, cities }) {
  const from = (page - 1) * LOCATION_PAGE_SIZE;
  const to = from + LOCATION_PAGE_SIZE - 1;

  const citiesFilter = cities?.length > 0 && cities?.at(0) !== 'all';

  let query = buildBaseQuery(currentCategory, citiesFilter).neq('country_code', 'KR');

  if (currentCategory && currentCategory !== 'all') query = query.eq('categories.slug', currentCategory);
  if (country && country !== 'all') query = query.eq('country_code', country);
  if (citiesFilter) query = query.in('cities.slug', cities);

  const { data, error, count } = await query.range(from, to);
  if (error) throw new Error(error.message);
  return { locations: data, count };
}

export async function fetchLocationsByEpisode(id) {
  const { data, error } = await supabase.from('locations').select('*').eq('episode_id', id).order('id', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}
