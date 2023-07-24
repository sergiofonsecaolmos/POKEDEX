let globalPokemon = [];
const mainContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('#search-input');

const cleanView = () => {
    mainContainer.innerHTML = '';
}

searchInput.addEventListener('keyup', () => {
    const inputText = searchInput.value;
    // //const globalPokemon2 = [...globalPokemon]; spread oprator 
    // const globalPokemon2 = globalPokemon.splice(0, globalPokemon.length);
    // console.log(inputText);
    // searchByName(inputText);
    let globalPokemon2 = searchByName(inputText);
    cleanView();
    renderPokemons(globalPokemon2);
    console.log(globalPokemon2);
});

function searchByName(searchingParameter) {
    const filteredPokemon = globalPokemon.filter((pokemon) => {
        if (pokemon.name.includes(searchingParameter)) {
            return pokemon;
        }
    });
    return filteredPokemon;
}
async function getPokemons() {
    try {
        //consultar la API
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1281');
        //consumir la API en un formato que pueda procesar (JSON)
        const responseJson = await response.json();
        //No me sirve todo lo que tiene la API, solo
        //quiero los results
        const pokemons = responseJson.results;
        console.log(pokemons);

        for (let i = 0; i < pokemons.length; i++) {
            //me voy a crear una variable temporal para cada una de los pokemos
            const pokemon = pokemons[i];
            //necesito capturar la url
            const pokemonUrl = pokemon.url;
            //consultar la API
            const response = await fetch(pokemonUrl);
            //consultar la API en un formato que pueda procesar (Json)
            const responseJson = await response.json();
            normalizePokemons(pokemon.name, responseJson);
        }
    }
    catch (error) {
        console.log(error);
    }
}

const normalizePokemons = (name, responseJson) => {
    //es el path que tengo que seguir para encontrar la URL de la imagen de cada pokemon
    const img = responseJson.sprites.other['official-artwork'].front_default;
    const pokemon = {
        name: name,
        img: img,
    };
    console.log(pokemon);
    //agrego cada uno de los pokemos a mi arreglo
    globalPokemon.push(pokemon);
}

const renderPokemonCard = (element) => {
    const cardPokemonDiv = document.createElement('div');
    cardPokemonDiv.classList = 'card';
    cardPokemonDiv.innerHTML = `
                    <h2>${element.name}</h2>
                    <img src='${element.img}' />
                    `;
    mainContainer.appendChild(cardPokemonDiv);                
}

const renderPokemons = (array) => {
    for (let i = 0; i < array.length; i++){
        renderPokemonCard(array[i]);
    }
}

// async function main() {
//     await getPokemons();
//     renderPokemons();
// }

// main()

(async () => { 
    await getPokemons();
    renderPokemons(globalPokemon);
})();

