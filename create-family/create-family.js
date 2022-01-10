import {
    createFamily,
    checkAuth,
    logout,
} from '../fetch-utils.js';

const form = document.querySelector('.family-form');
const logoutButton = document.getElementById('logout');

//on submit, create a new family.
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('family-name');

    await createFamily({
        name: name
    });
    form.reset();
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
