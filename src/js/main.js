'use strict';

// import './variables.js'
// import './list.js'
// import './favourites.js'
// import './search.js'
// import './reset.js'

//QUERY SELECTORS

const charactersResultUL = document.querySelector('.js__charactersResultUl');
const charactersFavouritesUl = document.querySelector('.js__charactersFavouritesUl');

//DATA

let charactersData = [];
let favouritesData = [];


//FUNCTIONS

function renderOne(charactersData) {
    charactersResultUL.innerHTML += `
        <li class="characters__item js__allCharactersLi selected" data_id=${charactersData.id}>
            <img src="${charactersData.imageUrl}" alt="Foto de ${charactersData.name}"></img>
            <h3>${charactersData.name}</h3>
        </li>
        `;
}

function renderAll() {
    for (const eachCharacter of charactersData) {
        renderOne(eachCharacter);
    }

    const allCharactersLi = document.querySelectorAll('.js__allCharactersLi');

    for(const eachLi of allCharactersLi) {
        eachLi.addEventListener('click', handleCharacterClick);
    }
}

function renderOneFavourite(favouritesData) {  
    charactersFavouritesUl.innerHTML += `
        <li class="characters__item">
            <img src="${favouritesData.imageUrl}" alt="Foto de ${favouritesData.name}"></img>
            <h3>${favouritesData.name}</h3>
        </li>
        `;
} 

function renderFavourites() {
    charactersFavouritesUl.innerHTML = '';

    for (const eachFavourite of favouritesData) {
        renderOne(eachFavourite);
    }
}

//FUNCTIONS/EVENTS (HANDLER)

function handleCharacterClick(event) {

    const clickedLi = event.currentTarget;
    clickedLi.classList.add('hidden');
    charactersFavouritesUl.classList.remove('hidden');

    const clickedCharacterId = clickedLi.dataset.id;

    const selectedCharacterData = charactersData.find(oneCharacter => oneCharacter.id === clickedCharacterId);

    const favouriteCharacterIndex = favouritesData.findIndex(oneCharacter => oneCharacter.id === clickedCharacterId);

    if(favouriteCharacterIndex === -1) {
        favouritesData.push(selectedCharacterData);
    } else {
        favouritesData.splice(favouriteCharacterIndex, 1);
    }

    renderFavourites();
    clickedLi.classList.add('selected');
}


//EVENTS       
// searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log('search form submitted');
// }); 

//CODE TO RUN ON PAGE LOAD

fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data => {

       charactersData = data.data;

       renderAll();
    });