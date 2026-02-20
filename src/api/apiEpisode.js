import supabase from '../service/supabase';

import { EPISODE_PAGE_SIZE } from '../util/constants';

export async function fetchEpisodes({ page = 0 }) {
  const from = (page - 1) * EPISODE_PAGE_SIZE;
  const to = from + EPISODE_PAGE_SIZE - 1;

  const { data, error, count } = await supabase.from('episodes').select('*', { count: 'exact' }).order('id', { ascending: false }).range(from, to);

  if (error) throw new Error(error.message);

  return { episodes: data, count };
}

export async function fetchEpisode(id) {
  const { data, error } = await supabase.from('episodes').select('*').eq('id', id);
  if (error) throw new Error(error.message);
  return data?.at(0);
}
