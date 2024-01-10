# Buscador de Personajes Disney

Este proyecto forma parte de la evaluación final del Módulo 2 del Bootcamp de Programación Web de Adalab. La web está diseñada para buscar y mostrar personajes famosos de Disney utilizando tecnologías como JavaScript, HTML y CSS.

### **Funcionalidades destacadas**

- Búsqueda de Personajes: La aplicación permite buscar personajes Disney utilizando un formulario intuitivo.
- Lista de Favoritos: Las usuarias pueden marcar sus personajes favoritos y mantener una lista personalizada.

### **Tecnologías utilizadas**

- JavaScript: para manejar la lógica principal del buscador, eventos y manipulación del DOM.
- HTML & CSS: para la estructura y el diseño de la web.
- Sass: para la mejora de estilos con el preprocesador Sass.
- Flexbox: para la maquetación y disposición de elementos en la interfaz.
- Formularios: implementación de un formulario para la búsqueda de personajes.

## Link Github Pages 🌐

Para ver el proyecto, visita el siguiente enlace: [Buscador de Personajes Disney](https://beta.adalab.es/modulo-2-evaluacion-final-maialenmunoa/)

## Uso de Fetch para obtener datos de la API

El proyecto utiliza una API de Disney para obtener información sobre personajes. Implementa la funcionalidad de búsqueda, aprovechando el método `fetch` de JavaScript para realizar peticiones a la API. Esto se realiza en el evento de envío del formulario para obtener los datos en respuesta a la búsqueda realizada por la usuaria:

```javascript
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

        if(charactersData.length === 0) {
            errorMessage.classList.remove('hidden');
        } else {        
            errorMessage.classList.add('hidden');
        }
        
    charactersTitle.innerHTML = `Resultados para "${charactersInput.value}"`;
    });
}); 
```

## Uso de localStorage para el almacenamiento de datos:

El proyecto hace uso del localStorage para almacenar los personajes marcados como favoritos por la usuaria. Después de agregar o eliminar un personaje de la lista de favoritos, se actualiza el localStorage para reflejar los cambios y mantenerlos entre sesiones:
```javascript
// Ejemplo de manipulación del localStorage después de agregar o eliminar un personaje favorito
localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
```

## **Ejemplo de código**

A continuación, se muestra un ejemplo de la función principal **handleCharacterClick** del archivo JavaScript que permite añadir o eliminar personajes de la lista de favoritos:

```javascript
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
    
    updateAndRenderFavourites();

    clickedLi.classList.remove('hidden');
    charactersFavouritesUl.classList.remove('hidden');
    clickedLi.classList.toggle('selected');
}
```

## Guía de inicio rápido 🔍

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

> **NOTA:** Asegúrate de tener instalado [Node JS](https://nodejs.org/)

### Pasos para ejecutar el ejercicio ▶️

Ejecuta estos comandos en la terminal

1. **Clona el repositorio**:

```bash
 git clone https://beta.adalab.es/modulo-2-evaluacion-final-maialenmunoa/
```

2. Instala las **dependencias locales**:

```bash
npm install
```

3. **Arranca el proyecto**:

```bash
npm run dev
```

Este comando:
**Abre automáticamente una ventana en el navegador y muestra la página web**

## Autoría 👩‍💻

[Maialen Muñoa](https://github.com/maialenmunoa)
