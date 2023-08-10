let pokemonList = [];
pokemonList = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        species: 'Seed',
        height: 0.7
    },
    {
        name: 'Charmander',
        Type: 'Fire',
        species: 'Lizard',
        height: 0.6
    },
    {
        name: 'Squirtle',
        type: 'Water',
        species: 'Young Turtle',
        height: 0.5
    }
]

for (let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ');
    document.write('(height - ' + pokemonList[i].height + ')');

    if (pokemonList[i].height >= 10) {
        document.write(' Wow that\'s big!!!<br>');
    }
    else {
        document.write('<br>')
    }
}