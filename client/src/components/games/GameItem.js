import React from 'react';
import { Link } from 'react-router-dom';

const GameItem = ({ game }) => {
  return (
    <div className='game-item'>
      <Link to={`/games/${game._id}`}>
        <img src={game.posterImg} alt='' />
        <h3>{game.title}</h3>
        {game.price > 0 ? (
          <span className='list-price'>{game.price}</span>
        ) : (
          <span className='free-price'>FREE</span>
        )}
      </Link>
    </div>
  );
};

export default GameItem;
