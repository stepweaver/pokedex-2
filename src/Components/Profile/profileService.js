import Parse from 'parse';

export const getProfile = async (userId) => {
  const Profile = Parse.Object.extend('Profile'); // Create a new instance of the Profile class
  const profileQuery = new Parse.Query(Profile);
  profileQuery.equalTo('userId', userId); // Find the profile with the userId
  const profile = await profileQuery.first(); // Get the first profile with the userId
  if (!profile) {
    console.error('Profile not found');
    return null;
  }
  return profile.toJSON(); // Return the profile as a JSON object
};
