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
        type: ['Fire'],
        species: 'Lizard',
        height: 0.6,
    },
    {
        name: 'Squirtle',
        type: ['Water'],
        species: 'Young Turtle',
        height: 0.5,
    }
]

/*Iterate through the pokemonList for loop to print each pokemon with it's height.
Conditional loop will add a largeBeast class and a mesage if the Pokemon is larger than 0.5m*/
document.write('<div class="grid">');
for (let i=0; i<pokemonList.length; i++) {
    document.write('<div class="grid__item">');
    if (pokemonList[i].height > 0.5) {
        document.write(`<p class="largeBeasts">${pokemonList[i].name} `);
        document.write(`(height - ${pokemonList[i].height})`);
        document.write('<br>Wow that\'s big!!!</p>');
    }
    else {
        document.write(`<p>${pokemonList[i].name} `);
        document.write(`(height - ${pokemonList[i].height})</p>`);
    }
    document.write('</div>');
}
document.write('</dov>');
