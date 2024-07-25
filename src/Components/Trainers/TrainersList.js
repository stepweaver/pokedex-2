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
    <Paper sx={{ padding: 2 }}>
      <Typography variant='h5' component='h2' gutterBottom>
        Trainers
      </Typography>
      <List>
        {trainers.map((trainer, index) => (
          <ListItem button key={index}>
            <ListItemText
              primary={
                <Link 
                  to={`/profile/${trainer.user}`} 
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  {trainer.username}
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