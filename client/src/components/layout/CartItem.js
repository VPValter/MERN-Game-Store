import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../actions/cart';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className='cart-item'>
      <img src={item.poster} alt='' />
      <h4>{item.title}</h4>
      <p className='price'>{item.price}</p>
      <button
        className='btn btn-danger remove'
        onClick={() => {
          dispatch(removeFromCart(item.gameId));
          if (cart.length <= 1) dispatch(clearCart());
        }}
      >
        <i className='far fa-trash-alt'></i>
      </button>
    </div>
  );
};

export default CartItem;
