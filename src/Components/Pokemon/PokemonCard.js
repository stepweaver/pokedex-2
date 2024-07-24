import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCaught, setIsCaught] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle the value of isFlipped
  };

  const handleCatchChange = () => {
    setIsCaught(!isCaught); // Toggle the value of isCaught
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip} sx={{ maxWidth: 345 }}> 
      <CardActionArea> 
        <CardMedia
          component="img"
          height="140"
          image={pokemon.image}
          alt={pokemon.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name}
          </Typography>
          <div className={isFlipped ? "content flipped" : "content"}>
            <div className="pokemon-card-front">
              <div className="pokemon-types-container">
                {pokemon.types && (
                  <span className="pokemon-types">
                    {pokemon.types.map(type => type.toLowerCase().trim()).join(' ')}
                  </span>
                )}
              </div>
            </div>
            <div className="pokemon-card-back">
              <Typography variant="body2" color="text.secondary">
                hp - {pokemon.hp}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Attack - {pokemon.attack}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Defense - {pokemon.defense}
              </Typography>
              <input
                type="checkbox"
                checked={isCaught}
                onChange={handleCatchChange}
                id={`catch-${pokemon.name}`}
              />
              <label htmlFor={`catch-${pokemon.name}`}>
                {isCaught ? "Caught" : "Catch"}
              </label>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card> // TODO: Animate the card flip when the user clicks on it
  );
};

export default PokemonCard;