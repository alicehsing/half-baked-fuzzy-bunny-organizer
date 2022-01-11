export function renderBunny(bunny) {
    const bunnyEl = document.createElement('p');
    // make an element with the css class 'bunny', and put the bunny's name in the text content
    bunnyEl.classList.add('bunny');
    bunnyEl.textContent = bunny.name;

    return bunnyEl;
}