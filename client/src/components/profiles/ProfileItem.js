import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    location,
    favGenres,
  },
}) => {
  return (
    <div className='profile'>
      <img src={avatar} alt='Profile' className='profile-img' />
      <div>
        <h2>{name}</h2>
        <p>{bio}</p>
        <p className='mb-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {favGenres.slice(0, 4).map((genre, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-star'></i> {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
