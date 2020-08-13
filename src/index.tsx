import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import { SharistTheme } from './common/themes';
import Home from './pages/Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={SharistTheme}>
      <Router>
        <Home path='/' />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
