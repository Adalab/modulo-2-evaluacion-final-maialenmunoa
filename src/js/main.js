'use strict';
// import './variables.js'
// import './list.js'
// import './favourites.js'
// import './search.js'
// import './reset.js'

//QUERY SELECTORS

const charactersResultUL = document.querySelector('.js__charactersResultUl');

//DATA

const charactersData = [
    {
        "_id": 112,
        "films": [
          "Hercules (film)"
        ],
        "shortFilms": [],
        "tvShows": [
          "Hercules (TV series)"
        ],
        "videoGames": [
          "Kingdom Hearts III"
        ],
        "parkAttractions": [],
        "allies": [],
        "enemies": [],
        "sourceUrl": "https://disney.fandom.com/wiki/Achilles_(Hercules)",
        "name": "Achilles",
        "imageUrl": "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
        "createdAt": "2021-04-12T01:31:30.547Z",
        "updatedAt": "2021-12-20T20:39:18.033Z",
        "url": "https://api.disneyapi.dev/characters/112",
        "__v": 0
      }
];




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

renderAll();
