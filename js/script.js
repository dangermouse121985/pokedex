let pokemonRepository = function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Return an array of all Pokemon
    function getAll() {
        return pokemonList;
    }

    //Verify New Pokemon Object contains the correct keys
    function checkCorrectKeys(pokemon) {
        let pokemonKeys = Object.keys(pokemon);
        let isCorrect = false;

        pokemonKeys.forEach(function (pokemonName) {
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
    function add(pokemon) {
        let correctKeys = checkCorrectKeys(pokemon);
        if (typeof pokemon === 'object' && correctKeys) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon Type is not an object or contains incorrect keys and is invalid')
        }
    }

    //Query pokemon-list element and add Pokemon Object to list
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list__item');
        let listItemButton = document.createElement('button');
        listItemButton.classList.add('pokemon-tile', 'btn', 'btn-primary');
        listItemButton.setAttribute('data-toggle', 'modal');
        listItemButton.setAttribute('data-target', '#pokemonModal');
        listItemButton.innerText = pokemon.name;

        buttonClickListener(listItemButton, pokemon);

        listItem.appendChild(listItemButton);
        pokemonList.appendChild(listItem);
    }

    //Add event listener to to pokemon list item
    function buttonClickListener(listItemButton, pokemon) {
        listItemButton.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    //Open Modal with Pokemon Details
    function showDetails(pokemon) {
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let modalHeader = document.querySelector('.modal-header');

        modalTitle.innerHTML= '';
        modalBody.innerHTML = '';


        //Create Modal Elements
        //let modal = document.querySelector('#modal')
        //modal.innerHTML = '';
        let pokemonTitle = document.createElement('h1');
        modalTitle.classList.add('pokemon-title--modal');

        let pokemonImageUrl = document.createElement('img');
        pokemonImageUrl.classList.add('pokemon-image');

        let pokemonHeightH2 = document.createElement('h2');
        pokemonHeightH2.classList.add('height-title');
        let pokemonHeight = document.createElement('p');

        let pokemonTypesH2 = document.createElement('h2');
        pokemonTypesH2.classList.add('types-title');
        let pokemonTypes = document.createElement('ul');
        pokemonTypes.classList.add('list-group');
        
        //Load Pokemon Details from API into Modal
        loadDetails(pokemon).then(function () {
            //showModal();
            //Add Pokemon Name to Title Header
            modalTitle.innerText = pokemon.name;

            //Add Pokemon Image URL to Image Tag
            pokemonImageUrl.src = pokemon.imageUrl;
        
            //Add Pokemon Height to Height Tag
            pokemonHeightH2.innerText = 'Height';
            //If Pokemon Height is greater than 1 make unit of measurement plural
            if (pokemon.height <= 1) {
                pokemonHeight.innerText = `${pokemon.height} Decimeter`;
            } else {
                pokemonHeight.innerText = `${pokemon.height} Decimeters`;
            }

            //Add Pokemon Type to Types List
            pokemonTypesH2.innerText = 'Types';
            pokemon.types.forEach(function (pokemon) {
                let pokemonTypesListItem = document.createElement('li');
                pokemonTypesListItem.classList.add('list-group-item');
                pokemonTypesListItem.innerText = pokemon.type.name;
                pokemonTypes.appendChild(pokemonTypesListItem);
                console.log(`Pokemon Types: ${pokemon.type.name}`);
            });

            //modalTitle.appendChild(pokemonTitle);
            modalBody.appendChild(pokemonImageUrl);
            modalBody.appendChild(pokemonHeightH2);
            modalBody.appendChild(pokemonHeight);
            modalBody.appendChild(pokemonTypesH2);
            modalBody.appendChild(pokemonTypes);
        });
    }

    //Get Pokemon from apiUrl (https://pokeapi.co/api/v2/pokemon/?limit=150)
    function loadList() {
        showLoadingMessage();

        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                setTimeout(function () {
                    hideLoadingMessage();
                }, 500);
            });
        }).catch(function (e) {
            console.error(e);
            setTimeout(function () {
                hideLoadingMessage();
            }, 500);
        })
    }

    //Get Pokemon Details from API
    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Now we add the details to the pokemon
            pokemon.imageUrl = details.sprites.other.dream_world.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            setTimeout(function () {
                hideLoadingMessage();
            }, 500);
        }).catch(function (e) {
            console.error(e);
            setTimeout(function () {
                hideLoadingMessage();
            }, 500);
        });
    }
    
    //Query Modal and Create its Elements. Add event listeners to close if close button, is clicked, escape key is presses, and modal container is clicked.
    /* function showModal() {
        let modalContainer = document.querySelector('#modal-container');
        let modal = document.querySelector('#modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');

        //Close Button Event Listener
        closeButtonElement.addEventListener('click', hideModal);

        //Escape Key Event Listener
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        //Modal Container Event Listener
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        closeButtonElement.innerText = 'X';

        //Add is-visible class and remove is-hidden class when modal is opened
        modalContainer.classList.add('is-visible');
        modalContainer.classList.remove('is-hidden');
        

        modal.appendChild(closeButtonElement);
    } */

    //Remove is-visible class and add is-hidden class (display:none) when modal is closed
    /* function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        modalContainer.classList.add('is-hidden');
    } */

    return {
        getAll,
        add,
        loadList,
        loadDetails,
        addListItem
    }
}();

pokemonRepository.loadList().then(function () {
    //Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function largestPokemon() {
    //Height of the currently largest Pokemon
    let largestPokemonHeight = 0;
    //Counter used to identify the last Pokemon tagged as the largest
    let x = 0;
    //Iterate through the pokemonList to find the largest Pokemon
    pokemonRepository.getAll().forEach(function (pokemon, index) {
        if (pokemon.height > largestPokemonHeight) {
            largestPokemonHeight = pokemon.height;
            pokemonRepository.getAll()[x].largestPokemon = false;
            pokemon.largestPokemon = true;
            x = index;
        }
    });
}


/*Iterate through the pokemonList for loop to print each pokemon with it's height.
Conditional loop will add a largeBeast class and a mesage if the Pokemon is larger than 0.5m*/
function printArrayDetails(pokemonArray) {
    largestPokemon();
    //document.getElementById('grid').innerHTML = '';
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = '';
    pokemonArray.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
}

//Filter list by search term
function filterPokemonList(searchTerm) {
    if (searchTerm === '') {
        printArrayDetails(pokemonRepository.getAll());
    } else {
        let filterPokemonList = pokemonRepository.getAll().filter(function (filterPokemon) {
            let filterPokemonLC = filterPokemon.name.toLowerCase();
            let searchTermLC = searchTerm.toLowerCase();
            return filterPokemonLC.includes(searchTermLC);
        });
        //Check if Pokemon was found
        if (filterPokemonList.length === 0) {
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

//printArrayDetails(pokemonRepository.getAll());

//Search Pokemon By Name
let searchButton = document.querySelector('.filter');
searchButton.addEventListener('click', function () {
    let searchTerm = document.querySelector('.search-term').value;
    filterPokemonList(searchTerm);
});

//Clear Search Texbox and Reset List
let clearButton = document.querySelector('.clear-filter');
clearButton.addEventListener('click', function () {
    filterPokemonList('');
    document.querySelector('.search-term').value = '';

});

//Show Loading Message
function showLoadingMessage() {
    let waitingScreen = document.querySelector('.waiting-screen');
    waitingScreen.classList.add('is-visible');
}

//Hide Loading Message
function hideLoadingMessage() {
    let waitingScreen = document.querySelector('.waiting-screen');
    waitingScreen.classList.remove('is-visible');
}