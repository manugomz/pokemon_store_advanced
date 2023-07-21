/*--------------Dom handle-----------------*/
const $parentElement = document.getElementById('cards-display');
const moreCardsButton = document.querySelector('.more-button');
const numberCards = document.querySelector('.number');
const pokemonTypeFilters = document.querySelectorAll('.filter-option');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const heart = document.querySelectorAll('.heart');


/*-----------Global variables--------------*/
let offset;
let offsetType;
let number;
let pokemonTypes = ['all', 'normal', 'fighting', 'flying', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
let type = 'all';
let index = 0;
let max = 20;
let $template = "";
let $templateSkeleton = "";
let likedPokemon = [];
sessionStorage.likedPokemon = JSON.stringify();

const url = "https://pokeapi.co/api/v2/pokemon/";

/*--------------------------------- Initializations -------------------------------------*/

const initGlobal = () => {
    offset = 0;
    number = 20;
    $template = '';
    addSkeleton();
    numberCards.textContent = `${number} cards`;
    return (offset, number)
}
initGlobal();

/*---------------------------move filters------------------------------------*/

const moveFilter = (arrow) => {
    pokemonTypeFilters.forEach(x => x.classList.remove('picked-option'));
    if (arrow === 'left') {
        if (index >= 4) {
            index = index - 4;
            arrowLeft.classList.remove('unactive');
        } else if (index === 2) {
            index = index - 2;
            arrowLeft.classList.remove('unactive');
        }

        if (index === 0) {
            arrowLeft.classList.add('unactive');
            arrowRight.classList.remove('unactive');
        }
    } else if (arrow === 'right') {
        if (index < 12) {
            index = index + 4;
            arrowRight.classList.remove('unactive');
        } else if (index === 12) {
            index = index + 2;
            arrowRight.classList.remove('unactive');
        }
        if (index === 14) {
            arrowRight.classList.add('unactive');
            arrowLeft.classList.remove('unactive');
        }
    };
    for (i = 0; i < pokemonTypeFilters.length; i++) {
        pokemonTypeFilters[i].textContent = pokemonTypes[i + index];
    }
}

arrowLeft.addEventListener('click', () => moveFilter('left'));
arrowRight.addEventListener('click', () => moveFilter('right'));


/*----------------------------filter pokemon---------------------------------------*/

const filterPokemon = (position) => {
    type = pokemonTypeFilters[position].textContent;
    pokemonTypeFilters.forEach(x => x.classList.remove('picked-option'));
    pokemonTypeFilters[position].classList.toggle('picked-option');
    initGlobal();
    cardDisplay();
}

let filteredPokemon = async (type) => {
    urltype = `https://pokeapi.co/api/v2/type/${type}/`;
    const pokemonAPI = await fetchApi(urltype);
    const pokeList = [];
    let limitedPokelist;
    await pokemonAPI.pokemon.map(x => {
        pokeList.push(x.pokemon);
    });
    if (offset < pokeList.length - 20) {
        limitedPokelist = pokeList.slice(offset, offset + 20);
    } else {
        limitedPokelist = pokeList.slice(offset, pokeList.length - 1);
    }
    return limitedPokelist;
}

pokemonTypeFilters[0].addEventListener('click', () => filterPokemon(0));
pokemonTypeFilters[1].addEventListener('click', () => filterPokemon(1));
pokemonTypeFilters[2].addEventListener('click', () => filterPokemon(2));
pokemonTypeFilters[3].addEventListener('click', () => filterPokemon(3));

/*--------------------------------------Cards display------------------------------------------------- */

const pokemonList = async (offset, type) => {
    let urltype = ``;
    $templateSkeleton = '';
    addSkeleton();
    if (type === 'all') {
        urltype = `${url}?offset=${offset}`;
        const pokemonAPI = await fetchApi(urltype);
        return pokemonAPI.results;
    } else {

        return filteredPokemon(type);
    }
}

const eachPokeURL = async (List) => {
    let pokemonURL = [];
    List.map(x => {
        pokemonURL.push(x.url);
    });
    return pokemonURL
}

const pokemonData = async () => {
    const list = await pokemonList(offset, type);
    let listURL = await eachPokeURL(list);
    let pokemonInfo = [];
    for (i = 0; i < listURL.length; i++) {
        let indivpokemon = await fetchApi(listURL[i]);
        pokemonInfo.push(indivpokemon);
    }
    return pokemonInfo;
}

const cardDisplay = async () => {
    let pokemon = await pokemonData();
    hideSkeleton();
    for (i = 0; i < 20; i++) {
        $template += `
        <div class="card">
            <div class="card-text">
                <h6>${pokemon[i].name}</h6>
                <i class="fa-regular fa-heart" id=${pokemon[i].id} style="color: #000000;"></i>
            </div>
            <img class="pokemon-img" src="${pokemon[i].sprites.other['official-artwork'].front_default}" alt="${pokemon[i].name}" >
            <div class="card-text text-bottom">
                <p><b>EXP: ${pokemon[i].base_experience}</b></p>
                <a class='buy-link' href="./card-details.html?pokemon=${pokemon[i].id}"> <button class= "buy-button">Buy</button></a>
            </div>
        </div>
        `;
        $parentElement.innerHTML = $template;
        likedCards();
    }
}

cardDisplay();


/*--------------------------more cards------------------------------------- */

moreCardsButton.addEventListener('click', (event) => {
    offset += 20;
    number += 20;
    cardDisplay();
    numberCards.textContent = `${number} cards`;
    event.preventDefault();
})

/*------------heart--------------- */

function likedCards() {
    let heartIcons = document.querySelectorAll(".fa-heart");

    heartIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            if (icon.classList[0] === 'fa-regular') {
                icon.classList.replace('fa-regular', 'fa-solid');
                likedPokemon.push(icon.id);
                sessionStorage.likedPokemon = JSON.stringify(likedPokemon);
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
                likedPokemon.splice(likedPokemon.indexOf(icon.id), 1);
                sessionStorage.likedPokemon = JSON.stringify(likedPokemon);
            }
        })

    }
    )
}





