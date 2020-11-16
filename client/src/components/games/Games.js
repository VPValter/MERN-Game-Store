import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameItem from './GameItem';
import DevItem from './DevItem';
import Spinner from '../layout/Spinner';
import { getGames } from '../../actions/games';

// custom Hook - name must start with "use"
const useSearch = (query) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGames(query));
  }, [dispatch, query]);
};

const Games = (props) => {
  const query = props.match.params.query || '';
  useSearch(query);
  const games = useSelector((state) => state.games);
  return games.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {games.results && games.results.length > 0 ? (
        <div className='games-list'>
          {games.results.map((game) => (
            <GameItem key={game._id} game={game} />
          ))}
        </div>
      ) : (
        // <h4>{games.error.msg}</h4>
        <h4>No games found</h4>
      )}
      {games.devResults && games.devResults.length > 0 ? (
        <div className='dev-results my-2'>
          <h4>Developers found:</h4>
          {games.devResults.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Games;
