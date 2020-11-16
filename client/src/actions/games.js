import { GET_GAMES, GET_GAME, GAMES_ERROR, CLEAR_GAME, CLEAR_GAMES, CLEAR_DEV } from './types';
import axios from 'axios';

// Get games?
export const getGames = query => async dispatch => {
  dispatch({ type: CLEAR_GAMES });
  dispatch({ type: CLEAR_GAME });
  try {
    const res = query
      ? await axios.get(`/api/games/search/${query}`)
      : await axios.get(`/api/games/`);
    dispatch({
      type: GET_GAMES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GAMES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a game by ID?
export const getGameById = gameId => async dispatch => {
  dispatch({ type: CLEAR_GAME });
  dispatch({ type: CLEAR_DEV });
  try {
    const res = await axios.get(`/api/games/${gameId}`);
    dispatch({
      type: GET_GAME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GAMES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get games by tag?
export const getGamesByTag = gameTag => async dispatch => {
  dispatch({ type: CLEAR_GAMES });
  dispatch({ type: CLEAR_GAME });
  try {
    const res = await axios.get(`/api/games/tags/${gameTag}`);
    dispatch({
      type: GET_GAMES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GAMES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
