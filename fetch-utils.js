/* eslint-disable no-console */
const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

// fetch all families and their bunnies
export async function getFamilies() {
    const response = await client
        .from('loving_families')
        .select('*, fuzzy_bunnies (*)');

    return checkError(response);    
}

// create a bunny using the bunny argument
export async function createBunny(bunny) {   
    const response = await client
        .from('fuzzy_bunnies')
        .insert([bunny]);

    return checkError(response);   
}

// delete a single bunny using the id argument
export async function deleteBunny(id) {
    const response = await client
        .from('fuzzy_bunnies')
        .delete()
        .match({ id: id })
        .single();

    return checkError(response);    
}

//stretch goal: create a new family using the family argument
export async function createFamily(family) {   
    const response = await client
        .from('loving_families')
        .insert([family]);

    return checkError(response);   
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
