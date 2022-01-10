// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderBunny } from '../render-utils.js';

const test = QUnit.test;

test('renderBunny function should take in a bunny argument consisted of a name, then return a DOM node with a div element', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const bunny = {
        name: 'Puff',
    };
    
    const expected = `<div><p class="bunny">Puff</p></div>`;

    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderBunny(bunny);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected, 'returns a DOM node consisted of 1 p tag wrapped inside a div element');
});
