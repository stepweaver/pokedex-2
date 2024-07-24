import React, { useState, useEffect } from 'react';
import { getPokemon } from '../Pokemon/getPokemonService';
import PokemonList from '../Pokemon/PokemonList';
import './Main.css';

const Main = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();
      setPokemon(data);
    };

    fetchPokemon();
  }, []);

  return (
    <div className='main-container'>
      <h1>Pokémon</h1>
      <PokemonList pokemon={pokemon} />
    </div>
  );
};

export default Main;