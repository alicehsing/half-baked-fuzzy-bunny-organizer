export function renderBunny(bunny) {
    const bunnyEl = document.createElement('d');
    const bunnyNameEl = document.createElement('p');
    // make an element with the css class 'bunny', and put the bunny's name in the text content
    bunnyNameEl.classList.add('bunny');
    bunnyNameEl.textContent = bunny.name;
    bunnyEl.append(bunnyNameEl);

    return bunnyEl;
}