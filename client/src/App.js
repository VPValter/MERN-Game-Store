import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';
// import Games from './components/games/Games';
import Cart from './components/layout/Cart';
import Routes from './components/routing/Routes';
// Redux:
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import './Games.css';
import './Devs.css';
import './Cart.css';
import './Search.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Cart />
          <Switch>
            {/* <Route exact path='/' component={Landing} /> */}
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
