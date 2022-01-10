import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

//on submit, create a bunny. The form should include a name for the bunny and a dropdown for the family (from the fetched families in supabase).
form.addEventListener('submit', async(e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    const name = data.get('bunny-name');
    const family_id = data.get('family-id');

    // use createBunny() to create a bunny with this name and family id
    await createBunny({
        name: name, 
        family_id: family_id
    });

    form.reset();
});

//on load, fetch families. Use these families to create the dropdown to let the user attach a bunny to a family.
window.addEventListener('load', async() => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const dropdown = document.querySelector('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        const optionEl = document.createElement('option');
        // set the option's value and text content
        //what the computer sees
        optionEl.value = family.id;
        //what the user sees
        optionEl.textContent = family.name;
        // and append the option to the select
        dropdown.append(optionEl);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
