'use strict';

// import './variables.js'
// import './list.js'
// import './favourites.js'
// import './search.js'
// import './reset.js'

//QUERY SELECTORS

const charactersResultUL = document.querySelector('.js__charactersResultUl');
const charactersFavouritesUl = document.querySelector('.js__charactersFavouritesUl');

const searchForm = document.querySelector('.js__searchForm');
const charactersInput = document.querySelector('.js__charactersInput');

const errorMessage = document.querySelector('.js__errorMessage');
const charactersTitle = document.querySelector('.js__charactersTitle');


//DATA

let charactersData = [];
let favouritesData = [];

const favouritesDataInLS = localStorage.getItem('favouritesData');
// let favouritesDataInLSParsed = JSON.parse(favouritesDataInLS);

if (favouritesDataInLS) {
    favouritesData = JSON.parse(favouritesDataInLS);
}

//FUNCTIONS

function renderOne(characterData) {
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === characterData._id );

    if(favouriteCharacterIndex === -1) {
        charactersResultUL.innerHTML += `
        <li class="characters__item js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${characterData.imageUrl}" alt="Foto de ${characterData.name}"></img>
            <h3 class="characters__name">${characterData.name}</h3>
        </li>
        `;
    } else {
        charactersResultUL.innerHTML += `
        <li class="characters__item selected js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${characterData.imageUrl}" alt="Foto de ${characterData.name}"></img>
            <h3 class="characters__name">${characterData.name}</h3>
        </li>
        `;
    }
}

function renderAll() {
    charactersResultUL.innerHTML = '';

    for (const eachCharacter of charactersData) {
        renderOne(eachCharacter);
    }

    const allCharactersLi = document.querySelectorAll('.js__allCharactersLi');


    for(const eachLi of allCharactersLi) {
        eachLi.addEventListener('click', handleCharacterClick);
    }
}

function renderOneFavourite(favouriteData) {  
    charactersFavouritesUl.innerHTML += `
        <li class="characters__item">
            <img src="${favouriteData.imageUrl}" alt="Foto de ${favouriteData.name}"></img>
            <h3>${favouriteData.name}</h3>
        </li>
        `;
} 

function renderFavourites() {
    charactersFavouritesUl.innerHTML = '';

    for (const eachFavourite of favouritesData) {
        renderOneFavourite(eachFavourite);    
    }
}

//FUNCTIONS/EVENTS (HANDLER)

function handleCharacterClick(event) {

    const clickedLi = event.currentTarget;
    const clickedCharacterId = parseInt(clickedLi.dataset._id);

    const selectedCharacterData = charactersData.find( (oneCharacter) => oneCharacter._id === clickedCharacterId );
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === clickedCharacterId );  

    if(favouriteCharacterIndex === -1) {
        favouritesData.push(selectedCharacterData);
    } else {
        favouritesData.splice(favouriteCharacterIndex, 1);
    }

    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    
    renderFavourites(); 

    clickedLi.classList.remove('hidden');
    charactersFavouritesUl.classList.remove('hidden');
    clickedLi.classList.toggle('selected');
}

//EVENTS   
searchForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    fetch(`//api.disneyapi.dev/character?name=${charactersInput.value}`)
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data.data)) {
            charactersData = data.data;
        }
        else {
            charactersData = [];
            charactersData.push(data.data);
        }
         
        renderAll();

        //si el personaje no está en la base de datos, mostrar mensaje de error
        if(charactersData.length === 0) {
            errorMessage.classList.remove('hidden');
        } else {        
            errorMessage.classList.add('hidden');
        }

    charactersTitle.innerHTML = `Resultados para "${charactersInput.value}"`;
    });
}); 

//CODE TO RUN ON PAGE LOAD

// Renderiza los favoritos al inicio
renderFavourites();

fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data => {

       charactersData = data.data;

       renderAll(charactersData);
    }); 
 
charactersInput.value = '';
// Renderiza los favoritos al inicio
renderFavourites();