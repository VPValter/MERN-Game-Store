import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from '../../actions/auth'

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  let cartItems = cart.map((item) => item.gameId);
  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkout(cartItems));
  }, []);

  return (
    <Fragment>
      <h1>Thank you for your purchase</h1>
      <p>The games will be linked to your account shortly.</p>
    </Fragment>
  );
};

export default Checkout;
