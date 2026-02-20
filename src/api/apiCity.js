import supabase from '../service/supabase';

export async function fetchCities(lang) {
  const { data, error } = await supabase.from('cities').select('*, countries (country_code)').order(`city_${lang}`, { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}
