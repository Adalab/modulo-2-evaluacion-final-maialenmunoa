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

const deleteCharacterBtn = document.querySelector('.js__deleteCharacterBtn');
const resetBtn = document.querySelector('.js__resetBtn');



//DATA

let charactersData = [];
let favouritesData = [];

const favouritesDataInLS = localStorage.getItem('favouritesData');

if (favouritesDataInLS) {
    favouritesData = JSON.parse(favouritesDataInLS);
}

//FUNCTIONS


/**
 * Renderiza un solo personaje en la lista.
 * @param {Object} characterData - Datos del personaje a renderizar.
 */

function renderOne(characterData) {
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === characterData._id );
    const imageUrl = characterData.imageUrl || "https://via.placeholder.com/210x295/ff9e06/ff46e1/?text=Disney";

    if(favouriteCharacterIndex === -1) {
        charactersResultUL.innerHTML += `
        <li class="characters__item js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${imageUrl}" alt="Foto de ${characterData.name}"></img>
            <h3 class="characters__name">${characterData.name}</h3>
        </li>
        `;
    } else {
        charactersResultUL.innerHTML += `
        <li class="characters__item selected js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${imageUrl}" alt="Foto de ${characterData.name}"></img>
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
        <li class="characters__favourites-item selected">
            <img class="characters__favourites-image" src="${favouriteData.imageUrl}" alt="Foto de ${favouriteData.name}"></img>
            <div class="characters__close-icon js__deleteCharacterBtn">X</div>
            <h3 class="characters__favourites-name">${favouriteData.name}</h3>
        </li>
        `;
} 

function renderFavourites() {
    charactersFavouritesUl.innerHTML = '';

    for (const eachFavourite of favouritesData) {
        renderOneFavourite(eachFavourite);    
    }
    // Habilitar o deshabilitar el botón de reset
    if(favouritesData.length === 0) {
        resetBtn.classList.add('hidden');
    } else {
        resetBtn.classList.remove('hidden');
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

// //función para borrar personajes de la lista de favoritos
// function handleDeleteCharacterClick(event) {
//     const clickedLi = event.currentTarget;
//     const clickedCharacterId = parseInt(clickedLi.dataset._id);

//     const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === clickedCharacterId );  

//     favouritesData.splice(favouriteCharacterIndex, 1);

//     localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    
//     renderFavourites(); 
// }

// deleteCharacterBtn.addEventListener('click', handleDeleteCharacterClick);

//Resetear lista de favoritos
function handleResetClick() {
    favouritesData = [];
    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    renderFavourites();

    //se quita el estilo de selected de los li de la lista de personajes
    const allCharactersLi = document.querySelectorAll('.js__allCharactersLi');
    for(const eachLi of allCharactersLi) {
        eachLi.classList.remove('selected');
    }
}

resetBtn.addEventListener('click', handleResetClick);

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

renderFavourites();

fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data => {

       charactersData = data.data;

       renderAll(charactersData);
    }); 
 
charactersInput.value = '';
