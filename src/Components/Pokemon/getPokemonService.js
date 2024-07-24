import Parse from 'parse';

export const getPokemon = async () => {
  const limit = 10;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();

  const promises = data.results.map(async (pokemon) => {
    const pokemonData = await fetch(pokemon.url);
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
    }
  })

  const pokemon = await Promise.all(promises);
  return pokemon;
};