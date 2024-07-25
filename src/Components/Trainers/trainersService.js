import Parse from 'parse';

export const getProfile = async (userId) => {
  const Profile = Parse.Object.extend('Profile');
  const profileQuery = new Parse.Query(Profile);
  profileQuery.equalTo('userId', userId);
  const profile = await profileQuery.first();
  if (!profile) {
    console.error('Profile not found');
    return null;
  }
  return profile.toJSON();
};

export const getTrainers = async () => {
  const Profile = Parse.Object.extend('Profile');
  const profileQuery = new Parse.Query(Profile);
  try {
    const profiles = await profileQuery.find();
    return profiles.map(profile => {
      const profileJSON = profile.toJSON();
      const userPointer = profile.get('user'); // Get the user Pointer
      console.log('Fetched trainer:', { ...profileJSON, user: userPointer }); // Log the trainer object with user Pointer
      return {
        ...profileJSON,
        user: userPointer.id // Ensure user Pointer ID is included
      };
    });
  } catch (error) {
    console.error('Error while fetching trainers: ', error);
    return [];
  }
};