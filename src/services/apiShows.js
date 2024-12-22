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

export async function getBookmarkedShows(userId) {
  const { data, error } = await supabase
    .from('userBookmark')
    .select(
      `
      showId,
      shows (
        *
      )
    `
    )
    .eq('userId', userId);

  if (error) {
    console.error(error);
    throw new Error('Bookmarked shows not found');
  }

  console.log('fetched data: ', data);
  // Extract the shows from the joined data
  const bookmarkedShows = data.map(bookmark => bookmark.shows);

  return bookmarkedShows;
}

export async function addBookmark(userId, showId) {
  const { data, error } = await supabase
    .from('userBookmark')
    .insert([{ userId, showId }]);

  if (error) {
    console.error(error);
    throw new Error('Bookmark could not be added');
  }

  return data;
}

export async function deleteBookmark(userId, showId) {
  const { data, error } = await supabase
    .from('userBookmark')
    .delete()
    .eq('userId', userId)
    .eq('showId', showId);

  if (error) {
    console.error(error);
    throw new Error('Bookmark could not be deleted');
  }

  return data;
}
