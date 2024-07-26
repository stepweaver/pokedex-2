import React, { useEffect, useState } from 'react';
import { getTrainers } from './trainersService';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const TrainersList = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersList = await getTrainers();
        setTrainers(trainersList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <Paper sx={{ padding: 2, backgroundColor: 'transparent' }}>
      <Typography variant='h5' component='h2' gutterBottom sx={{ color: '#f0f0f0' }}>
        Trainers
      </Typography>
      <List>
        {trainers.map((trainer, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Link 
                  to={`/profile/${trainer.user}`} 
                  style={{ color: '#f0f0f0', textDecoration: 'none' }}
                >
                  Trainer {trainer.username}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TrainersList;