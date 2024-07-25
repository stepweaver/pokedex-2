import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SearchPokemon = ({ pokemon, setFilteredPokemon, types }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filtered = pokemon.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === '' || p.types.includes(selectedType))
    );
    setFilteredPokemon(filtered);
    setLoading(false);
  }, [searchTerm, selectedType, pokemon, setFilteredPokemon]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <TextField
        label='Search Pokémon'
        value={searchTerm}
        onChange={handleInputChange}
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': {
            border: '2px solid #f0f0f0',
            borderRadius: '4px',
            height: '56px'
          },
          '& .MuiInputLabel-root': {
            color: '#f0f0f0'
          },
          '& .MuiInputBase-input': {
            color: '#f0f0f0'
          },
          '& .MuiSvgIcon-root': {
            color: '#f0f0f0'
          }
        }}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color='inherit' size={20} /> : null}
            </React.Fragment>
          )
        }}
      />
      <FormControl
        sx={{
          marginLeft: 2,
          border: '2px solid #f0f0f0',
          borderRadius: '4px',
          padding: '8px',
          width: 120,
          height: '56px'
        }}
      >
        <InputLabel sx={{ color: '#f0f0f0' }}>Type</InputLabel>
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          label='Type'
          sx={{
            '& .MuiInputLabel-root': {
              color: '#f0f0f0'
            },
            '& .MuiInputBase-input': {
              color: '#f0f0f0'
            },
            '& .MuiSvgIcon-root': {
              color: '#f0f0f0'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f0f0f0'
            },
            height: '100%'
          }}
        >
          <MenuItem value=''>All</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchPokemon;