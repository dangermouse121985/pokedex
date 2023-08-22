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
        },
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
        let pokemonKeys = Object.keys(pokemon);
        let isCorrect = false;

        pokemonKeys.forEach(function (pokemonName){
            if (pokemonName === 'name' || 
                pokemonName === 'type' || 
                pokemonName === 'species' || 
                pokemonName === 'height' || 
                pokemonName === 'largestPokemon') {
                    isCorrect = true;
                } else {
                    return false;
                }
        })
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

    function addListItem (pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list__item');
        let listItemButton = document.createElement('button');
        listItemButton.classList.add('pokemon-tile')
        listItemButton.innerText = pokemon.name;

        buttonClickListener(listItemButton, pokemon);

        listItem.appendChild(listItemButton);
        pokemonList.appendChild(listItem);
    }

    function buttonClickListener (listItemButton, pokemon){
        listItemButton.addEventListener('click', function(){
            showDetails(pokemon);
        });
    }

    function showDetails (pokemon){
        console.log(pokemon.name);
    }

    return {
        getAll,
        add,
        addListItem
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
function printArrayDetails(pokemonArray) {
    largestPokemon();
    //document.getElementById('grid').innerHTML = '';
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = '';
    pokemonArray.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
}

//Filter list by search term
function filterPokemonList (searchTerm) {
    if (searchTerm === ''){
        printArrayDetails(pokemonRepository.getAll());
    } else {
        let filterPokemonList = pokemonRepository.getAll().filter(function (filterPokemon){
            let filterPokemonLC = filterPokemon.name.toLowerCase();
            let searchTermLC = searchTerm.toLowerCase();
            return filterPokemonLC.includes(searchTermLC);
        });
        //Check if Pokemon was found
        if (filterPokemonList.length === 0){
            let pokemonList = document.querySelector('.pokemon-list');
            pokemonList.innerHTML = '';
            let noResults = document.createElement('li');
            noResults.classList.add('list__item');
            noResults.innerText = 'No Search Results Found'; 

            pokemonList.appendChild(noResults);
            /* `<li class="list__item">
                <p>No Search Results Found</p>
            </div>`;  */
        //if Pokemon was found, display on page
        } else {
            printArrayDetails(filterPokemonList);
        }        
    }
}

printArrayDetails(pokemonRepository.getAll());

let searchButton = document.querySelector('.filter');
searchButton.addEventListener('click', function() {
    let searchTerm = document.querySelector('.search-term').value;
    filterPokemonList(searchTerm);
});

let clearButton = document.querySelector('.clear-filter');
clearButton.addEventListener('click', function() {
    filterPokemonList('');
    document.querySelector('.search-term').value = '';
    
});