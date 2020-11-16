import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDevById } from '../../actions/devs';
import Spinner from '../layout/Spinner';
import GamesByDev from '../games/GamesByDev';

const Dev = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDevById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const devs = useSelector((state) => state.devs);

  return (
    <Fragment>
      {devs.dev === null || devs.loading ? (
        <Spinner />
      ) : (
        <div className='dev-details'>
          <h1>{devs.dev.name}</h1>

          {devs.dev.description.split(/(?:<br>|\\n)+/).map((item, i) => (
            <p key={i}>{item}</p>
          ))}

          <img className='dev-logo' src={devs.dev.logo} alt='' />
          <p>Headquarters: {devs.dev.hq}</p>
          <a href={devs.dev.web} target='_blank' rel='noopener noreferrer'>
            {devs.dev.web}
          </a>

          <hr></hr>

          <GamesByDev devsGames={devs.devsGames} />
        </div>
      )}
    </Fragment>
  );
};

export default Dev;
