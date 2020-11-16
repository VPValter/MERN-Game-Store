import {
  CART_ADD,
  CART_REMOVE,
  CART_CLEAR,
  CART_ERROR,
} from '../actions/types';

const initialState = {
  cart: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD:
      return {
        ...state,
        cart: [...state.cart, payload],
        error: {},
        loading: false,
      };
    case CART_REMOVE:
      return {
        ...state,
        cart: state.cart.filter(item => item.gameId !== action.payload),
        error: {},
        loading: false,
      };
    case CART_CLEAR:
      return { ...state, cart: [], error: {}, loading: false };
    case CART_ERROR:
      return { ...state, cart: [], error: payload, loading: false };
    default:
      return state;
  }
}
