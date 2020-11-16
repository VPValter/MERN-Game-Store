import React from 'react';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { getGames } from '../../actions/games';

let query = '';

const onChange = e => {
  query = e.target.value;
};

const Search = props => {
  // const dispatch = useDispatch();
  return (
    <form
      className='search-form'
      onSubmit={e => {
        e.preventDefault();
        // dispatch(getGames(query));
        if (query.length > 2) props.history.push(`/games/search/${query}`);
      }}
    >
      <input
        type='search'
        name='search'
        placeholder='Search'
        onChange={e => onChange(e)}
      />
      <button type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  );
};

export default withRouter(Search);
