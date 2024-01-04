'use strict';
// import './variables.js'
// import './list.js'
// import './favourites.js'
// import './search.js'
// import './reset.js'

//QUERY SELECTORS

const charactersResultUL = document.querySelector('.js__charactersResultUl');

//DATA

let charactersData = [];




//FUNCTIONS

function renderOne(charactersData) {
    charactersResultUL.innerHTML += `
        <li class="characters__item">
            <img src="${charactersData.imageUrl}" alt="Foto de ${charactersData.name}"></img>
            <h3>${charactersData.name}</h3>
        </li>
        `;
}

function renderAll() {
    for (const eachCharacter of charactersData) {
        renderOne(eachCharacter);
    }
}

//FUNCTIONS/EVENTS (HANDLER)


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