import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    favGenres,
    user: { name }
  }
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>Favorite genres</h2>
      <div className='skills'>
          {favGenres.map((genre, index) => (
              <div key={index} className="p-1">
                  <i className="fas fa-star"></i> {genre}
              </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
