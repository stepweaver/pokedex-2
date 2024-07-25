import React, { useState, useEffect } from 'react';
import { getPokemon } from '../Pokemon/getPokemonService';
import PokemonList from '../Pokemon/PokemonList';
import SearchPokemon from '../Search/SearchPokemon';
import './Main.css';

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();
      setPokemon(data);
      setFilteredPokemon(data);
    };

    fetchPokemon();
  }, []);

  return (
    <div className='main-container'>
      <h1>Pokémon</h1>
      <SearchPokemon
        pokemon={pokemon}
        setFilteredPokemon={setFilteredPokemon}
      />
      <br />
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default Main;
