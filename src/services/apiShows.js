import { supabase } from './supabase';

export async function getShows() {
  let { data, error } = await supabase.from('shows').select('*');

  if (error) {
    console.error(error);
    throw new Error('shows could not get loaded');
  }

  return data;
}

export async function getShowsMovies() {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('category', 'Movie');

  if (error) {
    console.error(error);
    throw new Error('Movies not found');
  }

  return data;
}
export async function getShowsTvSeries() {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('category', 'TV Series');

  if (error) {
    console.error(error);
    throw new Error('TV series not found');
  }

  return data;
}
export async function getBookmarkedShows() {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('isBookmarked', 'TRUE');

  if (error) {
    console.error(error);
    throw new Error('Bookmarked shows not found');
  }

  return data;
}

export async function getShowById(id) {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Show not found in supabase');
  }

  return data;
}

export async function updateShow(id, obj) {
  const { data, error } = await supabase
    .from('shows')
    .update(obj) //ex {isBookmarked: true}
    .eq('id', id) //ex 1
    .select();

  if (error) {
    console.error(error);
    throw new Error('show could not be updated');
  }
  return data;
}
