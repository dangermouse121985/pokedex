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

    function getAll(){
        return pokemonList;
    }

    function add(pokemon){
        if (typeof pokemon === 'object'){
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon Type is not an object and is invalid')
        }
        console.log(Object.keys(pokemon));
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
    pokemonRepository.getAll().forEach(function(pokemon) {
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

printArrayDetails(pokemonRepository.getAll());