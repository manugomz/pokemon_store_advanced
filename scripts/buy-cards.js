/*--------------Dom handle-----------------*/
const $parentElement = document.getElementById('cards-display');
const moreCardsButton = document.querySelector('.more-button');
const numberCards = document.querySelector('.number');
const pokemonTypeFilters = document.querySelectorAll('.filter-option');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const heart = document.querySelectorAll('.heart');

const $skeletonContainer = document.getElementById('cards-skeleton');
const modal = document.getElementById('modal');


/*-----------Global variables--------------*/
let offset;
let offsetType;
let number;
let pokemonTypes = ['all', 'normal', 'fighting', 'flying', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
let type = 'all';
let index = 0;
let max = 20;
let $template = "";
let $templateModal = "";
let $templateSkeleton = "";
let likedPokemon = [];
sessionStorage.likedPokemon = JSON.stringify();

const url = "https://pokeapi.co/api/v2/pokemon/";

/*--------------------------------- Initializations -------------------------------------*/
addSkeleton();
initGlobal();
function initGlobal() {
    offset = 0;
    number = 20;
    $template = '';
    $parentElement.innerHTML = $template;
    showSkeleton();
    numberCards.textContent = `${number} cards`;
    return (offset, number)
}


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
                <a class='buy-link' href="./buy-cards.html?pokemon=${pokemon[i].id}"> <button class= "buy-button">Buy</button></a>
            </div>
        </div>
        `;
        $parentElement.innerHTML = $template;
        likedCards();
    }
    const buyButtons = document.querySelectorAll('.buy-button');
    return (buyButtons)
}

cardDisplay();


/*--------------------------more cards------------------------------------- */

moreCardsButton.addEventListener('click', (event) => {
    offset += 20;
    number += 20;
    showSkeleton();
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

//-------------------------Buy cards modal----------------------------------------

//TODO show when click buy button
//TODO! remove the initial bug (no card selected)

window.addEventListener('locationchange', function () {
    console.log('location changed!');
});

function clickBuyButton() {
    modal.style.display = 'flex';
}
//From the other link
const id = new URLSearchParams(window.location.search).get('pokemon');
const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;

//$parentElement.textContent = endpoint;

const singlePokemonData = async () => {
    indivpokemon = await fetchApi(endpoint);
    return indivpokemon;
}

const pokemonDisplay = async () => {
    let pokemon = await singlePokemonData();
    $templateModal = `
        <p class="id"> #${pad(pokemon.id)} </p>
            <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" >
                <div class ="types">
                    <p class ="type" ${typeColor(pokemon.types[0].type.name)}'> ${pokemon.types[0].type.name} </p>
                    <p class ="type" ${typeColor(pokemon.types[1] && pokemon.types[1].type.name)}'> ${pokemon.types[1] && pokemon.types[1].type.name} </p>
                </div>
            <h1>${pokemon.name}</h1>
            <div class= "wh">
                <div class="height">
                    <p class="stat-number"> ${pokemon.weight} </p>
                    <p > Weight</p>
                </div>
                <div class="height">
                    <p class="stat-number"> ${pokemon.height} </p>
                    <p> Height </p>
                </div>
            </div>
            <div class= "stats">
                <p>HP</p>
                <div class='bar'>
                    <div class="data hp" style="width:${(pokemon.stats[0].base_stat / 255) * 100}%;"> 
                    <p class='data-number'>${pokemon.stats[0].base_stat}/255</p>
                    </div>
                </div>
                <p>ATK</p>
                <div class='bar'>
                    <div class="data atk" style="width:${(pokemon.stats[1].base_stat / 182) * 100}%;"> 
                    <p class='data-number'>${pokemon.stats[1].base_stat}/182</p>
                    </div>
                </div>
                <p>DEF</p>
                <div class='bar'>
                    <div class="data def" style="width:${(pokemon.stats[2].base_stat / 230) * 100}%;"> 
                    <p class='data-number'>${pokemon.stats[2].base_stat}/230</p>
                    </div>
                </div>
                <p>SPD</p>
                <div class='bar'>
                    <div class="data spd" style="width:${(pokemon.stats[5].base_stat / 200) * 100}%;"> 
                    <p class='data-number'>${pokemon.stats[5].base_stat}/200</p>
                    </div>
                </div>
                <p>EXP</p>
                <div class='bar'>
                    <div class="data exp" style="width:${(pokemon.base_experience / 635) * 100}%;"> 
                    <p class='data-number'>${pokemon.base_experience}/635</p>
                    </div>
                </div>
            </div>
        `;
    modal.innerHTML = $template;
}

pokemonDisplay();

const typeColor = (type) => {
    switch (type) {
        case 'bug':
            color = `style='background-color:#adbd21`;
            break;
        case 'dark':
            color = `style='background-color:#765f51`;
            break;
        case 'dragon':
            color = `style='background-color:#7761da`;
            break;
        case 'electric':
            color = `style='background-color:#ffc631`;
            break;
        case 'fairy':
            color = `style='background-color:#f7b5f7`;
            break;
        case 'fighting':
            color = `style='background-color:#a55239`;
            break;
        case 'fire':
            color = `style='background-color:#f75231`;
            break;
        case 'flying':
            color = `style='background-color:#9cadf7`;
            break;
        case 'ghost':
            color = `style='background-color:#6363b5`;
            break;
        case 'grass':
            color = `style='background-color:#7bce52`;
            break;
        case 'ground':
            color = `style='background-color:#d6b55a`;
            break;
        case 'ice':
            color = `style='background-color:#5acee7`;
            break;
        case 'normal':
            color = `style='background-color:#ada594`;
            break;
        case 'poison':
            color = `style='background-color:#b55aa5`;
            break;
        case 'psychic':
            color = `style='background-color:#ff73a5`;
            break;
        case 'rock':
            color = `style='background-color:#bda55a`;
            break;
        case 'steel':
            color = `style='background-color:#adadc6`;
            break;
        case 'water':
            color = `style='background-color:#399cff`;
            break;
        case undefined:
            color = `style= 'display:none'`;
            break;
    }
    return color;
}

function pad(n) {
    var len = 3 - ('' + n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n
}

//TODO!-----scroll to load cards-------