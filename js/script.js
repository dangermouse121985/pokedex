let pokemonRepository = function (){
    let pokemonList = [];
    pokemonList = [
        {
            name: 'Bulbasaur',
            type: ['Grass', 'Poison'],
            species: 'Seed',
            height: 0.7,
            largestPokemon: false
        },
        {
            name: 'Charmander',
            type: ['Fire'],
            species: 'Lizard',
            height: 0.6,
            largestPokemon: false
        },
        {
            name: 'Squirtle',
            type: ['Water'],
            species: 'Young Turtle',
            height: 0.5,
            largestPokemon: false
        }
    ]

    //Return an array of all Pokemon
    function getAll(){
        return pokemonList;
    }

    //Verify New Pokemon Object contains the correct keys
    function checkCorrectKeys(pokemon) {
        let isCorrect = false;
        for (i=0; i < Object.keys(pokemon).length; i++) {
            if (Object.keys(pokemon)[i] === 'name' || 
                Object.keys(pokemon)[i] === 'type' || 
                Object.keys(pokemon)[i] === 'species' || 
                Object.keys(pokemon)[i] === 'height' || 
                Object.keys(pokemon)[i] === 'largestPokemon') {
                    isCorrect = true;
                } else {
                    return false;
                }
            }
        return true;
    }

    //Add New Pokemon Object to pokemonList
    function add(pokemon){
        let correctKeys = checkCorrectKeys(pokemon);
        if (typeof pokemon === 'object' && correctKeys){
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon Type is not an object or contains incorrect keys and is invalid')
        }
    }

    return {
        getAll,
        add
    }
}();

function largestPokemon () {
    //Height of the currently largest Pokemon
    let largestPokemonHeight = 0;
    //Counter used to identify the last Pokemon tagged as the largest
    let x = 0;
    //Iterate through the pokemonList to find the largest Pokemon
    pokemonRepository.getAll().forEach(function(pokemon, index){
        if ( pokemon.height > largestPokemonHeight) {
            largestPokemonHeight = pokemon.height;
            pokemonRepository.getAll()[x].largestPokemon=false;
            pokemon.largestPokemon = true;
            x=index;
        }
    })
}


/*Iterate through the pokemonList for loop to print each pokemon with it's height.
Conditional loop will add a largeBeast class and a mesage if the Pokemon is larger than 0.5m*/
function printArrayDetails(pokemonList) {
    largestPokemon();
    pokemonList.forEach(function(pokemon) {
        document.write('<div class="grid__item">');
        if (pokemon.largestPokemon) {
            document.write(`<p class="largeBeasts">${pokemon.name} `);
            document.write(`(height - ${pokemon.height})`);
            document.write('<br>Wow that\'s big!!!</p>');
        }
        else {
            document.write(`<p>${pokemon.name} `);
            document.write(`(height - ${pokemon.height})</p>`);
        }
        document.write('</div>');
    })
}

function filterPokemonList (searchTerm) {
    let newArray = pokemonRepository.getAll().filter(function (el){
        return el.name === searchTerm;
    });
    console.log(newArray);
    printArrayDetails(newArray);
}

printArrayDetails(pokemonRepository.getAll());