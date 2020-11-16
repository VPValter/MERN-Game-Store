import { GET_DEV, CLEAR_DEV, DEV_ERROR, CLEAR_GAME, CLEAR_GAMES } from './types';
import axios from 'axios';

// Get a developer by ID
export const getDevById = devId => async dispatch => {
  dispatch({ type: CLEAR_DEV });
  dispatch({ type: CLEAR_GAME });
  dispatch({ type: CLEAR_GAMES });
  try {
    const res = await axios.get(`/api/devs/${devId}`);
    dispatch({
      type: GET_DEV,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: DEV_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};