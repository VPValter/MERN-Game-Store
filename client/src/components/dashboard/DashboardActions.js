import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-primary'>
        <i className='fas fa-user-circle text-light'></i> Update Profile
      </Link>
    </div>
  );
};

export default DashboardActions;