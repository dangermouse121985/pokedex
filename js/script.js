let pokemonRepository = (function () {
  let pokemonList = [];

  let currentOffset = 0;
  const limit = 30;
  let totalPokemon = 150;
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${currentOffset}&limit=${limit}`;

  //Return an array of all Pokemon
  function getAll() {
    return pokemonList;
  }

  //Verify New Pokemon Object contains the correct keys
  function checkCorrectKeys(pokemon) {
    let pokemonKeys = Object.keys(pokemon);
    let isCorrect = false;

    pokemonKeys.forEach(function (pokemonName) {
      if (
        pokemonName === 'name' ||
        pokemonName === 'type' ||
        pokemonName === 'species' ||
        pokemonName === 'height'
      ) {
        isCorrect = true;
      } else {
        return false;
      }
    });
    return isCorrect;
  }

  //Add New Pokemon Object to pokemonList
  function add(pokemon) {
    let correctKeys = checkCorrectKeys(pokemon);
    if (typeof pokemon === 'object' && correctKeys) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        'Pokemon Type is not an object or contains incorrect keys and is invalid'
      );
    }
  }

  //Query pokemon-list element and add Pokemon Object to list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list__item', 'list-group-item');
    let listItemButton = document.createElement('button');
    listItemButton.classList.add('pokemon-tile', 'btn', 'btn-primary');
    listItemButton.setAttribute('data-toggle', 'modal');
    listItemButton.setAttribute('data-target', '#pokemonModal');
    let listItemButtonLabel = document.createElement('div');
    listItemButtonLabel.innerText = pokemon.name;

    let pokemonImageUrl = document.createElement('img');
    pokemonImageUrl.classList.add('pokemon-list--image');

    loadPokemonThumbnail(pokemon).then(function () {
      //Add Pokemon Image URL to Image Tag
      pokemonImageUrl.src = pokemon.imageUrl;
      pokemonImageUrl.alt = `Thumbnail image of ${pokemon.name}`;
    });

    buttonClickListener(listItemButton, pokemon);

    listItemButton.appendChild(listItemButtonLabel);
    listItemButton.appendChild(pokemonImageUrl);
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

    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    //Create Modal Elements
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
      pokemonImageUrl.alt = `Image of ${pokemon.name}`;

      //Add Pokemon Height to Height Tag
      pokemonHeightH2.innerText = 'Height';
      //If Pokemon Height is greater than 1 make unit of measurement plural
      pokemonHeight.innerText = `${pokemon.height} Decimeter${pokemon.height <= 1 ? '' : 's'}`;

      //Add Pokemon Type to Types List
      pokemonTypesH2.innerText = 'Types';
      pokemon.types.forEach(function (pokemon) {
        let pokemonTypesListItem = document.createElement('li');
        pokemonTypesListItem.classList.add('list-group-item', 'types-list-item');
        pokemonTypesListItem.innerText = pokemon.type.name;
        pokemonTypes.appendChild(pokemonTypesListItem);
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
  const loadList = async (offset, limit) => {
    showLoadingMessage();
    //if Search or clear filter is done load all 150 Pokemon, otherwise load number of Pokemon (defined by limit) on scroll
    if (offset === undefined) {
      currentOffset = totalPokemon;
      apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemon}`;
    } else {

      apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    }

    return await fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          //Check if Pokemon already exists in pokemonList
          let itemNameInPokemonList = pokemonList.find(o => o.name === item.name);
          if (itemNameInPokemonList === undefined) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            }
            add(pokemon);
            loadPokemonThumbnail(pokemon);
          }
          setTimeout(function () {
            hideLoadingMessage();
          }, 500);

        });
      })
      .catch(function (e) {
        console.error(e);
        setTimeout(function () {
          hideLoadingMessage();
        }, 500);
      });
  }

  //define start index of next API load (up to defined totalPokemon)
  const hasMorePokemon = (offset, limit, totalPokemon) => {
    const startIndex = offset + limit;
    return startIndex < totalPokemon + 1;
  }

  const loadPokemon = async (offset, limit) => {
    // show the loader
    if (offset < totalPokemon) {
      showLoadingMessage();
    }
    console.log(offset, limit)
    try {
      // if having more facts to fetch 
      if (!offset) {
        const response = await loadList();
      }
      else if (hasMorePokemon(offset, limit, totalPokemon)) {

        // call the API to get facts
        const response = await loadList(offset, limit);
        printArrayDetails(pokemonRepository.getAll());
      }
    } catch (error) {
      console.log(error.message);
      setTimeout(function () {
        hideLoadingMessage();
      }, 500);
    } finally {
      setTimeout(function () {
        hideLoadingMessage();
      }, 500);
    }
  };

  //Listen for scroll event to load addition Pokemon from API
  window.addEventListener('scroll', () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 &&
      hasMorePokemon(currentOffset, limit, totalPokemon)) {
      currentOffset = currentOffset + 30;
      loadPokemon(currentOffset, limit);
    }
  }, {
    passive: true
  });

  //Get individual Pokemon Details from API
  function loadDetails(pokemon) {
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //Now we add the details to the pokemon
        pokemon.height = details.height;
        pokemon.types = details.types;

        let pokemonTypesStr = '';
        pokemon.types.forEach(function (pokemon) {
          pokemonTypesStr = `${pokemonTypesStr} ${pokemon.type.name}`;
        });

        setTimeout(function () {
          hideLoadingMessage();
        }, 500);
      })
      .catch(function (e) {
        console.error(e);
        setTimeout(function () {
          hideLoadingMessage();
        }, 500);
      });
  }

  //Get Pokemon Image to load into each Pokemon Tile
  function loadPokemonThumbnail(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl =
          details.sprites.other.dream_world.front_default;
        setTimeout(function () {
          hideLoadingMessage();
        }, 1000);
        //Now we add the details to the pokemon
        pokemon.types = details.types;

        let pokemonTypesStr = '';
        pokemon.types.forEach(function (pokemon) {
          pokemonTypesStr = `${pokemonTypesStr} ${pokemon.type.name} `;
        });

        pokemon.typesStr = pokemonTypesStr;


      })
      .catch(function (e) {
        console.error(e);
        setTimeout(function () {
          hideLoadingMessage();
        }, 1000);
      });
  }

  //Load Pokemon List
  loadList(currentOffset, limit).then(function () {
    getAll().forEach(function (pokemon) {
      addListItem(pokemon);
    });
  });

  return {
    getAll,
    add,
    loadList,
    loadDetails,
    addListItem,
    loadPokemon
  };
})();

/*Iterate through the pokemonList for loop to print each pokemon with it's height.
Conditional loop will add a largeBeast class and a mesage if the Pokemon is larger than 0.5m*/
function printArrayDetails(pokemonArray) {
  let pokemonList = document.querySelector('.pokemon-list');
  pokemonList.innerHTML = '';
  pokemonArray.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}

//Filter list by search term
function filterPokemonList(searchTerm, searchType) {
  pokemonRepository.loadPokemon();
  setTimeout(() => {
    if (searchTerm === '') {
      showLoadingMessage();
      setTimeout(() => {
        hideLoadingMessage();
      }, 500);
      printArrayDetails(pokemonRepository.getAll());
    } else {
      let filterPokemonList = pokemonRepository
        .getAll()
        .filter(function (filterPokemon) {
          let filterPokemonLC = '';

          if (searchType === 'name') {
            filterPokemonLC = filterPokemon.name.toLowerCase();
          }

          if (searchType === 'pokemonType') {
            filterPokemonLC = filterPokemon.typesStr.toLowerCase();
          }
          let searchTermLC = searchTerm.toLowerCase();
          return filterPokemonLC.includes(searchTermLC);
        });
      //Check if Pokemon was found
      if (filterPokemonList.length === 0) {
        let pokemonList = document.querySelector('.pokemon-list');
        pokemonList.innerHTML = '';
        let noResults = document.createElement('li');
        noResults.classList.add('list__item', 'no-results');
        noResults.innerText = 'No Search Results Found';

        pokemonList.appendChild(noResults);

        //if Pokemon was found, display on page
      } else {
        printArrayDetails(filterPokemonList);
      }
    }
  }, 500);

}

//Search Pokemon By Name
let searchButton = document.querySelector('.filter');
searchButton.addEventListener('click', function () {
  let searchTerm = document.querySelector('.search-term').value;
  filterPokemonList(searchTerm, 'name');
});

//Clear Search Texbox and Reset List
let clearButton = document.querySelector('.clear-filter');
clearButton.addEventListener('click', function () {
  filterPokemonList('');
  document.getElementById('searchbox').value = '';
});

//Pokemon Types Dropdown Filter
let typeDropdown = document.getElementById('pokemon-type__dropdown');
let pokemonTypes = [
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Steel',
  'Fairy',
];

//Define Types Dropdown Filter Items
let dropdownToggle = document.querySelector('.dropdown-toggle');
dropdownToggle.addEventListener('click', function () {
  let toggleWidth = dropdownToggle.offsetWidth;
  let dropdown = document.querySelector('#pokemon-type__dropdown');
  dropdown.setAttribute('style', `width: ${toggleWidth}px`); /*  */
});
pokemonTypes.forEach(function (type) {
  let typeLink = document.createElement('a');
  typeLink.classList.add('dropdown-item', type);
  typeLink.setAttribute('href', '#');
  typeLink.innerText = type;
  typeLink.addEventListener('click', function () {
    filterPokemonList(type, 'pokemonType');
    let dropdownItem = document.querySelector(`.${type}`);
    let previousActiveDropdownItem = document.querySelector(
      '.dropdown-item__active'
    );
    if (previousActiveDropdownItem) {
      previousActiveDropdownItem.classList.remove('dropdown-item__active');
    }
    dropdownItem.classList.add('dropdown-item__active');
  });
  typeDropdown.appendChild(typeLink);
});

//Show Loading Message
function showLoadingMessage() {
  let waitingScreen = document.querySelector('.waiting-screen');
  waitingScreen.classList.remove('fadeout');
  waitingScreen.classList.add('is-visible');
}

//Hide Loading Message
function hideLoadingMessage() {
  let waitingScreen = document.querySelector('.waiting-screen');
  waitingScreen.classList.add('fadeout');
  setTimeout(function () {
    waitingScreen.classList.remove('is-visible');
  }, 300);
}