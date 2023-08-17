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
    document.getElementById('grid').innerHTML = '';
    pokemonList.forEach(function(pokemon) {
        let grid = document.getElementById('grid');
        let cell = document.createElement("div");
        if (pokemon.largestPokemon) {
            cell.innerHTML= 
                    `<p class="largeBeasts">${pokemon.name}
                    (height - ${pokemon.height})
                    <br>Wow that\'s big!!!</p>`;
        }
        else {
            cell.innerHTML = 
                    `<p>${pokemon.name} 
                    (height - ${pokemon.height})</p>`;
        }
        grid.appendChild(cell).className = 'grid__item ';
    })
}

//Filter list by search term
function filterPokemonList (searchTerm) {
    if (searchTerm === ''){
        printArrayDetails(pokemonRepository.getAll());
    } else {
        let newArray = pokemonRepository.getAll().filter(function (el){
            return el.name === searchTerm;
        });
        console.log(newArray[0].name);
        document.getElementById('grid').innerHTML = 
                `<div class="grid__item">
                    <p>${newArray[0].name} 
                    (height - ${newArray[0].height})</p></p>
                </div>`;
    }
}

printArrayDetails(pokemonRepository.getAll());