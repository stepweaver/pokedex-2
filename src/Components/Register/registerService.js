import Parse from 'parse';

export const createUser = async (newUser) => {
  const user = new Parse.User();

  // Generate Trainer Number
  const generateTrainerNumber = (length) => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Generate Username
  const username = `Trainer #${generateTrainerNumber(5)}`;

  user.set('firstName', newUser.firstName);
  user.set('lastName', newUser.lastName);
  user.set('email', newUser.email);
  user.set('password', newUser.password);
  user.set('username', username);

  try {
    const userCreated = await user.signUp();
    console.log('User Created: ', userCreated);

    // Create a Trainer Profile
    const Profile = Parse.Object.extend('Profile');
    const profile = new Profile();
    profile.set('user', userCreated); // Pointer to the user
    profile.set('username', username); // Trainer Number
    profile.set('bio', `I'm a Pokémon Trainer!`); // Default Bio
    profile.set('caughtPokemon', []);
    profile.set('friends', []);
    await profile.save();

    console.log('Profile Created:', profile);
    return userCreated;
  } catch (error) {
    console.error('Error while creating user: ', error);
    alert('Error while creating user: ', error);
    return null;
  }
}