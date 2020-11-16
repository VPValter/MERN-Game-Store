import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import games from './games';
import cart from './cart';
import devs from './devs';

export default combineReducers({
  // Any reducers we create:
  alert,
  auth,
  profile,
  post,
  games,
  cart,
  devs
});
