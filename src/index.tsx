import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import './index.css';
import { MapContextProvider } from './components/contexts/MapContext';
import { SharistTheme } from './common/themes';
import * as serviceWorker from './serviceWorker';
import routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={SharistTheme}>
      <IconContext.Provider value={{ className: 'icons noselect' }}>
        <MapContextProvider>
          <Router>
            {Object.entries(routes).map(([name, { pageComponent: PageComponent, path }]) => (
              <PageComponent key={name} path={path} />
            ))}
          </Router>
        </MapContextProvider>
      </IconContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
