import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameItem from './GameItem';
import Spinner from '../layout/Spinner';
import { getGamesByTag } from '../../actions/games';

// custom Hook - name must start with "use"
const useSearch = tag => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGamesByTag(tag));
  }, [dispatch, tag]);
};

const Games = props => {
  const tag = props.match.params.tag || "";
  useSearch(tag);
  const games = useSelector(state => state.games);
  return games.loading ? (
    <Spinner />
  ) : (
    <div className='games-list'>
      {games.results.length > 0 ? (
        games.results.map(game => <GameItem key={game._id} game={game} />)
      ) : (
        <h4>{games.error.msg}</h4>
      )}
    </div>
  );
};

export default Games;
