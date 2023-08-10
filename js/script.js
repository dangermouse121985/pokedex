let pokemonList = [];
pokemonList = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        species: 'Seed',
        height: 0.7,
    },
    {
        name: 'Charmander',
        Type: 'Fire',
        species: 'Lizard',
        height: 0.6,
    },
    {
        name: 'Squirtle',
        type: 'Water',
        species: 'Young Turtle',
        height: 0.5,
    }
]

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height > 0.5) {
        document.write(`<p class="largeBeasts">${pokemonList[i].name} `);
        document.write(`(height - ${pokemonList[i].height})`);
        document.write('Wow that\'s big!!!</p>');
    }
    else {
        document.write(`<p>${pokemonList[i].name} `);
        document.write(`(height - ${pokemonList[i].height})</p>`);
    }
}