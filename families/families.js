import { 
    checkAuth, 
    deleteBunny, 
    // getBunnies, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';
import { renderBunny } from '../render-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    for (let family of families) {  
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        familyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        // put the family name in the name element
        nameEl.textContent = family.name;
        familyEl.append(nameEl, bunniesEl);

        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            const newBunnyEl = renderBunny(bunny);

             // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            newBunnyEl.addEventListener('click', async() => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });

             // append this bunnyEl to the bunniesEl
            bunniesEl.append(newBunnyEl);

            // append the bunniesEl and nameEl to the familyEl
            familyEl.append(bunniesEl, nameEl);
        }

        // append the familyEl to the familiesEl
        familiesEl.append(familyEl);
    }   
}

window.addEventListener('load', async() => {
    //stretch goal #3:
    // await normalizeBunnies();

    const families = await getFamilies();

    displayFamilies(families);
});

//stretch goal#3: Automatically generate the bunny form using a bunny fetched from supabase if new properties end up added to the bunny table
// async function normalizeBunnies() {
//     //fetch all old bunny data
//     //store it in a variable
//     const oldBunnyArr = await getBunnies();

//     for (let oldBunny of oldBunnyArr) {
//         // delete the old supabase data without the new property
//         await deleteBunny(oldBunny.id);
//         //loop through bunny data, re-insert bunny into data with new properties
//         const newBunnyObj = {
//             name: oldBunny.name + 'new',
//             family_id: oldBunny.family_id,
//         };
//         await createBunny(newBunnyObj);
//     }
// }

