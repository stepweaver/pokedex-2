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
import Parse from 'parse';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import { green } from '@mui/material/colors';

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

  useEffect(() => {
    const subscribeToOnlineStatus = async () => {
      const Profile = Parse.Object.extend('Profile');
      const query = new Parse.Query(Profile);
      const subscription = await query.subscribe();

      subscription.on('update', (profile) => {
        setFriends((prevFriends) =>
          prevFriends.map((friend) =>
            friend.id === profile.get('user').id
              ? { ...friend, isOnline: profile.get('isOnline') }
              : friend
          )
        );
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    subscribeToOnlineStatus();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
        Friends List
      </Typography>
      <Demo>
        <List>
          {friends.map((friend, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{friend.username.charAt(0).toUpperCase()}</Avatar>
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
                secondary={
                  <Chip
                    label={friend.isOnline ? 'Online' : 'Offline'}
                    size='small'
                    style={{
                      backgroundColor: friend.isOnline
                        ? green[500]
                        : 'transparent',
                      color: friend.isOnline ? 'white' : 'gray',
                      border: friend.isOnline ? 'none' : '2px solid gray',
                      padding: '2px 4px',
                      fontSize: '0.75rem'
                    }}
                  />
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
