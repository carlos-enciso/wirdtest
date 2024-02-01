import { PokemonData } from '../../reusable/PokemonInterfaces';

const pokeApiEndpoint = 'https://pokeapi.co/api/v2/';

export function fetchInitialPokemons() {
        return new Promise((resolve) => {
            fetch(`${pokeApiEndpoint}pokemon?limit=151`)
            .then((response) => response.json())
            .then((result) => {
                const pokeData = result.results.map(async (pokemon: { url: string; }) => await fetchPokemonData(pokemon.url));
            Promise.all(pokeData).then((results) => {
                resolve(results);
            })
        })
    });
}

async function fetchPokemonData(url: string) {
    const response = await fetch(url);
    const pokemon = await response.json();
    const pokemonStats = pokemon.stats;
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        height: pokemon.height,
        type: pokemon.types,
        stats: {
            attack: pokemonStats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'attack').base_stat,
            defence: pokemonStats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'defense').base_stat,
            xAttack: pokemonStats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'special-attack').base_stat,
            xDefence: pokemonStats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'special-defense').base_stat,
            speed: pokemonStats.find((stat: { stat: { name: string; }; }) => stat.stat.name === 'speed').base_stat,
        }
        } as PokemonData;
}