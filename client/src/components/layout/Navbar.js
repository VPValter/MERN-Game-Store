import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Search from './Search';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const cart = useSelector((state) => state.cart.cart);

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Gamers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-users-cog'></i>
        </Link>
      </li>

      {cart.length > 0 ? (
        <li>
          <a className='cart-toggle'
            onClick={() =>
              document
                .querySelector('.cart-container')
                .classList.toggle('is-open')
            }
            href='#!'
          >
            <i className='fas fa-shopping-cart'></i>
            <span className='cart-items-no'>{cart.length}</span>
          </a>
        </li>
      ) : null}

      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-lgray'>
      <div className='home-link'>
        <Link to='/'>
          <i className='fas fa-home'></i>
        </Link>
      </div>
      <Search />
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
