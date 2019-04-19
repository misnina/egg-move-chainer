import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './style.scss';

import App from './App';

ReactDOM.render(
  <Router
    history={createBrowserHistory()}
    basename={process.env.PUBLIC_URL}
  >
    <Route path="/" component={App} />
  </Router>
  , document.getElementById('root'));
