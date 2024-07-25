import React, { useEffect, useState } from 'react';
import { getFriends } from './friendsService';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#1f1f1f'
}));

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsList = await getFriends();
        setFriends(friendsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Friends List
      </Typography>
      <Demo>
        <List>
          {friends.map((friend, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  {friend.username.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link 
                    to={`/profile/${friend.id}`} 
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    {friend.username}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Demo>
    </Box>
  );
};

export default FriendsList;