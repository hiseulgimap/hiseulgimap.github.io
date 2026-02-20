import supabase from '../service/supabase';

export async function fetchCountries() {
  const { data, error } = await supabase.from('countries').select('*').order('id', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}
