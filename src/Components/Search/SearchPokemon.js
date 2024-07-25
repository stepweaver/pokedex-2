import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const SearchPokemon = ({ pokemon, setFilteredPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filtered = pokemon.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPokemon(filtered);
    setLoading(false);
  }, [searchTerm, pokemon, setFilteredPokemon]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      label='Search Pokémon'
      value={searchTerm}
      onChange={handleInputChange}
      sx={{ 
        width: 300,
        '& .MuiOutlinedInput-root': {
          border: '2px solid #f0f0f0',
          borderRadius: '4px',
        },
        '& .MuiInputLabel-root': {
          color: '#f0f0f0',
        },
        '& .MuiInputBase-input': {
          color: '#f0f0f0',
        },
        '& .MuiSvgIcon-root': {
          color: '#f0f0f0',
        }
      }}
      InputProps={{
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
          </React.Fragment>
        ),
      }}
    />
  );
};

export default SearchPokemon;

// TODO: Use a different search component. I don't like the autocomplete.
// TODO: Search by name and type.