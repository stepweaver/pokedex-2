import React, { useState, useEffect } from 'react';
import { getPokemon, getPokemonTypes } from '../Pokemon/getPokemonService';
import PokemonList from '../Pokemon/PokemonList';
import SearchPokemon from '../Search/SearchPokemon';
import './Main.css';

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();
      setPokemon(data);
      setFilteredPokemon(data);
    };

    const fetchTypes = async () => {
      const typesData = await getPokemonTypes();
      setTypes(typesData);
    };

    fetchPokemon();
    fetchTypes();
  }, []);

  return (
    <div className='main-container'>
      <h1>Pokémon</h1>
      <SearchPokemon
        pokemon={pokemon}
        setFilteredPokemon={setFilteredPokemon}
        types={types}
      />
      <br />
      <br />
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default Main;