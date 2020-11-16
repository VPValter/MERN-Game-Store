import { CART_ADD, CART_REMOVE, CART_CLEAR, CART_ERROR } from './types';

// Add a game to cart ?
export const addToCart = (gameId, title, price, poster) => async (dispatch) => {
  try {
    const cartItem = { gameId, title, price, poster };
    dispatch({
      type: CART_ADD,
      payload: cartItem,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Remove a game from cart ?
export const removeFromCart = (gameId) => async (dispatch) => {
  try {
    dispatch({
      type: CART_REMOVE,
      payload: gameId,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

// Clear cart
export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_CLEAR });
    document.querySelector('.cart-container').classList.remove('is-open');
  } catch (err) {
    dispatch({ type: CART_ERROR, payload: { msg: err, status: err } });
  }
};
