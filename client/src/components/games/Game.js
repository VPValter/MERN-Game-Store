import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGameById } from '../../actions/games';
import Spinner from '../layout/Spinner';
import AddToCart from './AddToCart';

const Game = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const games = useSelector((state) => state.games);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cart);

  let isAddedToCart = false;

  return (
    <Fragment>
      {games.game === null || games.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='game-details'>
            <img src={games.game.posterImg} alt='' />
            <div className='details-right'>
              <h1>{games.game.title}</h1>
              <div className='tags'>
                {games.game.tags.map((item, i) => (
                  <Link to={`/games/tags/${item}`} key={i}>
                    {item}
                  </Link>
                ))}
              </div>
              {games.game.description.split(/(?:<br>|\\n)+/).map((item, i) => (
                <p key={i}>{item}</p>
              ))}
              <p className='dev'>
                Developer:{' '}
                <Link to={`/devs/${games.game.developer._id}`}>
                  {games.game.developer.name}
                </Link>
              </p>
              {games.game.price > 0 ? (
                <p className='price'>{games.game.price}</p>
              ) : (
                <p className='price free'>FREE</p>
              )}

              {isAuthenticated ? (
                user.gamesOwned
                  .map((game) => game._id)
                  .includes(games.game._id) ? (
                  <button className='btn btn-light'>Game already owned</button>
                ) : (
                  <Fragment>
                    {cartItems.some((item) => {
                      if (games.game._id === item.gameId) {
                        isAddedToCart = true;
                        return true;
                      }
                    })}
                    {isAddedToCart ? (
                      <button className='btn btn-light'>
                        Game added to cart
                      </button>
                    ) : (
                      <AddToCart
                        gameId={games.game._id}
                        title={games.game.title}
                        price={games.game.price}
                        poster={games.game.posterImg}
                      />
                    )}
                  </Fragment>
                )
              ) : (
                <Link to='/login' className='btn btn-primary'>
                  Log in to buy
                </Link>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Game;
