import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const SearchPokemon = ({ pokemon, setFilteredPokemon }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    if (pokemon.length > 0) {
      setOptions(pokemon);
    }
  }, [pokemon]);

  const handleInputChange = (event, value) => {
    const filtered = pokemon.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPokemon(filtered);
  };

  return (
    <Autocomplete
      id="search-pokemon"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Pokémon"
          sx={{ 
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
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchPokemon;