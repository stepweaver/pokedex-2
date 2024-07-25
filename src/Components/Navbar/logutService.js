import Parse from 'parse';

export const logoutUser  = async () => {
  try {
    await Parse.User.logOut();
    localStorage.clear();
  } catch (error) {
    console.error('Error while logging out', error);
    throw error;
  }
};