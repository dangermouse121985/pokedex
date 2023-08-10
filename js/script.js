let pokemonList = [];
pokemonList = [
    {
        name: 'Bulbasaur',
        type: ['Grass', 'Poison'],
        species: 'Seed',
        height: 10
    },
    {
        name: 'Charmander',
        Type: 'Fire',
        species: 'Lizard',
        height: 9
    },
    {
        name: 'Squirtle',
        type: 'Water',
        species: 'Young Turtle',
        height: 15
    }
]

for (let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ');
    document.write('(height - ' + pokemonList[i].height + ')');
}