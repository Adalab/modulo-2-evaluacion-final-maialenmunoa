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




//FUNCTIONS

function renderOne(charactersData) {
    charactersResultUL.innerHTML += `
        <li class="characters__item js__allCharactersLi" data_id=${charactersData.id}>
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

//FUNCTIONS/EVENTS (HANDLER)

function handleCharacterClick(event) {

    const clickedLi = event.currentTarget;
    clickedLi.classList.add('selected');
    clickedLi.classList.add('hidden');
    clickedLi.classList.add('selected');
    charactersFavouritesUl.classList.remove('hidden');

    clickedLi.dataset.id;

    const selectedCharacterObj = charactersData.find(oneCharacter => oneCharacter.id === clickedLi.dataset.id);

    charactersFavouritesUl.innerHTML +=`
        <li class="characters__item js__allCharactersLi">
        <img src="${selectedCharacterObj.imageUrl}" alt="Foto de ${selectedCharacterObj.name}"></img>
        <h3>${selectedCharacterObj.name}</h3>
    </li>
    `;
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