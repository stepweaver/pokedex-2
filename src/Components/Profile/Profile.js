import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Parse from 'parse';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [caughtPokemons, setCaughtPokemons] = useState([]);
  const [trainerBio, setTrainerBio] = useState('I am a Pokemon Trainer!');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      let user;
      if (userId) {
        const userQuery = new Parse.Query(Parse.User);
        user = await userQuery.get(userId);
      } else {
        user = Parse.User.current();
        if (!user) {
          navigate('/login');
          return;
        }
      }

      const query = new Parse.Query('Profile');
      query.equalTo('user', user);
      const profile = await query.first();
      if (profile) {
        setProfile(profile.toJSON());
        setUsername(user.get('username'));
        setCaughtPokemons(profile.get('caughtPokemon') || []);
        setTrainerBio(profile.get('trainerBio') || 'I am a Pokemon Trainer!');
      }
    };

    getProfile();
  }, [userId, navigate]);

  if (!profile) {
    return <div>Loading...</div>; // TODO: Implement a loading spinner from material-ui
  }

  return (
    <div className="profile">
      <h1>{username}</h1>
      <p>{trainerBio}</p>
      <ul>
        {caughtPokemons.map((pokemon, index) => (
          <li key={index}>{pokemon}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;