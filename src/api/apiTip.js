import supabase from '../service/supabase';

export async function fetchTips(id) {
  const { data, error } = await supabase.from('tips').select('*').eq('location_id', id);
  if (error) throw new Error(error.message);
  return data;
}
