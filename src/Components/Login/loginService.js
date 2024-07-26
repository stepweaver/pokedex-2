import Parse from 'parse';

export const loginUser = async (username, password) => {
  try {
    // Pass the username and password to logIn function
    let user = await Parse.User.logIn(username, password);
    console.log('Logged in user: ', user);

    // Fetch the Profile object for the logged-in user
    const Profile = Parse.Object.extend('Profile');
    const query = new Parse.Query(Profile);
    query.equalTo('user', user);
    const profile = await query.first();

    if (profile) {
      // Set the isOnline field to true
      profile.set('isOnline', true);
      await profile.save();
      console.log('Profile updated to online');
    } else {
      console.error('Profile not found for the logged-in user');
    }

    return user;
  } catch (error) {
    console.error('Error while logging in user', error);
    throw error;
  }
};