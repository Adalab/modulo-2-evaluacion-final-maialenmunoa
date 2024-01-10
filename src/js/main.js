'use strict';

//QUERY SELECTORS

const charactersResultUL = document.querySelector('.js__charactersResultUl');
const charactersFavouritesUl = document.querySelector('.js__charactersFavouritesUl');

const searchForm = document.querySelector('.js__searchForm');
const charactersInput = document.querySelector('.js__charactersInput');

const errorMessage = document.querySelector('.js__errorMessage');
const charactersTitle = document.querySelector('.js__charactersTitle');

const resetBtn = document.querySelector('.js__resetBtn');


//DATA

// Declara una variable charactersData como un array vacío.
let charactersData = [];
// Declara una variable favouritesData como un array vacío.
let favouritesData = [];

// Obtiene los datos de la lista de favoritos desde el localStorage.
const favouritesDataInLS = localStorage.getItem('favouritesData');
// Comprueba si hay datos de favoritos almacenados en el localStorage.
if (favouritesDataInLS) {
    // Si existen datos en el localStorage, los convierte de JSON a un objeto JavaScript y los asigna a favouritesData.
    favouritesData = JSON.parse(favouritesDataInLS);
}


//FUNCTIONS

/**
 * Pinta un personaje en la lista de resultados.
 * @param {Object} characterData - datos del personaje a representar.
 */

function renderOne(characterData) {
    // Encuentra el índice del personaje en la lista de favoritos (si existe).
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === characterData._id );
   
    // Define la URL de la imagen, utiliza una imagen de marcador de posición si no se proporciona la URL.
    const imageUrl = characterData.imageUrl || "https://via.placeholder.com/210x295/ff9e06/ff46e1/?text=Disney";

    // Comprueba si el personaje ya está en la lista de favoritos y actualiza la lista de resultados en consecuencia.
    if(favouriteCharacterIndex === -1) {
        // Agrega un nuevo elemento a la lista de resultados para el personaje no favorito.
        charactersResultUL.innerHTML += `
        <li class="characters__item js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${imageUrl}" alt="Foto de ${characterData.name}"></img>
            <h3 class="characters__name">${characterData.name}</h3>
        </li>
        `;
    } else {
        // Agrega un nuevo elemento a la lista de resultados para el personaje favorito.
        charactersResultUL.innerHTML += `
        <li class="characters__item selected js__allCharactersLi" data-_id=${characterData._id}>
            <img class="characters__image" src="${imageUrl}" alt="Foto de ${characterData.name}"></img>
            <h3 class="characters__name">${characterData.name}</h3>
        </li>
        `;
    }
}

/**
 * Pinta todos los personajes en la lista de resultados.
 */

function renderAll() {
    // Limpia el contenido actual de la lista de resultados.
    charactersResultUL.innerHTML = '';

    // Recorre todos los personajes y utiliza la función renderOne para mostrar cada uno.
    for (const eachCharacter of charactersData) {
        renderOne(eachCharacter);
    }

    // Obtiene todos los elementos de la lista de personajes y agrega un evento de clic a cada uno.
    const allCharactersLi = document.querySelectorAll('.js__allCharactersLi');
    for(const eachLi of allCharactersLi) {
        eachLi.addEventListener('click', handleCharacterClick);
    }
}

/**
 * Pinta un personaje favorito en la lista de favoritos.
 * @param {Object} favouriteData - datos del personaje favorito a representar.
 */

function renderOneFavourite(favouriteData) { 
    // Agrega un nuevo elemento a la lista de favoritos con la información proporcionada. 
    charactersFavouritesUl.innerHTML += `
        <li class="characters__favourites-item selected">
            <img class="characters__favourites-image" src="${favouriteData.imageUrl}" alt="Foto de ${favouriteData.name}"></img>
            <div class="characters__close-icon js__deleteCharacterBtn" data-_id=${favouriteData._id}>X</div>
            <h3 class="characters__favourites-name">${favouriteData.name}</h3>
        </li>
        `;
} 

/**
 * Pinta todos los personajes favoritos en la lista de favoritos o muestra un mensaje si no hay favoritos.
*/ 

function renderFavourites() {
    // Borra el contenido actual de la lista de favoritos.
    charactersFavouritesUl.innerHTML = '';

    // Verifica si no hay favoritos.
    if(favouritesData.length === 0) {
        // Oculta el botón de reinicio y muestra un mensaje indicando que no hay favoritos.
        resetBtn.classList.add('hidden');

        charactersFavouritesUl.innerHTML += `
        <li class="characters__favourites-message selected">
            <p class="characters__favourites-message-text">Aún no has seleccionado ningún personaje favorito :(</p>
        </li>
        `;
    // Si hay favoritos...
    } else { 
        // Recorre todos los personajes favoritos y utiliza la función renderOneFavourite para mostrar cada uno.
        for (const eachFavourite of favouritesData) {
            renderOneFavourite(eachFavourite);    
        }

        // Muestra el botón de reinicio y agrega eventos de clic a los botones de eliminación.
        resetBtn.classList.remove('hidden');

        const deleteCharacterBtn = document.querySelectorAll('.js__deleteCharacterBtn');
        deleteCharacterBtn.forEach(btn => {
            btn.addEventListener('click', handleDeleteCharacterClick);
        });    
    }
}
/**
 * Actualiza y pinta la lista de favoritos.
*/ 
function updateAndRenderFavourites() {
    renderFavourites();
    // Vuelve a pintar todos los personajes para reflejar cambios en la lista principal.
    renderAll();
}

//FUNCTIONS/EVENTS (HANDLER)

/**
 * Ejecuta el evento de clic en un personaje, añadiéndolo o eliminándolo de la lista de favoritos.
 * Guarda los cambios en el localStorage.
 * @param {Event} event - el evento clic.
 */

function handleCharacterClick(event) {
    // Obtiene el elemento clickeado y su ID.
    const clickedLi = event.currentTarget;
    const clickedCharacterId = parseInt(clickedLi.dataset._id);

    // Encuentra los datos del personaje clickeado.
    const selectedCharacterData = charactersData.find( (oneCharacter) => oneCharacter._id === clickedCharacterId );
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === clickedCharacterId );  

    // Realiza la lógica de añadir o eliminar el personaje de la lista de favoritos.
    if(favouriteCharacterIndex === -1) {
        favouritesData.push(selectedCharacterData);
    } else {
        favouritesData.splice(favouriteCharacterIndex, 1);
    }

    // Guarda los cambios en el localStorage.
    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    
    // Pinta la lista de favoritos actualizada.
    updateAndRenderFavourites();

    // Modifica las clases para mostrar u ocultar elementos según sea necesario.
    clickedLi.classList.remove('hidden');
    charactersFavouritesUl.classList.remove('hidden');
    clickedLi.classList.toggle('selected');
}

/**
 * Ejecuta el evento de clic para eliminar un personaje de la lista de favoritos.
 * @param {Event} event - el evento clic.
 */

function handleDeleteCharacterClick(event) {
    // Obtiene el elemento clickeado y su ID.
    const clickedLi = event.currentTarget;
    const clickedCharacterId = parseInt(clickedLi.dataset._id);

    // Encuentra el índice del personaje favorito a eliminar.
    const favouriteCharacterIndex = favouritesData.findIndex( (oneCharacter) => oneCharacter._id === clickedCharacterId );  

    // Elimina el personaje de la lista de favoritos.
    favouritesData.splice(favouriteCharacterIndex, 1);

    // Actualiza los datos de la lista de favoritos en el localStorage.
    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    
    // Actualiza y pinta la lista de favoritos una vez que se han realizado los cambios.
    updateAndRenderFavourites();
}

/**
 * Resetea la lista de favoritos.
 */
function handleResetClick() {
    // Vacía la lista de favoritos y actualiza el localStorage.
    favouritesData = [];
    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    
    // Vuelve a pintar la lista de favoritos para reflejar los cambios.
    renderFavourites();

    // Quita el estilo 'selected' de los elementos de la lista de personajes.
    const allCharactersLi = document.querySelectorAll('.js__allCharactersLi');
    for(const eachLi of allCharactersLi) {
        eachLi.classList.remove('selected');
    }
}

// Asigna un evento de clic al botón identificado como resetBtn, para ejecutar la función handleResetClick cuando se haga clic en él.
resetBtn.addEventListener('click', handleResetClick);

//EVENTS   

// Asigna un evento de envío ('submit') al formulario identificado como searchForm.
searchForm.addEventListener('submit', (event)=> {
    // Evita que el formulario se envíe de manera convencional (recargando la página).
    event.preventDefault();

    // Realiza una solicitud a una API utilizando fetch, pasando el valor del campo de búsqueda charactersInput.value.
    fetch(`//api.disneyapi.dev/character?name=${charactersInput.value}`)
    .then(response => response.json())
    .then(data => {
        // Verifica si los datos obtenidos son un array o un objeto.
        if (Array.isArray(data.data)) {
            charactersData = data.data;
        }
        else {
            charactersData = [];
            charactersData.push(data.data);
        }
         
        // Pinta todos los resultados obtenidos.
        renderAll();

        //Si el personaje no está en la base de datos, muestra mensaje de error.
        if(charactersData.length === 0) {
            errorMessage.classList.remove('hidden');
        } else {        
            errorMessage.classList.add('hidden');
        }
        
    // Actualiza el título con el valor de búsqueda introducido.
    charactersTitle.innerHTML = `Resultados para "${charactersInput.value}"`;
    });
}); 

//CODE TO RUN ON PAGE LOAD

// Pinta la lista de favoritos
renderFavourites();

// Realiza una solicitud a una API para obtener datos de personajes con un límite de 50 personajes por página.
fetch('//api.disneyapi.dev/character?pageSize=50')
    .then(response => response.json())
    .then(data => {
       // Asigna los datos de personajes obtenidos a charactersData
       charactersData = data.data;
       
       // Renderiza todos los personajes obtenidos en la respuesta de la API.
       renderAll(charactersData);
    }); 

// Establece el valor del campo de búsqueda charactersInput a una cadena vacía.
charactersInput.value = '';
