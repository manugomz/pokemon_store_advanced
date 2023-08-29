const singlePokemonData = async (id) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${id}`;
    indivpokemon = await fetchApi(endpoint);
    return indivpokemon;
}

const pokemonDisplay = async () => {
    $modal.style.display = "flex";
    let idModal = new URLSearchParams(window.location.search).get('pokemon');
    let pokemon = await singlePokemonData(idModal);
    console.log(idModal);
    $templateModal = `
            <div class ="top-info">
            <p class="id"> #${pad(pokemon.id)} </p>
            <button class="close" onclick="closeModal"><i class="fa-solid fa-xmark" style="color:black;"></i></button>
            </div>
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
    $modalContainer.innerHTML = $templateModal;
}

//TODO Close modal

//!Change switch

/*
const getTypeColor = type => ({
  bug: '#adbd21',
  dark: '#765f51',
});

<p class ="type" style="background-color: ${getTypeColor(pokemon.types[0].type.name)}}"> ${pokemon.types[0].type.name} </p>*/

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
