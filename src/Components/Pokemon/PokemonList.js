import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon = [] }) => {

  if (!pokemon.length) {
    return <div>Loading...</div>; // TODO: Implement a loading spinner from material-ui
  }

  return (
    <div className='pokemon-list'>
      {pokemon.map((pokemon, index) => (
        <PokemonCard key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;