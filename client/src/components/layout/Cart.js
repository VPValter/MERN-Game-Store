import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCart } from '../../actions/cart';
import CartItem from './CartItem';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  let total = 0;
  cart.map((item) => (total += item.price));

  return (
    <Fragment>
      <div className='cart-container'>
        <button
          className='btn btn-info close'
          onClick={() =>
            document
              .querySelector('.cart-container')
              .classList.remove('is-open')
          }
        >
          <i className='fas fa-times'></i>
        </button>
        {cart.map((item) => (
          <CartItem key={item.gameId} item={item} />
        ))}

        <hr />

        {total ? (
          <div className='cart-total'>
            <span></span>
            <h4>Total:</h4>
            <strong className='price'>{total}</strong>
            <span></span>
          </div>
        ) : null}

        <div className='cart-buttons'>
          <button
            className='btn btn-primary'
            onClick={() => dispatch(clearCart())}
          >
            Empty cart
          </button>
          <Link to='/checkout' className='btn btn-success'>
            Checkout
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
