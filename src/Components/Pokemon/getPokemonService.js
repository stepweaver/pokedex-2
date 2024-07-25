import Parse from 'parse';

export const getPokemon = async () => {
  const limit = 1000;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      try {
        const pokemonData = await fetch(pokemon.url);
        if (!pokemonData.ok) {
          throw new Error('Network response was not ok');
        }
        const pokemonDetails = await pokemonData.json();
        return { 
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          butt: pokemonDetails.sprites.back_default,
          types: pokemonDetails.types.map((type) => type.type.name),
          hp: pokemonDetails.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: pokemonDetails.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          specialAttack: pokemonDetails.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
          defense: pokemonDetails.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          specialDefense: pokemonDetails.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
          speed: pokemonDetails.stats.find((stat) => stat.stat.name === 'speed').base_stat
        };
      } catch (error) {
        console.error(`Failed to fetch details for ${pokemon.name}:`, error);
        return null; // or handle the error as needed
      }
    });

    const pokemon = await Promise.all(promises);
    return pokemon.filter(p => p !== null); // Filter out any null values due to fetch failures
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    return []; // or handle the error as needed
  }
};

export const getPokemonTypes = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results.map((type) => type.name);
  } catch (error) {
    console.error('Failed to fetch Pokémon types:', error);
    return []; // or handle the error as needed
  }
};