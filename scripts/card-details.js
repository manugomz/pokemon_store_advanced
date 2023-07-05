const id = new URLSearchParams(window.location.search).get('pokemon');

const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;

const $loader = document.querySelector('.loader');
const $parentElement = document.querySelector('.details');
let $template = ``;

$parentElement.textContent=endpoint;

const singlePokemonData = async()=>{
    indivpokemon =await fetchApi(endpoint);
    return indivpokemon;
}

const pokemonDisplay = async()=>{
    let pokemon= await singlePokemonData();
    console.log(pokemon);
    
    /*TODO: Order information & hide loader */
    $template = `
            <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" >
                <div class ="types">
                    <p> ${pokemon.types[0].type.name} </p>
                    <p> ${pokemon.types[1]&&pokemon.types[1].type.name} </p>
                </div>
            <h1>${pokemon.name}</h1>
            <div class= "wh">
                <div class="height">
                    <p> ${pokemon.weight} kg  </p>
                    <p> Weight</p>
                </div>
                <div class="height">
                    <p> ${pokemon.height} m </p>
                    <p> Height </p>
                </div>
            </div>
            <ul>
                <li> ${pokemon.stats[0].stat.name}: ${pokemon.stats[0].base_stat}</li>
                <li> ${pokemon.stats[1].stat.name}: ${pokemon.stats[1].base_stat}</li>
                <li> ${pokemon.stats[2].stat.name}: ${pokemon.stats[2].base_stat}</li>
                <li> ${pokemon.stats[5].stat.name}: ${pokemon.stats[5].base_stat}</li>
                <li> Base experience: ${pokemon.base_experience} </li>
            </ul>
        `;
    $parentElement.innerHTML=$template;
}

pokemonDisplay();