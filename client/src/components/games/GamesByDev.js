import React from 'react';
import GameItem from './GameItem';

const Games = ({devsGames}) => {

  return (
    <div className='games-list'>
      {devsGames.length > 0 ? (
        devsGames.map(game => <GameItem key={game._id} game={game} />)
      ) : (
        <h4>No games found for this developer</h4>
      )}
    </div>
  );
};

export default Games;
