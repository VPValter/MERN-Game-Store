import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import GameItem from '../games/GameItem';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />

          <div className='dash-profile my-2'>
            <img src={profile.user.avatar} alt='' />
            <div className='profile-info'>
              {profile.bio ? (
                <p>
                  <strong>Bio:</strong> {profile.bio}
                </p>
              ) : null}
              {profile.location ? (
                <p>
                  <strong>Location:</strong> {profile.location}
                </p>
              ) : null}
              {profile.favGenres ? (
                <p>
                  <strong>Favorite genres:</strong>
                  {profile.favGenres.map((item, i) => (
                    <span className='dash-genre' key={i}>
                      <i className='fas fa-star'></i>
                      {item}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile
          </Link>
        </Fragment>
      )}

      {user && user.gamesOwned.length > 0 ? (
        <Fragment>
          <hr />
          <div className='games-owned'>
            <h3>Games owned:</h3>
            <div className='games-list'>
              {user.gamesOwned.map((game) => (
                <GameItem key={game._id} game={game} />
              ))}
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
