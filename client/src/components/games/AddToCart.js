import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cart';

const AddToCart = ({ gameId, title, price, poster }) => {
  const dispatch = useDispatch();
  return (
    <button
      className='btn btn-success'
      onClick={() => dispatch(addToCart(gameId, title, price, poster))}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
