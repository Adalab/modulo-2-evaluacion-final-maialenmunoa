const o=document.querySelector(".js__charactersResultUl"),i=document.querySelector(".js__charactersFavouritesUl"),g=document.querySelector(".js__searchForm"),d=document.querySelector(".js__charactersInput"),m=document.querySelector(".js__errorMessage"),L=document.querySelector(".js__charactersTitle"),h=document.querySelector(".js__resetBtn");let r=[],a=[];const f=localStorage.getItem("favouritesData");f&&(a=JSON.parse(f));function p(e){const t=a.findIndex(c=>c._id===e._id),s=e.imageUrl||"https://via.placeholder.com/210x295/ff9e06/ff46e1/?text=Disney";t===-1?o.innerHTML+=`
        <li class="characters__item js__allCharactersLi" data-_id=${e._id}>
            <img class="characters__image" src="${s}" alt="Foto de ${e.name}"></img>
            <h3 class="characters__name">${e.name}</h3>
        </li>
        `:o.innerHTML+=`
        <li class="characters__item selected js__allCharactersLi" data-_id=${e._id}>
            <img class="characters__image" src="${s}" alt="Foto de ${e.name}"></img>
            <h3 class="characters__name">${e.name}</h3>
        </li>
        `}function _(){o.innerHTML="";for(const t of r)p(t);const e=document.querySelectorAll(".js__allCharactersLi");for(const t of e)t.addEventListener("click",S)}function C(e){i.innerHTML+=`
        <li class="characters__favourites-item selected">
            <img class="characters__favourites-image" src="${e.imageUrl}" alt="Foto de ${e.name}"></img>
            <div class="characters__close-icon js__deleteCharacterBtn" data-_id=${e._id}>X</div>
            <h3 class="characters__favourites-name">${e.name}</h3>
        </li>
    `}function v(){if(i.innerHTML="",a.length===0)h.classList.add("hidden"),i.innerHTML+=`
        <li class="characters__favourites-message selected">
            <p class="characters__favourites-message-text">Aún no has seleccionado ningún personaje favorito :(</p>
        </li>
        `;else{for(const t of a)C(t);h.classList.remove("hidden"),document.querySelectorAll(".js__deleteCharacterBtn").forEach(t=>{t.addEventListener("click",y)})}}function u(){v(),_()}function S(e){const t=e.currentTarget,s=parseInt(t.dataset._id),c=r.find(l=>l._id===s),n=a.findIndex(l=>l._id===s);n===-1?a.push(c):a.splice(n,1),localStorage.setItem("favouritesData",JSON.stringify(a)),u(),t.classList.remove("hidden"),i.classList.remove("hidden"),t.classList.toggle("selected")}function y(e){const t=e.currentTarget,s=parseInt(t.dataset._id),c=a.findIndex(n=>n._id===s);a.splice(c,1),localStorage.setItem("favouritesData",JSON.stringify(a)),u()}function I(){a=[],localStorage.setItem("favouritesData",JSON.stringify(a)),v();const e=document.querySelectorAll(".js__allCharactersLi");for(const t of e)t.classList.remove("selected")}h.addEventListener("click",I);g.addEventListener("submit",e=>{e.preventDefault(),fetch(`//api.disneyapi.dev/character?name=${d.value}`).then(t=>t.json()).then(t=>{Array.isArray(t.data)?r=t.data:(r=[],r.push(t.data)),_(),r.length===0?m.classList.remove("hidden"):m.classList.add("hidden"),L.innerHTML=`Resultados para "${d.value}"`})});u();fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{r=e.data,_()});d.value="";
//# sourceMappingURL=main.js.map
