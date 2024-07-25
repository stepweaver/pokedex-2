import React, { useState, useEffect } from 'react';
import { addFriend, removeFriend } from './friendsService';
import Parse from 'parse';

const AddRemoveFriend = ({ userId }) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriendStatus = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) return;

      const Profile = Parse.Object.extend('Profile');
      const query = new Parse.Query(Profile);
      query.equalTo('user', currentUser);

      try {
        const profile = await query.first();
        if (profile) {
          const friends = profile.get('friends') || [];
          setIsFriend(friends.includes(userId));
        }
      } catch (error) {
        console.error('Error while checking friend status', error);
      }
    };

    checkFriendStatus();
  }, [userId]);

  const handleAddFriend = async () => {
    try {
      await addFriend(userId);
      setIsFriend(true);
    } catch (error) {
      console.error('Error while adding friend', error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(userId);
      setIsFriend(false);
    } catch (error) {
      console.error('Error while removing friend', error);
    }
  };

  return (
    <div>
      {isFriend ? (
        <button onClick={handleRemoveFriend}>Remove Friend</button>
      ) : (
        <button onClick={handleAddFriend}>Add Friend</button>
      )}
    </div>
  );
};

export default AddRemoveFriend;