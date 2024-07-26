import Parse from 'parse';

export const getFriends = async () => {
  const currentUser = Parse.User.current(); // Get the current user
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const Profile = Parse.Object.extend('Profile'); // Create a new instance of the Profile class
  const query = new Parse.Query(Profile); // Create a new query on the Profile class
  query.equalTo('user', currentUser); // Find the profile with the current user

  try {
    const profile = await query.first(); // Get the first profile with the current user
    if (!profile) {
      throw new Error('Profile not found');
    }
    const friendIds = profile.get('friends') || [];

    const friends = await Promise.all(
      friendIds.map(async (friendId) => {
        const userQuery = new Parse.Query(Parse.User); // Create a new query on the User class
        const user = await userQuery.get(friendId); // Get the user with the friendId
        const friendProfileQuery = new Parse.Query(Profile); // Create a new query on the Profile class
        friendProfileQuery.equalTo('user', user); // Find the profile with the user
        const friendProfile = await friendProfileQuery.first(); // Get the first profile with the user
        return {
          id: friendId,
          username: user.get('username'),
          isOnline: friendProfile.get('isOnline')
        };
      })
    );

    return friends;
  } catch (error) {
    console.error('Error while fetching friends', error);
    throw error;
  }
};

export const addFriend = async (friendId) => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', currentUser);

  try {
    const profile = await query.first();
    if (!profile) {
      throw new Error('Profile not found');
    }
    const friends = profile.get('friends') || [];
    if (!friends.includes(friendId)) {
      friends.push(friendId);
      profile.set('friends', friends);
      await profile.save();
    }
  } catch (error) {
    console.error('Error while adding friend', error);
    throw error;
  }
};

export const removeFriend = async (friendId) => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const Profile = Parse.Object.extend('Profile');
  const query = new Parse.Query(Profile);
  query.equalTo('user', currentUser);

  try {
    const profile = await query.first();
    if (!profile) {
      throw new Error('Profile not found');
    }
    const friends = profile.get('friends') || [];
    const index = friends.indexOf(friendId);
    if (index > -1) {
      friends.splice(index, 1);
      profile.set('friends', friends);
      await profile.save();
    }
  } catch (error) {
    console.error('Error while removing friend', error);
    throw error;
  }
};
