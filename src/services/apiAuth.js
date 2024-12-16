import { supabase } from './supabase';

export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName: '', avatar: '' },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  const updateData = {};

  if (fullName) updateData.fullName = fullName;

  if (avatar) {
    updateData.avatar = avatar;
  }

  // Update user metadata
  const { data, error: updateError } = await supabase.auth.updateUser({
    data: updateData,
  });

  if (updateError) throw new Error(updateError.message);

  // Update password separately
  if (password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password: password,
    });
    if (passwordError) throw new Error(passwordError.message);
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
