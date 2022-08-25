
import { checkError, client } from './client';

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


// seems like this returns all classes, so the function should be plural
export async function getClasses() {
  const rawData = await fetch(`/.netlify/functions/dnd?classes`);
  
  const { data } = await rawData.json();
  
  
  return data;
}

export async function getCampaigns() {
  const response = await client
    .from('campaign')
    .select('*');

  return checkError(response); 
}

// seems like this returns all races, so the function should be plural
export async function getRaces() {
  const rawData = await fetch(`/.netlify/functions/dndr?races`);

  const { data } = await rawData.json();
  return data;
}

export async function createCharacter(sheet) {
  const response = await client
    .from('sheets')
    .insert(sheet);
  return checkError(response);
}

// seems like this returns all characters for a given user, so the function should be plural
export async function getCharacters() {
  const response = await client
    .from('sheets')
    .select('*');
    
  return checkError(response);
}

export async function getSingleCard(id) {
  const response = await client
    .from('sheets')
    .select('*')
    .match({ id })
    .single();
  return checkError(response);
}

export async function deleteCharacter(id) {
  const { data } = await client
    .from('sheets')
    .delete()
    .match({ id })
    .single();

  return data;
}

export async function updateCharacter(id, sheet) {

  const { data } = await client
    .from('sheets')
    .update(sheet)
    .match({ id })
    .single();
  return data;
}

export async function getCamp() {
  const response = await client
    .from('campaign')
    .select('*');
  return checkError(response);
}

export async function getPlayers(id, campaign) {
  const response = await client
    .from('campaign')
    .select('*')
    .match({ id, campaign })
    .single();
  return checkError(response);
}



    