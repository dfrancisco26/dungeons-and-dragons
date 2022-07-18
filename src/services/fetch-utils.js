import { client } from './client';

export async function signUp(email, password) {

  const { user } = await client.auth.signUp({
    email: email,
    password: password,
  });

  return user;
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({
    email: email,
    password: password,
  });
    
  return user;
}

export async function logout() {
  await client.auth.signOut();
}