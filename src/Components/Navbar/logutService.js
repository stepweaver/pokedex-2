import Parse from 'parse';

export const logoutUser = async () => {
  try {
    // Get the current logged-in user
    const user = Parse.User.current();

    if (user) {
      // Fetch the Profile object for the current user
      const Profile = Parse.Object.extend('Profile');
      const query = new Parse.Query(Profile);
      query.equalTo('user', user);
      const profile = await query.first();

      if (profile) {
        // Set the isOnline field to false
        profile.set('isOnline', false);
        await profile.save();
        console.log('Profile updated to offline');
      } else {
        console.error('Profile not found for the logged-out user');
      }
    }

    // Log out the user and clear local storage
    await Parse.User.logOut();
    localStorage.clear();
  } catch (error) {
    console.error('Error while logging out', error);
    throw error;
  }
};