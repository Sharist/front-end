import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { Router } from '@reach/router';

import './index.css';
import { MapContextProvider } from './common/contexts/MapContext';
import * as serviceWorker from './serviceWorker';
import routes from './routes';
import SharistThemeProvider from './common/styles/Theme';

ReactDOM.render(
  <React.StrictMode>
    <SharistThemeProvider>
      <IconContext.Provider value={{ className: 'icons noselect' }}>
        <MapContextProvider>
          <Router>
            {Object.entries(routes).map(([name, { pageComponent: PageComponent, path }]) => (
              <PageComponent key={name} path={path} />
            ))}
          </Router>
        </MapContextProvider>
      </IconContext.Provider>
    </SharistThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
