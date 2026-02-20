import supabase from '../service/supabase';

export async function fetchCategories() {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchPlaceCategories(mapType) {
  let query = supabase.from('locations').select('*, categories (category_ko, category_en, emoji)');

  if (mapType === 'KR') query = query.eq('country_code', 'KR').order('id', { ascending: true });
  else query = query.neq('country_code', 'KR').order('id', { ascending: true });

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const categories = data.map(dt => dt.categories);

  return categories;
}
