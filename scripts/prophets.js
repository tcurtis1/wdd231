const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.table(data.prophets); 
        displayProphets(data.prophets); 
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section'); 
        
        // Build the h2 content out to show the prophet's full name
        let fullName = document.createElement('h2'); 
        fullName.textContent = `${prophet.name} ${prophet.lastname}`; 

        // Build the date of birth content
        let birthDate = document.createElement('p'); 
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`; 

        // Build the place of birth content
        let birthPlace = document.createElement('p'); 
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`; 
        
        // Build the image portrait by setting all the relevant attributes
        let portrait = document.createElement('img'); 
        portrait.setAttribute('src', prophet.imageurl); 
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
        portrait.setAttribute('loading', 'lazy'); 
        portrait.setAttribute('width', '100%'); // Adjusted for full-width on mobile
        portrait.setAttribute('height', 'auto'); // Maintain aspect ratio
        
        // Append the section(card) with the created elements
        card.appendChild(fullName); 
        card.appendChild(birthDate); 
        card.appendChild(birthPlace);
        card.appendChild(portrait); 
        
        // Append the div.cards with the section(card)
        cards.appendChild(card); 
    }); // end of arrow function and forEach loop
}

getProphetData();