import Parse from 'parse';

export const loginUser = async (username, password) => {
  try {
    // Pass the username and password to logIn function
    let user = await Parse.User.logIn(username, password);
    console.log('Logged in user: ', user);
    return user;
  } catch (error) {
    console.error('Error while logging in user', error);
    throw error;
  }
};